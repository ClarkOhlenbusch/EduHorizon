import { 
  CourseData, 
  TodoItemData, 
  ModuleData,
  ModuleItemData,
  AssignmentData,
  QuizData,
  AnnouncementData,
  SubmissionData
} from './types';
import { format } from 'date-fns';

// Current user data (hardcoded for simplicity in this demo)
export const currentUser = {
  id: 1,
  username: "jsmith",
  displayName: "John Smith",
  email: "student@example.com",
  role: "student",
  avatarInitials: "JS"
};

// Utility functions for date formatting
export const formatDate = (date: Date | string) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy');
};

export const formatDateTime = (date: Date | string) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "MMM d 'at' h:mma");
};

export const formatTimeAgo = (date: Date | string) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return '1 month ago';
  return `${Math.floor(diffInDays / 30)} months ago`;
};

// API functions to fetch data

// Fetch courses for the current user
export const fetchUserCourses = async (): Promise<CourseData[]> => {
  try {
    const response = await fetch(`/api/user/${currentUser.id}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// Fetch todo items for the current user
export const fetchTodoItems = async (): Promise<TodoItemData[]> => {
  try {
    const response = await fetch(`/api/user/${currentUser.id}/todo`);
    if (!response.ok) throw new Error('Failed to fetch todo items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching todo items:', error);
    return [];
  }
};

// Fetch modules for a course
export const fetchCourseModules = async (courseId: number): Promise<ModuleData[]> => {
  try {
    const response = await fetch(`/api/courses/${courseId}/modules`);
    if (!response.ok) throw new Error('Failed to fetch modules');
    return await response.json();
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

// Fetch module items
export const fetchModuleItems = async (moduleId: number): Promise<ModuleItemData[]> => {
  try {
    const response = await fetch(`/api/modules/${moduleId}/items`);
    if (!response.ok) throw new Error('Failed to fetch module items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching module items:', error);
    return [];
  }
};

// Fetch assignments for a course
export const fetchCourseAssignments = async (courseId: number): Promise<AssignmentData[]> => {
  try {
    const response = await fetch(`/api/courses/${courseId}/assignments`);
    if (!response.ok) throw new Error('Failed to fetch assignments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
};

// Fetch quizzes for a course
export const fetchCourseQuizzes = async (courseId: number): Promise<QuizData[]> => {
  try {
    const response = await fetch(`/api/courses/${courseId}/quizzes`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
};

// Fetch announcements
export const fetchAnnouncements = async (courseId?: number): Promise<AnnouncementData[]> => {
  try {
    const url = courseId ? `/api/courses/${courseId}/announcements` : '/api/announcements';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch announcements');
    return await response.json();
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

// Submit an assignment
export const submitAssignment = async (submission: SubmissionData): Promise<boolean> => {
  try {
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) throw new Error('Failed to submit assignment');
    return true;
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return false;
  }
};

// Create a quiz
export const createQuiz = async (quiz: Partial<QuizData>): Promise<QuizData | null> => {
  try {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quiz),
    });
    
    if (!response.ok) throw new Error('Failed to create quiz');
    return await response.json();
  } catch (error) {
    console.error('Error creating quiz:', error);
    return null;
  }
};

// Create an assignment
export const createAssignment = async (assignment: Partial<AssignmentData>): Promise<AssignmentData | null> => {
  try {
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignment),
    });
    
    if (!response.ok) throw new Error('Failed to create assignment');
    return await response.json();
  } catch (error) {
    console.error('Error creating assignment:', error);
    return null;
  }
};

// Create an announcement
export const createAnnouncement = async (announcement: Partial<AnnouncementData>): Promise<AnnouncementData | null> => {
  try {
    const response = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...announcement,
        userId: currentUser.id,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create announcement');
    return await response.json();
  } catch (error) {
    console.error('Error creating announcement:', error);
    return null;
  }
};
