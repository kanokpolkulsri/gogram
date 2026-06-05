/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialUser } from './mockData';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const STORAGE_KEY = 'duolingo-clone-user';

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load user data:', e);
  }
  return { ...initialUser, lastCategoryId: null };
}

function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user data:', e);
  }
}

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function userReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'COMPLETE_LESSON': {
      const lessonKey = `${action.unitId}-${action.levelId}`;
      const alreadyCompleted = state.completedLessons.includes(lessonKey);
      newState = {
        ...state,
        totalXP: state.totalXP + (action.xp || 15),
        completedLessons: alreadyCompleted
          ? state.completedLessons
          : [...state.completedLessons, lessonKey],
      };
      break;
    }

    case 'UPDATE_STREAK': {
      const today = getTodayString();
      const yesterday = getYesterdayString();
      const lastPractice = state.streakHistory[state.streakHistory.length - 1];

      if (lastPractice === today) {
        // Already practiced today
        newState = state;
        break;
      }

      let newStreak;
      if (lastPractice === yesterday || state.streak === 0) {
        newStreak = state.streak + 1;
      } else {
        // Streak broken, start fresh
        newStreak = 1;
      }

      newState = {
        ...state,
        streak: newStreak,
        streakHistory: [...state.streakHistory, today],
      };
      break;
    }

    case 'LOSE_HEART': {
      newState = {
        ...state,
        hearts: Math.max(0, state.hearts - 1),
      };
      break;
    }

    case 'RESET_HEARTS': {
      newState = {
        ...state,
        hearts: state.maxHearts,
      };
      break;
    }

    case 'ADD_GEMS': {
      newState = {
        ...state,
        gems: (state.gems || 0) + (action.amount || 0),
      };
      break;
    }

    case 'SPEND_GEMS': {
      const cost = action.amount || 0;
      if ((state.gems || 0) < cost) {
        newState = state;
        break;
      }
      newState = {
        ...state,
        gems: (state.gems || 0) - cost,
      };
      break;
    }

    case 'SET_LAST_CATEGORY': {
      newState = {
        ...state,
        lastCategoryId: action.categoryId,
      };
      break;
    }

    case 'RESET_PROGRESS': {
      newState = { ...initialUser, lastCategoryId: null };
      break;
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }

  saveUser(newState);
  return newState;
}

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, null, loadUser);
  useEffect(() => {
    saveUser(user);
  }, [user]);

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

