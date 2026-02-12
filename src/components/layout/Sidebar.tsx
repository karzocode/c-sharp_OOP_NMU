import { useState } from 'react';
import { 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Lock,
  Trophy,
  Code2,
  Gamepad2
} from 'lucide-react';
import { chapters } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { completedLessons } = useProgress();
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

  const navigateTo = (page: string, lessonId?: string) => {
    if (lessonId) {
      (window as any).navigateTo?.('lesson', lessonId);
    } else {
      (window as any).navigateTo?.(page);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  return (
    <aside className="fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-l bg-background/95 backdrop-blur hidden lg:block">
      <div className="p-4">
        {/* Progress Overview */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">تقدمك</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            {completedLessons.length} / {chapters.reduce((acc, c) => acc + c.lessons.length, 0)}
          </div>
          <div className="text-sm text-purple-200">درس مكتمل</div>
          <div className="mt-3 h-2 bg-purple-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{ 
                width: `${(completedLessons.length / chapters.reduce((acc, c) => acc + c.lessons.length, 0)) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateTo('simulator')}
            className="flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            <Code2 className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-medium">المحاكي</span>
          </button>
          <button
            onClick={() => navigateTo('badges')}
            className="flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            <Gamepad2 className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-medium">الإنجازات</span>
          </button>
        </div>

        {/* Chapters */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">الفصول</h3>
          
          {chapters.map((chapter) => {
            const isExpanded = expandedChapters.includes(chapter.id);
            const completedInChapter = chapter.lessons.filter(l => isLessonCompleted(l.id)).length;
            const progress = Math.round((completedInChapter / chapter.lessons.length) * 100);
            
            return (
              <div key={chapter.id} className="border rounded-lg overflow-hidden">
                {/* Chapter Header */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-sm">{chapter.title}</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </button>
                
                {/* Chapter Progress */}
                <div className="px-3 pb-2">
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-fajer transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {completedInChapter} / {chapter.lessons.length}
                  </div>
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="border-t">
                    {chapter.lessons.map((lesson, index) => {
                      const completed = isLessonCompleted(lesson.id);
                      const isFirst = index === 0;
                      const prevCompleted = isFirst || isLessonCompleted(chapter.lessons[index - 1]?.id);
                      const lessonLocked = !completed && !prevCompleted && index > 0;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !lessonLocked && navigateTo('lesson', lesson.id)}
                          disabled={lessonLocked}
                          className={cn(
                            "w-full flex items-center gap-2 p-2.5 text-sm transition-colors text-right",
                            !lessonLocked && "hover:bg-muted",
                            lessonLocked && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : lessonLocked ? (
                            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={cn(
                            "truncate",
                            completed && "text-muted-foreground line-through"
                          )}>
                            {lesson.title}
                          </span>
                          {completed && (
                            <span className="mr-auto text-xs text-green-600 font-medium">
                              +{lesson.xpReward}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
