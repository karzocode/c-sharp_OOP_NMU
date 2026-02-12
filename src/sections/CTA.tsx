import { ArrowLeft, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';

export function CTA() {
  const { completedLessons } = useProgress();
  const hasStarted = completedLessons.length > 0;

  const navigateTo = (page: string, id?: string) => {
    (window as any).navigateTo?.(page, id);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-orange-900/90" />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              top: `${10 + i * 10}%`,
              left: '-100%',
              right: '-100%',
              animation: `shimmer 3s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>انضم لأكثر من 10,000 طالب</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          ابدأ رحلتك البرمجية{' '}
          <span className="text-yellow-400">اليوم!</span>
        </h2>

        {/* Description */}
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          متضيعش وقت! ابدأ تعلم C# وOOP دلوقتي وحقق حلمك في becoming a programmer. 
          المنصة مجانية ومفتوحة للجميع.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 text-white/90">
            <Users className="w-5 h-5" />
            <span>10,000+ طالب</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Zap className="w-5 h-5" />
            <span>تعلم سريع</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="w-5 h-5" />
            <span>مجاني 100%</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="bg-white text-purple-900 hover:bg-white/90 gap-2 text-lg px-8"
          onClick={() => hasStarted ? navigateTo('lessons') : navigateTo('lesson', 'lesson-1-1')}
        >
          {hasStarted ? 'أكمل تعلمك' : 'سجل مجاناً'}
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
