import { useEffect, useRef } from 'react';
import { Play, Code2, MessageCircle, Award, Zap, BookOpen, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Play,
    title: 'دروس تفاعلية',
    description: 'تعلم من خلال دروس تفاعلية مع أمثلة عملية وتمارين فورية',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Code2,
    title: 'تمارين عملية',
    description: 'طبق اللي اتعلمته على طول مع محرر كود مدمج ونتائج فورية',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: MessageCircle,
    title: 'دعم مستمر',
    description: 'احصل على مساعدة في أي وقت مع شرح تفصيلي لكل مفهوم',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Award,
    title: 'شهادات إنجاز',
    description: 'احصل على شهادات وأوسمة تعترف بإنجازاتك وتقدمك',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: Zap,
    title: 'تعلم سريع',
    description: 'منهج منظم يوصلك من الصفر للاحتراف في أسرع وقت',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: BookOpen,
    title: 'محتوى شامل',
    description: 'من C# Basics لـ OOP Advanced مع مشاريع عملية حقيقية',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            لماذا تختار منصتنا؟
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            تعلم البرمجة{' '}
            <span className="text-gradient">بطريقة مختلفة</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            منصتنا مصممة خصيصاً للناطقين بالعربية عشان تتعلم C# وOOP بسهولة وكفاءة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="feature-card group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10,000+', label: 'طالب', icon: Users },
            { value: '16+', label: 'درس', icon: BookOpen },
            { value: '50+', label: 'تمرين', icon: Code2 },
            { value: '8', label: 'إنجازات', icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 mb-3">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
