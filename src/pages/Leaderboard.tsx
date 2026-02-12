import { useState } from 'react';
import { Trophy, Medal, Flame, Star, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { leaderboardData } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';

export function Leaderboard() {
  const { user } = useProgress();
  const [activeTab, setActiveTab] = useState('global');

  // Add current user to leaderboard if not present
  const fullLeaderboard = [...leaderboardData];
  const userInList = fullLeaderboard.find(entry => entry.userId === user.id);
  
  if (!userInList && user.id !== 'guest') {
    fullLeaderboard.push({
      rank: 0,
      userId: user.id,
      name: user.name,
      level: user.level,
      xp: user.totalXp,
      badges: user.badges.length,
      streak: user.streak
    });
  }

  // Sort by XP
  fullLeaderboard.sort((a, b) => b.xp - a.xp);
  
  // Update ranks
  fullLeaderboard.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 text-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200';
      case 2:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200';
      case 3:
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200';
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">المتصدرين</h1>
          <p className="text-muted-foreground">
            تنافس مع الطلاب واكسب المزيد من XP
          </p>
        </div>

        {/* User Stats */}
        <Card className="mb-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-white text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-purple-200">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    مستوى {user.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {user.totalXp} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {user.streak} يوم
                  </span>
                </div>
              </div>
              {userInList && (
                <div className="text-center">
                  <div className="text-3xl font-bold">#{userInList.rank}</div>
                  <div className="text-sm text-purple-200">ترتيبك</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="global" className="flex-1 gap-2">
              <Trophy className="w-4 h-4" />
              العالمي
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1 gap-2">
              <TrendingUp className="w-4 h-4" />
              الأسبوعي
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex-1 gap-2">
              <Star className="w-4 h-4" />
              الأصدقاء
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  أفضل الطلاب
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {fullLeaderboard.slice(0, 10).map((entry) => (
                    <div 
                      key={entry.userId}
                      className={`flex items-center gap-4 p-4 ${
                        entry.userId === user.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                      } ${getRankStyle(entry.rank)}`}
                    >
                      {/* Rank */}
                      <div className="w-10 flex justify-center">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={
                          entry.rank <= 3 
                            ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                            : "bg-muted"
                        }>
                          {entry.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {entry.name}
                          {entry.userId === user.id && (
                            <span className="mr-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                              أنت
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" />
                            {entry.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" />
                            {entry.streak}
                          </span>
                        </div>
                      </div>

                      {/* XP */}
                      <div className="text-left">
                        <div className="font-bold text-purple-600">{entry.xp}</div>
                        <div className="text-xs text-muted-foreground">XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">قريباً</h3>
              <p className="text-muted-foreground">
                الترتيب الأسبوعي هيظهر هنا
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="friends">
            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">قريباً</h3>
              <p className="text-muted-foreground">
                هتقدر تضيف أصدقاء وتتنافس معاهم
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">إزاي تزود XP؟</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">أكمل الدروس</h4>
                  <p className="text-sm text-muted-foreground">
                    كل درس بيعطيك XP حسب صعوبته
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">حافظ على التسلسل</h4>
                  <p className="text-sm text-muted-foreground">
                    تعلم يومياً عشان تزود الـ Streak
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">حل الاختبارات</h4>
                  <p className="text-sm text-muted-foreground">
                    اختبر معلوماتك واكسب XP إضافي
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
