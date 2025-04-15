import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchUserCourses, fetchTodoItems } from '@/lib/data';
import { CourseData, TodoItemData } from '@/lib/types';
import CourseCard from '@/components/CourseCard';
import ToDoItem from '@/components/ToDoItem';
import UpcomingItem from '@/components/UpcomingItem';

interface DashboardProps {
  onSelectCourse?: (course: CourseData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [todoItems, setTodoItems] = useState<TodoItemData[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTodo, setLoadingTodo] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoadingCourses(true);
      setLoadingTodo(true);
      
      // Fetch courses
      const coursesData = await fetchUserCourses();
      setCourses(coursesData);
      setLoadingCourses(false);
      
      // Fetch todo items
      const todoData = await fetchTodoItems();
      setTodoItems(todoData);
      setLoadingTodo(false);
    };
    
    loadData();
  }, []);

  const handleDismissTodo = (id: number) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg shadow-sm p-6 mb-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-primary-300 opacity-20"></div>
        <div className="absolute -top-10 right-20 w-24 h-24 rounded-full bg-primary-400 opacity-10"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-primary-900">Welcome, John!</h2>
          <p className="text-primary-800">Here's what's happening in your courses today.</p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Courses and Coming Up */}
        <div className="lg:col-span-2">
          {/* Courses */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">My Courses</h2>
              <Button variant="ghost" className="text-primary hover:text-primary hover:underline text-sm font-medium">
                View All
              </Button>
            </div>
            
            {loadingCourses ? (
              <div className="text-neutral-500">Loading courses...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="cursor-pointer hover:transform hover:scale-[1.02] transition-transform"
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coming Up */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Coming Up</h2>
              <div className="flex items-center">
                <Button variant="ghost" className="text-primary hover:text-primary hover:underline text-sm font-medium mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  View Calendar
                </Button>
              </div>
            </div>
            
            {loadingTodo ? (
              <div className="text-neutral-500">Loading upcoming items...</div>
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200 shadow-sm">
                {todoItems.length > 0 ? (
                  todoItems.map(item => (
                    <UpcomingItem key={item.id} item={item} />
                  ))
                ) : (
                  <div className="p-4 text-neutral-500 text-center">
                    No upcoming events!
                  </div>
                )}
                
                {/* Additional Example Items */}
                <div className="p-4 flex transition-colors border-l-4 border-l-purple-400 bg-purple-50">
                  <div className="flex-shrink-0 mr-3 bg-purple-100 p-2 rounded-full">
                    <Clock className="text-xl text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-800">Class</h3>
                    <p className="text-sm text-neutral-600 font-medium">CS 615 P 1 01 User Interface Design</p>
                    <p className="text-sm text-neutral-500">Apr 17 at 2pm</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - To Do List */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">To Do</h2>
              <Button variant="ghost" className="text-primary hover:text-primary hover:underline text-sm font-medium">
                View All
              </Button>
            </div>
            
            {loadingTodo ? (
              <div className="text-neutral-500">Loading to-do items...</div>
            ) : (
              <div className="bg-neutral-50 rounded-lg border border-neutral-200 divide-y divide-neutral-200 shadow-sm">
                {todoItems.length > 0 ? (
                  todoItems.map(item => (
                    <ToDoItem key={item.id} item={item} onDismiss={handleDismissTodo} />
                  ))
                ) : (
                  <div className="p-4 text-neutral-500 text-center">
                    No items on your to-do list!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Import for Clock icon
const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none" 
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Dashboard;
