import { useEffect, useRef } from 'react';
import { Rocket, BookOpen, Settings, Code2, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chapters } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

const pathSteps = [
  {
    id: 'chapter-1',
    icon: Rocket,
    title: 'مقدمة في C#',
    description: 'تعلم أساسيات اللغة والمتغيرات والعمليات الحسابية',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'chapter-2',
    icon: BookOpen,
    title: 'أساسيات البرمجة',
    description: 'الحلقات والمصفوفات والدوال والقوائم',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'chapter-3',
    icon: Settings,
    title: 'مفاهيم OOP',
    description: 'الكلاسات والوراثة والتغليف وتعدد الأشكال',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'chapter-4',
    icon: Code2,
    title: 'مشاريع عملية',
    description: 'طبق اللي اتعلمته في مشاريع حقيقية',
    color: 'from-blue-500 to-blue-600',
  },
];

export function LearningPath() {
  const { completedLessons } = useProgress();
  const sectionRef = useRef<HTMLElement>(null);

  const navigateTo = (page: string) => {
    (window as any).navigateTo?.(page);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const steps = sectionRef.current?.querySelectorAll('.path-step');
    steps?.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const getChapterProgress = (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return 0;
    
    const completed = chapter.lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / chapter.lessons.length) * 100);
  };

  const isChapterCompleted = (chapterId: string) => {
    return getChapterProgress(chapterId) === 100;
  };

  const isChapterStarted = (chapterId: string) => {
    return getChapterProgress(chapterId) > 0;
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            مسار التعلم
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            رحلتك من{' '}
            <span className="text-gradient">المبتدأ للمحترف</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اتبع المسار المحدد عشان تتعلم C# وOOP بشكل منظم وفعال
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-orange-500 to-blue-500 hidden md:block" />

          {/* Steps */}
          <div className="space-y-8">
            {pathSteps.map((step, index) => {
              const progress = getChapterProgress(step.id);
              const completed = isChapterCompleted(step.id);
              const started = isChapterStarted(step.id);

              return (
                <div 
                  key={step.id}
                  className="path-step relative grid md:grid-cols-2 gap-4 md:gap-8 items-center opacity-0"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2 md:text-left'}`}>
                    <div className={cn(
                      "group relative p-6 rounded-2xl bg-background border-2 transition-all duration-300 hover:shadow-xl",
                      completed ? "border-green-500" : started ? "border-purple-500" : "border-transparent"
                    )}>
                      {/* Progress Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-2xl overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            completed ? "bg-green-500" : "bg-gradient-fajer"
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                          completed ? "bg-green-100 dark:bg-green-900/30" : "bg-purple-100 dark:bg-purple-900/30"
                        )}>
                          {completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <step.icon className="w-6 h-6 text-purple-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {step.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              {completed ? (
                                <span className="text-green-600 font-medium">✓ مكتمل</span>
                              ) : started ? (
                                <span className="text-purple-600 font-medium">{progress}% مكتمل</span>
                              ) : (
                                <span className="text-muted-foreground">لم يبدأ</span>
                              )}
                            </div>

                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="gap-1 text-purple-600 hover:text-purple-700"
                              onClick={() => navigateTo('lessons')}
                            >
                              {completed ? 'راجع' : started ? 'أكمل' : 'ابدأ'}
                              <ArrowLeft className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className={`hidden md:flex justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className={cn(
                      "relative w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                      completed 
                        ? "bg-green-500 shadow-lg shadow-green-500/30" 
                        : started
                        ? "bg-purple-500 shadow-lg shadow-purple-500/30"
                        : "bg-muted border-4 border-background"
                    )}>
                      {completed ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : started ? (
                        <span className="text-white font-bold">{progress}%</span>
                      ) : (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      )}

                      {/* Pulse Effect */}
                      {(completed || started) && (
                        <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-fajer text-white hover:opacity-90 gap-2"
            onClick={() => navigateTo('lessons')}
          >
            ابدأ رحلتك الآن
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
