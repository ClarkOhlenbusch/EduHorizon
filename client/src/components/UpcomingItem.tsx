import React from 'react';
import { TodoItemData } from '@/lib/types';
import { FileText, Calendar, Clock } from 'lucide-react';
import { formatDateTime } from '@/lib/data';

interface UpcomingItemProps {
  item: TodoItemData;
}

const UpcomingItem: React.FC<UpcomingItemProps> = ({ item }) => {
  // Determine the icon based on the item type
  const getIconWithBackground = () => {
    if (item.type === 'assignment') {
      return (
        <div className="flex-shrink-0 mr-3 bg-blue-100 p-2 rounded-full">
          <FileText className="text-xl text-blue-600" />
        </div>
      );
    } else if (item.type === 'class') {
      return (
        <div className="flex-shrink-0 mr-3 bg-purple-100 p-2 rounded-full">
          <Clock className="text-xl text-purple-600" />
        </div>
      );
    } else {
      return (
        <div className="flex-shrink-0 mr-3 bg-green-100 p-2 rounded-full">
          <Calendar className="text-xl text-green-600" />
        </div>
      );
    }
  };

  // Determine time-based styles
  const getTimeStyle = () => {
    const itemDate = new Date(item.dueDate);
    const today = new Date();
    
    // Check if it's today
    if (itemDate.toDateString() === today.toDateString()) {
      return 'border-l-4 border-l-blue-400 bg-blue-50';
    }
    
    // Check if it's tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (itemDate.toDateString() === tomorrow.toDateString()) {
      return 'border-l-4 border-l-green-400 bg-green-50';
    }
    
    return 'border-l-4 border-l-neutral-200 hover:bg-neutral-100';
  };

  return (
    <div className={`p-4 flex transition-colors ${getTimeStyle()}`}>
      {getIconWithBackground()}
      <div className="flex-1">
        <h3 className="font-medium text-neutral-800">{item.title}</h3>
        <p className="text-sm text-neutral-600 font-medium">{item.courseName}</p>
        <div className="mt-1">
          <p className="text-sm text-neutral-500">
            {item.points !== null ? `${item.points} points • ` : ''} 
            {formatDateTime(item.dueDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingItem;
