import React from 'react';
import { TodoItemData } from '@/lib/types';
import { FileText, X } from 'lucide-react';
import { formatDateTime } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface ToDoItemProps {
  item: TodoItemData;
  onDismiss: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, onDismiss }) => {
  return (
    <div className="p-4 flex">
      <div className="flex-shrink-0 mr-3">
        <FileText className="text-xl text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-neutral-500">{item.courseName}</p>
        <p className="text-sm text-neutral-400">
          {item.points !== null ? `${item.points} points • ` : ''} 
          {formatDateTime(item.dueDate)}
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
