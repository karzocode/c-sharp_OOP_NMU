// ============================================================================
// Advanced Quiz Component
// Supports multiple question types with animations and detailed feedback
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, XCircle, AlertTriangle, ChevronRight, RotateCcw, Trophy, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { QuizQuestion } from '../data/chapters';

interface AdvancedQuizProps {
  questions: QuizQuestion[];
  passingScore: number;
  onComplete: (score: number, passed: boolean) => void;
  onRetry?: () => void;
}

interface AnswerState {
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
}

export function AdvancedQuiz({ questions, passingScore, onComplete, onRetry }: AdvancedQuizProps) {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [animation, setAnimation] = useState<'correct' | 'incorrect' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (answerIndex: number) => {
    if (currentAnswer?.showExplanation) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedAnswer: answerIndex,
        isCorrect,
        showExplanation: true
      }
    }));

    setAnimation(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => setAnimation(null), 500);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      const finalScore = Math.round((score / questions.length) * 100);
      onComplete(finalScore, finalScore >= passingScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    if (onRetry) onRetry();
  };

  const getQuestionTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      'mcq': { en: 'Multiple Choice', ar: 'اختيار من متعدد' },
      'code-completion': { en: 'Code Completion', ar: 'إكمال الكود' },
      'find-bug': { en: 'Find the Bug', ar: 'أوجد الخطأ' },
      'output-prediction': { en: 'Output Prediction', ar: 'توقع الناتج' },
      'concept-reasoning': { en: 'Concept Reasoning', ar: 'استدلال مفهومي' }
    };
    return labels[type] || { en: 'Question', ar: 'سؤال' };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Results view
  if (showResults) {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= passingScore;

    return (
      <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-8 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            passed ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {passed ? (
              <Trophy className="w-12 h-12 text-green-500" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-red-500" />
            )}
          </div>

          <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {passed ? t('Congratulations!', 'مبروك!') : t('Keep Practicing!', 'واصل التمرين!')}
          </h2>

          <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {passed 
              ? t('You passed the quiz!', 'لقد اجتزت الاختبار!')
              : t('You need ' + passingScore + '% to pass. Try again!', 'تحتاج إلى ' + passingScore + '% للنجاح. حاول مرة أخرى!')
            }
          </p>

          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className={`text-4xl font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>
                {finalScore}%
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('Your Score', 'درجتك')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500">
                {score}/{questions.length}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('Correct Answers', 'إجابات صحيحة')}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {!passed && (
              <Button onClick={handleRetry} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('Retry Quiz', 'إعادة الاختبار')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className={`flex items-center justify-between p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {t('Question', 'سؤال')} {currentQuestionIndex + 1} / {questions.length}
          </Badge>
          <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} text-white`}>
            {currentQuestion.difficulty === 'easy' ? t('Easy', 'سهل') : 
             currentQuestion.difficulty === 'medium' ? t('Medium', 'متوسط') : t('Hard', 'صعب')}
          </Badge>
          <Badge variant="secondary">
            {getQuestionTypeLabel(currentQuestion.type)[language]}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('Passing score:', 'درجة النجاح:')} {passingScore}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${
        animation === 'correct' ? 'animate-pulse border-green-500' : 
        animation === 'incorrect' ? 'animate-shake border-red-500' : ''
      }`}>
        <CardContent className="p-6">
          {/* Question */}
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {currentQuestion.question[language]}
          </h3>

          {/* Code if present */}
          {currentQuestion.code && (
            <pre className={`p-4 rounded-lg mb-6 overflow-x-auto font-mono text-sm ${
              theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
            }`}>
              {currentQuestion.code}
            </pre>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer?.selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = currentAnswer?.showExplanation;

              let buttonClass = `w-full text-left p-4 rounded-lg border-2 transition-all duration-200 `;
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += `border-green-500 bg-green-500/10 `;
                } else if (isSelected && !isCorrect) {
                  buttonClass += `border-red-500 bg-red-500/10 `;
                } else {
                  buttonClass += `${theme === 'dark' ? 'border-gray-700 opacity-50' : 'border-gray-200 opacity-50'} `;
                }
              } else {
                buttonClass += `${theme === 'dark' ? 'border-gray-700 hover:border-purple-500 hover:bg-gray-700' : 'border-gray-200 hover:border-purple-500 hover:bg-gray-50'} `;
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : isSelected
                            ? 'bg-red-500 text-white'
                            : theme === 'dark'
                              ? 'bg-gray-700 text-gray-400'
                              : 'bg-gray-200 text-gray-600'
                        : isSelected
                          ? 'bg-purple-500 text-white'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-400'
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                      {showResult && isCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                      {option[language]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {currentAnswer?.showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              currentAnswer.isCorrect 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {currentAnswer.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-semibold ${
                  currentAnswer.isCorrect ? 'text-green-500' : 'text-red-500'
                }`}>
                  {currentAnswer.isCorrect ? t('Correct!', 'صحيح!') : t('Incorrect', 'خطأ')}
                </span>
              </div>

              <div className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p><strong>{t('Explanation:', 'الشرح:')}</strong> {currentQuestion.explanation[language]}</p>
                
                <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className="text-sm"><strong>{t('Why this is correct:', 'لماذا هذا صحيح:')}</strong></p>
                  <p className="text-sm mt-1">{currentQuestion.whyCorrect[language]}</p>
                </div>

                <div className="text-sm">
                  <p className="font-semibold mb-2">{t('Why other options are wrong:', 'لماذا الخيارات الأخرى خاطئة:')}</p>
                  <ul className="space-y-1">
                    {currentQuestion.whyOthersWrong.map((wrong, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>{wrong[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-purple-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{t('Reference:', 'مرجع:')} {currentQuestion.reference}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          {t('Previous', 'السابق')}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!currentAnswer?.showExplanation}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <>
              {t('Finish', 'إنهاء')}
              <Trophy className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              {t('Next', 'التالي')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default AdvancedQuiz;
