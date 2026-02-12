import { useState, useEffect, useCallback } from 'react';
import type { Progress, QuizResult, Badge, User } from '@/types';

const STORAGE_KEY = 'csharp-academy-progress';
const USER_KEY = 'csharp-academy-user';

const defaultUser: User = {
  id: 'guest',
  name: 'ضيف',
  email: '',
  level: 1,
  xp: 0,
  totalXp: 0,
  badges: [],
  completedLessons: [],
  completedQuizzes: [],
  streak: 0,
  lastActive: new Date().toISOString()
};

const defaultProgress: Progress = {
  userId: 'guest',
  currentLesson: '',
  completedLessons: [],
  completedQuizzes: [],
  totalXp: 0,
  currentLevel: 1,
  streak: 0,
  lastActive: new Date().toISOString(),
  studyTime: 0
};

export function useProgress() {
  const [user, setUser] = useState<User>(defaultUser);
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [user, progress, isLoaded]);

  const calculateLevel = (xp: number): number => {
    // Level formula: level = floor(sqrt(xp / 100)) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  const getXpForNextLevel = (level: number): number => {
    return level * level * 100;
  };

  const addXp = useCallback((amount: number) => {
    setUser(prev => {
      const newTotalXp = prev.totalXp + amount;
      const newLevel = calculateLevel(newTotalXp);
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        // Trigger level up celebration
        window.dispatchEvent(new CustomEvent('levelUp', { 
          detail: { oldLevel: prev.level, newLevel } 
        }));
      }
      
      return {
        ...prev,
        xp: prev.xp + amount,
        totalXp: newTotalXp,
        level: newLevel
      };
    });

    setProgress(prev => ({
      ...prev,
      totalXp: prev.totalXp + amount,
      currentLevel: calculateLevel(prev.totalXp + amount)
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string, xpReward: number) => {
    if (!user.completedLessons.includes(lessonId)) {
      setUser(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }));

      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        currentLesson: lessonId
      }));

      addXp(xpReward);
      
      // Check for badges
      checkBadges();
    }
  }, [user.completedLessons, addXp]);

  const completeQuiz = useCallback((quizResult: QuizResult) => {
    if (!user.completedQuizzes.includes(quizResult.quizId)) {
      setUser(prev => ({
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizResult.quizId]
      }));

      setProgress(prev => ({
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizResult.quizId]
      }));

      addXp(quizResult.xpEarned);
      checkBadges();
    }
  }, [user.completedQuizzes, addXp]);

  const unlockBadge = useCallback((badge: Badge) => {
    if (!user.badges.includes(badge.id)) {
      setUser(prev => ({
        ...prev,
        badges: [...prev.badges, badge.id]
      }));

      // Trigger badge unlock celebration
      window.dispatchEvent(new CustomEvent('badgeUnlocked', { 
        detail: { badge } 
      }));

      addXp(badge.xpBonus);
    }
  }, [user.badges, addXp]);

  const checkBadges = useCallback(() => {
    const completedLessonsCount = user.completedLessons.length;

    // Check each badge condition
    if (completedLessonsCount >= 1 && !user.badges.includes('badge-1')) {
      import('@/data/lessons').then(({ badges }) => {
        const badge = badges.find(b => b.id === 'badge-1');
        if (badge) unlockBadge(badge);
      });
    }

    if (completedLessonsCount >= 5 && !user.badges.includes('badge-2')) {
      import('@/data/lessons').then(({ badges }) => {
        const badge = badges.find(b => b.id === 'badge-2');
        if (badge) unlockBadge(badge);
      });
    }

    if (completedLessonsCount >= 10 && !user.badges.includes('badge-3')) {
      import('@/data/lessons').then(({ badges }) => {
        const badge = badges.find(b => b.id === 'badge-3');
        if (badge) unlockBadge(badge);
      });
    }

    if (user.totalXp >= 1000 && !user.badges.includes('badge-8')) {
      import('@/data/lessons').then(({ badges }) => {
        const badge = badges.find(b => b.id === 'badge-8');
        if (badge) unlockBadge(badge);
      });
    }
  }, [user.completedLessons.length, user.badges, user.totalXp, unlockBadge]);

  const updateStreak = useCallback(() => {
    const lastActive = new Date(user.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      setUser(prev => ({
        ...prev,
        streak: prev.streak + 1,
        lastActive: today.toISOString()
      }));
    } else if (diffDays > 1) {
      // Streak broken
      setUser(prev => ({
        ...prev,
        streak: 1,
        lastActive: today.toISOString()
      }));
    }
  }, [user.lastActive]);

  const addStudyTime = useCallback((minutes: number) => {
    setProgress(prev => ({
      ...prev,
      studyTime: prev.studyTime + minutes
    }));
  }, []);

  const updateUserProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const resetProgress = useCallback(() => {
    setUser(defaultUser);
    setProgress(defaultProgress);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const xpForNextLevel = getXpForNextLevel(user.level);
  const currentLevelXp = getXpForNextLevel(user.level - 1);
  const xpProgress = ((user.totalXp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100;

  return {
    user,
    progress,
    isLoaded,
    level: user.level,
    xp: user.totalXp,
    xpForNextLevel,
    xpProgress: Math.min(100, Math.max(0, xpProgress)),
    streak: user.streak,
    completedLessons: user.completedLessons,
    completedQuizzes: user.completedQuizzes,
    badges: user.badges,
    addXp,
    completeLesson,
    completeQuiz,
    unlockBadge,
    updateStreak,
    addStudyTime,
    updateUserProfile,
    resetProgress
  };
}
