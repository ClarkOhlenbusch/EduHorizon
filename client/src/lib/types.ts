// Common types used throughout the application

export interface CourseData {
  id: number;
  title: string;
  code: string;
  term: string;
  status: string;
  color: string;
}

export interface ModuleData {
  id: number;
  title: string;
  courseId: number;
  position: number;
  itemCount?: number;
}

export interface ModuleItemData {
  id: number;
  moduleId: number;
  title: string;
  type: string;
  position: number;
  url: string | null;
  content: string | null;
}

export interface AssignmentData {
  id: number;
  title: string;
  courseId: number;
  dueDate: string | Date;
  pointsPossible: number | null;
  instructions: string | null;
  status: string;
  submissionStatus?: string;
  grade?: number | null;
}

export interface QuizData {
  id: number;
  title: string;
  courseId: number;
  dueDate: string | Date;
  timeLimit: number | null;
  pointsPossible: number | null;
  instructions: string | null;
  status: string;
  submissionStatus?: string;
  grade?: number | null;
}

export interface QuizQuestionData {
  id: number;
  quizId: number;
  questionText: string;
  questionType: string;
  points: number;
  position: number;
  options?: QuizOptionData[];
}

export interface QuizOptionData {
  id: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
  position: number;
}

export interface AnnouncementData {
  id: number;
  title: string;
  courseId: number;
  userId: number;
  content: string;
  createdAt: string | Date;
  status: string;
  courseName?: string;
  authorName?: string;
  read?: boolean;
}

export interface TodoItemData {
  id: number;
  userId: number;
  title: string;
  courseId: number | null;
  courseName?: string;
  dueDate: string | Date;
  points: number | null;
  type: string;
  referenceId: number | null;
  completed: boolean;
}

export interface SubmissionData {
  assignmentId: number;
  userId: number;
  submittedAt?: string | Date;
  fileUrl?: string;
  comment?: string;
}

export interface UserData {
  id: number;
  username: string;
  displayName: string;
  email: string;
  role: string;
  avatarInitials: string | null;
}
