import { useEffect, useRef } from 'react';
import { Star, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelUpModalProps {
  oldLevel: number;
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ oldLevel, newLevel, onClose }: LevelUpModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#7c3aed', '#f97316', '#fbbf24', '#10b981', '#3b82f6'];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        // Remove particles that fall off screen
        if (p.y > canvas.height + 50) {
          particles.splice(i, 1);
        }
      });

      if (particles.length > 0 && frameCount < 300) {
        animationId = requestAnimationFrame(animate);
      }
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
      
      {/* Confetti Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center animate-bounce-in">
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/30 rounded-full blur-2xl animate-pulse delay-150" />
        </div>

        {/* Level Badge */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-spin-slow">
            <Sparkles className="w-32 h-32 text-yellow-400 opacity-50" />
          </div>
          <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-glow-orange">
            <Trophy className="w-14 h-14 text-white" />
          </div>
          
          {/* Floating Stars */}
          <Star className="absolute -top-2 -left-4 w-8 h-8 text-yellow-400 animate-bounce" fill="currentColor" />
          <Star className="absolute -top-4 right-0 w-6 h-6 text-yellow-400 animate-bounce delay-100" fill="currentColor" />
          <Star className="absolute top-1/2 -right-6 w-8 h-8 text-yellow-400 animate-bounce delay-200" fill="currentColor" />
        </div>

        {/* Text */}
        <h2 className="text-4xl font-bold text-white mb-2">
          مبروك! 🎉
        </h2>
        <p className="text-xl text-white/80 mb-4">
          وصلت للمستوى الجديد
        </p>
        
        {/* Level Display */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-3xl font-bold text-white/50">{oldLevel}</div>
          <div className="text-4xl animate-pulse">➜</div>
          <div className="text-6xl font-bold text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {newLevel}
          </div>
        </div>

        {/* Rewards */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
            <span className="text-yellow-400 font-bold">+50</span>
            <span className="text-white/80 mr-1">XP بونص</span>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="bg-gradient-fajer text-white hover:opacity-90 px-8"
        >
          أكمل التعلم!
        </Button>
      </div>
    </div>
  );
}
