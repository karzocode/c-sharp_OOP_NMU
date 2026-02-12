import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { badges } from '../data/chapters';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Lock, Footprints, Code, Star, Zap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Footprints,
  Code,
  Trophy,
  Star,
  Zap
};

export function BadgesPage() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { hasBadge, getStats } = useProgress();
  const stats = getStats();

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t('Your Badges', 'شاراتك')}
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(
              'Earn badges by completing lessons, scoring high on quizzes, and maintaining your learning streak!',
              'اكسب الشارات بإكمال الدروس، والحصول على درجات عالية في الاختبارات، والحفاظ على سلسلة التعلم!'
            )}
          </p>
        </div>

        {/* Progress Summary */}
        <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('Badges Unlocked', 'الشارات المفتوحة')}
                  </p>
                  <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stats.unlockedBadgesCount} / {badges.length}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('Completion', 'الإكمال')}
                </p>
                <p className="text-2xl font-bold text-violet-500">
                  {Math.round((stats.unlockedBadgesCount / badges.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const isUnlocked = hasBadge(badge.id);
            const Icon = iconMap[badge.icon] || Star;

            return (
              <Card 
                key={badge.id}
                className={`transition-all duration-300 ${
                  isUnlocked 
                    ? '' 
                    : 'opacity-60'
                } ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-violet-500 to-pink-500'
                        : theme === 'dark'
                          ? 'bg-gray-700'
                          : 'bg-gray-200'
                    }`}>
                      {isUnlocked ? (
                        <Icon className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {badge.name[language]}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {badge.description[language]}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                          +{badge.xp} XP
                        </span>
                        {isUnlocked && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                            {t('Unlocked', 'مفتوح')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How to Earn */}
        <Card className={`mt-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h3 className={`font-bold text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('How to Earn Badges', 'كيف تكسب الشارات')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Footprints className="w-5 h-5 text-violet-500" />
                  <span className="font-medium">{t('First Steps', 'أولى الخطوات')}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('Complete your first lesson to earn this badge', 'أكمل درسك الأول لكسب هذه الشارة')}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{t('Code Master', 'سيد الكود')}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('Complete all 13 chapters to become a Code Master', 'أكمل جميع الـ 13 فصل لتصبح سيد الكود')}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{t('Quiz Champion', 'بطل الاختبارات')}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('Score 100% on 5 quizzes to prove your knowledge', 'احصل على 100% في 5 اختبارات لإثبات معرفتك')}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span className="font-medium">{t('OOP Expert', 'خبير OOP')}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('Complete Chapter 13 to become an OOP Expert', 'أكمل الفصل 13 لتصبح خبير OOP')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
