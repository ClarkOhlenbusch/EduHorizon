import React from 'react';
import { AssignmentData } from '@/lib/types';
import { Eye, Upload, MessageSquareText, Check, FileText } from 'lucide-react';
import { formatDateTime } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface AssignmentItemProps {
  assignment: AssignmentData;
  onViewDetails: (id: number) => void;
  onSubmit: (id: number) => void;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ 
  assignment, 
  onViewDetails, 
  onSubmit 
}) => {
  const isCompleted = assignment.submissionStatus === 'graded';
  const isUpcoming = !isCompleted;
  
  const statusIcon = isCompleted ? (
    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
      <Check className="h-5 w-5" />
    </div>
  ) : (
    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
      <FileText className="h-5 w-5" />
    </div>
  );

  const statusText = isCompleted ? (
    <span className="text-sm font-medium text-green-600">
      Submitted {formatDateTime(new Date("2023-04-01"))} • Grade: {assignment.grade}%
    </span>
  ) : (
    <span className="text-sm font-medium text-yellow-600">
      Due {formatDateTime(assignment.dueDate)}
    </span>
  );

  return (
    <div className={`p-5 ${isCompleted ? 'bg-neutral-50' : ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          {statusIcon}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between mb-1">
            <h3 className="font-semibold text-lg">{assignment.title}</h3>
            {statusText}
          </div>
          <div className="text-sm text-neutral-500 mb-2">
            {assignment.courseId && `Course ${assignment.courseId}`} • {assignment.pointsPossible} points
          </div>
          <p className="mb-3 text-sm">{assignment.instructions}</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium"
              onClick={() => onViewDetails(assignment.id)}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              View Details
            </Button>
            
            {isUpcoming && (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-medium"
                onClick={() => onSubmit(assignment.id)}
              >
                <Upload className="mr-1.5 h-4 w-4" />
                Submit Assignment
              </Button>
            )}
            
            {isCompleted && (
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium"
              >
                <MessageSquareText className="mr-1.5 h-4 w-4" />
                Comments (2)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentItem;
