import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { fetchUserCourses, fetchCourseQuizzes } from '@/lib/data';
import { QuizData, CourseData } from '@/lib/types';
import QuizItem from '@/components/QuizItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CreateQuizModal from '@/components/modals/CreateQuizModal';
import { useToast } from '@/hooks/use-toast';

const Quizzes: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const coursesData = await fetchUserCourses();
      setCourses(coursesData);
      if (coursesData.length > 0) {
        setSelectedCourseId(coursesData[0].id.toString());
      }
      setLoading(false);
    };
    loadCourses();
  }, []);

  useEffect(() => {
    const loadQuizzes = async () => {
      if (!selectedCourseId) return;
      
      setLoadingQuizzes(true);
      const quizzesData = await fetchCourseQuizzes(parseInt(selectedCourseId));
      
      // Simulate some quizzes as completed for demo
      const enhancedQuizzes = quizzesData.map(quiz => ({
        ...quiz,
        submissionStatus: quiz.title.includes('Computation Midterm') ? 'graded' : 'none',
        grade: quiz.title.includes('Computation Midterm') ? 85 : null
      }));
      
      setQuizzes(enhancedQuizzes);
      setLoadingQuizzes(false);
    };
    
    loadQuizzes();
  }, [selectedCourseId]);

  const handleViewDetails = (id: number) => {
    const quiz = quizzes.find(q => q.id === id);
    if (quiz) {
      toast({
        title: "View Quiz Details",
        description: `You would view details for "${quiz.title}" in a real implementation.`,
      });
    }
  };

  const handleStartQuiz = (id: number) => {
    const quiz = quizzes.find(q => q.id === id);
    if (quiz) {
      toast({
        title: "Start Quiz",
        description: `You would start the quiz "${quiz.title}" in a real implementation.`,
      });
    }
  };

  const handleQuizCreated = (newQuiz: QuizData) => {
    if (parseInt(selectedCourseId) === newQuiz.courseId) {
      setQuizzes([newQuiz, ...quizzes]);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Quizzes</h2>
          <p className="text-neutral-600">Take quizzes and tests for your courses.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded flex items-center"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      {/* Course Selection Dropdown */}
      <div className="mb-6">
        <Label htmlFor="quiz-course-select" className="block text-sm font-medium text-neutral-700 mb-1">
          Select Course
        </Label>
        {loading ? (
          <div className="text-neutral-500">Loading courses...</div>
        ) : (
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="quiz-course-select">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.code} {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Quiz List */}
      <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200">
        {loadingQuizzes ? (
          <div className="p-5 text-neutral-500">Loading quizzes...</div>
        ) : quizzes.length > 0 ? (
          quizzes.map(quiz => (
            <QuizItem 
              key={quiz.id} 
              quiz={quiz}
              onViewDetails={handleViewDetails}
              onStartQuiz={handleStartQuiz}
            />
          ))
        ) : (
          <div className="p-5 text-neutral-500 text-center">No quizzes found for this course.</div>
        )}
      </div>

      {/* Create Quiz Modal */}
      <CreateQuizModal 
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        courses={courses}
      />
    </div>
  );
};

export default Quizzes;
