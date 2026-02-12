// ============================================================================
// Enhanced Lesson Page
// With advanced quiz, certificate generation, and locked chapter support
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import type { Page } from '../App';
import { chapters } from '../data/chapters';
import { AdvancedIDE } from '../components/AdvancedIDE';
import { AdvancedQuiz } from '../components/AdvancedQuiz';
import { Certificate } from '../components/Certificate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Code, 
  HelpCircle,
  Trophy,
  Lock,
  Award,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface LessonPageProps {
  lessonId: number;
  onNavigate: (page: Page, lessonId?: number) => void;
}

export function LessonPage({ lessonId, onNavigate }: LessonPageProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { 
    completeLesson, 
    saveQuizResult, 
    isChapterCompleted, 
    isChapterUnlocked,
    getChapterProgress,
    addCertificate,
    totalXP,
    getCurrentLevel
  } = useProgress();
  
  const chapter = chapters.find(c => c.id === lessonId);
  const [activeTab, setActiveTab] = useState('theory');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Redirect if chapter is locked
  useEffect(() => {
    if (chapter && !isChapterUnlocked(chapter.id)) {
      onNavigate('lessons');
    }
  }, [chapter, isChapterUnlocked, onNavigate]);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{t('Lesson not found', 'الدرس غير موجود')}</p>
      </div>
    );
  }

  // Check if chapter is locked
  const isLocked = !isChapterUnlocked(chapter.id);
  const isCompleted = isChapterCompleted(chapter.id);
  const chapterProgress = getChapterProgress(chapter.id);
  const currentLevel = getCurrentLevel();

  // Get current subsection and example
  const currentSubsection = chapter.subsections[0];
  const currentExample = currentSubsection?.examples[currentExampleIndex];

  const handleQuizComplete = (score: number, _passed: boolean) => {
    setQuizScore(score);
    const actuallyPassed = saveQuizResult(chapter.id, score, chapter.passingScore);
    
    if (actuallyPassed) {
      completeLesson(chapter.id, chapter.xpReward);
      addCertificate(chapter.id, score);
      setShowCertificate(true);
    }
  };

  const handleMarkComplete = () => {
    completeLesson(chapter.id, chapter.xpReward);
  };

  // Locked chapter view
  if (isLocked) {
    return (
      <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-12 h-12 text-gray-500" />
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('Chapter Locked', 'الفصل مقفل')}
              </h2>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t(
                  'Complete the previous chapter and pass its quiz to unlock this chapter.',
                  'أكمل الفصل السابق واجتز اختباره لفتح هذا الفصل.'
                )}
              </p>
              <Button onClick={() => onNavigate('lessons')}>
                {t('Back to Lessons', 'العودة للدروس')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('lessons')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('Back to Lessons', 'العودة للدروس')}
          </Button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className="text-sm">
                  {t('Chapter', 'فصل')} {chapter.id}
                </Badge>
                <Badge className="bg-yellow-500/10 text-yellow-500 text-sm">
                  <Zap className="w-3 h-3 mr-1" />
                  +{chapter.xpReward} XP
                </Badge>
                {isCompleted && (
                  <Badge className="bg-green-500/10 text-green-500 text-sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t('Completed', 'مكتمل')}
                  </Badge>
                )}
                {chapterProgress?.quizPassed && (
                  <Badge className="bg-purple-500/10 text-purple-500 text-sm">
                    <Trophy className="w-3 h-3 mr-1" />
                    {t('Quiz Passed', 'الاختبار مجتاز')}
                  </Badge>
                )}
              </div>
              <h1 className={`text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {chapter.title[language]}
              </h1>
              <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {chapter.description[language]}
              </p>
            </div>

            {/* Progress Card */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} min-w-[250px]`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Your XP', 'نقاطك')}
                    </p>
                    <p className="text-xl font-bold">{totalXP}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('Level', 'المستوى')}
                    </p>
                    <p className="text-xl font-bold">{currentLevel.name[language]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Topics */}
          <div className="mt-4 flex flex-wrap gap-2">
            {chapter.topics.map((topic, i) => (
              <Badge key={i} variant="outline" className="text-sm">
                {topic[language]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="theory" className="text-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('Theory', 'النظرية')}
            </TabsTrigger>
            <TabsTrigger value="code" className="text-sm">
              <Code className="w-4 h-4 mr-2" />
              {t('Code Examples', 'أمثلة الكود')}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              {t('Quiz', 'اختبار')}
            </TabsTrigger>
            {showCertificate && (
              <TabsTrigger value="certificate" className="text-sm">
                <Award className="w-4 h-4 mr-2" />
                {t('Certificate', 'شهادة')}
              </TabsTrigger>
            )}
          </TabsList>

          {/* Theory Tab */}
          <TabsContent value="theory">
            <div className="space-y-6">
              {chapter.subsections.map((subsection) => (
                <Card key={subsection.id} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {subsection.title[language]}
                    </h3>
                    <div className={`prose max-w-none leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {subsection.content[language].split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="code">
            {currentExample ? (
              <div className="space-y-6">
                {/* Example Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {currentSubsection.examples.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentExampleIndex(idx)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          idx === currentExampleIndex
                            ? 'bg-purple-500 text-white'
                            : theme === 'dark'
                              ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentExampleIndex + 1} / {currentSubsection.examples.length}
                  </span>
                </div>

                {/* Example Title */}
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currentExample.title[language]}
                </h3>

                {/* IDE */}
                <AdvancedIDE
                  initialCode={currentExample.code}
                  height="400px"
                  showExamples={false}
                />

                {/* Explanation Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {currentExample.concept && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                          {t('Concept', 'المفهوم')}
                        </h4>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {currentExample.concept[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {currentExample.whyItMatters && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {t('Why It Matters', 'لماذا يهم')}
                        </h4>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {currentExample.whyItMatters[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {currentExample.realWorldAnalogy && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                          {t('Real-World Analogy', 'مثال من الواقع')}
                        </h4>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {currentExample.realWorldAnalogy[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {currentExample.stepByStep && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                          {t('Step-by-Step', 'خطوة بخطوة')}
                        </h4>
                        <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {currentExample.stepByStep[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {currentExample.commonMistakes && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 border-red-500/30' : 'bg-white border-red-200'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          <AlertTriangle className="w-4 h-4 inline mr-1" />
                          {t('Common Mistakes', 'أخطاء شائعة')}
                        </h4>
                        <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {currentExample.commonMistakes[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {currentExample.bestPractices && (
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 border-green-500/30' : 'bg-white border-green-200'}`}>
                      <CardContent className="p-4">
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          {t('Best Practices', 'أفضل الممارسات')}
                        </h4>
                        <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {currentExample.bestPractices[language]}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentExampleIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentExampleIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('Previous Example', 'المثال السابق')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentExampleIndex(prev => Math.min(currentSubsection.examples.length - 1, prev + 1))}
                    disabled={currentExampleIndex === currentSubsection.examples.length - 1}
                  >
                    {t('Next Example', 'المثال التالي')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardContent className="p-8 text-center">
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {t('No code examples available for this section.', 'لا توجد أمثلة كود متاحة لهذا القسم.')}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            {chapter.quiz.length > 0 ? (
              <AdvancedQuiz
                questions={chapter.quiz}
                passingScore={chapter.passingScore}
                onComplete={handleQuizComplete}
                onRetry={() => {}}
              />
            ) : (
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardContent className="p-8 text-center">
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {t('Quiz coming soon for this chapter.', 'الاختبار قادم قريباً لهذا الفصل.')}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Certificate Tab */}
          {showCertificate && (
            <TabsContent value="certificate">
              <Certificate
                chapterTitle={chapter.title}
                chapterNumber={chapter.id}
                completionDate={chapterProgress?.completionDate || new Date().toDateString()}
                score={quizScore}
              />
            </TabsContent>
          )}
        </Tabs>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => lessonId > 1 && onNavigate('lesson', lessonId - 1)}
            disabled={lessonId === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('Previous Chapter', 'الفصل السابق')}
          </Button>

          {!isCompleted && !chapterProgress?.quizPassed && (
            <Button 
              onClick={handleMarkComplete}
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t('Mark as Read', 'تحديد كمقروء')}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => lessonId < chapters.length && onNavigate('lesson', lessonId + 1)}
            disabled={lessonId === chapters.length}
          >
            {t('Next Chapter', 'الفصل التالي')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
