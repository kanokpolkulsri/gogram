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
  hearts: 10,
  heartsCount: 10,
  lastHeartRefillTime: Date.now(),
  subscriptionExpiresAt: null,
  isPremium: false,
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
          mockUsers: [],
          promoCodes: [],
          auditLogs: [],
          isAuthLoading: false
        }
      });
    } catch (error) {
      console.error('Failed to initialize synced database profile:', error);
      rawDispatch({ type: 'AUTH_STATE_CHANGED', user: null });
    }
  }, []);

  // Set up auth state change hook
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      syncProfile(firebaseUser);
    });
    return () => unsubscribe();
  }, [syncProfile]);

  // Hearts refill automatic background checker hook
  useEffect(() => {
    if (!user || !user.isAuthenticated || user.hearts === 'infinity' || user.heartsCount >= 10) return;

    const interval = setInterval(async () => {
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
        console.warn('Hearts refill check sync failed:', e);
      }
    }, 20000); // Check every 20 seconds

    return () => clearInterval(interval);
  }, [user.isAuthenticated, user.hearts, user.heartsCount]);

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
        try {
          const res = await api.post('/quiz/session/complete', {
            unitId: action.unitId,
            levelId: action.levelId
          });

          // Reload fresh profile mapping to get new global and category XP
          const profile = await api.post('/auth/sync');
          rawDispatch({
            type: 'COMPLETE_LESSON_SUCCESS',
            payload: {
              completedLessons: profile.completedLessons,
              totalXP: profile.totalXP,
              progress: profile.progress
            }
          });

          if (action.onSuccess) action.onSuccess(res);
        } catch (e) {
          console.error('Failed to complete lesson on backend:', e);
        }
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

      case 'ENSURE_LEARN_DATA': {
        const hasData = user.categories && user.categories.length > 0 && user.units && user.units.length > 0;
        if (hasData) {
          if (action.onSuccess) action.onSuccess();
        }
        try {
          const [categories, units] = await Promise.all([
            api.get('/learn/categories'),
            api.get('/learn/units')
          ]);
          rawDispatch({ type: 'SET_CATEGORIES_AND_UNITS', categories, units });
          if (!hasData && action.onSuccess) action.onSuccess();
        } catch (err) {
          console.error('Failed to load/revalidate lazy categories/units:', err);
        }
        break;
      }

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
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === null) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}
