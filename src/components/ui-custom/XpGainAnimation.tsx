import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface XpGainAnimationProps {
  amount: number;
  x: number;
  y: number;
}

export function XpGainAnimation({ amount, x, y }: XpGainAnimationProps) {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    // Animate upward
    const interval = setInterval(() => {
      setPosition(prev => ({ ...prev, y: prev.y - 2 }));
    }, 16);

    // Hide after animation
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none animate-fade-in"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold shadow-lg animate-slide-up">
        <Sparkles className="w-4 h-4" />
        <span>+{amount} XP</span>
      </div>
    </div>
  );
}
