import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Zap, Star, Crown } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  completedLessons: number;
  badges: number;
  streak: number;
  isCurrentUser?: boolean;
}

// Simulated leaderboard data
const generateLeaderboard = (currentUserXP: number): LeaderboardEntry[] => {
  const names = [
    'Ahmed Hassan', 'Mohamed Ali', 'Sara Ahmed', 'Fatima Omar', 'Youssef Khaled',
    'Nour El-Din', 'Aya Mahmoud', 'Omar Ibrahim', 'Laila Saad', 'Karim Fouad',
    'Mariam Tarek', 'Hassan Youssef', 'Nada Samir', 'Tamer Hosny', 'Rania Magdy'
  ];

  const entries: LeaderboardEntry[] = names.map((name, i) => ({
    id: `user-${i}`,
    name,
    xp: Math.floor(Math.random() * 1000) + 200,
    completedLessons: Math.floor(Math.random() * 13) + 1,
    badges: Math.floor(Math.random() * 5) + 1,
    streak: Math.floor(Math.random() * 14) + 1,
  }));

  // Add current user
  entries.push({
    id: 'current-user',
    name: 'You',
    xp: currentUserXP,
    completedLessons: 0,
    badges: 0,
    streak: 0,
    isCurrentUser: true,
  });

  // Sort by XP
  return entries.sort((a, b) => b.xp - a.xp);
};

export function LeaderboardPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { totalXP, currentStreak, getStats } = useProgress();
  const stats = getStats();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const data = generateLeaderboard(totalXP);
    // Update current user data
    const updatedData = data.map(entry => 
      entry.isCurrentUser 
        ? { ...entry, completedLessons: stats.completedLessons, badges: stats.unlockedBadgesCount, streak: currentStreak }
        : entry
    );
    setLeaderboard(updatedData.sort((a, b) => b.xp - a.xp));
  }, [totalXP, stats, currentStreak]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-400">{rank + 1}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      case 1:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 2:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default:
        return '';
    }
  };

  const currentUserRank = leaderboard.findIndex(e => e.isCurrentUser);

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t('Leaderboard', 'لوحة المتصدرين')}
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(
              'See how you rank against other learners!',
              'شاهد ترتيبك مقابل المتعلمين الآخرين!'
            )}
          </p>
        </div>

        {/* Current User Stats */}
        {currentUserRank >= 0 && (
          <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Your Rank', 'ترتيبك')}
                    </p>
                    <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      #{currentUserRank + 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('XP', 'نقاط')}
                    </p>
                    <p className="text-xl font-bold text-yellow-500">{totalXP}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Lessons', 'دروس')}
                    </p>
                    <p className="text-xl font-bold text-violet-500">{stats.completedLessons}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Badges', 'شارات')}
                    </p>
                    <p className="text-xl font-bold text-pink-500">{stats.unlockedBadgesCount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <Card 
              key={entry.id}
              className={`text-center ${getRankStyle(index)} ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
              } ${entry.isCurrentUser ? 'ring-2 ring-violet-500' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  {getRankIcon(index)}
                </div>
                <p className={`font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {entry.name}
                </p>
                <p className="text-sm text-yellow-500 font-medium">
                  {entry.xp} XP
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="p-0">
            <div className={`grid grid-cols-12 gap-4 px-4 py-3 border-b text-sm font-medium ${
              theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              <div className="col-span-1">#</div>
              <div className="col-span-4">{t('Name', 'الاسم')}</div>
              <div className="col-span-2 text-center">
                <Zap className="w-4 h-4 inline" />
              </div>
              <div className="col-span-2 text-center">
                <Star className="w-4 h-4 inline" />
              </div>
              <div className="col-span-2 text-center">
                <Trophy className="w-4 h-4 inline" />
              </div>
              <div className="col-span-1 text-center">🔥</div>
            </div>

            {leaderboard.map((entry, index) => (
              <div 
                key={entry.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3 items-center ${
                  entry.isCurrentUser 
                    ? 'bg-violet-500/10' 
                    : index % 2 === 0 
                      ? theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/50'
                      : ''
                } ${index !== leaderboard.length - 1 ? theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100' : ''}`}
              >
                <div className="col-span-1">
                  {index < 3 ? getRankIcon(index) : <span className="text-gray-400">{index + 1}</span>}
                </div>
                <div className={`col-span-4 font-medium truncate ${
                  entry.isCurrentUser 
                    ? 'text-violet-500' 
                    : theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.name}
                  {entry.isCurrentUser && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {t('You', 'أنت')}
                    </Badge>
                  )}
                </div>
                <div className="col-span-2 text-center font-medium text-yellow-500">
                  {entry.xp}
                </div>
                <div className="col-span-2 text-center">
                  {entry.completedLessons}/13
                </div>
                <div className="col-span-2 text-center">
                  {entry.badges}
                </div>
                <div className="col-span-1 text-center">
                  {entry.streak > 0 ? (
                    <span className="text-orange-500">{entry.streak}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('Legend', 'مفتاح')}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {t('Total XP', 'إجمالي النقاط')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-violet-500" />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {t('Lessons Completed', 'الدروس المكتملة')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-pink-500" />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {t('Badges Earned', 'الشارات المكتسبة')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">🔥</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {t('Day Streak', 'سلسلة الأيام')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
