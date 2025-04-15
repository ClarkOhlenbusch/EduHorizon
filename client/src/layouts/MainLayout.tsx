import React, { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { CourseData } from '@/lib/types';

interface MainLayoutProps {
  children: ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSelectCourse?: (course: CourseData) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeSection, 
  setActiveSection,
  onSelectCourse 
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 text-neutral-800">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <Header activeSection={activeSection} />
        
        {/* Content Container (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
