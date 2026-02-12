// ============================================================================
// Enhanced Navbar with Karzo Code Branding
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import type { Page } from '../App';
import { branding } from '../data/chapters';
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Home, 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X,
  Star,
  Zap,
  Award,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { totalXP, getCurrentLevel, getProgressToNextLevel, getStats } = useProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showXPDetails, setShowXPDetails] = useState(false);

  const currentLevel = getCurrentLevel();
  const levelProgress = getProgressToNextLevel();
  const stats = getStats();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: t('Home', 'الرئيسية'), icon: Home },
    { id: 'lessons', label: t('Lessons', 'الدروس'), icon: BookOpen },
    { id: 'simulator', label: t('IDE', 'بيئة التطوير'), icon: Code },
    { id: 'badges', label: t('Badges', 'الشارات'), icon: Trophy },
    { id: 'leaderboard', label: t('Leaderboard', 'المتصدرين'), icon: Star },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-violet-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className={`font-bold text-lg leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {branding.company}
              </span>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('by', 'بواسطة')} {branding.owner}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* XP Badge with Dropdown */}
            <div 
              className={`hidden lg:block relative cursor-pointer ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              } rounded-full px-3 py-1.5`}
              onClick={() => setShowXPDetails(!showXPDetails)}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {totalXP} XP
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showXPDetails ? 'rotate-180' : ''}`} />
              </div>
              
              {/* XP Details Dropdown */}
              {showXPDetails && (
                <div className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border p-4 z-50 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('Current Level', 'المستوى الحالي')}
                      </p>
                      <p className="font-bold">{currentLevel.name[language]}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {t('Progress', 'التقدم')}
                      </span>
                      <span>{Math.round(levelProgress)}%</span>
                    </div>
                    <Progress value={levelProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {t('Lessons', 'دروس')}
                      </p>
                      <p className="font-semibold">{stats.completedLessons}/{stats.totalLessons}</p>
                    </div>
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {t('Badges', 'شارات')}
                      </p>
                      <p className="font-semibold">{stats.unlockedBadgesCount}/{stats.totalBadges}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full relative overflow-hidden group"
              title={t('Switch Language', 'تغيير اللغة')}
            >
              <Globe className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300">
                {language.toUpperCase()}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              title={t('Toggle Theme', 'تبديل السمة')}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Stats */}
              <div className={`mt-4 pt-4 border-t ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="grid grid-cols-2 gap-4 px-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {totalXP} XP
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-500" />
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {currentLevel.name[language]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
