import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/sections/Hero';
import { Features } from '@/sections/Features';
import { LearningPath } from '@/sections/LearningPath';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';

export function Home() {
  const navigateTo = (page: string, id?: string) => {
    (window as any).navigateTo?.(page, id);
  };

  return (
    <Layout showSidebar={false}>
      <div className="flex flex-col">
        <Hero />
        <Features />
        <LearningPath />
        <Testimonials />
        <CTA />
        
        {/* Footer */}
        <footer className="border-t bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-fajer">
                    <span className="text-white font-bold text-lg">C#</span>
                  </div>
                  <span className="text-xl font-bold text-gradient">
                    C# Academy
                  </span>
                </div>
                <p className="text-muted-foreground max-w-sm">
                  منصة تفاعلية لتعلم البرمجة باللغة العربية. تعلم C# وOOP من الصفر للاحتراف.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4">روابط سريعة</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => navigateTo('lessons')} className="text-muted-foreground hover:text-foreground transition-colors">
                      الدروس
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('simulator')} className="text-muted-foreground hover:text-foreground transition-colors">
                      محاكي الكود
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('leaderboard')} className="text-muted-foreground hover:text-foreground transition-colors">
                      المتصدرين
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">تواصل معنا</h4>
                <ul className="space-y-2">
                  <li className="text-muted-foreground">
                    البريد: info@csharp-academy.com
                  </li>
                  <li className="text-muted-foreground">
                    تويتر: @CSharpAcademy
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t text-center text-muted-foreground text-sm">
              <p>© 2024 C# Academy. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
