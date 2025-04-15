import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Don't send password
    const { password, ...safeUser } = user;
    res.json(safeUser);
  });

  // Courses routes
  app.get("/api/courses", async (req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  app.get("/api/user/:userId/courses", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const courses = await storage.getUserCourses(userId);
    res.json(courses);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = await storage.getCourse(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  // Modules routes
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const modules = await storage.getModules(courseId);
    res.json(modules);
  });

  app.get("/api/modules/:moduleId/items", async (req, res) => {
    const moduleId = parseInt(req.params.moduleId);
    const items = await storage.getModuleItems(moduleId);
    res.json(items);
  });

  // Assignments routes
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const assignments = await storage.getAssignments(courseId);
    res.json(assignments);
  });

  app.get("/api/assignments/:id", async (req, res) => {
    const assignmentId = parseInt(req.params.id);
    const assignment = await storage.getAssignment(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  });

  app.post("/api/assignments", async (req, res) => {
    try {
      const assignment = await storage.createAssignment(req.body);
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ message: "Invalid assignment data" });
    }
  });

  // Submissions routes
  app.get("/api/assignments/:assignmentId/submissions/:userId", async (req, res) => {
    const assignmentId = parseInt(req.params.assignmentId);
    const userId = parseInt(req.params.userId);
    const submission = await storage.getSubmission(assignmentId, userId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.json(submission);
  });

  app.post("/api/submissions", async (req, res) => {
    try {
      const submission = await storage.createSubmission({
        ...req.body,
        submittedAt: new Date(),
      });
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  // Quizzes routes
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const quizzes = await storage.getQuizzes(courseId);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    const quizId = parseInt(req.params.id);
    const quiz = await storage.getQuiz(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  });

  app.post("/api/quizzes", async (req, res) => {
    try {
      const quiz = await storage.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz data" });
    }
  });

  // Announcements routes
  app.get("/api/courses/:courseId/announcements", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const announcements = await storage.getAnnouncements(courseId);
    res.json(announcements);
  });

  app.get("/api/announcements", async (req, res) => {
    const announcements = await storage.getAnnouncements(0); // 0 means all courses
    res.json(announcements);
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      const announcement = await storage.createAnnouncement(req.body);
      res.status(201).json(announcement);
    } catch (error) {
      res.status(400).json({ message: "Invalid announcement data" });
    }
  });

  // Todo items routes
  app.get("/api/user/:userId/todo", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const todoItems = await storage.getUserTodoItems(userId);
    res.json(todoItems);
  });

  const httpServer = createServer(app);
  return httpServer;
}
