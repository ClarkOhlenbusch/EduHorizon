import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Calendar } from 'lucide-react';
import { fetchUserCourses, fetchCourseAssignments, fetchCourseQuizzes } from '@/lib/data';
import { AssignmentData, QuizData, CourseData } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import PostGradesModal from '@/components/modals/PostGradesModal';
import { formatDate } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface GradeItem {
  id: number;
  title: string;
  type: 'assignment' | 'quiz';
  dueDate: Date | string;
  status: string;
  score: number | null;
  pointsPossible: number | null;
}

const Grades: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [gradeItems, setGradeItems] = useState<GradeItem[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingGrades, setLoadingGrades] = useState(false);
  const [postGradesModalOpen, setPostGradesModalOpen] = useState(false);
  const { toast } = useToast();

  // Stats calculations
  const currentGrade = gradeItems.length > 0 
    ? Math.round((gradeItems.reduce((total, item) => {
        if (item.score !== null && item.pointsPossible) {
          return total + (item.score / item.pointsPossible) * 100;
        }
        return total;
      }, 0) / gradeItems.filter(item => item.score !== null).length) * 10) / 10
    : 0;

  const totalPoints = gradeItems.reduce((total, item) => {
    if (item.score !== null) {
      return total + item.score;
    }
    return total;
  }, 0);

  const maxPoints = gradeItems.reduce((total, item) => {
    if (item.score !== null && item.pointsPossible) {
      return total + item.pointsPossible;
    }
    return total;
  }, 0);

  const missingCount = gradeItems.filter(item => item.status === 'Due' || item.status === 'Missing').length;

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
    const loadGrades = async () => {
      if (!selectedCourseId) return;
      
      setLoadingGrades(true);
      
      // Fetch both assignments and quizzes
      const courseId = parseInt(selectedCourseId);
      const assignmentsData = await fetchCourseAssignments(courseId);
      const quizzesData = await fetchCourseQuizzes(courseId);
      
      // Convert to unified grade items format
      const assignmentItems: GradeItem[] = assignmentsData.map(assignment => ({
        id: assignment.id,
        title: assignment.title,
        type: 'assignment',
        dueDate: assignment.dueDate,
        status: getStatus(assignment.dueDate, assignment.title.includes('Step 4')),
        score: assignment.title.includes('Step 4') ? 94 : null,
        pointsPossible: assignment.pointsPossible
      }));
      
      const quizItems: GradeItem[] = quizzesData.map(quiz => ({
        id: quiz.id,
        title: quiz.title,
        type: 'quiz',
        dueDate: quiz.dueDate,
        status: getStatus(quiz.dueDate, quiz.title.includes('Computation Midterm')),
        score: quiz.title.includes('Computation Midterm') ? 85 : 
               quiz.title.includes('Concepts Quiz 1') ? 19 : 
               quiz.title.includes('Concepts Quiz 2') ? 18 : null,
        pointsPossible: quiz.pointsPossible
      }));
      
      // Add some additional items for the UI prototype
      const additionalItems: GradeItem[] = [
        {
          id: 1000,
          title: "Project Step 3 - Wireframes",
          type: 'assignment',
          dueDate: "2023-03-15",
          status: "Graded",
          score: 89,
          pointsPossible: 100
        },
        {
          id: 1001,
          title: "UI/UX Concepts Quiz 1",
          type: 'quiz',
          dueDate: "2023-03-08",
          status: "Graded",
          score: 19,
          pointsPossible: 20
        }
      ];
      
      // Combine and sort by due date
      const allItems = [...assignmentItems, ...quizItems, ...additionalItems]
        .sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return dateB - dateA; // Sort descending
        });
      
      setGradeItems(allItems);
      setLoadingGrades(false);
    };
    
    loadGrades();
  }, [selectedCourseId]);

  const getStatus = (dueDate: Date | string, isCompleted: boolean): string => {
    if (isCompleted) return 'Graded';
    
    const due = new Date(dueDate).getTime();
    const now = new Date().getTime();
    
    if (due < now) return 'Missing';
    return 'Due';
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'Graded':
        return 'bg-green-100 text-green-800';
      case 'Due':
        return 'bg-yellow-100 text-yellow-800';
      case 'Missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const handlePostGrades = () => {
    setPostGradesModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Grades</h2>
          <p className="text-neutral-600">View and manage your course grades.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded flex items-center"
          onClick={handlePostGrades}
        >
          <Upload className="mr-2 h-4 w-4" />
          Post Grades
        </Button>
      </div>

      {/* Course Selection Dropdown */}
      <div className="mb-6">
        <Label htmlFor="grades-course-select" className="block text-sm font-medium text-neutral-700 mb-1">
          Select Course
        </Label>
        {loading ? (
          <div className="text-neutral-500">Loading courses...</div>
        ) : (
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="grades-course-select">
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

      {/* Grade Summary */}
      <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-6">
        <h3 className="font-semibold text-lg mb-3">Course Grade Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">Current Grade</div>
            <div className="text-2xl font-bold text-primary">{currentGrade}%</div>
            <div className="text-sm font-medium text-green-600">{getLetterGrade(currentGrade)}</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">Total Points</div>
            <div className="text-2xl font-bold">{totalPoints}/{maxPoints}</div>
            <div className="text-sm text-neutral-500">{Math.round((totalPoints / maxPoints) * 1000) / 10}%</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">Course Rank</div>
            <div className="text-2xl font-bold">5/26</div>
            <div className="text-sm text-neutral-500">Top 20%</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">Missing Assignments</div>
            <div className="text-2xl font-bold">{missingCount}</div>
            <div className="text-sm text-neutral-500">
              {missingCount > 0 ? "Action Required" : "All Caught Up"}
            </div>
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {loadingGrades ? (
          <div className="p-5 text-neutral-500">Loading grades...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Assignment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Out Of</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {gradeItems.length > 0 ? (
                  gradeItems.map((item) => (
                    <tr key={`${item.type}-${item.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-neutral-800">{item.title}</div>
                        <div className="text-sm text-neutral-500">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {item.score !== null ? item.score : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {item.pointsPossible}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="link" 
                          className="text-primary hover:text-primary/80"
                          onClick={() => {
                            toast({
                              title: item.status === 'Due' ? 'Submit' : 'View',
                              description: `You would ${item.status === 'Due' ? 'submit' : 'view'} "${item.title}" in a real implementation.`,
                            });
                          }}
                        >
                          {item.status === 'Due' ? 'Submit' : 'View'}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-neutral-500">
                      No grade items found for this course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Post Grades Modal */}
      <PostGradesModal 
        open={postGradesModalOpen}
        onOpenChange={setPostGradesModalOpen}
        courses={courses}
        assignments={gradeItems
          .filter(item => item.type === 'assignment')
          .map(item => ({ id: item.id, title: item.title }))}
      />
    </div>
  );
};

export default Grades;
