import { useEffect, useRef } from 'react';
import type { Badge } from '@/types';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Award } from 'lucide-react';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Sparkle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparkles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#7c3aed', '#f97316', '#fbbf24', '#10b981'];

    // Create sparkles
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach(s => {
        s.y -= s.speed;
        s.opacity -= 0.01;

        if (s.opacity <= 0) {
          s.y = canvas.height + 10;
          s.opacity = 1;
          s.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Auto close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sparkle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center animate-bounce-in max-w-md mx-4">
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Badge Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-yellow-400/30 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-yellow-400/50 animate-pulse" />
          </div>
          <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-purple-500 flex items-center justify-center shadow-glow-orange">
            <Award className="w-14 h-14 text-white" />
          </div>
          
          {/* Floating Stars */}
          <Star className="absolute -top-2 -left-4 w-8 h-8 text-yellow-400 animate-bounce" fill="currentColor" />
          <Star className="absolute -top-4 right-0 w-6 h-6 text-yellow-400 animate-bounce delay-100" fill="currentColor" />
          <Star className="absolute top-1/2 -right-6 w-8 h-8 text-yellow-400 animate-bounce delay-200" fill="currentColor" />
          <Star className="absolute top-1/2 -left-6 w-6 h-6 text-yellow-400 animate-bounce delay-300" fill="currentColor" />
        </div>

        {/* Text */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            إنجاز جديد!
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          {badge.name}
        </h2>
        <p className="text-lg text-white/70 mb-4">
          {badge.description}
        </p>

        {/* Reward */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
            <span className="text-yellow-400 font-bold">+{badge.xpBonus}</span>
            <span className="text-white/80 mr-1">XP</span>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="bg-gradient-fajer text-white hover:opacity-90 px-8"
        >
          رائع!
        </Button>
      </div>
    </div>
  );
}
