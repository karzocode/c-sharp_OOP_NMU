import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { Page } from '../App';
import { chapters } from '../data/chapters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, ArrowLeft, ListTree } from 'lucide-react';

interface BookPageProps {
  onNavigate: (page: Page, lessonId?: number) => void;
}

// High-level \"book\" view that lets the user browse all chapters and subsections like a textbook
export function BookPage({ onNavigate }: BookPageProps) {
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1
              className={`text-3xl sm:text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('C# OOP Interactive Book', 'كتاب C# OOP التفاعلي')}
            </h1>
            <p
              className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {t(
                'Browse all chapters and sections from the CSE015 lecture notes in one place.',
                'تصفّح جميع فصول وأقسام محاضرات CSE015 في مكان واحد ككتاب متكامل.'
              )}
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onNavigate('lessons')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('Back to Lessons', 'العودة للدروس')}
            </Button>
            <Button
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              {t('Back to Home', 'العودة للرئيسية')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chapters as book sections */}
        <div className="space-y-6">
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-500/10 text-violet-500">
                          {t('Chapter', 'فصل')} {chapter.id}
                        </span>
                      </div>
                      <h2
                        className={`text-xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {chapter.title[language]}
                      </h2>
                      <p
                        className={`mt-1 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {chapter.description[language]}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-2 md:mt-0 gap-2"
                    onClick={() => onNavigate('lesson', chapter.id)}
                  >
                    <ListTree className="w-4 h-4" />
                    {t('Open Detailed View', 'فتح العرض التفصيلي')}
                  </Button>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {chapter.topics.map((topic, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {topic[language]}
                    </span>
                  ))}
                </div>

                {/* Subsections preview */}
                <div
                  className={`mt-2 grid gap-3 md:grid-cols-2 ${
                    chapter.subsections.length === 1 ? 'md:grid-cols-1' : ''
                  }`}
                >
                  {chapter.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className={`rounded-lg border ${
                        theme === 'dark'
                          ? 'border-gray-700 bg-gray-900/40'
                          : 'border-gray-200 bg-gray-50'
                      } p-3`}
                    >
                      <p
                        className={`text-sm font-semibold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {chapter.id}.{subsection.id} — {subsection.title[language]}
                      </p>
                      <p
                        className={`text-xs line-clamp-3 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {subsection.content[language].split('\n')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookPage;

