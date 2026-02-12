// ============================================================================
// Certificate Component
// Generates completion certificates for chapters
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branding } from '../data/chapters';

interface CertificateProps {
  chapterTitle: { en: string; ar: string };
  chapterNumber: number;
  completionDate: string;
  score: number;
  studentName?: string;
}

export function Certificate({ 
  chapterTitle, 
  chapterNumber, 
  completionDate, 
  score,
  studentName = '' 
}: CertificateProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (certificateRef.current) {
      // In a real implementation, this would use html2canvas or similar
      // For now, we'll just show an alert
      alert(language === 'en' 
        ? 'Certificate download feature coming soon!' 
        : 'ميزة تحميل الشهارة قريباً!'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className={`relative p-12 rounded-xl border-4 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/50' 
            : 'bg-gradient-to-br from-white to-gray-50 border-purple-300'
        }`}
        style={{
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)'
        }}
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Brand Name */}
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {branding.company}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'en' ? 'Certificate of Completion' : 'شهادة إتمام'}
            </p>
          </div>

          {/* Title */}
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Certificate of Achievement' : 'شهادة إنجاز'}
          </h1>

          {/* Recipient */}
          <div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'This certifies that' : 'تشهد هذه الشهادة أن'}
            </p>
            <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {studentName || (language === 'en' ? 'Student' : 'الطالب')}
            </p>
          </div>

          {/* Achievement */}
          <div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'has successfully completed' : 'قد أتم بنجاح'}
            </p>
            <p className={`text-xl font-semibold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Chapter ' : 'الفصل '}{chapterNumber}: {chapterTitle[language]}
            </p>
          </div>

          {/* Score */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            score >= 80 ? 'bg-green-500/20 text-green-500' :
            score >= 60 ? 'bg-yellow-500/20 text-yellow-500' :
            'bg-red-500/20 text-red-500'
          }`}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">
              {language === 'en' ? 'Score: ' : 'الدرجة: '}{score}%
            </span>
          </div>

          {/* Date */}
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {language === 'en' ? 'Completed on: ' : 'تم الإتمام في: '}{completionDate}
          </p>

          {/* Signature */}
          <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {branding.owner}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'en' ? 'Founder & Lead Instructor' : 'المؤسس والمدرب الرئيسي'}
            </p>
          </div>

          {/* Copyright */}
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
            {branding.copyright}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Download Certificate' : 'تحميل الشهادة'}
        </Button>
      </div>
    </div>
  );
}

export default Certificate;
