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
import CourseHome from "./pages/CourseHome";
import AIChatAssistant from "./components/AIChatAssistant";
import { useToast } from "@/hooks/use-toast";
import { CourseData } from "@/lib/types";

function App() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const { toast } = useToast();

  // Calendar page handling
  const handleCalendarPage = () => {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Calendar</h2>
        <p className="text-neutral-600 mb-6">Your academic schedule and events calendar.</p>
        <img 
          src="https://cdn.dribbble.com/users/1192538/screenshots/6887260/calendar_app_4x.png" 
          alt="Calendar Interface" 
          className="w-full max-w-2xl rounded-lg shadow-md mb-6" 
        />
        <p className="text-neutral-500 text-center">
          The calendar view would display all your assignments, quizzes, and class schedules in a user-friendly interface.
        </p>
      </div>
    );
  };

  const handleNavigateBack = () => {
    setSelectedCourse(null);
    setActiveSection("dashboard");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onSelectCourse={setSelectedCourse}
      >
        <Switch>
          <Route path="/">
            {selectedCourse ? (
              <CourseHome course={selectedCourse} onNavigateBack={handleNavigateBack} />
            ) : (
              <>
                {activeSection === "dashboard" && <Dashboard onSelectCourse={setSelectedCourse} />}
                {activeSection === "courses" && <CourseModules />}
                {activeSection === "announcements" && <Announcements />}
                {activeSection === "assignments" && <Assignments />}
                {activeSection === "quizzes" && <Quizzes />}
                {activeSection === "grades" && <Grades />}
                {activeSection === "calendar" && handleCalendarPage()}
                {activeSection !== "dashboard" && 
                activeSection !== "courses" && 
                activeSection !== "announcements" && 
                activeSection !== "assignments" && 
                activeSection !== "quizzes" && 
                activeSection !== "grades" && 
                activeSection !== "calendar" && <NotFound />}
              </>
            )}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
      <AIChatAssistant />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
