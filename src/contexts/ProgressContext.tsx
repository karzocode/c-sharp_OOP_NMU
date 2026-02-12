// ============================================================================
// Enhanced Progress Context
// Gamification system with XP scaling, certificates, and locked chapters
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { chapters, levels, badges } from '../data/chapters';

// ============================================================================
// TYPES
// ============================================================================

interface ChapterProgress {
  completed: boolean;
  quizScore: number | null;
  quizPassed: boolean;
  completionDate: string | null;
  attempts: number;
}

interface BadgeUnlock {
  badgeId: string;
  unlockedAt: string;
}

interface Certificate {
  chapterId: number;
  chapterTitle: { en: string; ar: string };
  score: number;
  date: string;
}

interface Progress {
  chapterProgress: Record<number, ChapterProgress>;
  totalXP: number;
  unlockedBadges: BadgeUnlock[];
  certificates: Certificate[];
  currentStreak: number;
  lastStudyDate: string | null;
  dailyLessonsCompleted: number;
  currentLevel: number;
}

interface ProgressContextType extends Progress {
  // Chapter operations
  completeLesson: (chapterId: number, xpReward: number) => void;
  saveQuizResult: (chapterId: number, score: number, passingScore: number) => boolean;
  isChapterCompleted: (chapterId: number) => boolean;
  isChapterUnlocked: (chapterId: number) => boolean;
  getChapterProgress: (chapterId: number) => ChapterProgress | undefined;
  
  // Badge operations
  unlockBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
  
  // Certificate operations
  addCertificate: (chapterId: number, score: number) => void;
  getCertificates: () => Certificate[];
  
  // XP and level operations
  getCurrentLevel: () => typeof levels[0];
  getXPToNextLevel: () => number;
  getProgressToNextLevel: () => number;
  
  // Stats
  getStats: () => {
    totalLessons: number;
    completedLessons: number;
    totalBadges: number;
    unlockedBadgesCount: number;
    currentStreak: number;
    longestStreak: number;
    averageQuizScore: number;
    totalCertificates: number;
  };
  
  // Reset
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'karzo-code-progress-v2';

const defaultProgress: Progress = {
  chapterProgress: {},
  totalXP: 0,
  unlockedBadges: [],
  certificates: [],
  currentStreak: 0,
  lastStudyDate: null,
  dailyLessonsCompleted: 0,
  currentLevel: 0,
};

// ============================================================================
// CONTEXT
// ============================================================================

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...defaultProgress, ...parsed };
        } catch {
          return defaultProgress;
        }
      }
    }
    return defaultProgress;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Update streak on mount
  useEffect(() => {
    const today = new Date().toDateString();
    if (progress.lastStudyDate && progress.lastStudyDate !== today) {
      const lastDate = new Date(progress.lastStudyDate);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        // Streak broken
        setProgress(prev => ({
          ...prev,
          currentStreak: 0,
          dailyLessonsCompleted: 0,
        }));
      }
    }
  }, []);

  // ============================================================================
  // CHAPTER OPERATIONS
  // ============================================================================

  const completeLesson = useCallback((chapterId: number, xpReward: number) => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const chapterProg = prev.chapterProgress[chapterId] || {
        completed: false,
        quizScore: null,
        quizPassed: false,
        completionDate: null,
        attempts: 0,
      };

      // Check if already completed
      if (chapterProg.completed) {
        return prev;
      }

      // Update streak
      let newStreak = prev.currentStreak;
      let dailyLessons = prev.dailyLessonsCompleted;
      
      if (prev.lastStudyDate === today) {
        dailyLessons++;
      } else {
        const lastDate = prev.lastStudyDate ? new Date(prev.lastStudyDate) : null;
        const currentDate = new Date(today);
        const diffDays = lastDate 
          ? Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
          : 999;
        
        if (diffDays === 1) {
          newStreak++;
        } else {
          newStreak = 1;
        }
        dailyLessons = 1;
      }

      // Check for badges
      const newBadges = [...prev.unlockedBadges];
      
      // First Steps badge
      if (!newBadges.find(b => b.badgeId === 'first-steps')) {
        newBadges.push({ badgeId: 'first-steps', unlockedAt: today });
      }

      // Quick Learner badge (3 lessons in one day)
      if (dailyLessons >= 3 && !newBadges.find(b => b.badgeId === 'quick-learner')) {
        newBadges.push({ badgeId: 'quick-learner', unlockedAt: today });
      }

      // OOP Expert badge (Chapter 13)
      if (chapterId === 13 && !newBadges.find(b => b.badgeId === 'oop-expert')) {
        newBadges.push({ badgeId: 'oop-expert', unlockedAt: today });
      }

      // Code Master badge (all chapters)
      const completedCount = Object.values(prev.chapterProgress).filter(p => p.completed).length + 1;
      if (completedCount >= 13 && !newBadges.find(b => b.badgeId === 'code-master')) {
        newBadges.push({ badgeId: 'code-master', unlockedAt: today });
      }

      return {
        ...prev,
        chapterProgress: {
          ...prev.chapterProgress,
          [chapterId]: {
            ...chapterProg,
            completed: true,
            completionDate: today,
          },
        },
        totalXP: prev.totalXP + xpReward,
        unlockedBadges: newBadges,
        currentStreak: newStreak,
        lastStudyDate: today,
        dailyLessonsCompleted: dailyLessons,
      };
    });
  }, []);

  const saveQuizResult = useCallback((chapterId: number, score: number, passingScore: number): boolean => {
    const passed = score >= passingScore;
    
    setProgress(prev => {
      const today = new Date().toDateString();
      const chapterProg = prev.chapterProgress[chapterId] || {
        completed: false,
        quizScore: null,
        quizPassed: false,
        completionDate: null,
        attempts: 0,
      };

      const newBadges = [...prev.unlockedBadges];
      
      // Quiz Champion badge (5 quizzes with 100%)
      const perfectQuizzes = Object.values(prev.chapterProgress).filter(
        p => p.quizScore === 100
      ).length + (score === 100 ? 1 : 0);
      
      if (perfectQuizzes >= 5 && !newBadges.find(b => b.badgeId === 'quiz-champion')) {
        newBadges.push({ badgeId: 'quiz-champion', unlockedAt: today });
      }

      // Perfect Score badge (100% on first attempt)
      if (score === 100 && chapterProg.attempts === 0 && 
          !newBadges.find(b => b.badgeId === 'perfect-score')) {
        newBadges.push({ badgeId: 'perfect-score', unlockedAt: today });
      }

      return {
        ...prev,
        chapterProgress: {
          ...prev.chapterProgress,
          [chapterId]: {
            ...chapterProg,
            quizScore: score,
            quizPassed: passed,
            attempts: chapterProg.attempts + 1,
          },
        },
        unlockedBadges: newBadges,
      };
    });

    return passed;
  }, []);

  const isChapterCompleted = useCallback((chapterId: number): boolean => {
    return progress.chapterProgress[chapterId]?.completed || false;
  }, [progress]);

  const isChapterUnlocked = useCallback((chapterId: number): boolean => {
    // First chapter is always unlocked
    if (chapterId === 1) return true;
    
    // Chapter is unlocked if previous chapter's quiz is passed
    const prevChapter = progress.chapterProgress[chapterId - 1];
    return prevChapter?.quizPassed || false;
  }, [progress]);

  const getChapterProgress = useCallback((chapterId: number): ChapterProgress | undefined => {
    return progress.chapterProgress[chapterId];
  }, [progress]);

  // ============================================================================
  // BADGE OPERATIONS
  // ============================================================================

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress(prev => {
      if (prev.unlockedBadges.find(b => b.badgeId === badgeId)) {
        return prev;
      }
      return {
        ...prev,
        unlockedBadges: [
          ...prev.unlockedBadges,
          { badgeId, unlockedAt: new Date().toDateString() },
        ],
      };
    });
  }, []);

  const hasBadge = useCallback((badgeId: string): boolean => {
    return progress.unlockedBadges.some(b => b.badgeId === badgeId);
  }, [progress]);

  // ============================================================================
  // CERTIFICATE OPERATIONS
  // ============================================================================

  const addCertificate = useCallback((chapterId: number, score: number) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    setProgress(prev => {
      const existingCert = prev.certificates.find(c => c.chapterId === chapterId);
      if (existingCert) {
        // Update if new score is better
        if (score > existingCert.score) {
          return {
            ...prev,
            certificates: prev.certificates.map(c =>
              c.chapterId === chapterId
                ? { ...c, score, date: new Date().toDateString() }
                : c
            ),
          };
        }
        return prev;
      }

      return {
        ...prev,
        certificates: [
          ...prev.certificates,
          {
            chapterId,
            chapterTitle: chapter.title,
            score,
            date: new Date().toDateString(),
          },
        ],
      };
    });
  }, []);

  const getCertificates = useCallback((): Certificate[] => {
    return progress.certificates;
  }, [progress]);

  // ============================================================================
  // XP AND LEVEL OPERATIONS
  // ============================================================================

  const getCurrentLevel = useCallback(() => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (progress.totalXP >= levels[i].minXP) {
        return levels[i];
      }
    }
    return levels[0];
  }, [progress.totalXP]);

  const getXPToNextLevel = useCallback(() => {
    const currentLevelIndex = levels.findIndex(l => progress.totalXP >= l.minXP && progress.totalXP <= l.maxXP);
    if (currentLevelIndex === -1 || currentLevelIndex === levels.length - 1) {
      return 0;
    }
    return levels[currentLevelIndex + 1].minXP - progress.totalXP;
  }, [progress.totalXP]);

  const getProgressToNextLevel = useCallback(() => {
    const currentLevel = getCurrentLevel();
    if (currentLevel.maxXP === 999999) return 100;
    
    const range = currentLevel.maxXP - currentLevel.minXP;
    const current = progress.totalXP - currentLevel.minXP;
    return Math.min((current / range) * 100, 100);
  }, [progress.totalXP, getCurrentLevel]);

  // ============================================================================
  // STATS
  // ============================================================================

  const getStats = useCallback(() => {
    const chapterProgs = Object.values(progress.chapterProgress);
    const completedLessons = chapterProgs.filter(p => p.completed).length;
    const quizScores = chapterProgs.filter(p => p.quizScore !== null).map(p => p.quizScore!);
    
    return {
      totalLessons: chapters.length,
      completedLessons,
      totalBadges: badges.length,
      unlockedBadgesCount: progress.unlockedBadges.length,
      currentStreak: progress.currentStreak,
      longestStreak: progress.currentStreak, // Could track separately
      averageQuizScore: quizScores.length > 0
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
        : 0,
      totalCertificates: progress.certificates.length,
    };
  }, [progress]);

  // ============================================================================
  // RESET AND IMPORT/EXPORT
  // ============================================================================

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const exportProgress = useCallback((): string => {
    return JSON.stringify(progress);
  }, [progress]);

  const importProgress = useCallback((data: string): boolean => {
    try {
      const parsed = JSON.parse(data);
      setProgress({ ...defaultProgress, ...parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <ProgressContext.Provider
      value={{
        ...progress,
        completeLesson,
        saveQuizResult,
        isChapterCompleted,
        isChapterUnlocked,
        getChapterProgress,
        unlockBadge,
        hasBadge,
        addCertificate,
        getCertificates,
        getCurrentLevel,
        getXPToNextLevel,
        getProgressToNextLevel,
        getStats,
        resetProgress,
        exportProgress,
        importProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

export default ProgressProvider;
