import React from 'react';
import { TodoItemData } from '@/lib/types';
import { FileText, Calendar, Clock } from 'lucide-react';
import { formatDateTime } from '@/lib/data';

interface UpcomingItemProps {
  item: TodoItemData;
}

const UpcomingItem: React.FC<UpcomingItemProps> = ({ item }) => {
  // Determine the icon based on the item type
  const getIcon = () => {
    if (item.type === 'assignment') {
      return <FileText className="text-xl text-primary" />;
    } else if (item.type === 'class') {
      return <Clock className="text-xl text-primary" />;
    } else {
      return <Calendar className="text-xl text-primary" />;
    }
  };

  return (
    <div className="p-4 flex">
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-neutral-500">{item.courseName}</p>
        <p className="text-sm text-neutral-400">
          {item.points !== null ? `${item.points} points • ` : ''} 
          {formatDateTime(item.dueDate)}
        </p>
      </div>
    </div>
  );
};

export default UpcomingItem;
