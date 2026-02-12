import { useState, useEffect, useCallback } from 'react';
import type { Badge } from '@/types';

interface LevelUpData {
  oldLevel: number;
  newLevel: number;
}

interface BadgeUnlockData {
  badge: Badge;
}

export function useGamification() {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  const [badgeUnlockData, setBadgeUnlockData] = useState<BadgeUnlockData | null>(null);
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGainAmount, setXpGainAmount] = useState(0);
  const [xpGainPosition, setXpGainPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleLevelUp = (event: CustomEvent<LevelUpData>) => {
      setLevelUpData(event.detail);
      setShowLevelUp(true);
      
      // Auto hide after 4 seconds
      setTimeout(() => {
        setShowLevelUp(false);
      }, 4000);
    };

    const handleBadgeUnlocked = (event: CustomEvent<BadgeUnlockData>) => {
      setBadgeUnlockData(event.detail);
      setShowBadgeUnlock(true);
      
      setTimeout(() => {
        setShowBadgeUnlock(false);
      }, 4000);
    };

    window.addEventListener('levelUp', handleLevelUp as EventListener);
    window.addEventListener('badgeUnlocked', handleBadgeUnlocked as EventListener);

    return () => {
      window.removeEventListener('levelUp', handleLevelUp as EventListener);
      window.removeEventListener('badgeUnlocked', handleBadgeUnlocked as EventListener);
    };
  }, []);

  const showXpAnimation = useCallback((amount: number, x: number, y: number) => {
    setXpGainAmount(amount);
    setXpGainPosition({ x, y });
    setShowXpGain(true);
    
    setTimeout(() => {
      setShowXpGain(false);
    }, 1500);
  }, []);

  const closeLevelUp = useCallback(() => {
    setShowLevelUp(false);
  }, []);

  const closeBadgeUnlock = useCallback(() => {
    setShowBadgeUnlock(false);
  }, []);

  return {
    showLevelUp,
    levelUpData,
    showBadgeUnlock,
    badgeUnlockData,
    showXpGain,
    xpGainAmount,
    xpGainPosition,
    showXpAnimation,
    closeLevelUp,
    closeBadgeUnlock
  };
}
