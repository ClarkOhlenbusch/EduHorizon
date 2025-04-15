import React from 'react';
import { CourseData } from '@/lib/types';
import { Home, FileText, MessageCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { toast } = useToast();

  const handleCourseClick = () => {
    toast({
      title: "Course Navigation",
      description: `Navigating to ${course.title} course home page.`,
    });
    // In a real implementation, this would navigate to the course page
  };

  // Get a lighter pastel version of the course color for the background
  const getBackgroundColor = (color: string) => {
    // For common colors, use predefined pastel colors
    const pastelColors: {[key: string]: string} = {
      '#e63946': '#f5d6d9', // Red
      '#2a9d8f': '#d8f1ed', // Teal
      '#457b9d': '#d9e8f3', // Blue
      '#f4a261': '#fdecd6', // Orange
      '#6a994e': '#e2f0d9', // Green
      '#8338ec': '#e8d9fb', // Purple
      '#ffb703': '#fff3d8', // Yellow
    };
    
    return pastelColors[color] || '#f5f5f5'; // Default to light gray if color not found
  };

  return (
    <div 
      className="rounded-md shadow-sm transition-all duration-200 p-4 group hover:shadow-md cursor-pointer"
      style={{ 
        backgroundColor: getBackgroundColor(course.color),
        borderLeft: `4px solid ${course.color}` 
      }}
      onClick={handleCourseClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: course.color }}></div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            toast({
              title: "Course Options",
              description: "Course options menu would open here.",
            });
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="font-semibold text-neutral-800 mb-1">{course.title}</h3>
      <p className="text-sm text-neutral-500 mb-2">{course.term} {course.status.toUpperCase()}</p>
      <div className="flex mt-2 space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="p-1 text-neutral-500 hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            toast({
              title: "Course Home",
              description: `Navigating to ${course.title} home page.`,
            });
          }}
        >
          <Home className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="p-1 text-neutral-500 hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            toast({
              title: "Course Materials",
              description: `Navigating to ${course.title} materials.`,
            });
          }}
        >
          <FileText className="h-4 w-4" />
        </Button>
        {course.code.includes("OL") && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-1 text-neutral-500 hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              toast({
                title: "Course Discussion",
                description: `Navigating to ${course.title} discussions.`,
              });
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
