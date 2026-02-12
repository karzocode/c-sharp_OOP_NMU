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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-foreground font-alexandria">
      <Navbar />
      
      <div className="flex relative">
        {/* Glass overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.18),_transparent_55%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[26px]" />
        {showSidebar && <Sidebar />}
        
        <main className={`relative z-10 flex-1 ${showSidebar ? 'mr-64' : ''} min-h-screen pt-16 px-2 sm:px-4`}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
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
