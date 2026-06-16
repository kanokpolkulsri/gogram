/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initialUser, studyCategories, units } from './mockData';
import { auth } from './firebase';

const initialMockUsers = [
  {
    uid: 'admin-1',
    name: 'Alex (Admin)',
    email: 'alex@gogram.com',
    joined: '2026-05-10',
    authLevel: 'admin',
    status: 'active',
    progress: {
      'grammar-foundation': 12,
      'vocabulary': 8,
      'reading': 0,
      'exam-grammars': 0,
    }
  },
  {
    uid: 'user-2',
    name: 'Sarah Connor',
    email: 'sarah@terminator.com',
    joined: '2026-06-01',
    authLevel: 'subscribed',
    status: 'active',
    progress: {
      'grammar-foundation': 20,
      'vocabulary': 15,
      'reading': 5,
      'exam-grammars': 0,
    }
  },
  {
    uid: 'user-3',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    joined: '2026-06-12',
    authLevel: 'free',
    status: 'active',
    progress: {
      'grammar-foundation': 3,
      'vocabulary': 0,
      'reading': 0,
      'exam-grammars': 0,
    }
  },
  {
    uid: 'user-4',
    name: 'Spammer Bot',
    email: 'bot@spammer.org',
    joined: '2026-04-15',
    authLevel: 'free',
    status: 'blocked',
    progress: {
      'grammar-foundation': 0,
      'vocabulary': 0,
      'reading': 0,
      'exam-grammars': 0,
    }
  }
];

const initialMockFeedbacks = [
  {
    id: 'fb-1',
    userName: 'Sarah Connor',
    userEmail: 'sarah@terminator.com',
    rating: 4,
    comment: 'Great grammar practice! Some vocabulary questions could use more descriptive explanations though.',
    date: '2026-06-13',
    topic: 'Basics: English Articles'
  },
  {
    id: 'fb-2',
    userName: 'John Doe',
    userEmail: 'john.doe@gmail.com',
    rating: 5,
    comment: 'The AI question bulk generation is awesome. Keep it up!',
    date: '2026-06-14',
    topic: 'Verb to Be'
  },
  {
    id: 'fb-3',
    userName: 'Tawarn stm',
    userEmail: 'tawarn2026@gmail.com',
    rating: 3,
    comment: 'Need more questions on reading comprehension. Some articles are too short.',
    date: '2026-06-15',
    topic: 'Basics: English Articles'
  }
];

const initialAuditLogs = [
  {
    id: 'log-1',
    adminName: 'Kanokpol Kulsri',
    action: 'Changed role of Sarah Connor to Subscribed',
    timestamp: '2026-06-15T10:30:00Z'
  },
  {
    id: 'log-2',
    adminName: 'Kanokpol Kulsri',
    action: 'Bulk generated 10 questions for Grammar Foundation - Easy',
    timestamp: '2026-06-15T14:15:00Z'
  },
  {
    id: 'log-3',
    adminName: 'Kanokpol Kulsri',
    action: 'Wiped vocabulary completion progress for John Doe',
    timestamp: '2026-06-15T22:45:00Z'
  }
];

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const STORAGE_KEY = 'gogram-user';

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        categories: parsed.categories || studyCategories,
        units: parsed.units || units,
        mockUsers: parsed.mockUsers || initialMockUsers,
        feedbacks: parsed.feedbacks || initialMockFeedbacks,
        auditLogs: parsed.auditLogs || initialAuditLogs,
        isAuthenticated: false,
        authProfile: null,
        isAuthLoading: true,
      };
    }
  } catch (e) {
    console.error('Failed to load user data:', e);
  }
  return {
    ...initialUser,
    categories: studyCategories,
    units: units,
    mockUsers: initialMockUsers,
    feedbacks: initialMockFeedbacks,
    auditLogs: initialAuditLogs,
    lastCategoryId: null,
    isAuthenticated: false,
    authProfile: null,
    isAuthLoading: true,
  };
}

function saveUser(user) {
  if (!user) return;
  try {
    const { isAuthenticated, authProfile, isAuthLoading, ...rest } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
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

    case 'SET_PRIVACY': {
      newState = {
        ...state,
        isPrivate: action.isPrivate,
      };
      break;
    }

    case 'RESET_PROGRESS': {
      newState = { ...initialUser, categories: state.categories, units: state.units, mockUsers: state.mockUsers, lastCategoryId: null };
      break;
    }

    case 'ADD_CATEGORY': {
      const newCatId = `category-${Date.now()}`;
      const newCategory = {
        id: newCatId,
        title: action.title || 'New Category',
        description: action.description || 'Category description',
        color: action.color || '#58CC02',
        iconChar: (action.title || 'N')[0].toUpperCase(),
      };
      
      const newUnit = {
        id: state.units.length > 0 ? Math.max(...state.units.map(u => Number(u.id) || 0)) + 1 : 1,
        category: newCatId,
        title: `Basics: ${newCategory.title}`,
        section: `UNIT 1`,
        description: `Learn the fundamentals of ${newCategory.title}`,
        color: newCategory.color,
        levels: [
          { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
          { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
          { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'star', questions: [] },
          { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'star', questions: [] },
          { id: 'hard2', label: 'Hard 2', xpReward: 20, icon: 'star', questions: [] },
        ]
      };

      newState = {
        ...state,
        categories: [...state.categories, newCategory],
        units: [...state.units, newUnit],
      };
      break;
    }

    case 'UPDATE_CATEGORY': {
      const updatedCategories = state.categories.map((cat) => {
        if (cat.id === action.categoryId) {
          return {
            ...cat,
            title: action.title ?? cat.title,
            description: action.description ?? cat.description,
            color: action.color ?? cat.color,
            iconChar: action.iconChar ?? cat.iconChar,
          };
        }
        return cat;
      });

      const updatedUnits = state.units.map((unit) => {
        if (unit.category === action.categoryId) {
          return {
            ...unit,
            color: action.color ?? unit.color,
          };
        }
        return unit;
      });

      newState = {
        ...state,
        categories: updatedCategories,
        units: updatedUnits,
      };
      break;
    }

    case 'DELETE_CATEGORY': {
      newState = {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.categoryId),
        units: state.units.filter((unit) => unit.category !== action.categoryId),
        lastCategoryId: state.lastCategoryId === action.categoryId ? null : state.lastCategoryId,
      };
      break;
    }

    case 'UPDATE_LEVEL_QUESTIONS': {
      const updatedUnits = state.units.map((unit) => {
        if (Number(unit.id) === Number(action.unitId)) {
          const updatedLevels = unit.levels.map((level) => {
            if (level.id === action.levelId) {
              return {
                ...level,
                questions: action.questions,
              };
            }
            return level;
          });
          return {
            ...unit,
            levels: updatedLevels,
          };
        }
        return unit;
      });

      newState = {
        ...state,
        units: updatedUnits,
      };
      break;
    }

    case 'BULK_GENERATE_QUESTIONS': {
      const generatedQuestions = [
        {
          id: `q-${Date.now()}-1`,
          question: `Which of the following is correct for ${action.levelId} level?`,
          options: ['Correct Choice', 'Incorrect Choice A', 'Incorrect Choice B'],
          correctAnswer: 'Correct Choice',
        },
        {
          id: `q-${Date.now()}-2`,
          question: `Complete the sentence appropriately for this node.`,
          options: ['Answer X', 'Answer Y'],
          correctAnswer: 'Answer X',
        },
        {
          id: `q-${Date.now()}-3`,
          question: `Select the most suitable synonym.`,
          options: ['Option 1', 'Option 2', 'Option 3'],
          correctAnswer: 'Option 2',
        },
        {
          id: `q-${Date.now()}-4`,
          question: `True or False: This grammar construct is valid.`,
          options: ['True', 'False'],
          correctAnswer: 'True',
        },
        {
          id: `q-${Date.now()}-5`,
          question: `Choose the correct form of the word.`,
          options: ['Form A', 'Form B', 'Form C'],
          correctAnswer: 'Form C',
        },
      ];

      const updatedUnits = state.units.map((unit) => {
        if (Number(unit.id) === Number(action.unitId)) {
          const updatedLevels = unit.levels.map((level) => {
            if (level.id === action.levelId) {
              return {
                ...level,
                questions: [...level.questions, ...generatedQuestions],
              };
            }
            return level;
          });
          return {
            ...unit,
            levels: updatedLevels,
          };
        }
        return unit;
      });

      newState = {
        ...state,
        units: updatedUnits,
      };
      break;
    }

    case 'UPDATE_USER_ROLE': {
      const updatedUsers = state.mockUsers.map((user) => {
        if (user.uid === action.userId) {
          return {
            ...user,
            authLevel: action.role,
          };
        }
        return user;
      });
      const targetUser = state.mockUsers.find(u => u.uid === action.userId);
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Changed role of ${targetUser?.name || action.userId} to ${action.role.toUpperCase()}`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        mockUsers: updatedUsers,
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'BLOCK_USER': {
      const updatedUsers = state.mockUsers.map((user) => {
        if (user.uid === action.userId) {
          return {
            ...user,
            status: user.status === 'blocked' ? 'active' : 'blocked',
          };
        }
        return user;
      });
      const targetUser = state.mockUsers.find(u => u.uid === action.userId);
      const newActionText = targetUser?.status === 'blocked' ? 'Unblocked' : 'Blocked';
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `${newActionText} user ${targetUser?.name || action.userId}`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        mockUsers: updatedUsers,
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'DELETE_USER': {
      const targetUser = state.mockUsers.find(u => u.uid === action.userId);
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Removed user ${targetUser?.name || action.userId} from directory`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        mockUsers: state.mockUsers.filter((user) => user.uid !== action.userId),
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'RESET_USER_PROGRESS_IN_CATEGORY': {
      const updatedUsers = state.mockUsers.map((user) => {
        if (user.uid === action.userId) {
          return {
            ...user,
            progress: {
              ...user.progress,
              [action.categoryId]: 0,
            },
          };
        }
        return user;
      });

      let newCompletedLessons = state.completedLessons;
      const targetUnitIds = state.units
        .filter((u) => u.category === action.categoryId)
        .map((u) => Number(u.id));

      if (action.userId === 'admin-1' || action.isCurrentUser) {
        newCompletedLessons = state.completedLessons.filter((key) => {
          const [unitId] = key.split('-');
          return !targetUnitIds.includes(Number(unitId));
        });
      }

      const targetUser = state.mockUsers.find(u => u.uid === action.userId);
      const cat = state.categories.find(c => c.id === action.categoryId);
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Reset ${cat?.title || action.categoryId} progress for ${targetUser?.name || action.userId}`,
        timestamp: new Date().toISOString()
      };

      newState = {
        ...state,
        mockUsers: updatedUsers,
        completedLessons: newCompletedLessons,
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'ADD_TOPIC': {
      const newUnitId = state.units.length > 0 ? Math.max(...state.units.map(u => Number(u.id) || 0)) + 1 : 1;
      const newUnit = {
        id: newUnitId,
        category: action.categoryId,
        title: action.title || 'New Topic',
        section: `SECTION 1, UNIT ${newUnitId}`,
        description: action.description || 'Topic description',
        color: state.categories.find(c => c.id === action.categoryId)?.color || '#1CB0F6',
        levels: [
          { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
          { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
          { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'dumbbell', questions: [] },
          { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'level-up', questions: [] },
          { id: 'hard2', label: 'Hard 2', xpReward: 35, icon: 'boss', questions: [] },
        ]
      };
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Created topic "${newUnit.title}" under category "${action.categoryId}"`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        units: [...state.units, newUnit],
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'DELETE_TOPIC': {
      const targetUnit = state.units.find(u => Number(u.id) === Number(action.unitId));
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Deleted topic "${targetUnit?.title || action.unitId}"`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        units: state.units.filter(u => Number(u.id) !== Number(action.unitId)),
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'UPDATE_TOPIC': {
      const updatedUnits = state.units.map(u => {
        if (Number(u.id) === Number(action.unitId)) {
          return {
            ...u,
            title: action.title,
            description: action.description
          };
        }
        return u;
      });
      const targetUnit = state.units.find(u => Number(u.id) === Number(action.unitId));
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Updated topic details from "${targetUnit?.title}" to "${action.title}"`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        units: updatedUnits,
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'RESOLVE_FEEDBACK': {
      const targetFb = state.feedbacks?.find(f => f.id === action.feedbackId);
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Resolved feedback from ${targetFb?.userName || 'User'}`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        feedbacks: state.feedbacks.filter(f => f.id !== action.feedbackId),
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'BULK_GENERATE_CMS': {
      const targetLevelId = action.difficultyLevel === 'easy' ? 'easy' : action.difficultyLevel === 'medium' ? 'medium1' : 'hard1';
      const numQuestions = action.questionsPerTopic || 10;
      
      let processedCount = 0;
      const updatedUnits = state.units.map(unit => {
        if (unit.category === action.categoryId) {
          const targetLevel = unit.levels.find(l => l.id === targetLevelId);
          const hasQuestions = (targetLevel?.questions?.length || 0) > 0;
          
          if (!action.onlyZero || !hasQuestions) {
            processedCount++;
            const generated = Array.from({ length: numQuestions }).map((_, i) => ({
              id: `q-bulk-${Date.now()}-${unit.id}-${i}`,
              question: `Generated question #${i+1} for ${unit.title} (${action.difficultyLevel})`,
              options: ['Option A (Correct)', 'Option B', 'Option C'],
              correctAnswer: 'Option A (Correct)'
            }));
            
            return {
              ...unit,
              levels: unit.levels.map(l => {
                if (l.id === targetLevelId) {
                  return {
                    ...l,
                    questions: [...(l.questions || []), ...generated]
                  };
                }
                return l;
              })
            };
          }
        }
        return unit;
      });
      
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `AI Bulk Generated questions for ${processedCount} topics in category "${action.categoryId}"`,
        timestamp: new Date().toISOString()
      };
      
      newState = {
        ...state,
        units: updatedUnits,
        auditLogs: [newLog, ...(state.auditLogs || [])]
      };
      break;
    }

    case 'AUTH_STATE_CHANGED': {
      newState = {
        ...state,
        isAuthenticated: !!action.user,
        authProfile: action.user ? {
          uid: action.user.uid,
          email: action.user.email,
          displayName: action.user.displayName,
          photoURL: action.user.photoURL,
        } : null,
        isAuthLoading: false,
      };
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch({ type: 'AUTH_STATE_CHANGED', user: firebaseUser });
    });
    return () => unsubscribe();
  }, []);

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

