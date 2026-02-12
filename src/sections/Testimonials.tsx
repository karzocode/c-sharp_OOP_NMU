import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'طبارمج مبتدأ',
    avatar: '/images/student1.jpg',
    content: 'المنصة دي غيرت حياتي! كنت خايف من البرمجة بس الطريقة التفاعلية خلتني أفهم كل حاجة بسهولة. الدروس بالعربي سهلت عليا كتير.',
    rating: 5,
  },
  {
    id: 2,
    name: 'سارة أحمد',
    role: 'طالبة جامعية',
    avatar: '/images/student2.jpg',
    content: 'أفضل منصة اتعلمت منها C#. المحتوى منظم والتمارين عملية. خاصة جزء الـ OOP، الشرح كان رائع وواضح.',
    rating: 5,
  },
  {
    id: 3,
    name: 'محمد علي',
    role: 'مطور ويب',
    avatar: '/images/student3.jpg',
    content: 'جربت كذا مصدر قبل كده بس دي أحسن حاجة. النظام التفاعلي والـ XP والإنجازات بتحفزك تكمل. أنصح بيها جداً!',
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 opacity-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            آراء الطلاب
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            إيه اللي بيقولوه{' '}
            <span className="text-gradient">عن المنصة؟</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <Card className="relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-purple-200 dark:text-purple-800 mb-6" />

              {/* Content */}
              <div 
                key={current.id}
                className="animate-fade-in"
              >
                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{current.content}"
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-16 h-16 border-4 border-purple-100 dark:border-purple-900">
                    <AvatarImage src={current.avatar} alt={current.name} />
                    <AvatarFallback className="bg-gradient-fajer text-white text-xl">
                      {current.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <div className="font-bold text-lg">{current.name}</div>
                    <div className="text-muted-foreground">{current.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2 mx-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentIndex 
                        ? 'w-8 bg-purple-600' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
