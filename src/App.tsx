// ============================================================================
// C# OOP Learning Platform - Main App
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonPage } from './pages/LessonPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { BadgesPage } from './pages/BadgesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BookPage } from './pages/BookPage';

export type Page = 'home' | 'lessons' | 'lesson' | 'simulator' | 'badges' | 'leaderboard' | 'book';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const { dir } = useLanguage();
  const { theme } = useTheme();

  // Make navigation available globally
  useEffect(() => {
    (window as any).navigateTo = (page: Page, lessonId?: number) => {
      setCurrentPage(page);
      if (lessonId !== undefined) {
        setSelectedLessonId(lessonId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }, []);

  const navigateTo = (page: Page, lessonId?: number) => {
    setCurrentPage(page);
    if (lessonId !== undefined) {
      setSelectedLessonId(lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`} dir={dir}>
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      
      <main className="pt-16">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'lessons' && <LessonsPage onNavigate={navigateTo} />}
        {currentPage === 'lesson' && selectedLessonId && (
          <LessonPage lessonId={selectedLessonId} onNavigate={navigateTo} />
        )}
        {currentPage === 'simulator' && <SimulatorPage />}
        {currentPage === 'badges' && <BadgesPage />}
        {currentPage === 'leaderboard' && <LeaderboardPage />}
        {currentPage === 'book' && <BookPage onNavigate={navigateTo} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
