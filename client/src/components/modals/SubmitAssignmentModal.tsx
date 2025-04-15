import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';
import { submitAssignment } from '@/lib/data';
import { AssignmentData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/data';

interface SubmitAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: AssignmentData | null;
}

const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({ 
  open, 
  onOpenChange,
  assignment
}) => {
  const [comments, setComments] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (!assignment) return;
    
    setUploading(true);
    
    try {
      const success = await submitAssignment({
        assignmentId: assignment.id,
        userId: currentUser.id,
        comment: comments,
        fileUrl: fileName ? `file://${fileName}` : undefined
      });
      
      if (success) {
        toast({
          title: "Success!",
          description: "Assignment submitted successfully!",
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to submit assignment. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Submit Assignment</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="assignment-title">Assignment</Label>
            <Input 
              id="assignment-title" 
              value={assignment?.title || ''} 
              readOnly
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="assignment-file">Upload File</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-neutral-400" />
                <div className="flex text-sm text-neutral-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none">
                    <span>Upload a file</span>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">
                  {fileName || "PDF, Word, or ZIP up to 10MB"}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="assignment-comments">Comments (Optional)</Label>
            <Textarea
              id="assignment-comments"
              rows={3}
              placeholder="Add any comments for your instructor"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1"
            />
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
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Submitting..." : "Submit Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitAssignmentModal;
