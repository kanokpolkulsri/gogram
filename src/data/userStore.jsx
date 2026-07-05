/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { api } from './api';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const STORAGE_KEY = 'gogram-user';

const initialStoreState = {
  uid: null,
  email: null,
  name: 'Learner',
  role: 'user',
  joinedAt: null,
  totalXP: 0,
  hearts: 100,
  heartsCount: 100,
  lastHeartRefillTime: Date.now(),
  subscriptionExpiresAt: null,
  isPremium: false,
  isPrivate: false,
  streak: 0,
  progress: {},
  completedLessons: [],
  usedPromoCodes: [],
  categories: [],
  units: [],
  mockUsers: [],
  promoCodes: [],
  auditLogs: [],
  quizCache: {},
  leaderboardCache: {},
  lastCategoryId: null,
  isAuthenticated: false,
  authProfile: null,
  isAuthLoading: true,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_QUIZ_CACHE':
      return {
        ...state,
        quizCache: {
          ...state.quizCache,
          [`${action.unitId}-${action.levelId}`]: {
            questions: action.questions,
            currentIndex: action.currentIndex
          }
        }
      };

    case 'REMOVE_QUIZ_CACHE_KEY': {
      const newCache = { ...state.quizCache };
      delete newCache[`${action.unitId}-${action.levelId}`];
      return {
        ...state,
        quizCache: newCache
      };
    }

    case 'SET_AUTH_LOADING':
      return {
        ...state,
        isAuthLoading: action.loading
      };

    case 'INIT_APP_DATA':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_CATEGORIES_AND_UNITS':
      return {
        ...state,
        categories: action.categories,
        units: action.units
      };

    case 'UPDATE_HEARTS_AND_SUB':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_PRIVACY_OPTIMISTIC':
      return {
        ...state,
        isPrivate: action.isPrivate
      };

    case 'SET_LEADERBOARD_CACHE':
      return {
        ...state,
        leaderboardCache: {
          ...state.leaderboardCache,
          [action.categoryId]: action.payload
        }
      };

    case 'COMPLETE_LESSON_OPTIMISTIC': {
      const key = `${action.unitId}-${action.levelId}`;
      const newCompleted = state.completedLessons.includes(key)
        ? state.completedLessons
        : [...state.completedLessons, key];
      return {
        ...state,
        completedLessons: newCompleted
      };
    }

    case 'COMPLETE_LESSON_SUCCESS':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_ADMIN_DATA':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_LAST_CATEGORY':
      return {
        ...state,
        lastCategoryId: action.categoryId
      };

    case 'AUTH_STATE_CHANGED':
      if (!action.user) {
        // Clear cached stats and login session flags on logout
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem('gogram_login_clicked');
        return {
          ...initialStoreState,
          isAuthLoading: false
        };
      }
      return {
        ...state,
        isAuthenticated: true,
        authProfile: {
          uid: action.user.uid,
          email: action.user.email,
          displayName: action.user.displayName,
          photoURL: action.user.photoURL,
        }
      };

    default:
      return state;
  }
}

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...initialStoreState,
        ...parsed,
        isAuthenticated: false,
        authProfile: null,
        isAuthLoading: true,
      };
    }
  } catch (e) {
    console.error('Failed to load user store backup:', e);
  }
  return initialStoreState;
}

function saveUser(user) {
  if (!user) return;
  try {
    // eslint-disable-next-line no-unused-vars
    const { isAuthenticated, authProfile, isAuthLoading, ...rest } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (e) {
    console.error('Failed to save user store backup:', e);
  }
}

export function UserProvider({ children }) {
  const [user, rawDispatch] = useReducer(userReducer, null, loadUser);

  // Sync profile data from backend
  const syncProfile = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      rawDispatch({ type: 'AUTH_STATE_CHANGED', user: null });
      return;
    }

    rawDispatch({ type: 'SET_AUTH_LOADING', loading: true });
    try {
      // 1. Sync auth profile record
      const profile = await api.post('/auth/sync', { name: firebaseUser.displayName });
      
      let categories = [];
      let units = [];

      // Eager-load learn data on startup if we are not landing on an admin page
      if (!window.location.pathname.startsWith('/admin')) {
        try {
          const [catRes, unitRes] = await Promise.all([
            api.get('/learn/categories'),
            api.get('/learn/units')
          ]);
          categories = catRes;
          units = unitRes;
        } catch (err) {
          console.warn('Startup fetch of categories/units failed:', err);
        }
      }

      rawDispatch({
        type: 'INIT_APP_DATA',
        payload: {
          ...profile,
          isAuthenticated: true,
          authProfile: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || profile.name,
            photoURL: firebaseUser.photoURL,
          },
          categories,
          units,
          mockUsers: [],
          promoCodes: [],
          auditLogs: [],
          isAuthLoading: false
        }
      });
    } catch (error) {
      console.error('Failed to initialize synced database profile:', error);
      rawDispatch({ type: 'AUTH_STATE_CHANGED', user: null });
      alert('Failed to connect to Gogram server. Please ensure the backend server is running and your database is reachable.');
    }
  }, []);

  // Set up auth state change hook
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // If the user lands on the welcome page, we clear any stale Firebase auth session
      // to prevent background database sync calls unless they explicitly clicked login.
      if (window.location.pathname === '/welcome' && firebaseUser && !sessionStorage.getItem('gogram_login_clicked')) {
        try {
          auth.signOut();
        } catch (e) {}
        rawDispatch({ type: 'AUTH_STATE_CHANGED', user: null });
        return;
      }
      syncProfile(firebaseUser);
    });
    return () => unsubscribe();
  }, [syncProfile]);

  // Hearts refill automatic background local check hook (NO API CALLS)
  useEffect(() => {
    if (!user || !user.isAuthenticated || user.hearts === 'infinity' || user.heartsCount >= 10) return;

    const interval = setInterval(() => {
      // Calculate if hearts have naturally refilled in the client
      const elapsedMs = Date.now() - new Date(user.lastHeartRefillTime).getTime();
      const refillIntervalMs = 60 * 60 * 1000; // 1 hour
      const computedHearts = Math.min(10, user.heartsCount + Math.floor(elapsedMs / refillIntervalMs));

      if (computedHearts !== user.hearts) {
        rawDispatch({
          type: 'UPDATE_HEARTS_AND_SUB',
          payload: {
            hearts: computedHearts
          }
        });
      }
    }, 30000); // Check local time every 30 seconds

    return () => clearInterval(interval);
  }, [user.isAuthenticated, user.hearts, user.heartsCount, user.lastHeartRefillTime]);

  // Persist backup state to localStorage when changed
  useEffect(() => {
    saveUser(user);
  }, [user]);

  // Custom dispatch wrapping backend API middleware interceptor
  const dispatch = useCallback(async (action) => {
    switch (action.type) {
      case 'AUTH_STATE_CHANGED':
        await syncProfile(action.user);
        break;

      case 'LOSE_HEART':
        try {
          const res = await api.post('/quiz/session/error');
          rawDispatch({
            type: 'UPDATE_HEARTS_AND_SUB',
            payload: {
              hearts: res.hearts,
              heartsCount: res.heartsCount
            }
          });
        } catch (e) {
          console.error('Failed to record wrong answer heart loss:', e);
        }
        break;

      case 'CHECK_HEARTS_REFILL':
        try {
          const profile = await api.post('/auth/sync');
          rawDispatch({
            type: 'UPDATE_HEARTS_AND_SUB',
            payload: {
              hearts: profile.hearts,
              heartsCount: profile.heartsCount,
              lastHeartRefillTime: profile.lastHeartRefillTime,
              subscriptionExpiresAt: profile.subscriptionExpiresAt,
              isPremium: profile.isPremium
            }
          });
        } catch (e) {
          console.warn('Hearts sync check failed:', e);
        }
        break;

      case 'COMPLETE_LESSON':
        rawDispatch({
          type: 'COMPLETE_LESSON_OPTIMISTIC',
          unitId: action.unitId,
          levelId: action.levelId
        });

        api.post('/quiz/session/complete', {
          unitId: action.unitId,
          levelId: action.levelId
        }).then(() => {
          return api.post('/auth/sync');
        }).then(profile => {
          rawDispatch({
            type: 'COMPLETE_LESSON_SUCCESS',
            payload: {
              completedLessons: profile.completedLessons,
              totalXP: profile.totalXP,
              progress: profile.progress
            }
          });
        }).catch(err => {
          console.error('Failed to complete lesson on backend:', err);
        });
        break;

      case 'APPLY_PROMO_CODE':
        try {
          const res = await api.post('/promo-codes/claim', { code: action.code });
          const profile = await api.post('/auth/sync');

          rawDispatch({
            type: 'INIT_APP_DATA',
            payload: {
              ...profile,
              isAuthLoading: false
            }
          });

          if (action.onSuccess) {
            action.onSuccess({
              type: res.isPremium ? 'infinity' : 'hearts',
              reward: res.heartsCount || res.hearts,
              message: res.message
            });
          }
        } catch (e) {
          console.error('Failed to claim promo code:', e);
          if (action.onError) action.onError(e.message || 'Failed to claim promo code');
        }
        break;

      case 'ENSURE_LEARN_DATA':
        if (user.categories && user.categories.length > 0 && user.units && user.units.length > 0) {
          if (action.onSuccess) action.onSuccess();
          break;
        }
        try {
          const [categories, units] = await Promise.all([
            api.get('/learn/categories'),
            api.get('/learn/units')
          ]);
          rawDispatch({ type: 'SET_CATEGORIES_AND_UNITS', categories, units });
          if (action.onSuccess) action.onSuccess();
        } catch (err) {
          console.error('Failed to load lazy categories/units:', err);
        }
        break;

      case 'REFRESH_LEARN_DATA':
        try {
          const [categories, units] = await Promise.all([
            api.get('/learn/categories'),
            api.get('/learn/units')
          ]);
          rawDispatch({ type: 'SET_CATEGORIES_AND_UNITS', categories, units });
          if (action.onSuccess) action.onSuccess();
        } catch (err) {
          console.error('Failed to refresh categories/units:', err);
        }
        break;

      case 'PREFETCH_QUIZ':
        try {
          const res = await api.post('/quiz/session/start', {
            unitId: parseInt(action.unitId),
            levelId: action.levelId
          });
          rawDispatch({
            type: 'SET_QUIZ_CACHE',
            unitId: action.unitId,
            levelId: action.levelId,
            questions: res.questions,
            currentIndex: res.currentIndex
          });
        } catch (err) {
          console.warn(`Prefetch failed for level ${action.unitId}-${action.levelId}:`, err);
        }
        break;

      case 'REMOVE_QUIZ_CACHE_KEY':
        rawDispatch(action);
        break;

      case 'SET_LAST_CATEGORY':
        rawDispatch(action);
        break;

      case 'SET_PRIVACY':
        try {
          rawDispatch({ type: 'SET_PRIVACY_OPTIMISTIC', isPrivate: action.isPrivate });
          await api.put('/auth/privacy', { isPrivate: action.isPrivate });
        } catch (e) {
          console.error('Failed to update privacy settings on backend:', e);
          // Rollback on failure
          rawDispatch({ type: 'SET_PRIVACY_OPTIMISTIC', isPrivate: !action.isPrivate });
        }
        break;

      case 'FETCH_LEADERBOARD':
        try {
          const cacheEntry = state.leaderboardCache[action.categoryId];
          const cacheDuration = 5 * 60 * 1000; // 5 minutes
          if (cacheEntry && (Date.now() - cacheEntry.fetchedAt < cacheDuration)) {
            if (action.onSuccess) action.onSuccess(cacheEntry.data);
            break;
          }

          const res = await api.get(`/learn/leaderboard/${action.categoryId}`);
          rawDispatch({
            type: 'SET_LEADERBOARD_CACHE',
            categoryId: action.categoryId,
            payload: {
              data: res,
              fetchedAt: Date.now()
            }
          });
          if (action.onSuccess) action.onSuccess(res);
        } catch (err) {
          console.error(`Failed to fetch leaderboard for ${action.categoryId}:`, err);
          if (action.onError) action.onError(err.message || 'Failed to fetch leaderboard');
        }
        break;

      // Admin actions are now handled locally within each Admin page/component using local states and direct api calls.

      default:
        rawDispatch(action);
    }
  }, [syncProfile, user.categories, user.units]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }

  let user = context;

  // 1. Dynamically check if subscription has expired on the client side.
  if (user.hearts === 'infinity' && user.subscriptionExpiresAt) {
    const isExpired = new Date(user.subscriptionExpiresAt).getTime() <= Date.now();
    if (isExpired) {
      user = {
        ...user,
        hearts: user.heartsCount || 0,
        isPremium: false
      };
    }
  }

  // 2. Dynamically check if hearts have naturally refilled on the client side.
  if (user.hearts !== 'infinity' && user.heartsCount < 10) {
    const elapsedMs = Date.now() - new Date(user.lastHeartRefillTime).getTime();
    const refillIntervalMs = 60 * 60 * 1000; // 1 hour
    const computedHearts = Math.min(10, user.heartsCount + Math.floor(elapsedMs / refillIntervalMs));
    if (computedHearts !== user.hearts) {
      user = {
        ...user,
        hearts: computedHearts
      };
    }
  }

  return user;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === null) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}
