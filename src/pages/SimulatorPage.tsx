// ============================================================================
// Enhanced Simulator Page with Full IDE
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { AdvancedIDE } from '../components/AdvancedIDE';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Terminal, Sparkles, BookOpen } from 'lucide-react';

export function SimulatorPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const tips = [
    {
      icon: Terminal,
      title: t('Console Output', 'ناتج الكونسول'),
      description: t('Use Console.WriteLine() to display output', 'استخدم Console.WriteLine() لعرض الناتج')
    },
    {
      icon: Code,
      title: t('Variables', 'المتغيرات'),
      description: t('Supported: int, string, double, bool', 'مدعومة: int، string، double، bool')
    },
    {
      icon: BookOpen,
      title: t('Classes & Objects', 'الكلاسات والكائنات'),
      description: t('Create classes and instantiate objects', 'أنشئ كلاسات وكائنات')
    },
    {
      icon: Sparkles,
      title: t('String Interpolation', 'الاستيفاء النصي'),
      description: t('Use $"Hello {name}" syntax', 'استخدم صيغة $"Hello {name}"')
    }
  ];

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t('C# IDE', 'بيئة تطوير سي شارب')}
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t(
                  'Write, compile, and run C# code directly in your browser',
                  'اكتب، اترجم، وشغل كود سي شارب مباشرة في متصفحك'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Main IDE */}
        <AdvancedIDE
          height="600px"
          showExamples={true}
        />

        {/* Tips Section */}
        <div className="mt-8">
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('Quick Tips', 'نصائح سريعة')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <Card key={i} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Icon className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {tip.title}
                        </h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <Card className={`mt-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('IDE Features', 'ميزات بيئة التطوير')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  {t('Editor Features', 'ميزات المحرر')}
                </h3>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Syntax highlighting for C#', 'تلوين النحو لسي شارب')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Line numbers', 'أرقام الأسطر')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Auto-indentation with Tab key', 'إزاحة تلقائية بمفتاح Tab')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Code templates', 'قوالب الكود')}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  {t('Execution Features', 'ميزات التنفيذ')}
                  </h3>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Simulated C# execution', 'تنفيذ محاكى لسي شارب')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Console output display', 'عرض ناتج الكونسول')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Error reporting', 'تقارير الأخطاء')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('Download code as .cs file', 'تحميل الكود كملف .cs')}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SimulatorPage;
