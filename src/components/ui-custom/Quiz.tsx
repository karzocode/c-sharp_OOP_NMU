import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Quiz as QuizType } from '@/types';
import { cn } from '@/lib/utils';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number, totalQuestions: number, xpEarned: number) => void;
  onClose: () => void;
}

export function Quiz({ quiz, onComplete, onClose }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelectAnswer = (answer: number | string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score and XP
      const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      const xpEarned = Math.round((score / totalPoints) * quiz.xpReward);
      
      setQuizCompleted(true);
      onComplete(score, quiz.questions.length, xpEarned);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (quizCompleted) {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const xpEarned = Math.round((score / totalPoints) * quiz.xpReward);

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">اكتمل الاختبار!</h2>
            <p className="text-muted-foreground">
              {percentage >= 80 ? 'أداء ممتاز! 🎉' : 
               percentage >= 60 ? 'أداء جيد! 👍' : 
               'حاول تاني! 💪'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-muted-foreground">النقاط</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{percentage}%</div>
              <div className="text-sm text-muted-foreground">النسبة</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">+{xpEarned}</div>
              <div className="text-sm text-muted-foreground">XP</div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button onClick={handleRetry} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              حاول تاني
            </Button>
            <Button onClick={onClose} className="bg-gradient-fajer text-white gap-2">
              أكمل التعلم
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            سؤال {currentQuestionIndex + 1} من {quiz.questions.length}
          </span>
          <span className="text-sm font-medium text-purple-600">
            {currentQuestion.points} نقطة
          </span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-fajer transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent>
        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.code && (
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto" style={{ direction: 'ltr', textAlign: 'left' }}>
              {currentQuestion.code}
            </pre>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            
            let buttonClass = 'quiz-option';
            if (showResult) {
              if (isCorrectAnswer) {
                buttonClass += ' correct';
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += ' wrong';
              }
            } else if (isSelected) {
              buttonClass += ' border-purple-500 bg-purple-50 dark:bg-purple-900/20';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full text-right p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3",
                  buttonClass
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  isSelected ? "border-purple-500 bg-purple-500 text-white" : "border-muted-foreground",
                  showResult && isCorrectAnswer && "border-green-500 bg-green-500 text-white",
                  showResult && isSelected && !isCorrectAnswer && "border-red-500 bg-red-500 text-white"
                )}>
                  {showResult && isCorrectAnswer && <CheckCircle2 className="w-4 h-4" />}
                  {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4" />}
                  {!showResult && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span>{option}</span>
                {showResult && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-auto" />
                )}
                {showResult && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-red-500 mr-auto" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={cn(
            "p-4 rounded-lg mb-6",
            isCorrect ? "bg-green-50 dark:bg-green-900/20 border border-green-200" : "bg-red-50 dark:bg-red-900/20 border border-red-200"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={cn(
                "font-semibold",
                isCorrect ? "text-green-700" : "text-red-700"
              )}>
                {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="gap-2"
          >
            إلغاء
          </Button>
          
          {!showResult ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="bg-gradient-fajer text-white gap-2"
            >
              تحقق
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-fajer text-white gap-2"
            >
              {isLastQuestion ? 'إنهاء' : 'التالي'}
              {!isLastQuestion && <ArrowLeft className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
