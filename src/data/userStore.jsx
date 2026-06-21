/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initialUser, studyCategories, units } from './mockData';
import { auth } from './firebase';
import { getMockQuestions } from './mockGenerator';

const initialMockUsers = [
  {
    uid: 'admin-1',
    name: 'Alex (Admin)',
    email: 'alex@gogram.com',
    joined: '2026-05-10',
    authLevel: 'admin',
    status: 'active',
    hearts: 'infinity',
    usedPromoCodes: ['INFINITY'],
    suspendedPromoCodes: [],
    progress: {
      'grammar': 12,
      'vocabulary': 8,
      'reading': 0,
    }
  },
  {
    uid: 'user-2',
    name: 'Sarah Connor',
    email: 'sarah@terminator.com',
    joined: '2026-06-01',
    authLevel: 'subscribed',
    status: 'active',
    hearts: 10,
    usedPromoCodes: ['WELCOME100'],
    suspendedPromoCodes: [],
    progress: {
      'grammar': 20,
      'vocabulary': 15,
      'reading': 5,
    }
  },
  {
    uid: 'user-3',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    joined: '2026-06-12',
    authLevel: 'free',
    status: 'active',
    hearts: 3,
    usedPromoCodes: ['WELCOME100'],
    suspendedPromoCodes: [],
    progress: {
      'grammar': 3,
      'vocabulary': 0,
      'reading': 0,
    }
  },
  {
    uid: 'user-4',
    name: 'Spammer Bot',
    email: 'bot@spammer.org',
    joined: '2026-04-15',
    authLevel: 'free',
    status: 'blocked',
    hearts: 0,
    usedPromoCodes: [],
    suspendedPromoCodes: [],
    progress: {
      'grammar': 0,
      'vocabulary': 0,
      'reading': 0,
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

export function cleanQuestion(q) {
  if (!q) return q;
  let cleaned = q.trim();
  if (cleaned.toLowerCase().startsWith('complete:')) {
    cleaned = cleaned.substring('complete:'.length).trim();
  }
  const match = cleaned.match(/^['"](.*?)['"](\s*\(.*?\))?$/);
  if (match) {
    cleaned = match[1] + (match[2] ? match[2] : '');
  }
  return cleaned;
}

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Clean up existing questions if they have the 'Complete:' prefix
      if (parsed.units) {
        parsed.units = parsed.units.map(unit => ({
          ...unit,
          levels: unit.levels.map(level => ({
            ...level,
            questions: (level.questions || []).map(q => ({
              ...q,
              question: cleanQuestion(q.question)
            }))
          }))
        }));
      }

      // One-time force wipe of initial questions to allow generating them fresh
      if (!parsed.hasWipedQuestionsV2) {
        if (parsed.units) {
          parsed.units = parsed.units.map(unit => ({
            ...unit,
            levels: unit.levels.map(level => ({
              ...level,
              questions: []
            }))
          }));
        }
        parsed.completedLessons = []; // Reset progress since there are no questions to complete
        parsed.hasWipedQuestionsV2 = true;
      }

      // Migration to rename 'grammar-foundation' to 'grammar' and update topics to match screenshot
      const hasOldCategory = parsed.categories && parsed.categories.some(c => c.id === 'grammar-foundation');
      const hasOldUnits = parsed.units && parsed.units.some(u => u.category === 'grammar-foundation');
      const isNewCategoryMissing = parsed.categories && !parsed.categories.some(c => c.id === 'grammar');
      if (hasOldCategory || hasOldUnits || isNewCategoryMissing) {
        parsed.categories = studyCategories;
        parsed.units = units;
        parsed.completedLessons = [];
        if (parsed.mockUsers) {
          parsed.mockUsers = parsed.mockUsers.map(u => {
            const p = { ...(u.progress || {}) };
            delete p['grammar-foundation'];
            p['grammar'] = 0;
            return { ...u, progress: p };
          });
        }
      }

      // Auto-patch loaded localStorage data to ensure question 'a1' has 4 choices as mockData was updated
      if (parsed.units && parsed.units[0]?.levels[0]?.questions[0]) {
        const firstQ = parsed.units[0].levels[0].questions[0];
        if (firstQ.id === 'a1' && firstQ.options && firstQ.options.length < 4) {
          firstQ.options = ['a', 'an', 'the', 'none of these'];
        }
      }

      // Ensure default hearts properties exist
      if (parsed.hearts === undefined) parsed.hearts = 10;
      if (parsed.maxHearts === undefined) parsed.maxHearts = 10;
      if (!parsed.usedPromoCodes) parsed.usedPromoCodes = [];
      if (!parsed.lastHeartRefillTime) parsed.lastHeartRefillTime = Date.now();
      if (!parsed.promoCodes) {
        parsed.promoCodes = [
          { code: 'INFINITY', type: 'infinity', reward: 'infinity', description: 'Infinite hearts promo', usedBy: ['admin-1'] },
          { code: 'WELCOME100', type: 'hearts', reward: 100, description: 'Get 100 hearts', usedBy: ['user-2', 'user-3'] },
          { code: 'REF-ADMIN', type: 'infinity', reward: 'infinity', description: 'Admin referral code', usedBy: [] }
        ];
      } else {
        parsed.promoCodes = parsed.promoCodes.map(c => {
          if (!c.usedBy) {
            if (c.code === 'INFINITY') return { ...c, usedBy: ['admin-1'] };
            if (c.code === 'WELCOME100') return { ...c, usedBy: ['user-2', 'user-3'] };
            return { ...c, usedBy: [] };
          }
          return c;
        });
      }

      if (parsed.mockUsers) {
        const activePromoCodes = (parsed.promoCodes || []).map(c => c.code.toUpperCase());
        parsed.mockUsers = parsed.mockUsers.map(u => {
          if (!u.usedPromoCodes) u.usedPromoCodes = [];
          if (!u.suspendedPromoCodes) u.suspendedPromoCodes = [];

          if (u.uid === 'admin-1' && u.usedPromoCodes.length === 0 && activePromoCodes.includes('INFINITY')) {
            u.usedPromoCodes = ['INFINITY'];
          }
          if (u.uid === 'user-2' && u.usedPromoCodes.length === 0 && activePromoCodes.includes('WELCOME100')) {
            u.usedPromoCodes = ['WELCOME100'];
          }
          if (u.uid === 'user-3' && u.usedPromoCodes.length === 0 && activePromoCodes.includes('WELCOME100')) {
            u.usedPromoCodes = ['WELCOME100'];
          }

          // Cleanup non-existent codes from user histories (excluding referral codes)
          u.usedPromoCodes = u.usedPromoCodes.filter(c => activePromoCodes.includes(c.toUpperCase()) || c.toUpperCase().startsWith('REF-'));
          u.suspendedPromoCodes = u.suspendedPromoCodes.filter(c => activePromoCodes.includes(c.toUpperCase()) || c.toUpperCase().startsWith('REF-'));

          return u;
        });
      }

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
    hearts: 'infinity',
    maxHearts: 10,
    usedPromoCodes: ['INFINITY'],
    lastHeartRefillTime: Date.now(),
    promoCodes: [
      { code: 'INFINITY', type: 'infinity', reward: 'infinity', description: 'Infinite hearts promo', usedBy: ['admin-1'] },
      { code: 'WELCOME100', type: 'hearts', reward: 100, description: 'Get 100 hearts', usedBy: ['user-2', 'user-3'] },
      { code: 'REF-ADMIN', type: 'infinity', reward: 'infinity', description: 'Admin referral code', usedBy: [] }
    ],
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
    // eslint-disable-next-line no-unused-vars
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
      if (state.hearts === 'infinity') {
        newState = state;
        break;
      }
      const currentHearts = typeof state.hearts === 'number' ? state.hearts : 10;
      const nextHearts = Math.max(0, currentHearts - 1);
      const wasFull = currentHearts >= 10;
      const nextRefillTime = wasFull ? Date.now() : state.lastHeartRefillTime;
      newState = {
        ...state,
        hearts: nextHearts,
        lastHeartRefillTime: nextRefillTime,
      };
      break;
    }

    case 'RESET_HEARTS': {
      newState = {
        ...state,
        hearts: 10,
        lastHeartRefillTime: Date.now(),
      };
      break;
    }
  
    case 'CHECK_HEARTS_REFILL': {
      let tempState = state;
      if (state.promoExpiresAt && Date.now() > state.promoExpiresAt) {
        const restoredHearts = state.heartsBeforePromo !== undefined ? state.heartsBeforePromo : 10;
        tempState = {
          ...state,
          hearts: restoredHearts,
          promoExpiresAt: null,
          promoCodeActive: null,
          heartsBeforePromo: null,
          promoExpiredMessage: `Your promotion '${state.promoCodeActive}' has expired! Hearts reverted back to ${restoredHearts}.`
        };
      }

      if (tempState.hearts === 'infinity' || tempState.hearts >= 10) {
        newState = {
          ...tempState,
          lastHeartRefillTime: Date.now()
        };
        break;
      }
      const now = Date.now();
      const elapsedMs = now - (tempState.lastHeartRefillTime || now);
      const ONE_HOUR = 3600000;
      if (elapsedMs >= ONE_HOUR) {
        const heartsToAdd = Math.floor(elapsedMs / ONE_HOUR);
        const newHeartsCount = Math.min(10, tempState.hearts + heartsToAdd);
        const remainingMs = elapsedMs % ONE_HOUR;
        newState = {
          ...tempState,
          hearts: newHeartsCount,
          lastHeartRefillTime: now - remainingMs
        };
      } else {
        newState = tempState;
      }
      break;
    }

    case 'APPLY_PROMO_CODE': {
      const codeUpper = action.code.trim().toUpperCase();
      if (state.usedPromoCodes?.includes(codeUpper)) {
        action.onError && action.onError('You have already used this promo code.');
        newState = state;
        break;
      }
      const matchedPromo = state.promoCodes?.find(c => c.code.toUpperCase() === codeUpper);
      let isReferral = false;
      if (!matchedPromo) {
        const match = codeUpper.match(/^REF-(.+)$/);
        if (match) {
          const refName = match[1].toLowerCase();
          const referrer = state.mockUsers?.find(u => u.name.toLowerCase().replace(/\s+/g, '') === refName || u.uid.toLowerCase() === refName);
          if (referrer) {
            isReferral = true;
          }
        }
      }
      if (!matchedPromo && !isReferral) {
        action.onError && action.onError('Invalid promo or referral code.');
        newState = state;
        break;
      }

      // Check code expiry
      if (matchedPromo && matchedPromo.expiresAt) {
        const now = Date.now();
        const expiryTime = new Date(matchedPromo.expiresAt).getTime() + 86400000;
        if (now > expiryTime) {
          action.onError && action.onError('This promo code has expired.');
          newState = state;
          break;
        }
      }

      // Check max redemptions limit
      if (matchedPromo && matchedPromo.maxRedemptions) {
        const redemptionsCount = matchedPromo.usedBy ? matchedPromo.usedBy.length : 0;
        if (redemptionsCount >= matchedPromo.maxRedemptions) {
          action.onError && action.onError('This promo code has reached its maximum redemptions limit.');
          newState = state;
          break;
        }
      }

      let rewardHearts = 10;
      let rewardType = 'hearts';
      if (matchedPromo) {
        rewardType = matchedPromo.type;
        rewardHearts = matchedPromo.reward;
      } else if (isReferral) {
        rewardType = 'hearts';
        rewardHearts = 10;
      }

      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;

      if (rewardType === 'infinity') {
        nextHearts = 'infinity';
        nextPromoCodeActive = codeUpper;
        if (matchedPromo && matchedPromo.infinityDuration) {
          nextPromoExpiresAt = Date.now() + matchedPromo.infinityDuration;
        } else {
          nextPromoExpiresAt = null; // No expiration
        }
        // Save current numeric hearts if we aren't already in infinity
        if (state.hearts !== 'infinity') {
          nextHeartsBeforePromo = typeof state.hearts === 'number' ? state.hearts : 10;
        }
      } else {
        const amt = Number(rewardHearts);
        if (state.hearts === 'infinity') {
          // If already in infinity, add to heartsBeforePromo
          const currentVal = typeof state.heartsBeforePromo === 'number' ? state.heartsBeforePromo : 10;
          nextHeartsBeforePromo = currentVal + amt;
        } else {
          const currentVal = typeof state.hearts === 'number' ? state.hearts : 10;
          nextHearts = currentVal + amt;
        }
      }

      // Record this user's claim in the promo codes list
      const userId = state.authProfile?.uid || 'admin-1';
      const updatedPromoCodes = (state.promoCodes || []).map(c => {
        if (c.code.toUpperCase() === codeUpper) {
          const usedByList = c.usedBy || [];
          if (!usedByList.includes(userId)) {
            return {
              ...c,
              usedBy: [...usedByList, userId]
            };
          }
        }
        return c;
      });

      const updatedUsers = (state.mockUsers || []).map(u => {
        if (u.uid === userId) {
          return {
            ...u,
            hearts: nextHearts,
            promoExpiresAt: nextPromoExpiresAt,
            promoCodeActive: nextPromoCodeActive,
            heartsBeforePromo: nextHeartsBeforePromo,
            usedPromoCodes: [...new Set([...(u.usedPromoCodes || []), codeUpper])]
          };
        }
        return u;
      });

      newState = {
        ...state,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo,
        promoCodes: updatedPromoCodes,
        usedPromoCodes: [...new Set([...(state.usedPromoCodes || []), codeUpper])],
        mockUsers: updatedUsers
      };

      action.onSuccess && action.onSuccess({
        type: rewardType,
        reward: rewardHearts,
        message: rewardType === 'infinity' 
          ? (nextPromoExpiresAt 
              ? `Premium active! You now have infinite hearts until ${new Date(nextPromoExpiresAt).toLocaleString()}.` 
              : 'Premium active! You now have infinite hearts.')
          : `Successfully added ${rewardHearts} hearts!`
      });
      break;
    }

    case 'UPDATE_USER_HEARTS': {
      const { userId, heartsValue } = action;
      const updatedUsers = state.mockUsers.map((u) => {
        if (u.uid === userId) {
          const isSettingInfinity = heartsValue === 'infinity';
          return {
            ...u,
            hearts: heartsValue,
            ...(isSettingInfinity ? {} : {
              promoExpiresAt: null,
              promoCodeActive: null,
              heartsBeforePromo: null
            })
          };
        }
        return u;
      });
      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;

      if (userId === 'admin-1') {
        nextHearts = heartsValue;
        if (heartsValue !== 'infinity') {
          nextPromoExpiresAt = null;
          nextPromoCodeActive = null;
          nextHeartsBeforePromo = null;
        }
      }
      newState = {
        ...state,
        mockUsers: updatedUsers,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo
      };
      break;
    }

    case 'UPDATE_USER_PROGRESS_LEVEL': {
      const { userId, categoryId, levelValue } = action;
      const progressNodes = (levelValue - 1) * 5;
      const updatedUsers = state.mockUsers.map((u) => {
        if (u.uid === userId) {
          return {
            ...u,
            progress: {
              ...(u.progress || {}),
              [categoryId]: progressNodes,
            },
          };
        }
        return u;
      });
      let nextCompletedLessons = state.completedLessons;
      if (userId === 'admin-1') {
        const catUnits = state.units.filter(u => u.category === categoryId);
        const targetLessons = [];
        let nodesCount = 0;
        catUnits.forEach(unit => {
          unit.levels.forEach(lvl => {
            if (nodesCount < progressNodes) {
              targetLessons.push(`${unit.id}-${lvl.id}`);
              nodesCount++;
            }
          });
        });
        const unrelatedLessons = state.completedLessons.filter(key => {
          const [unitId] = key.split('-');
          const matchedUnit = state.units.find(u => Number(u.id) === Number(unitId));
          return matchedUnit?.category !== categoryId;
        });
        nextCompletedLessons = [...unrelatedLessons, ...targetLessons];
      }
      newState = {
        ...state,
        mockUsers: updatedUsers,
        completedLessons: nextCompletedLessons,
      };
      break;
    }

    case 'ADD_PROMO_CODE': {
      const { code, promoType, reward, description, expiresAt, infinityDuration, maxRedemptions } = action;
      newState = {
        ...state,
        promoCodes: [
          ...(state.promoCodes || []),
          { 
            code: code.toUpperCase(), 
            type: promoType, 
            reward, 
            description, 
            expiresAt, 
            infinityDuration, 
            maxRedemptions: maxRedemptions || null,
            usedBy: [] 
          }
        ]
      };
      break;
    }

    case 'DELETE_PROMO_CODE': {
      const { code } = action;
      const codeUpper = code.toUpperCase();

      const updatedUsers = (state.mockUsers || []).map(u => {
        const isActive = u.promoCodeActive === codeUpper;
        
        let nextUsed = (u.usedPromoCodes || []).filter(c => c !== codeUpper);
        let nextSuspended = (u.suspendedPromoCodes || []).filter(c => c !== codeUpper);
        
        let nextHearts = u.hearts;
        let nextPromoExpiresAt = u.promoExpiresAt;
        let nextPromoCodeActive = u.promoCodeActive;
        let nextHeartsBeforePromo = u.heartsBeforePromo;
        let nextMessage = u.promoExpiredMessage || null;

        if (isActive) {
          nextHearts = typeof u.heartsBeforePromo === 'number' ? u.heartsBeforePromo : 10;
          nextPromoExpiresAt = null;
          nextPromoCodeActive = null;
          nextHeartsBeforePromo = null;
          nextMessage = `Your promotion '${codeUpper}' has been disabled by the administrator and is no longer effective.`;
        }

        return {
          ...u,
          usedPromoCodes: nextUsed,
          suspendedPromoCodes: nextSuspended,
          hearts: nextHearts,
          promoExpiresAt: nextPromoExpiresAt,
          promoCodeActive: nextPromoCodeActive,
          heartsBeforePromo: nextHeartsBeforePromo,
          promoExpiredMessage: nextMessage
        };
      });

      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;
      let nextMessage = state.promoExpiredMessage || null;
      let nextUsedPromoCodes = state.usedPromoCodes || [];

      if (state.promoCodeActive === codeUpper) {
        nextHearts = typeof state.heartsBeforePromo === 'number' ? state.heartsBeforePromo : 10;
        nextPromoExpiresAt = null;
        nextPromoCodeActive = null;
        nextHeartsBeforePromo = null;
        nextMessage = `Your promotion '${codeUpper}' has been disabled by the administrator and is no longer effective.`;
      }
      nextUsedPromoCodes = nextUsedPromoCodes.filter(c => c !== codeUpper);

      newState = {
        ...state,
        promoCodes: (state.promoCodes || []).filter(c => c.code.toUpperCase() !== codeUpper),
        mockUsers: updatedUsers,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo,
        promoExpiredMessage: nextMessage,
        usedPromoCodes: nextUsedPromoCodes
      };
      break;
    }

    case 'EDIT_PROMO_CODE': {
      const { originalCode, updatedPromo } = action;
      newState = {
        ...state,
        promoCodes: (state.promoCodes || []).map(c => {
          if (c.code === originalCode) {
            return {
              ...c,
              ...updatedPromo,
              code: updatedPromo.code ? updatedPromo.code.toUpperCase() : c.code
            };
          }
          return c;
        })
      };
      break;
    }

    case 'REMOVE_USER_PROMO_CODE': {
      const { userId, code } = action;
      const codeUpper = code.toUpperCase();
      
      const updatedUsers = (state.mockUsers || []).map(u => {
        if (u.uid === userId) {
          const nextUsed = (u.usedPromoCodes || []).filter(c => c !== codeUpper);
          const nextSuspended = (u.suspendedPromoCodes || []).filter(c => c !== codeUpper);
          
          let nextHearts = u.hearts;
          let nextPromoExpiresAt = u.promoExpiresAt;
          let nextPromoCodeActive = u.promoCodeActive;
          let nextHeartsBeforePromo = u.heartsBeforePromo;

          const matchedPromo = state.promoCodes?.find(p => p.code.toUpperCase() === codeUpper);
          if (matchedPromo && matchedPromo.type === 'infinity') {
            nextHearts = typeof u.heartsBeforePromo === 'number' ? u.heartsBeforePromo : 10;
            nextPromoExpiresAt = null;
            nextPromoCodeActive = null;
            nextHeartsBeforePromo = null;
          }

          return {
            ...u,
            usedPromoCodes: nextUsed,
            suspendedPromoCodes: nextSuspended,
            hearts: nextHearts,
            promoExpiresAt: nextPromoExpiresAt,
            promoCodeActive: nextPromoCodeActive,
            heartsBeforePromo: nextHeartsBeforePromo
          };
        }
        return u;
      });

      const updatedPromoCodes = (state.promoCodes || []).map(p => {
        if (p.code.toUpperCase() === codeUpper) {
          return {
            ...p,
            usedBy: (p.usedBy || []).filter(id => id !== userId)
          };
        }
        return p;
      });

      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;
      let nextUsedPromoCodes = state.usedPromoCodes || [];

      if (userId === 'admin-1' || userId === state.authProfile?.uid) {
        const matchedPromo = state.promoCodes?.find(p => p.code.toUpperCase() === codeUpper);
        if (matchedPromo && matchedPromo.type === 'infinity') {
          nextHearts = typeof state.heartsBeforePromo === 'number' ? state.heartsBeforePromo : 10;
          nextPromoExpiresAt = null;
          nextPromoCodeActive = null;
          nextHeartsBeforePromo = null;
        }
        nextUsedPromoCodes = nextUsedPromoCodes.filter(c => c !== codeUpper);
      }

      newState = {
        ...state,
        mockUsers: updatedUsers,
        promoCodes: updatedPromoCodes,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo,
        usedPromoCodes: nextUsedPromoCodes
      };
      break;
    }

    case 'SUSPEND_USER_PROMO_CODE': {
      const { userId, code } = action;
      const codeUpper = code.toUpperCase();
      
      const updatedUsers = (state.mockUsers || []).map(u => {
        if (u.uid === userId) {
          const nextSuspended = [...new Set([...(u.suspendedPromoCodes || []), codeUpper])];
          
          let nextHearts = u.hearts;
          let nextPromoExpiresAt = u.promoExpiresAt;
          let nextPromoCodeActive = u.promoCodeActive;
          let nextHeartsBeforePromo = u.heartsBeforePromo;

          const matchedPromo = state.promoCodes?.find(p => p.code.toUpperCase() === codeUpper);
          if (matchedPromo && matchedPromo.type === 'infinity') {
            nextHearts = typeof u.heartsBeforePromo === 'number' ? u.heartsBeforePromo : 10;
            nextPromoExpiresAt = null;
            nextPromoCodeActive = null;
            nextHeartsBeforePromo = null;
          }

          return {
            ...u,
            suspendedPromoCodes: nextSuspended,
            hearts: nextHearts,
            promoExpiresAt: nextPromoExpiresAt,
            promoCodeActive: nextPromoCodeActive,
            heartsBeforePromo: nextHeartsBeforePromo
          };
        }
        return u;
      });

      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;

      if (userId === 'admin-1' || userId === state.authProfile?.uid) {
        const matchedPromo = state.promoCodes?.find(p => p.code.toUpperCase() === codeUpper);
        if (matchedPromo && matchedPromo.type === 'infinity') {
          nextHearts = typeof state.heartsBeforePromo === 'number' ? state.heartsBeforePromo : 10;
          nextPromoExpiresAt = null;
          nextPromoCodeActive = null;
          nextHeartsBeforePromo = null;
        }
      }

      newState = {
        ...state,
        mockUsers: updatedUsers,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo
      };
      break;
    }

    case 'UNSUSPEND_USER_PROMO_CODE': {
      const { userId, code } = action;
      const codeUpper = code.toUpperCase();
      
      const matchedPromo = state.promoCodes?.find(p => p.code.toUpperCase() === codeUpper);
      
      const updatedUsers = (state.mockUsers || []).map(u => {
        if (u.uid === userId) {
          const nextSuspended = (u.suspendedPromoCodes || []).filter(c => c !== codeUpper);
          
          let nextHearts = u.hearts;
          let nextPromoExpiresAt = u.promoExpiresAt;
          let nextPromoCodeActive = u.promoCodeActive;
          let nextHeartsBeforePromo = u.heartsBeforePromo;

          if (matchedPromo && matchedPromo.type === 'infinity') {
            nextHearts = 'infinity';
            nextPromoCodeActive = codeUpper;
            nextPromoExpiresAt = matchedPromo.infinityDuration ? Date.now() + matchedPromo.infinityDuration : null;
            if (u.hearts !== 'infinity') {
              nextHeartsBeforePromo = typeof u.hearts === 'number' ? u.hearts : 10;
            }
          }

          return {
            ...u,
            suspendedPromoCodes: nextSuspended,
            hearts: nextHearts,
            promoExpiresAt: nextPromoExpiresAt,
            promoCodeActive: nextPromoCodeActive,
            heartsBeforePromo: nextHeartsBeforePromo
          };
        }
        return u;
      });

      let nextHearts = state.hearts;
      let nextPromoExpiresAt = state.promoExpiresAt;
      let nextPromoCodeActive = state.promoCodeActive;
      let nextHeartsBeforePromo = state.heartsBeforePromo;

      if (userId === 'admin-1' || userId === state.authProfile?.uid) {
        if (matchedPromo && matchedPromo.type === 'infinity') {
          nextHearts = 'infinity';
          nextPromoCodeActive = codeUpper;
          nextPromoExpiresAt = matchedPromo.infinityDuration ? Date.now() + matchedPromo.infinityDuration : null;
          if (state.hearts !== 'infinity') {
            nextHeartsBeforePromo = typeof state.hearts === 'number' ? state.hearts : 10;
          }
        }
      }

      newState = {
        ...state,
        mockUsers: updatedUsers,
        hearts: nextHearts,
        promoExpiresAt: nextPromoExpiresAt,
        promoCodeActive: nextPromoCodeActive,
        heartsBeforePromo: nextHeartsBeforePromo
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

    case 'CLEAR_PROMO_EXPIRED_MESSAGE': {
      newState = {
        ...state,
        promoExpiredMessage: null,
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
      const unitsToDelete = state.units.filter((unit) => unit.category === action.categoryId);
      const unitIdsToDelete = unitsToDelete.map((u) => Number(u.id));
      
      const newCompletedLessons = state.completedLessons.filter((key) => {
        const [unitId] = key.split('-');
        return !unitIdsToDelete.includes(Number(unitId));
      });

      const updatedUsers = state.mockUsers.map(u => {
        const progressCopy = { ...(u.progress || {}) };
        delete progressCopy[action.categoryId];
        return {
          ...u,
          progress: progressCopy
        };
      });

      newState = {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.categoryId),
        units: state.units.filter((unit) => unit.category !== action.categoryId),
        mockUsers: updatedUsers,
        completedLessons: newCompletedLessons,
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
          options: ['Correct Choice', 'Incorrect Choice A', 'Incorrect Choice B', 'Incorrect Choice C'],
          correctAnswer: 'Correct Choice',
        },
        {
          id: `q-${Date.now()}-2`,
          question: `Complete the sentence appropriately for this node.`,
          options: ['Answer X', 'Answer Y', 'Answer Z', 'Answer W'],
          correctAnswer: 'Answer X',
        },
        {
          id: `q-${Date.now()}-3`,
          question: `Select the most suitable synonym.`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 'Option 2',
        },
        {
          id: `q-${Date.now()}-4`,
          question: `True or False: This grammar construct is valid.`,
          options: ['True', 'False', 'Not Enough Info', 'N/A'],
          correctAnswer: 'True',
        },
        {
          id: `q-${Date.now()}-5`,
          question: `Choose the correct form of the word.`,
          options: ['Form A', 'Form B', 'Form C', 'Form D'],
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
      const newCompletedLessons = state.completedLessons.filter((key) => {
        const [unitId] = key.split('-');
        return Number(unitId) !== Number(action.unitId);
      });
      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `Deleted topic "${targetUnit?.title || action.unitId}"`,
        timestamp: new Date().toISOString()
      };
      newState = {
        ...state,
        units: state.units.filter(u => Number(u.id) !== Number(action.unitId)),
        completedLessons: newCompletedLessons,
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
      const { categoryId, topicId, levelId, questionsPerTopic = 10, onlyZero = true } = action;
      
      const levelsToProcess = levelId === 'all'
        ? ['easy', 'medium1', 'medium2', 'hard1', 'hard2']
        : [levelId];

      let processedCount = 0;

      // Track all unique question texts currently under the same category to prevent duplicates
      const existingQuestionTexts = new Set();
      state.units.forEach(unit => {
        if (unit.category === categoryId) {
          unit.levels.forEach(lvl => {
            if (lvl.questions) {
              lvl.questions.forEach(q => {
                existingQuestionTexts.add(q.question.trim().toLowerCase());
              });
            }
          });
        }
      });
      
      const updatedUnits = state.units.map(unit => {
        if (unit.category === categoryId) {
          const isTopicMatch = topicId === 'all' || Number(unit.id) === Number(topicId);
          if (isTopicMatch) {
            const updatedLevels = unit.levels.map(l => {
              if (levelsToProcess.includes(l.id)) {
                const hasQuestions = (l.questions?.length || 0) > 0;
                if (!onlyZero || !hasQuestions) {
                  processedCount++;
                  
                  const sourceQuestions = getMockQuestions(categoryId, unit.id, l.id, unit.title);
                  const generated = [];
                  let itemIndex = 0;

                  while (generated.length < questionsPerTopic && itemIndex < sourceQuestions.length) {
                    const qObj = sourceQuestions[itemIndex];
                    const cleanedQ = cleanQuestion(qObj.question);
                    const normalizedQ = cleanedQ.trim().toLowerCase();

                    if (!existingQuestionTexts.has(normalizedQ)) {
                      existingQuestionTexts.add(normalizedQ);
                      generated.push({
                        id: `q-bulk-${Date.now()}-${unit.id}-${l.id}-${generated.length}`,
                        question: cleanedQ,
                        options: qObj.options,
                        correctAnswer: qObj.correctAnswer,
                        explanation: qObj.explanation
                      });
                    }
                    itemIndex++;
                  }

                  let qIndex = 1;
                  while (generated.length < questionsPerTopic) {
                    const levelLabels = {
                      easy: 'Easy (O-NET M.3)',
                      medium1: 'Medium 1 (O-NET M.6)',
                      medium2: 'Medium 2 (O-NET M.6 / PAT)',
                      hard1: 'Hard 1 (PAT 1/2, A-Level)',
                      hard2: 'Hard 2 (IELTS/TOEFL)'
                    };
                    const labelStr = levelLabels[l.id] || l.id;
                    const qText = `[AI Mock] Question #${qIndex} on "${unit.title}" for ${labelStr} level.`;
                    const normalizedQ = qText.trim().toLowerCase();

                    if (!existingQuestionTexts.has(normalizedQ)) {
                      existingQuestionTexts.add(normalizedQ);
                      generated.push({
                        id: `q-bulk-${Date.now()}-${unit.id}-${l.id}-${generated.length}`,
                        question: qText,
                        options: [
                          `Correct option for ${unit.title} [${l.id}] Q${qIndex}`,
                          `Incorrect option A for ${unit.title} [${l.id}] Q${qIndex}`,
                          `Incorrect option B for ${unit.title} [${l.id}] Q${qIndex}`,
                          `Incorrect option C for ${unit.title} [${l.id}] Q${qIndex}`
                        ],
                        correctAnswer: `Correct option for ${unit.title} [${l.id}] Q${qIndex}`,
                        explanation: `ENGLISH\nThis is a mock explanation for question #${qIndex} on "${unit.title}" at the ${l.id} difficulty level.\n\nTHAI\nนี่คือคำอธิบายจำลองสำหรับข้อที่ #${qIndex} เรื่อง "${unit.title}" ในระดับความยาก ${l.id}`
                      });
                    }
                    qIndex++;
                    if (qIndex > 1000) break;
                  }

                  return {
                    ...l,
                    questions: generated
                  };
                }
              }
              return l;
            });

            return {
              ...unit,
              levels: updatedLevels
            };
          }
        }
        return unit;
      });

      const newLog = {
        id: `log-${Date.now()}`,
        adminName: 'Kanokpol Kulsri',
        action: `AI Bulk Generated questions for category "${categoryId}", topic "${topicId}", level "${levelId}" (Processed ${processedCount} levels)`,
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
    // Initial check on load
    dispatch({ type: 'CHECK_HEARTS_REFILL' });

    // Tick every 10 seconds to update countdowns and refill hearts in real time
    const interval = setInterval(() => {
      dispatch({ type: 'CHECK_HEARTS_REFILL' });
    }, 10000);

    return () => clearInterval(interval);
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

