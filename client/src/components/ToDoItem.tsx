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

  return (
    <div className="p-4 flex">
      {getPlatformIcon()}
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium">{item.title}</h3>
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
        <p className="text-sm text-neutral-500">{item.courseName}</p>
        <p className="text-sm text-neutral-400">
          {item.points !== null ? `${item.points} points • ` : ''} 
          {formatDateTime(item.dueDate)}
          {item.type && item.type !== "assignment" && item.type !== "quiz" && (
            <span className="ml-2 px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full text-xs">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          )}
        </p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-neutral-400 hover:text-neutral-600"
        onClick={() => onDismiss(item.id)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ToDoItem;
