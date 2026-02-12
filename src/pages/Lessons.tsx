import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Clock, 
  ChevronDown,
  ChevronLeft,
  Trophy,
  Zap
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { chapters } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

export function Lessons() {
  const { completedLessons, user } = useProgress();
  const [expandedChapters, setExpandedChapters] = useState<string[]>(
    chapters.map(c => c.id)
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const navigateTo = (page: string, id?: string) => {
    (window as any).navigateTo?.(page, id);
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const getChapterProgress = (chapter: typeof chapters[0]) => {
    const completed = chapter.lessons.filter(l => isLessonCompleted(l.id)).length;
    return Math.round((completed / chapter.lessons.length) * 100);
  };

  const isChapterLocked = (chapterIndex: number) => {
    if (chapterIndex === 0) return false;
    const prevChapter = chapters[chapterIndex - 1];
    return getChapterProgress(prevChapter) < 50;
  };

  const totalLessons = chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">الدروس</h1>
          <p className="text-muted-foreground">
            تعلم C# وOOP خطوة بخطوة مع دروس تفاعلية وتمارين عملية
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1">تقدمك في التعلم</h2>
                <p className="text-purple-200">
                  أكملت {completedLessons.length} من {totalLessons} درس
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.level}</div>
                  <div className="text-xs text-purple-200">المستوى</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.totalXp}</div>
                  <div className="text-xs text-purple-200">XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.badges.length}</div>
                  <div className="text-xs text-purple-200">إنجازات</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-purple-800/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="text-right text-sm mt-1 text-purple-200">
                {overallProgress}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapters */}
        <div className="space-y-4">
          {chapters.map((chapter, chapterIndex) => {
            const isExpanded = expandedChapters.includes(chapter.id);
            const progress = getChapterProgress(chapter);
            const isLocked = isChapterLocked(chapterIndex);

            return (
              <Card key={chapter.id} className={cn(
                "overflow-hidden transition-all duration-300",
                isLocked && "opacity-70"
              )}>
                {/* Chapter Header */}
                <CardHeader 
                  className="p-0"
                  onClick={() => !isLocked && toggleChapter(chapter.id)}
                >
                  <div className={cn(
                    "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    isLocked && "cursor-not-allowed"
                  )}>
                    {/* Chapter Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={chapter.image} 
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">
                          الفصل {chapterIndex + 1}
                        </span>
                        {progress === 100 && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-0.5 rounded-full">
                            مكتمل
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{chapter.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {chapter.description}
                      </p>

                      {/* Progress */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              progress === 100 ? "bg-green-500" : "bg-gradient-fajer"
                            )}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {progress}%
                        </span>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="flex items-center gap-2">
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180"
                        )} />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Lessons */}
                {isExpanded && !isLocked && (
                  <CardContent className="p-0 border-t">
                    <div className="divide-y">
                      {chapter.lessons.map((lesson, lessonIndex) => {
                        const completed = isLessonCompleted(lesson.id);
                        const isFirst = lessonIndex === 0;
                        const prevCompleted = isFirst || isLessonCompleted(chapter.lessons[lessonIndex - 1]?.id);
                        const lessonLocked = !completed && !prevCompleted && lessonIndex > 0;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => !lessonLocked && navigateTo('lesson', lesson.id)}
                            disabled={lessonLocked}
                            className={cn(
                              "w-full flex items-center gap-4 p-4 transition-colors text-right",
                              !lessonLocked && "hover:bg-muted/50",
                              lessonLocked && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {/* Status Icon */}
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                              {completed ? (
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                              ) : lessonLocked ? (
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                  <Circle className="w-5 h-5 text-purple-600" />
                                </div>
                              )}
                            </div>

                            {/* Lesson Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className={cn(
                                "font-medium",
                                completed && "text-muted-foreground line-through"
                              )}>
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {lesson.duration} دقيقة
                                </span>
                                <span className="flex items-center gap-1">
                                  <Zap className="w-3.5 h-3.5" />
                                  {lesson.xpReward} XP
                                </span>
                              </div>
                            </div>

                            {/* XP Badge */}
                            {completed && (
                              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <Trophy className="w-4 h-4" />
                                +{lesson.xpReward}
                              </div>
                            )}

                            {/* Arrow */}
                            {!lessonLocked && (
                              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
