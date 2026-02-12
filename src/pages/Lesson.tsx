import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  HelpCircle,
  Clock,
  Zap,
  RotateCcw,
  Trophy
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/ui-custom/CodeEditor';
import { Quiz } from '@/components/ui-custom/Quiz';
import { chapters, quizzes } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';


interface LessonProps {
  lessonId?: string;
}

export function Lesson({ lessonId: propLessonId }: LessonProps) {
  const [activeTab, setActiveTab] = useState('lesson');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { completeLesson, completeQuiz, user } = useProgress();

  // Get lessonId from props or default to first lesson
  const lessonId = propLessonId || 'lesson-1-1';

  // Find lesson and chapter
  let currentLesson: typeof chapters[0]['lessons'][0] | null = null;
  let currentChapter: typeof chapters[0] | null = null;
  let lessonIndex = -1;
  let chapterIndex = -1;

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const idx = chapter.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      currentLesson = chapter.lessons[idx];
      currentChapter = chapter;
      lessonIndex = idx;
      chapterIndex = i;
      break;
    }
  }

  // Find quiz for this lesson
  const lessonQuiz = quizzes.find(q => q.lessonId === lessonId);
  const quizAlreadyCompleted = lessonQuiz && user.completedQuizzes.includes(lessonQuiz.id);

  // Find next and previous lessons
  const getNextLesson = () => {
    if (!currentChapter || lessonIndex === -1) return null;
    
    if (lessonIndex < currentChapter.lessons.length - 1) {
      return currentChapter.lessons[lessonIndex + 1];
    }
    
    // Next chapter
    if (chapterIndex < chapters.length - 1) {
      return chapters[chapterIndex + 1].lessons[0];
    }
    
    return null;
  };

  const getPrevLesson = () => {
    if (!currentChapter || lessonIndex === -1) return null;
    
    if (lessonIndex > 0) {
      return currentChapter.lessons[lessonIndex - 1];
    }
    
    // Previous chapter
    if (chapterIndex > 0) {
      const prevChapter = chapters[chapterIndex - 1];
      return prevChapter.lessons[prevChapter.lessons.length - 1];
    }
    
    return null;
  };

  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();

  const handleLessonComplete = () => {
    if (currentLesson && !user.completedLessons.includes(currentLesson.id)) {
      completeLesson(currentLesson.id, currentLesson.xpReward);
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number, xpEarned: number) => {
    if (lessonQuiz && !user.completedQuizzes.includes(lessonQuiz.id)) {
      completeQuiz({
        quizId: lessonQuiz.id,
        score,
        totalQuestions,
        correctAnswers: score / (lessonQuiz.questions[0]?.points || 10),
        xpEarned,
        completedAt: new Date().toISOString(),
        answers: {}
      });
    }
    setQuizCompleted(true);
  };

  const handleCodeSuccess = () => {
    handleLessonComplete();
  };

  const navigateTo = (page: string, id?: string) => {
    (window as any).navigateTo?.(page, id);
  };

  if (!currentLesson || !currentChapter) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">الدرس غير موجود</h1>
          <Button onClick={() => navigateTo('lessons')}>العودة للدروس</Button>
        </div>
      </Layout>
    );
  }

  const isCompleted = user.completedLessons.includes(currentLesson.id);

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => navigateTo('lessons')} className="hover:text-foreground transition-colors">
            الدروس
          </button>
          <span>/</span>
          <span>{currentChapter.title}</span>
          <span>/</span>
          <span className="text-foreground">{currentLesson.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentLesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentLesson.duration} دقيقة
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {currentLesson.xpReward} XP
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  مكتمل
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {prevLesson && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => navigateTo('lesson', prevLesson.id)}
              >
                <ArrowLeft className="w-4 h-4" />
                السابق
              </Button>
            )}
            {nextLesson && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => navigateTo('lesson', nextLesson.id)}
              >
                التالي
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="lesson" className="gap-2">
              <BookOpen className="w-4 h-4" />
              الدرس
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code2 className="w-4 h-4" />
              الكود
            </TabsTrigger>
            {lessonQuiz && (
              <TabsTrigger value="quiz" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                الاختبار
                {quizAlreadyCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </TabsTrigger>
            )}
          </TabsList>

          {/* Lesson Content */}
          <TabsContent value="lesson">
            <Card>
              <CardContent className="p-6">
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: currentLesson.content
                      .replace(/# (.*)/, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
                      .replace(/## (.*)/, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
                      .replace(/### (.*)/, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/```csharp\n([\s\S]*?)```/g, '<pre class="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto my-4" style="direction: ltr; text-align: left;"><code>$1</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
                      .replace(/\n/g, '<br />')
                  }}
                />

                {!isCompleted && (
                  <div className="mt-8 flex justify-center">
                    <Button 
                      onClick={handleLessonComplete}
                      className="bg-gradient-fajer text-white gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      أكملت الدرس
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Editor */}
          <TabsContent value="code">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    جرب الكود بنفسك
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeEditor
                    initialCode={currentLesson.codeExample}
                    expectedOutput={currentLesson.expectedOutput}
                    onSuccess={handleCodeSuccess}
                    height="350px"
                  />
                </CardContent>
              </Card>

              {currentLesson.expectedOutput && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">الناتج المتوقع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-slate-950 text-green-400 p-4 rounded-lg font-mono text-sm" style={{ direction: 'ltr', textAlign: 'left' }}>
                      {currentLesson.expectedOutput}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Quiz */}
          {lessonQuiz && (
            <TabsContent value="quiz">
              {showQuiz ? (
                <Quiz
                  quiz={lessonQuiz}
                  onComplete={handleQuizComplete}
                  onClose={() => setShowQuiz(false)}
                />
              ) : quizCompleted || quizAlreadyCompleted ? (
                <Card className="text-center p-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Trophy className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {quizAlreadyCompleted ? 'لقد أكملت هذا الاختبار!' : 'أكملت الاختبار!'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {quizAlreadyCompleted 
                      ? 'لقد حصلت على الـ XP مكافأة لهذا الاختبار.'
                      : 'أحسنت! لقد حصلت على XP إضافي.'
                    }
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowQuiz(true)}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      حاول تاني
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="text-center p-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <HelpCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">اختبر معلوماتك</h3>
                  <p className="text-muted-foreground mb-4">
                    هذا الاختبار يحتوي على {lessonQuiz.questions.length} أسئلة.
                    <br />
                    اجب صح واكسب {lessonQuiz.xpReward} XP!
                  </p>
                  <Button 
                    onClick={() => setShowQuiz(true)}
                    className="bg-gradient-fajer text-white gap-2"
                  >
                    ابدأ الاختبار
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
