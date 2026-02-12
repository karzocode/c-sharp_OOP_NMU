import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import type { Page } from '../App';
import { chapters } from '../data/chapters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, Play, BookOpen, Zap, ChevronRight } from 'lucide-react';

interface LessonsPageProps {
  onNavigate: (page: Page, lessonId?: number) => void;
}

export function LessonsPage({ onNavigate }: LessonsPageProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { isChapterCompleted, totalXP, getStats } = useProgress();
  
  const stats = getStats();
  const completedCount = stats.completedLessons;
  const totalChapters = chapters.length;
  const progressPercent = (completedCount / totalChapters) * 100;

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t('All Lessons', 'جميع الدروس')}
          </h1>
          <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(
              'Complete all 13 chapters to master C# and Object-Oriented Programming',
              'أكمل جميع الـ 13 فصل لإتقان سي شارب والبرمجة كائنية التوجه'
            )}
          </p>

          {/* Overall Progress */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Your Progress', 'تقدمك')}
                    </p>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {completedCount} / {totalChapters} {t('Chapters', 'فصول')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Total XP', 'إجمالي النقاط')}
                    </p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {totalXP}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={progressPercent} className="h-2" />
                <p className={`text-sm mt-2 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(progressPercent)}% {t('Complete', 'مكتمل')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chapters Grid */}
        <div className="grid gap-6">
          {chapters.map((chapter, index) => {
            const isCompleted = isChapterCompleted(chapter.id);
            const isPreviousCompleted = index === 0 || isChapterCompleted(chapters[index - 1].id);
            const isLocked = !isPreviousCompleted && !isCompleted;

            return (
              <Card 
                key={chapter.id}
                className={`group transition-all duration-300 ${
                  isLocked 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
                } ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                onClick={() => !isLocked && onNavigate('lesson', chapter.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Chapter Image */}
                    <div className="relative">
                      <img 
                        src={chapter.image} 
                        alt={chapter.title[language]}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-500/10 text-violet-500">
                          {t('Chapter', 'فصل')} {chapter.id}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                          +{chapter.xpReward} XP
                        </span>
                        {isCompleted && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                            {t('Completed', 'مكتمل')}
                          </span>
                        )}
                      </div>

                      <h2 className={`text-xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {chapter.title[language]}
                      </h2>

                      <p className={`text-sm mb-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {chapter.description[language]}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2">
                        {chapter.topics.slice(0, 3).map((topic, i) => (
                          <span 
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {topic[language]}
                          </span>
                        ))}
                        {chapter.topics.length > 3 && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{chapter.topics.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                      {isLocked ? (
                        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          <Lock className="w-5 h-5" />
                        </div>
                      ) : (
                        <Button 
                          variant={isCompleted ? "outline" : "default"}
                          className={isCompleted ? '' : 'bg-violet-600 hover:bg-violet-700'}
                        >
                          {isCompleted ? (
                            <>
                              {t('Review', 'مراجعة')}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                          ) : (
                            <>
                              {t('Start', 'ابدأ')}
                              <Play className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
