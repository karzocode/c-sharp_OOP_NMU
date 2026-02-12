// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  totalXp: number;
  badges: string[];
  completedLessons: string[];
  completedQuizzes: string[];
  streak: number;
  lastActive: string;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  expectedOutput: string;
  order: number;
  chapterId: string;
  duration: number; // in minutes
  xpReward: number;
  isLocked: boolean;
  prerequisites: string[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  lessons: Lesson[];
  totalXp: number;
}

// Quiz Types
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: Question[];
  xpReward: number;
  timeLimit?: number; // in seconds
}

export interface Question {
  id: string;
  type: 'mcq' | 'code-completion' | 'error-detection';
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  points: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  completedAt: string;
  answers: Record<string, string | number>;
}

// Badge Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  xpBonus: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

// Progress Types
export interface Progress {
  userId: string;
  currentLesson: string;
  completedLessons: string[];
  completedQuizzes: string[];
  totalXp: number;
  currentLevel: number;
  streak: number;
  lastActive: string;
  studyTime: number; // in minutes
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  badges: number;
  streak: number;
}

// Code Execution Types
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

// OOP Simulation Types
export interface ClassNode {
  id: string;
  name: string;
  attributes: string[];
  methods: string[];
  x: number;
  y: number;
  parentId?: string;
}

export interface ObjectInstance {
  id: string;
  classId: string;
  name: string;
  properties: Record<string, any>;
  x: number;
  y: number;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'inheritance' | 'composition' | 'aggregation';
}

// Theme Types
export type Theme = 'light' | 'dark';

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}
