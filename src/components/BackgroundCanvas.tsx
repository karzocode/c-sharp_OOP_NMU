import { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  className?: string;
}

// Interactive background with moving points and connecting lines that react to mouse movement
export function BackgroundCanvas({ className = '' }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particleCount = 80;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slight dark overlay for depth
      ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction: gentle attraction
        if (mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 140;

          if (dist < influenceRadius && dist > 0.001) {
            const force = (influenceRadius - dist) / influenceRadius;
            p.x -= (dx / dist) * force * 0.6;
            p.y -= (dy / dist) * force * 0.6;
          }
        }

        // Draw point
        ctx.beginPath();
        ctx.fillStyle = 'rgba(129, 140, 248, 0.9)'; // indigo-400
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between particles
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Lines from mouse to nearby particles
      if (mouse) {
        particles.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseMaxDist = 150;

          if (dist < mouseMaxDist) {
            const alpha = 1 - dist / mouseMaxDist;
            ctx.strokeStyle = `rgba(248, 250, 252, ${alpha * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      animationId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
    />
  );
}

export default BackgroundCanvas;

