import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from 'lucide-react';

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
  
  // New state for paper-based tab
  const [activeTab, setActiveTab] = useState('existing');
  const [paperTitle, setPaperTitle] = useState('');
  const [paperCourseId, setPaperCourseId] = useState('');
  const [paperDate, setPaperDate] = useState('');
  const [paperPoints, setPaperPoints] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  
  const { toast } = useToast();

  const handleScoreChange = (studentId: number, value: string) => {
    // In a real app, you would update the student data in state
  };

  const handleCommentChange = (studentId: number, value: string) => {
    // In a real app, you would update the student data in state
  };
  
  // Handle file selection for grades
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFileName(e.target.files[0].name);
    }
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
  
  const handlePaperGrades = () => {
    if (!paperTitle || !paperCourseId || !paperDate || !paperPoints) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields for the paper-based test.",
        variant: "destructive"
      });
      return;
    }
    
    if (!uploadFileName) {
      toast({
        title: "Missing File",
        description: "Please upload a CSV or Excel file with student grades.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Grades for "${paperTitle}" paper test uploaded successfully!`,
      });
      
      // Reset fields
      setPaperTitle('');
      setPaperCourseId('');
      setPaperDate('');
      setPaperPoints('');
      setUploadFileName('');
      
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="existing">Existing Assignment/Quiz</TabsTrigger>
            <TabsTrigger value="paper">Paper-Based Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="paper" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paper-title">Test Title</Label>
                <Input 
                  id="paper-title" 
                  placeholder="e.g., Midterm Exam"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="paper-course">Course</Label>
                <Select value={paperCourseId} onValueChange={setPaperCourseId}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paper-date">Exam Date</Label>
                <Input 
                  id="paper-date" 
                  type="date"
                  value={paperDate}
                  onChange={(e) => setPaperDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="paper-points">Total Points</Label>
                <Input 
                  id="paper-points" 
                  type="number"
                  placeholder="e.g., 100"
                  value={paperPoints}
                  onChange={(e) => setPaperPoints(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="mt-2 bg-neutral-50 p-6 rounded-lg border border-dashed border-neutral-300">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-neutral-400 mb-2" />
                <h3 className="text-lg font-medium mb-1">Upload Grades</h3>
                <p className="text-sm text-neutral-500 text-center mb-4">
                  Upload a CSV or Excel file with student grades
                </p>
                
                <div className="w-full">
                  <div className="relative border-neutral-200 border rounded">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                    <div className="p-3 text-center">
                      <span className="text-primary font-medium">
                        {uploadFileName || "Browse files"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Checkbox 
                id="paper-notify" 
                checked={notifyStudents}
                onCheckedChange={(checked) => setNotifyStudents(checked as boolean)}
                className="mr-2"
              />
              <Label htmlFor="paper-notify" className="text-sm text-neutral-700">
                Notify students when grades are posted
              </Label>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePaperGrades}
                disabled={submitting}
              >
                {submitting ? "Uploading..." : "Upload Grades"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PostGradesModal;