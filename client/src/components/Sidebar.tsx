import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Megaphone, 
  FileCheck, 
  FileQuestion, 
  BarChart2, 
  Calendar, 
  Settings, 
  HelpCircle,
  FoldHorizontal,
  UnfoldHorizontal
} from 'lucide-react';
import { currentUser } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <aside 
      className={`bg-primary transition-all duration-300 ease-in-out flex-shrink-0 flex flex-col h-full ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        {!collapsed && <div className="text-white font-bold text-2xl">EDU Horizon</div>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={`${collapsed ? 'mx-auto' : 'ml-auto'} text-white hover:bg-white hover:bg-opacity-20`}
        >
          {collapsed ? <UnfoldHorizontal /> : <FoldHorizontal />}
        </Button>
      </div>

      {/* User Profile Summary */}
      <div className="px-4 py-3 border-t border-white border-opacity-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-lg">
            {currentUser.avatarInitials}
          </div>
          {!collapsed && (
            <div className="ml-3 text-white">
              <div className="font-medium">{currentUser.displayName}</div>
              <div className="text-xs text-white text-opacity-70">{currentUser.email}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'dashboard' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <LayoutDashboard className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('courses')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'courses' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <BookOpen className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Course Materials</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('announcements')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'announcements' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <Megaphone className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Announcements</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('assignments')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'assignments' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <FileCheck className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Assignments</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('quizzes')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'quizzes' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <FileQuestion className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Quizzes</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('grades')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'grades' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <BarChart2 className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Grades</span>}
            </button>
          </li>
          <li className="px-2 mb-1">
            <button
              onClick={() => handleNavClick('calendar')}
              className={`w-full flex items-center px-4 py-3 text-white rounded hover:bg-white hover:bg-opacity-10 ${
                activeSection === 'calendar' ? 'bg-primary-blue bg-opacity-20 border-l-4 border-white' : ''
              }`}
            >
              <Calendar className="h-6 w-6 text-white" />
              {!collapsed && <span className="ml-3">Calendar</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className="p-4 border-t border-white border-opacity-10">
        <button className="w-full flex items-center px-4 py-2 text-white rounded hover:bg-white hover:bg-opacity-10">
          <Settings className="h-6 w-6 text-white" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </button>
        <button className="w-full flex items-center px-4 py-2 text-white rounded hover:bg-white hover:bg-opacity-10">
          <HelpCircle className="h-6 w-6 text-white" />
          {!collapsed && <span className="ml-3">Help</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
