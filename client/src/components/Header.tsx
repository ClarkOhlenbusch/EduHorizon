import React from 'react';
import { 
  Bell, 
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import { currentUser } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const formatSectionTitle = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };
  
  return (
    <header className="bg-white border-b border-neutral-200 flex items-center justify-between h-16 px-6">
      {/* Left: Section Title/Breadcrumbs */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-neutral-800">
          {formatSectionTitle(activeSection)}
        </h1>
      </div>

      {/* Right: User Controls */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-700 p-2 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-700 p-2">
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              {currentUser.avatarInitials}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
