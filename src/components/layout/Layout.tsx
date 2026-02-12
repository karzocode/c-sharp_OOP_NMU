import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { LevelUpModal } from '../ui-custom/LevelUpModal';
import { BadgeUnlockModal } from '../ui-custom/BadgeUnlockModal';
import { XpGainAnimation } from '../ui-custom/XpGainAnimation';
import { useGamification } from '@/hooks/useGamification';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { 
    showLevelUp, 
    levelUpData, 
    showBadgeUnlock, 
    badgeUnlockData,
    showXpGain,
    xpGainAmount,
    xpGainPosition,
    closeLevelUp, 
    closeBadgeUnlock 
  } = useGamification();

  return (
    <div className="min-h-screen bg-background text-foreground font-alexandria">
      <Navbar />
      
      <div className="flex">
        {showSidebar && <Sidebar />}
        
        <main className={`flex-1 ${showSidebar ? 'mr-64' : ''} min-h-screen pt-16`}>
          {children}
        </main>
      </div>

      {/* Gamification Modals */}
      {showLevelUp && levelUpData && (
        <LevelUpModal 
          oldLevel={levelUpData.oldLevel} 
          newLevel={levelUpData.newLevel} 
          onClose={closeLevelUp} 
        />
      )}

      {showBadgeUnlock && badgeUnlockData && (
        <BadgeUnlockModal 
          badge={badgeUnlockData.badge} 
          onClose={closeBadgeUnlock} 
        />
      )}

      {showXpGain && (
        <XpGainAnimation 
          amount={xpGainAmount} 
          x={xpGainPosition.x} 
          y={xpGainPosition.y} 
        />
      )}
    </div>
  );
}
