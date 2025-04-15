import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PostGradesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: { id: number; title: string }[];
  assignments: { id: number; title: string }[];
}

interface StudentGradeData {
  id: number;
  name: string;
  status: string;
  score: string;
  maxPoints: number;
  comment: string;
}

const PostGradesModal: React.FC<PostGradesModalProps> = ({ 
  open, 
  onOpenChange, 
  courses,
  assignments
}) => {
  const [gradeItem, setGradeItem] = useState('');
  const [courseId, setCourseId] = useState('');
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [students] = useState<StudentGradeData[]>([
    { id: 1, name: "John Smith", status: "Submitted", score: "", maxPoints: 100, comment: "" },
    { id: 2, name: "Jane Doe", status: "Submitted", score: "", maxPoints: 100, comment: "" },
    { id: 3, name: "Michael Johnson", status: "Submitted", score: "", maxPoints: 100, comment: "" },
    { id: 4, name: "Sarah Williams", status: "Late", score: "", maxPoints: 100, comment: "" },
    { id: 5, name: "David Brown", status: "Missing", score: "", maxPoints: 100, comment: "" }
  ]);
  const { toast } = useToast();

  const handleScoreChange = (studentId: number, value: string) => {
    // In a real app, you would update the student data in state
  };

  const handleCommentChange = (studentId: number, value: string) => {
    // In a real app, you would update the student data in state
  };

  const handlePostGrades = () => {
    if (!gradeItem || !courseId) {
      toast({
        title: "Missing Fields",
        description: "Please select an assignment/quiz and course.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Grades posted successfully!",
      });
      
      setSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Post Grades</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grade-item">Assignment/Quiz</Label>
              <Select value={gradeItem} onValueChange={setGradeItem}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select assignment or quiz" />
                </SelectTrigger>
                <SelectContent>
                  {assignments.map(assignment => (
                    <SelectItem key={assignment.id} value={assignment.id.toString()}>
                      {assignment.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="grade-course">Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Student Grades</Label>
            <div className="overflow-x-auto bg-neutral-50 rounded-md p-2">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Out Of</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Comments</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {students.map(student => (
                    <tr key={student.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.status}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <Input 
                          type="number" 
                          className="w-16 p-1 border border-neutral-300 rounded" 
                          placeholder="0"
                          value={student.score}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">/ {student.maxPoints}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <Input 
                          className="w-full p-1 border border-neutral-300 rounded" 
                          placeholder="Add comment..."
                          value={student.comment}
                          onChange={(e) => handleCommentChange(student.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center">
            <Checkbox 
              id="grade-notify" 
              checked={notifyStudents}
              onCheckedChange={(checked) => setNotifyStudents(checked as boolean)}
              className="mr-2"
            />
            <Label htmlFor="grade-notify" className="text-sm text-neutral-700">
              Notify students when grades are posted
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePostGrades}
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Grades"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostGradesModal;
