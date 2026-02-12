import { useEffect, useRef } from 'react';
import { ArrowLeft, Play, Sparkles, Code2, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';

export function Hero() {
  const { completedLessons } = useProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigateTo = (page: string, id?: string) => {
    (window as any).navigateTo?.(page, id);
  };

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = ['#7c3aed', '#f97316', '#a78bfa', '#fdba74'];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const totalLessons = 16; // Approximate total
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>تعلم البرمجة بالعربي</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              تعلم{' '}
              <span className="text-gradient">C# وOOP</span>
              <br />
              بطريقة تفاعلية
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              ابدأ رحلتك في عالم البرمجة الكائنية التوجه مع دورات تفاعلية وشاملة. 
              تعلم من الصفر للاحتراف مع تمارين عملية ومشاريع حقيقية.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold">+16</div>
                  <div className="text-xs text-muted-foreground">درس</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold">+50</div>
                  <div className="text-xs text-muted-foreground">تمرين</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold">+1800</div>
                  <div className="text-xs text-muted-foreground">XP</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {completedLessons.length > 0 ? (
                <Button 
                  size="lg" 
                  className="bg-gradient-fajer text-white hover:opacity-90 gap-2"
                  onClick={() => navigateTo('lessons')}
                >
                  أكمل تعلمك
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-fajer text-white hover:opacity-90 gap-2"
                  onClick={() => navigateTo('lesson', 'lesson-1-1')}
                >
                  ابدأ الآن
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => navigateTo('simulator')}
              >
                <Play className="w-4 h-4" />
                جرب الكود
              </Button>
            </div>

            {/* Progress (if started) */}
            {completedLessons.length > 0 && (
              <div className="mt-8 p-4 rounded-xl bg-muted max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">تقدمك</span>
                  <span className="text-sm text-purple-600 font-bold">{progress}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-fajer transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  أكملت {completedLessons.length} من {totalLessons} درس
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Code Preview */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-2xl blur-2xl" />
              
              {/* Code Editor */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-slate-500">Program.cs</span>
                </div>

                {/* Code */}
                <div className="p-6 font-mono text-sm" style={{ direction: 'ltr', textAlign: 'left' }}>
                  <pre className="text-slate-300">
                    <span className="text-purple-400">using</span> <span className="text-slate-300">System;</span>
                    {'\n\n'}
                    <span className="text-purple-400">class</span> <span className="text-yellow-400">Program</span>
                    {'\n'}
                    <span className="text-slate-300">{'{'}</span>
                    {'\n    '}
                    <span className="text-purple-400">static void</span> <span className="text-blue-400">Main</span><span className="text-slate-300">()</span>
                    {'\n    '}
                    <span className="text-slate-300">{'{'}</span>
                    {'\n        '}
                    <span className="text-slate-500">// أول برنامج في C#</span>
                    {'\n        '}
                    <span className="text-slate-300">Console.</span><span className="text-blue-400">WriteLine</span><span className="text-slate-300">(</span><span className="text-green-400">"Hello, World!"</span><span className="text-slate-300">);</span>
                    {'\n        '}
                    <span className="text-slate-300">Console.</span><span className="text-blue-400">WriteLine</span><span className="text-slate-300">(</span><span className="text-green-400">"أنا باتعلم C#"</span><span className="text-slate-300">);</span>
                    {'\n    '}
                    <span className="text-slate-300">{'}'}</span>
                    {'\n'}
                    <span className="text-slate-300">{'}'}</span>
                  </pre>
                </div>

                {/* Output */}
                <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
                  <div className="text-xs text-slate-500 mb-2">Output:</div>
                  <div className="text-green-400 text-sm">Hello, World!</div>
                  <div className="text-green-400 text-sm">أنا باتعلم C#</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
