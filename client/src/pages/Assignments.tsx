import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { fetchUserCourses, fetchCourseAssignments, createAssignment } from '@/lib/data';
import { AssignmentData, CourseData } from '@/lib/types';
import AssignmentItem from '@/components/AssignmentItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import SubmitAssignmentModal from '@/components/modals/SubmitAssignmentModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Assignments: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    dueDate: '',
    points: '',
    instructions: ''
  });
  const [submitting, setSubmitting] = useState(false);
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
    const loadAssignments = async () => {
      if (!selectedCourseId) return;
      
      setLoadingAssignments(true);
      const assignmentsData = await fetchCourseAssignments(parseInt(selectedCourseId));
      
      // Simulate some assignments as completed for demo
      const enhancedAssignments = assignmentsData.map(assignment => ({
        ...assignment,
        submissionStatus: assignment.title.includes('Step 4') ? 'graded' : 'none',
        grade: assignment.title.includes('Step 4') ? 94 : null
      }));
      
      setAssignments(enhancedAssignments);
      setLoadingAssignments(false);
    };
    
    loadAssignments();
  }, [selectedCourseId]);

  const handleViewDetails = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      toast({
        title: "View Assignment Details",
        description: `You would view details for "${assignment.title}" in a real implementation.`,
      });
    }
  };

  const handleSubmitAssignment = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      setSelectedAssignment(assignment);
      setSubmitModalOpen(true);
    }
  };

  const handleCreateAssignment = async () => {
    if (!formData.title || !formData.courseId || !formData.dueDate || !formData.points) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const result = await createAssignment({
        title: formData.title,
        courseId: parseInt(formData.courseId),
        dueDate: new Date(formData.dueDate),
        pointsPossible: parseInt(formData.points),
        instructions: formData.instructions,
        status: 'published'
      });
      
      if (result) {
        // Add the new assignment to the list if it's for the currently selected course
        if (parseInt(formData.courseId) === parseInt(selectedCourseId)) {
          setAssignments([result, ...assignments]);
        }
        
        toast({
          title: "Success!",
          description: "Assignment created successfully",
        });
        
        // Reset form and close dialog
        setFormData({ title: '', courseId: '', dueDate: '', points: '', instructions: '' });
        setCreateDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create assignment",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Assignments</h2>
          <p className="text-neutral-600">Manage and submit your course assignments.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded flex items-center"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Course Selection Dropdown */}
      <div className="mb-6">
        <Label htmlFor="assignment-course-select" className="block text-sm font-medium text-neutral-700 mb-1">
          Select Course
        </Label>
        {loading ? (
          <div className="text-neutral-500">Loading courses...</div>
        ) : (
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="assignment-course-select">
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

      {/* Assignment List */}
      <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200">
        {loadingAssignments ? (
          <div className="p-5 text-neutral-500">Loading assignments...</div>
        ) : assignments.length > 0 ? (
          assignments.map(assignment => (
            <AssignmentItem 
              key={assignment.id} 
              assignment={assignment}
              onViewDetails={handleViewDetails}
              onSubmit={handleSubmitAssignment}
            />
          ))
        ) : (
          <div className="p-5 text-neutral-500 text-center">No assignments found for this course.</div>
        )}
      </div>

      {/* Submit Assignment Modal */}
      <SubmitAssignmentModal 
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        assignment={selectedAssignment}
      />

      {/* Create Assignment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Create New Assignment</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="assignment-title">Title</Label>
              <Input 
                id="assignment-title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter assignment title"
              />
            </div>
            
            <div>
              <Label htmlFor="assignment-course">Course</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => setFormData({...formData, courseId: value})}
              >
                <SelectTrigger id="assignment-course">
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignment-due-date">Due Date</Label>
                <Input 
                  id="assignment-due-date" 
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="assignment-points">Points</Label>
                <Input 
                  id="assignment-points" 
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: e.target.value})}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="assignment-instructions">Instructions</Label>
              <Textarea 
                id="assignment-instructions" 
                rows={4}
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                placeholder="Enter assignment instructions"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAssignment}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Assignment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assignments;
