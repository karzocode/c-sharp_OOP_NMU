import { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Trophy, 
  Flame, 
  Star, 
  Menu,
  X,
  Code2,
  LogOut,
  Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { useProgress } from '@/hooks/useProgress';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, xpProgress, xpForNextLevel } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: string) => {
    (window as any).navigateTo?.(page);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'الرئيسية', page: 'home', icon: 'home' },
    { label: 'الدروس', page: 'lessons', icon: 'book' },
    { label: 'المحاكي', page: 'simulator', icon: 'code' },
    { label: 'المتصدرين', page: 'leaderboard', icon: 'trophy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <button onClick={() => navigateTo('home')} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-fajer">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-xl font-bold text-gradient sm:inline">
            C# Academy
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* XP & Level - Desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Streak */}
            <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5 dark:bg-orange-900/20">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                {user.streak}
              </span>
            </div>

            {/* Level & XP */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-xs font-medium">مستوى {user.level}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {user.totalXp} / {xpForNextLevel} XP
                </span>
              </div>
              <div className="w-32">
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-fajer transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-fajer text-white text-sm">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-fajer text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs text-muted-foreground">مستوى {user.level}</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigateTo('badges')}>
                <Trophy className="h-4 w-4 ml-2" />
                <span>الإنجازات ({user.badges.length})</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigateTo('oop-simulator')}>
                <Gamepad2 className="h-4 w-4 ml-2" />
                <span>محاكي OOP</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="h-4 w-4 ml-2" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b bg-background p-4 md:hidden animate-slide-down">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className="px-4 py-3 text-sm font-medium rounded-lg transition-colors text-right hover:bg-muted"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Mobile Stats */}
          <div className="mt-4 flex items-center gap-4 border-t pt-4">
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold">{user.streak} يوم</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold">مستوى {user.level}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-semibold">{user.totalXp} XP</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
