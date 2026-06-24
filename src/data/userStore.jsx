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
  lastCategoryId: null,
  isAuthenticated: false,
  authProfile: null,
  isAuthLoading: true,
};

function userReducer(state, action) {
  switch (action.type) {
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
      
      // 2. Fetch categories
      const categories = await api.get('/learn/categories');
      
      // 3. Fetch units for all active categories
      const allUnits = [];
      for (const cat of categories) {
        try {
          const catUnits = await api.get(`/learn/units?categoryId=${cat.id}`);
          allUnits.push(...catUnits);
        } catch (err) {
          console.warn(`Failed to fetch units for category ${cat.id}:`, err);
        }
      }

      // 4. Fetch admin directories if user is Admin
      let mockUsers = [];
      let promoCodes = [];
      let auditLogs = [];
      if (profile.role === 'admin') {
        try {
          mockUsers = await api.get('/admin/users');
          promoCodes = await api.get('/admin/promo-codes');
          auditLogs = await api.get('/admin/audit-logs');
        } catch (adminErr) {
          console.warn('Failed to load admin directories:', adminErr);
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
          units: allUnits,
          mockUsers,
          promoCodes,
          auditLogs,
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
    if (!user.isAuthenticated) return;

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
  }, [user.isAuthenticated]);

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

      case 'SET_LAST_CATEGORY':
        rawDispatch(action);
        break;

      // =======================================
      // ADMIN PANEL ACTION WRAPPERS
      // =======================================
      case 'UPDATE_USER_ROLE':
        try {
          await api.put(`/admin/users/${action.userId}/role`, { role: action.role });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to update user role:', e);
        }
        break;

      case 'BLOCK_USER':
        try {
          // Toggle user block status
          const target = user.mockUsers?.find(u => u.uid === action.userId);
          const newStatus = target && target.status === 'blocked' ? 'active' : 'blocked';
          await api.put(`/admin/users/${action.userId}/status`, { status: newStatus });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to toggle user blocked status:', e);
        }
        break;

      case 'DELETE_USER':
        try {
          await api.delete(`/admin/users/${action.userId}`);
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to delete user account:', e);
        }
        break;

      case 'UPDATE_USER_HEARTS':
        try {
          await api.put(`/admin/users/${action.userId}/hearts`, { heartsValue: action.heartsValue });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to update user hearts pool:', e);
        }
        break;

      case 'UPDATE_USER_SUBSCRIPTION':
        try {
          await api.put(`/admin/users/${action.userId}/subscription`, { expiresAt: action.expiresAt });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to update user subscription:', e);
        }
        break;

      case 'UPDATE_USER_PROGRESS_LEVEL':
        try {
          await api.put(`/admin/users/${action.userId}/progress`, {
            categoryId: action.categoryId,
            levelValue: action.levelValue
          });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to update user progress level:', e);
        }
        break;

      case 'RESET_USER_PROGRESS_IN_CATEGORY':
        try {
          await api.post(`/admin/users/${action.userId}/reset-progress`, {
            categoryId: action.categoryId
          });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to reset user category progress:', e);
        }
        break;

      case 'REMOVE_USER_PROMO_CODE':
        try {
          await api.delete(`/admin/users/${action.userId}/promo-codes/${action.code}`);
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to remove user claimed promo code:', e);
        }
        break;

      case 'SUSPEND_USER_PROMO_CODE':
      case 'UNSUSPEND_USER_PROMO_CODE':
        try {
          const isSuspended = action.type === 'SUSPEND_USER_PROMO_CODE';
          await api.post(`/admin/users/${action.userId}/promo-codes/${action.code}/suspend`, {
            isSuspended
          });
          const mockUsers = await api.get('/admin/users');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { mockUsers, auditLogs } });
        } catch (e) {
          console.error('Admin failed to change user promo code suspension state:', e);
        }
        break;

      case 'ADD_PROMO_CODE':
        try {
          await api.post('/admin/promo-codes', {
            code: action.code,
            type: action.promoType,
            reward: action.reward,
            description: action.description,
            expiresAt: action.expiresAt,
            infinityDuration: action.infinityDuration,
            maxRedemptions: action.maxRedemptions
          });
          const promoCodes = await api.get('/admin/promo-codes');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { promoCodes, auditLogs } });
        } catch (e) {
          console.error('Admin failed to add global promo code:', e);
        }
        break;

      case 'DELETE_PROMO_CODE':
        try {
          await api.delete(`/admin/promo-codes/${action.code}`);
          const promoCodes = await api.get('/admin/promo-codes');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { promoCodes, auditLogs } });
        } catch (e) {
          console.error('Admin failed to delete global promo code:', e);
        }
        break;

      case 'EDIT_PROMO_CODE':
        try {
          await api.put(`/admin/promo-codes/${action.originalCode}`, action.updatedPromo);
          const promoCodes = await api.get('/admin/promo-codes');
          const auditLogs = await api.get('/admin/audit-logs');
          rawDispatch({ type: 'SET_ADMIN_DATA', payload: { promoCodes, auditLogs } });
        } catch (e) {
          console.error('Admin failed to edit global promo code parameters:', e);
        }
        break;

      case 'UPDATE_LEVEL_QUESTIONS':
        try {
          await api.post('/admin/questions/publish', {
            unitId: action.unitId,
            levelId: action.levelId,
            questions: action.questions
          });
          
          // Refetch units to update level questions on learn page view
          const categories = await api.get('/learn/categories');
          const allUnits = [];
          for (const cat of categories) {
            const catUnits = await api.get(`/learn/units?categoryId=${cat.id}`);
            allUnits.push(...catUnits);
          }
          const auditLogs = await api.get('/admin/audit-logs');

          rawDispatch({
            type: 'SET_ADMIN_DATA',
            payload: { units: allUnits, auditLogs }
          });
        } catch (e) {
          console.error('Admin failed to publish level questions:', e);
        }
        break;

      default:
        rawDispatch(action);
    }
  }, [syncProfile, user.mockUsers]);

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
