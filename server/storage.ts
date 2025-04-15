import {
  users,
  courses,
  modules,
  moduleItems,
  assignments,
  submissions,
  quizzes,
  quizQuestions,
  quizOptions,
  announcements,
  todoItems,
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Assignment,
  type InsertAssignment,
  type Submission,
  type InsertSubmission,
  type Quiz,
  type InsertQuiz,
  type Module,
  type ModuleItem,
  type QuizQuestion,
  type QuizOption,
  type Announcement,
  type InsertAnnouncement,
  type TodoItem,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  getUserCourses(userId: number): Promise<Course[]>;
  
  // Module methods
  getModules(courseId: number): Promise<Module[]>;
  getModuleItems(moduleId: number): Promise<ModuleItem[]>;
  
  // Assignment methods
  getAssignments(courseId: number): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  
  // Submission methods
  getSubmission(assignmentId: number, userId: number): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  
  // Quiz methods
  getQuizzes(courseId: number): Promise<Quiz[]>;
  getQuiz(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizQuestions(quizId: number): Promise<QuizQuestion[]>;
  getQuizOptions(questionId: number): Promise<QuizOption[]>;
  
  // Announcement methods
  getAnnouncements(courseId: number): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Todo methods
  getUserTodoItems(userId: number): Promise<TodoItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private modules: Map<number, Module>;
  private moduleItems: Map<number, ModuleItem[]>;
  private assignments: Map<number, Assignment>;
  private submissions: Map<number, Submission>;
  private quizzes: Map<number, Quiz>;
  private quizQuestions: Map<number, QuizQuestion[]>;
  private quizOptions: Map<number, QuizOption[]>;
  private announcements: Map<number, Announcement>;
  private todoItems: Map<number, TodoItem[]>;

  private userIdCounter: number;
  private courseIdCounter: number;
  private moduleIdCounter: number;
  private moduleItemIdCounter: number;
  private assignmentIdCounter: number;
  private submissionIdCounter: number;
  private quizIdCounter: number;
  private questionIdCounter: number;
  private optionIdCounter: number;
  private announcementIdCounter: number;
  private todoIdCounter: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.modules = new Map();
    this.moduleItems = new Map();
    this.assignments = new Map();
    this.submissions = new Map();
    this.quizzes = new Map();
    this.quizQuestions = new Map();
    this.quizOptions = new Map();
    this.announcements = new Map();
    this.todoItems = new Map();

    this.userIdCounter = 1;
    this.courseIdCounter = 1;
    this.moduleIdCounter = 1;
    this.moduleItemIdCounter = 1;
    this.assignmentIdCounter = 1;
    this.submissionIdCounter = 1;
    this.quizIdCounter = 1;
    this.questionIdCounter = 1;
    this.optionIdCounter = 1;
    this.announcementIdCounter = 1;
    this.todoIdCounter = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create a sample user
    const sampleUser: InsertUser = {
      username: "jsmith",
      password: "password123",
      displayName: "John Smith",
      email: "student@example.com",
      role: "student",
      avatarInitials: "JS"
    };
    this.createUser(sampleUser);

    // Create a sample instructor
    const instructor: InsertUser = {
      username: "professor",
      password: "securepass",
      displayName: "Professor Johnson",
      email: "professor@example.com",
      role: "instructor",
      avatarInitials: "PJ"
    };
    const profUser = this.createUser(instructor);

    // Create sample courses
    const courses = [
      {
        title: "User Interface Design",
        code: "CS 615 P 1 01",
        term: "Spring 2023",
        status: "active",
        color: "#0374B5",
        instructorId: profUser.id
      },
      {
        title: "Intro THRY Computation",
        code: "CS 420 P 1 02",
        term: "Spring 2023",
        status: "active",
        color: "#B86E00",
        instructorId: profUser.id
      },
      {
        title: "Aquaculture",
        code: "ENVSCI 134 OL 1 01",
        term: "Spring 2023",
        status: "active",
        color: "#2D8C3C",
        instructorId: profUser.id
      },
      {
        title: "Elem Italian II",
        code: "ITAL 102 OL 1 01",
        term: "Spring 2023",
        status: "active",
        color: "#B82E00",
        instructorId: profUser.id
      },
      {
        title: "Programming in C",
        code: "CS 240 P 1 02",
        term: "Fall 2024",
        status: "active",
        color: "#2D8C3C",
        instructorId: profUser.id
      }
    ];

    const createdCourses = courses.map(course => this.createCourse(course));

    // Create modules for the first course
    const uiDesignCourse = createdCourses[0];
    const modules = [
      {
        id: this.moduleIdCounter++,
        title: "Module 1: Introduction to User Interface Design",
        courseId: uiDesignCourse.id,
        position: 0
      },
      {
        id: this.moduleIdCounter++,
        title: "Module 2: Visual Design Fundamentals",
        courseId: uiDesignCourse.id,
        position: 1
      },
      {
        id: this.moduleIdCounter++,
        title: "Module 3: Prototyping Techniques",
        courseId: uiDesignCourse.id,
        position: 2
      }
    ];

    modules.forEach(module => {
      this.modules.set(module.id, module);
    });

    // Add module items
    const moduleItems1 = [
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[0].id,
        title: "Course Syllabus",
        type: "file",
        position: 0,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[0].id,
        title: "Lecture 1: Introduction to UI/UX Principles",
        type: "video",
        position: 1,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[0].id,
        title: "Required Reading: Design of Everyday Things (Ch. 1)",
        type: "reading",
        position: 2,
        url: "#",
        content: null
      }
    ];

    const moduleItems2 = [
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[1].id,
        title: "Lecture 2: Color Theory & Typography",
        type: "video",
        position: 0,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[1].id,
        title: "Slide Deck: Visual Hierarchy",
        type: "file",
        position: 1,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[1].id,
        title: "Reading: Gestalt Principles in UI Design",
        type: "pdf",
        position: 2,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[1].id,
        title: "External Resource: Adobe Color Wheel",
        type: "external_link",
        position: 3,
        url: "https://color.adobe.com",
        content: null
      }
    ];

    const moduleItems3 = [
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[2].id,
        title: "Lecture 3: From Sketches to Wireframes",
        type: "video",
        position: 0,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[2].id,
        title: "Demo: Using Figma for UI Prototyping",
        type: "video",
        position: 1,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[2].id,
        title: "Assignment Instructions: Lo-Fi Prototype",
        type: "file",
        position: 2,
        url: "#",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[2].id,
        title: "External Resource: Figma Tutorial",
        type: "external_link",
        position: 3,
        url: "https://www.figma.com/resources/learn-design/",
        content: null
      },
      {
        id: this.moduleItemIdCounter++,
        moduleId: modules[2].id,
        title: "Discussion: Share Your Prototype Ideas",
        type: "discussion",
        position: 4,
        url: "#",
        content: null
      }
    ];

    this.moduleItems.set(modules[0].id, moduleItems1);
    this.moduleItems.set(modules[1].id, moduleItems2);
    this.moduleItems.set(modules[2].id, moduleItems3);

    // Create assignments
    const assignments = [
      {
        id: this.assignmentIdCounter++,
        title: "Project Step 5 - Computer Prototyping",
        courseId: uiDesignCourse.id,
        dueDate: new Date("2023-04-15T23:59:00"),
        pointsPossible: 100,
        instructions: "Create a high-fidelity computer prototype of your user interface design based on the feedback received from your paper prototype.",
        status: "published"
      },
      {
        id: this.assignmentIdCounter++,
        title: "Assignment -- Passato Prossimo o Imperfetto",
        courseId: createdCourses[3].id,
        dueDate: new Date("2023-04-20T23:59:00"),
        pointsPossible: 0,
        instructions: "Complete the exercises on when to use Passato Prossimo versus Imperfetto tenses in Italian.",
        status: "published"
      },
      {
        id: this.assignmentIdCounter++,
        title: "Project Step 4 - Paper Prototyping",
        courseId: uiDesignCourse.id,
        dueDate: new Date("2023-04-01T23:59:00"),
        pointsPossible: 100,
        instructions: "Create paper prototypes of your user interface design and conduct user testing with at least 3 participants.",
        status: "published"
      },
      {
        id: this.assignmentIdCounter++,
        title: "Project Step 3 - Wireframes",
        courseId: uiDesignCourse.id,
        dueDate: new Date("2023-03-15T23:59:00"),
        pointsPossible: 100,
        instructions: "Create wireframes for your user interface design.",
        status: "published"
      }
    ];

    assignments.forEach(assignment => {
      this.assignments.set(assignment.id, assignment);
    });

    // Create submission for a completed assignment
    const submission: Submission = {
      id: this.submissionIdCounter++,
      assignmentId: assignments[2].id,
      userId: 1,
      submittedAt: new Date("2023-04-01T20:45:00"),
      status: "graded",
      grade: 94,
      comment: "Great job on the paper prototype! Your user testing methodology was very thorough.",
      fileUrl: "#"
    };
    this.submissions.set(submission.id, submission);

    // Create quizzes
    const quizzes = [
      {
        id: this.quizIdCounter++,
        title: "UI/UX Design Principles Quiz",
        courseId: uiDesignCourse.id,
        dueDate: new Date("2023-04-22T23:59:00"),
        timeLimit: 20,
        pointsPossible: 20,
        instructions: "This quiz covers the material from Modules 1-3 on UI/UX design principles, visual design fundamentals, and basic prototyping concepts.",
        status: "published"
      },
      {
        id: this.quizIdCounter++,
        title: "Introduction to Computation Midterm",
        courseId: createdCourses[1].id,
        dueDate: new Date("2023-03-15T23:59:00"),
        timeLimit: 90,
        pointsPossible: 100,
        instructions: "Comprehensive midterm exam covering automata theory, formal languages, and computability concepts.",
        status: "published"
      },
      {
        id: this.quizIdCounter++,
        title: "Italian Verb Conjugation Quiz",
        courseId: createdCourses[3].id,
        dueDate: new Date("2023-04-25T23:59:00"),
        timeLimit: 15,
        pointsPossible: 15,
        instructions: "Test your knowledge of Italian verb conjugations, including regular and irregular verbs in present and past tenses.",
        status: "published"
      }
    ];

    quizzes.forEach(quiz => {
      this.quizzes.set(quiz.id, quiz);
    });

    // Create announcements
    const announcements = [
      {
        id: this.announcementIdCounter++,
        title: "Important: Final Project Requirements Update",
        courseId: uiDesignCourse.id,
        userId: profUser.id,
        content: "Dear students, I've updated the requirements for the final project. Please review the updated document in the course materials section. The main changes affect the deliverable format and submission deadline.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: "published"
      },
      {
        id: this.announcementIdCounter++,
        title: "Guest Lecture This Thursday",
        courseId: createdCourses[2].id,
        userId: profUser.id,
        content: "We'll be having a guest lecture this Thursday by Dr. Sarah Chen, a leading researcher in sustainable aquaculture practices. The lecture will be recorded for those who cannot attend live.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        status: "published"
      },
      {
        id: this.announcementIdCounter++,
        title: "Midterm Exam Grades Posted",
        courseId: createdCourses[1].id,
        userId: profUser.id,
        content: "The grades for the midterm exam have been posted. The class average was 82%. If you'd like to discuss your exam, please sign up for office hours using the link below.",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        status: "published"
      }
    ];

    announcements.forEach(announcement => {
      this.announcements.set(announcement.id, announcement);
    });

    // Create todo items
    const todoItems = [
      {
        id: this.todoIdCounter++,
        userId: 1,
        title: "Turn in Project Step 5 - Computer Prototyping",
        courseId: uiDesignCourse.id,
        dueDate: new Date("2023-04-15T23:59:00"),
        points: 100,
        type: "assignment",
        referenceId: assignments[0].id,
        completed: false
      },
      {
        id: this.todoIdCounter++,
        userId: 1,
        title: "Turn in Assignment -- Passato Prossimo o Imperfetto",
        courseId: createdCourses[3].id,
        dueDate: new Date("2023-04-20T23:59:00"),
        points: 0,
        type: "assignment",
        referenceId: assignments[1].id,
        completed: false
      }
    ];

    this.todoItems.set(1, todoItems);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.courseIdCounter++;
    const newCourse: Course = { id, ...course };
    this.courses.set(id, newCourse);
    return newCourse;
  }

  async getUserCourses(userId: number): Promise<Course[]> {
    // In a real app, you'd query enrollments, but for this demo just return all courses
    return Array.from(this.courses.values());
  }

  // Module methods
  async getModules(courseId: number): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.position - b.position);
  }

  async getModuleItems(moduleId: number): Promise<ModuleItem[]> {
    return this.moduleItems.get(moduleId) || [];
  }

  // Assignment methods
  async getAssignments(courseId: number): Promise<Assignment[]> {
    return Array.from(this.assignments.values())
      .filter(assignment => assignment.courseId === courseId);
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    return this.assignments.get(id);
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const id = this.assignmentIdCounter++;
    const newAssignment: Assignment = { id, ...assignment };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }

  // Submission methods
  async getSubmission(assignmentId: number, userId: number): Promise<Submission | undefined> {
    return Array.from(Object.values(this.submissions))
      .find(sub => sub.assignmentId === assignmentId && sub.userId === userId);
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const id = this.submissionIdCounter++;
    const newSubmission: Submission = { 
      id, 
      ...submission,
      status: "submitted",
      grade: null,
      comment: null
    };
    this.submissions.set(id, newSubmission);
    return newSubmission;
  }

  // Quiz methods
  async getQuizzes(courseId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.courseId === courseId);
  }

  async getQuiz(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const id = this.quizIdCounter++;
    const newQuiz: Quiz = { id, ...quiz };
    this.quizzes.set(id, newQuiz);
    return newQuiz;
  }

  async getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
    return this.quizQuestions.get(quizId) || [];
  }

  async getQuizOptions(questionId: number): Promise<QuizOption[]> {
    return this.quizOptions.get(questionId) || [];
  }

  // Announcement methods
  async getAnnouncements(courseId: number): Promise<Announcement[]> {
    if (courseId === 0) {
      // Return all announcements sorted by date
      return Array.from(this.announcements.values())
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return Array.from(this.announcements.values())
      .filter(announcement => announcement.courseId === courseId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementIdCounter++;
    const newAnnouncement: Announcement = { 
      id, 
      ...announcement,
      createdAt: new Date()
    };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }

  // Todo methods
  async getUserTodoItems(userId: number): Promise<TodoItem[]> {
    return this.todoItems.get(userId) || [];
  }
}

export const storage = new MemStorage();
