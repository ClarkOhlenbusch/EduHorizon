import React from 'react';
import { CourseData } from '@/lib/types';
import { Home, FileText, MessageCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div 
      className="bg-white rounded-md shadow-sm border border-neutral-200 transition-all duration-200 p-4 group hover:shadow-md"
      style={{ borderLeft: `4px solid ${course.color}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: course.color }}></div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="font-semibold text-neutral-800 mb-1">{course.title}</h3>
      <p className="text-sm text-neutral-500 mb-2">{course.term} {course.status.toUpperCase()}</p>
      <div className="flex mt-2 space-x-2">
        <Button variant="ghost" size="icon" className="p-1 text-neutral-500 hover:text-primary">
          <Home className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="p-1 text-neutral-500 hover:text-primary">
          <FileText className="h-4 w-4" />
        </Button>
        {course.code.includes("OL") && (
          <Button variant="ghost" size="icon" className="p-1 text-neutral-500 hover:text-primary">
            <MessageCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
