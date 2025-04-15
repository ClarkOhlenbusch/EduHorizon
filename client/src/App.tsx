import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CourseModules from "./pages/CourseModules";
import Announcements from "./pages/Announcements";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import Grades from "./pages/Grades";

function App() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <Switch>
          <Route path="/">
            {activeSection === "dashboard" && <Dashboard />}
            {activeSection === "courses" && <CourseModules />}
            {activeSection === "announcements" && <Announcements />}
            {activeSection === "assignments" && <Assignments />}
            {activeSection === "quizzes" && <Quizzes />}
            {activeSection === "grades" && <Grades />}
            {activeSection !== "dashboard" && 
             activeSection !== "courses" && 
             activeSection !== "announcements" && 
             activeSection !== "assignments" && 
             activeSection !== "quizzes" && 
             activeSection !== "grades" && <NotFound />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
