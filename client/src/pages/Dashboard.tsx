import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchUserCourses, fetchTodoItems } from '@/lib/data';
import { CourseData, TodoItemData } from '@/lib/types';
import CourseCard from '@/components/CourseCard';
import ToDoItem from '@/components/ToDoItem';
import UpcomingItem from '@/components/UpcomingItem';

const Dashboard: React.FC = () => {
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
      <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, John!</h2>
        <p className="text-neutral-600">Here's what's happening in your courses today.</p>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* To Do List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">To Do</h2>
          <Button variant="ghost" className="text-primary hover:text-primary hover:underline text-sm font-medium">
            View All
          </Button>
        </div>
        
        {loadingTodo ? (
          <div className="text-neutral-500">Loading to-do items...</div>
        ) : (
          <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200">
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
          <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200">
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
            <div className="p-4 flex">
              <div className="flex-shrink-0 mr-3">
                <Clock className="text-xl text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Class</h3>
                <p className="text-sm text-neutral-500">CS 615 P 1 01 User Interface Design</p>
                <p className="text-sm text-neutral-400">Apr 17 at 2pm</p>
              </div>
            </div>
          </div>
        )}
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
