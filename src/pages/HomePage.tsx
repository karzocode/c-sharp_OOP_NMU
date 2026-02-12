import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import type { Page } from '../App';
import { chapters } from '../data/chapters';
import { BackgroundCanvas } from '@/components/BackgroundCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Code, 
  Trophy, 
  ArrowRight, 
  Zap,
  Star,
  Play
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page, lessonId?: number) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { totalXP, currentStreak, getStats, getCurrentLevel, getProgressToNextLevel } = useProgress();
  
  const stats = getStats();
  const currentLevel = getCurrentLevel();
  const progressPercent = getProgressToNextLevel();

  const features = [
    {
      icon: BookOpen,
      title: t('Interactive Lessons', 'دروس تفاعلية'),
      description: t(
        'Learn with step-by-step lessons extracted from official university curriculum',
        'تعلم مع دروس خطوة بخطوة مستخرجة من المنهج الجامعي الرسمي'
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: t('Code Simulator', 'محاكي الكود'),
      description: t(
        'Write and run C# code directly in your browser with instant feedback',
        'اكتب وشغل كود سي شارب مباشرة في المتصفح مع feedback فوري'
      ),
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Trophy,
      title: t('Gamified Learning', 'تعلم ممتع'),
      description: t(
        'Earn XP, unlock badges, and compete on the leaderboard',
        'اكسب نقاط XP، افتح شارات، وتنافس على لوحة المتصدرين'
      ),
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />
        <BackgroundCanvas className="absolute inset-0 mix-blend-soft-light pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>{t('Based on CSE015 Lecture Notes', 'مبني على محاضرات CSE015')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('Master C# &', 'اتقن سي شارب و')}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {t('Object-Oriented Programming', 'برمجة الكائنات')}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                {t(
                  'Interactive lessons, hands-on coding, and gamified learning experience based on New Mansoura University curriculum',
                  'دروس تفاعلية، برمجة عملية، وتجربة تعلم ممتعة مبنية على منهج جامعة المنصورة الجديدة'
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('lessons')}
                  className="bg-white text-violet-600 hover:bg-white/90 font-semibold px-8"
                >
                  {t('Start Learning', 'ابدأ التعلم')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onNavigate('simulator')}
                  className="border-white text-white hover:bg-white/10 font-semibold px-8"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('Try Simulator', 'جرب المحاكي')}
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-white/90">
                  <BookOpen className="w-5 h-5" />
                  <span>13 {t('Chapters', 'فصول')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Code className="w-5 h-5" />
                  <span>50+ {t('Code Examples', 'مثال برمجي')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Trophy className="w-5 h-5" />
                  <span>5 {t('Badges to Unlock', 'شارات للفتح')}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                <img 
                  src="/hero-illustration.jpg" 
                  alt="C# OOP Illustration" 
                  className="relative w-full max-w-lg rounded-2xl shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Progress Stats */}
      {totalXP > 0 && (
        <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Total XP', 'إجمالي النقاط')}
                    </p>
                    <p className="text-2xl font-bold">{totalXP}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-violet-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Completed', 'مكتمل')}
                    </p>
                    <p className="text-2xl font-bold">{stats.completedLessons}/13</p>
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Level', 'المستوى')}
                    </p>
                    <p className="text-2xl font-bold">{currentLevel.name[language]}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Streak', 'السلسلة')}
                    </p>
                    <p className="text-2xl font-bold">{currentStreak} {t('days', 'أيام')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  {t('Progress to next level', 'التقدم للمستوى التالي')}
                </span>
                <span className="font-medium">{Math.round(progressPercent)}%</span>
              </div>
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('Why Learn With Us?', 'لماذا التعلم معنا؟')}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t(
                'A comprehensive learning platform designed for beginners and advanced programmers',
                'منصة تعلم شاملة مصممة للمبتدئين والمبرمجين المتقدمين'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                  }`}
                >
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chapters Preview */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t('13 Chapters to Master OOP', '13 فصل لإتقان OOP')}
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {t('From basics to advanced concepts', 'من الأساسيات إلى المفاهيم المتقدمة')}
              </p>
            </div>
            <Button onClick={() => onNavigate('lessons')} variant="outline">
              {t('View All', 'عرض الكل')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.slice(0, 6).map((chapter) => (
              <Card 
                key={chapter.id}
                className={`group cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white'
                }`}
                onClick={() => onNavigate('lesson', chapter.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={chapter.image} 
                      alt={chapter.title[language]}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-500/10 text-violet-500">
                          {t('Chapter', 'فصل')} {chapter.id}
                        </span>
                        <span className="text-xs text-yellow-500 font-medium">
                          +{chapter.xpReward} XP
                        </span>
                      </div>
                      <h3 className={`font-bold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {chapter.title[language]}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {chapter.description[language]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('Ready to Start Learning?', 'مستعد لبدء التعلم؟')}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t(
                'Join thousands of students mastering C# and Object-Oriented Programming',
                'انضم إلى آلاف الطلاب الذين يتقنون سي شارب والبرمجة كائنية التوجه'
              )}
            </p>
            <Button 
              size="lg" 
              onClick={() => onNavigate('lessons')}
              className="bg-white text-violet-600 hover:bg-white/90 font-semibold px-8"
            >
              {t('Start Your Journey', 'ابدأ رحلتك')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className={`font-bold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                C# OOP Academy
              </span>
            </div>
            
            <p className={`text-sm text-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t(
                'Based on CSE015 Lecture Notes - New Mansoura University',
                'مبني على محاضرات CSE015 - جامعة المنصورة الجديدة'
              )}
            </p>
            
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              © 2025 C# OOP Academy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
