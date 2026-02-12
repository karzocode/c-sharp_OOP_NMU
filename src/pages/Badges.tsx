import { Lock, Unlock, Star, Trophy, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { badges } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';

export function BadgesPage() {
  const { user } = useProgress();

  const unlockedBadges = badges.filter(b => user.badges.includes(b.id));
  const lockedBadges = badges.filter(b => !user.badges.includes(b.id));

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">إنجازاتك</h1>
          <p className="text-muted-foreground">
            اجمع الإنجازات واحصل على XP إضافي
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600">
                {unlockedBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">مفتوح</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600">
                {lockedBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">مغلق</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">
                +{unlockedBadges.reduce((sum, b) => sum + b.xpBonus, 0)}
              </div>
              <div className="text-sm text-muted-foreground">XP من الإنجازات</div>
            </CardContent>
          </Card>
        </div>

        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Unlock className="w-5 h-5 text-green-600" />
              الإنجازات المفتوحة
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => (
                <Card 
                  key={badge.id}
                  className="group relative overflow-hidden border-green-200 dark:border-green-800"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                  <CardContent className="relative p-6 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">{badge.icon}</span>
                    </div>
                    <h3 className="font-bold mb-1">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {badge.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
                      <Star className="w-4 h-4" />
                      +{badge.xpBonus} XP
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            الإنجازات المغلقة
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lockedBadges.map((badge) => (
              <Card 
                key={badge.id}
                className="group relative overflow-hidden opacity-70"
              >
                <CardContent className="relative p-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {badge.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                    <Sparkles className="w-4 h-4" />
                    +{badge.xpBonus} XP
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
