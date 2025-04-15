import React from 'react';
import { TodoItemData } from '@/lib/types';
import { FileText, X, ExternalLink } from 'lucide-react';
import { formatDateTime } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ToDoItemProps {
  item: TodoItemData;
  onDismiss: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, onDismiss }) => {
  const { toast } = useToast();
  
  const getPlatformIcon = () => {
    if (item.type === "gradescope") {
      return (
        <div className="flex-shrink-0 mr-3 bg-red-100 p-2 rounded-full">
          <FileText className="text-xl text-red-600" />
        </div>
      );
    } else if (item.type === "mcgrawhill") {
      return (
        <div className="flex-shrink-0 mr-3 bg-blue-100 p-2 rounded-full">
          <FileText className="text-xl text-blue-600" />
        </div>
      );
    } else if (item.type === "github_classroom") {
      return (
        <div className="flex-shrink-0 mr-3 bg-purple-100 p-2 rounded-full">
          <FileText className="text-xl text-purple-600" />
        </div>
      );
    } else {
      return (
        <div className="flex-shrink-0 mr-3">
          <FileText className="text-xl text-primary" />
        </div>
      );
    }
  };
  
  const handleExternalClick = () => {
    if (item.type === "gradescope" || item.type === "mcgrawhill" || item.type === "github_classroom") {
      toast({
        title: "External Assignment",
        description: `Opening ${item.title} in ${item.type}...`,
      });
    }
  };

  // Determine background color based on due date (closer = more urgent)
  const getItemStyle = () => {
    const now = new Date();
    const due = new Date(item.dueDate);
    const daysUntilDue = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Less than 1 day = urgent
    if (daysUntilDue < 1) {
      return 'border-l-4 border-l-red-400 bg-red-50';
    }
    // Less than 3 days = warning
    else if (daysUntilDue < 3) {
      return 'border-l-4 border-l-amber-400 bg-amber-50';
    }
    // Default
    return 'border-l-4 border-l-neutral-200 hover:bg-neutral-100';
  };

  return (
    <div className={`p-4 flex transition-colors ${getItemStyle()}`}>
      {getPlatformIcon()}
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium text-neutral-800">{item.title}</h3>
          {(item.type === "gradescope" || item.type === "mcgrawhill" || item.type === "github_classroom") && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 p-1 text-neutral-500 hover:text-primary"
              onClick={handleExternalClick}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-neutral-600 font-medium">{item.courseName}</p>
        <div className="flex items-center mt-1">
          <p className="text-sm text-neutral-500">
            {item.points !== null ? `${item.points} points • ` : ''} 
            {formatDateTime(item.dueDate)}
          </p>
          {item.type && item.type !== "assignment" && item.type !== "quiz" && (
            <span className="ml-2 px-2 py-0.5 bg-neutral-200 text-neutral-700 rounded-full text-xs font-medium">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-neutral-400 hover:text-neutral-600 self-start mt-1"
        onClick={() => onDismiss(item.id)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ToDoItem;
