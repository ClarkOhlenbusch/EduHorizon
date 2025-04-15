import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("student"), // student, instructor, admin
  avatarInitials: text("avatar_initials"), // Used for displaying initials in avatar
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull(), // E.g., CS 615 P 1 01
  term: text("term").notNull(), // E.g., Spring 2023
  status: text("status").notNull().default("active"), // active, archived
  color: text("color"), // Course card color
  instructorId: integer("instructor_id").notNull().references(() => users.id),
});

// Course enrollments
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  role: text("role").notNull().default("student"), // student, assistant, instructor
});

// Modules
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  position: integer("position").notNull().default(0),
});

// Module items
export const moduleItems = pgTable("module_items", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // file, page, assignment, quiz, discussion, etc.
  position: integer("position").notNull().default(0),
  url: text("url"),
  content: text("content"),
});

// Assignments
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  dueDate: timestamp("due_date"),
  pointsPossible: integer("points_possible"),
  instructions: text("instructions"),
  status: text("status").notNull().default("published"), // draft, published
});

// Submissions
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id").notNull().references(() => assignments.id),
  userId: integer("user_id").notNull().references(() => users.id),
  submittedAt: timestamp("submitted_at"),
  status: text("status").notNull().default("none"), // none, submitted, graded
  grade: integer("grade"),
  comment: text("comment"),
  fileUrl: text("file_url"),
});

// Quizzes
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  dueDate: timestamp("due_date"),
  timeLimit: integer("time_limit"), // In minutes
  pointsPossible: integer("points_possible"),
  instructions: text("instructions"),
  status: text("status").notNull().default("published"), // draft, published
});

// Quiz questions
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull(), // multiple_choice, true_false, short_answer, essay
  points: integer("points").notNull().default(1),
  position: integer("position").notNull().default(0),
});

// Quiz question options
export const quizOptions = pgTable("quiz_options", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull().references(() => quizQuestions.id),
  optionText: text("option_text").notNull(),
  isCorrect: boolean("is_correct").notNull().default(false),
  position: integer("position").notNull().default(0),
});

// Quiz attempts
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  userId: integer("user_id").notNull().references(() => users.id),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  score: integer("score"),
  status: text("status").notNull().default("in_progress"), // in_progress, submitted, graded
});

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("published"), // draft, published
});

// To-do items
export const todoItems = pgTable("todo_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  courseId: integer("course_id").references(() => courses.id),
  dueDate: timestamp("due_date"),
  points: integer("points"),
  type: text("type").notNull(), // assignment, quiz, etc.
  referenceId: integer("reference_id"), // ID of the associated item
  completed: boolean("completed").notNull().default(false),
});

// Create insert schemas for forms
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  role: true,
  avatarInitials: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  code: true,
  term: true,
  status: true,
  color: true,
  instructorId: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).pick({
  title: true,
  courseId: true,
  dueDate: true,
  pointsPossible: true,
  instructions: true,
  status: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  courseId: true,
  dueDate: true,
  timeLimit: true,
  pointsPossible: true,
  instructions: true,
  status: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).pick({
  assignmentId: true,
  userId: true,
  submittedAt: true,
  fileUrl: true,
  comment: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  courseId: true,
  userId: true,
  content: true,
  status: true,
});

// Define proper types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Module = typeof modules.$inferSelect;
export type ModuleItem = typeof moduleItems.$inferSelect;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizOption = typeof quizOptions.$inferSelect;

export type TodoItem = typeof todoItems.$inferSelect;
