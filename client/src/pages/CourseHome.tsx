import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  MessageCircle, 
  CheckSquare, 
  Calendar, 
  FileQuestion, 
  Book, 
  BarChart2,
  Users,
  Settings
} from 'lucide-react';
import { CourseData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CourseHomeProps {
  course: CourseData;
  onNavigateBack: () => void;
}

const CourseHome: React.FC<CourseHomeProps> = ({ course, onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "Tab Navigation",
      description: `Navigated to ${value} tab in ${course.title}`,
    });
  };

  const syllabus = `
    # Course Syllabus: ${course.title}
    
    ## Course Description
    This course provides an introduction to the principles and practices of user interface design. 
    Students will learn about interaction design, information architecture, visual design principles, 
    and usability testing methods.
    
    ## Learning Objectives
    * Understand core principles of human-computer interaction
    * Apply user-centered design processes to real-world problems
    * Create effective wireframes and prototypes
    * Evaluate interfaces using appropriate usability testing methods
    
    ## Grading
    * Assignments: 40%
    * Class Participation: 10%
    * Midterm Project: 20%
    * Final Project: 30%
    
    ## Course Schedule
    
    ### Week 1-2: Introduction to UI Design
    * Readings: Norman, "The Design of Everyday Things" (Chapters 1-2)
    * Assignment 1: UI Analysis of Everyday Objects
    
    ### Week 3-4: User Research Methods
    * Readings: Krug, "Don't Make Me Think" (Chapters 1-3)
    * Assignment 2: Contextual Inquiry Report
    
    ### Week 5-6: Information Architecture
    * Readings: Morville & Rosenfeld, "Information Architecture" (Chapters 4-6)
    * Midterm Project: Site Structure and Navigation Design
    
    ### Week 7-8: Prototyping Methods
    * Readings: Buxton, "Sketching User Experiences" (Chapters 9-11)
    * Assignment 3: Interactive Prototype
    
    ### Week 9-10: Visual Design Principles
    * Readings: Williams, "The Non-Designer's Design Book" (Chapters 2-5)
    * Assignment 4: Visual Design Style Guide
    
    ### Week 11-12: Usability Testing
    * Readings: Rubin & Chisnell, "Handbook of Usability Testing" (Chapters 3-5)
    * Assignment 5: Usability Test Plan and Report
    
    ### Week 13-15: Final Project Development
    * Final Project: Complete UI Design and Interactive Prototype
  `;

  return (
    <div className="flex flex-col h-full">
      {/* Course Header */}
      <div 
        className="p-6 mb-6" 
        style={{ 
          borderLeft: `4px solid ${course.color}`,
          borderBottom: '1px solid #e5e7eb',
          background: 'white',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2 text-primary hover:text-primary-dark"
              onClick={onNavigateBack}
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-neutral-600">{course.code} · {course.term}</p>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Course Settings</span>
          </Button>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs 
        defaultValue="home" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="flex-1"
      >
        <div className="border-b">
          <TabsList className="flex h-10 items-center justify-start px-4 w-full overflow-x-auto rounded-none bg-transparent space-x-4">
            <TabsTrigger 
              value="home" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <FileText className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="syllabus" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <Book className="h-4 w-4 mr-2" />
              Syllabus
            </TabsTrigger>
            <TabsTrigger 
              value="modules" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <FileText className="h-4 w-4 mr-2" />
              Modules
            </TabsTrigger>
            <TabsTrigger 
              value="assignments" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger 
              value="quizzes" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <FileQuestion className="h-4 w-4 mr-2" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger 
              value="grades" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Grades
            </TabsTrigger>
            <TabsTrigger 
              value="discussions" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger 
              value="people" 
              className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 pt-2 h-10 data-[state=active]:shadow-none"
            >
              <Users className="h-4 w-4 mr-2" />
              People
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          <TabsContent value="home" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Home</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-5">
                  <h3 className="font-medium text-lg mb-3">Upcoming Assignments</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                      <div>
                        <p className="font-medium">Project Proposal</p>
                        <p className="text-sm text-neutral-500">Due Apr 20, 2025</p>
                      </div>
                      <Button size="sm">View</Button>
                    </li>
                    <li className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                      <div>
                        <p className="font-medium">Wireframe Assignment</p>
                        <p className="text-sm text-neutral-500">Due Apr 25, 2025</p>
                      </div>
                      <Button size="sm">View</Button>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg border border-neutral-200 p-5">
                  <h3 className="font-medium text-lg mb-3">Recent Announcements</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-medium">Office Hours Change</p>
                      <p className="text-sm text-neutral-600 mb-1">
                        My office hours will be moved to Tuesday 2-4pm for the rest of the semester.
                      </p>
                      <p className="text-xs text-neutral-500">Posted Apr 10, 2025</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded">
                      <p className="font-medium">Guest Speaker Next Week</p>
                      <p className="text-sm text-neutral-600 mb-1">
                        We'll have a guest speaker from Google discussing UX career paths.
                      </p>
                      <p className="text-xs text-neutral-500">Posted Apr 5, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-5">
                  <h3 className="font-medium text-lg mb-3">Course Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center p-2 hover:bg-neutral-50 rounded">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-primary hover:underline cursor-pointer">Course Syllabus</span>
                    </li>
                    <li className="flex items-center p-2 hover:bg-neutral-50 rounded">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-primary hover:underline cursor-pointer">Reading List</span>
                    </li>
                    <li className="flex items-center p-2 hover:bg-neutral-50 rounded">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-primary hover:underline cursor-pointer">Design Resources</span>
                    </li>
                    <li className="flex items-center p-2 hover:bg-neutral-50 rounded">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-primary hover:underline cursor-pointer">Project Guidelines</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg border border-neutral-200 p-5">
                  <h3 className="font-medium text-lg mb-3">Course Progress</h3>
                  <div className="w-full bg-neutral-100 rounded-full h-4 mb-3">
                    <div 
                      className="bg-primary h-4 rounded-full" 
                      style={{ width: '35%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    You've completed 35% of this course (7/20 modules)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="syllabus" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Syllabus</h2>
            <div className="bg-white rounded-lg border border-neutral-200 p-5">
              <div className="prose prose-neutral max-w-none">
                {syllabus.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-semibold mt-4 mb-2">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-medium mt-3 mb-1">{line.substring(4)}</h3>;
                  } else if (line.startsWith('* ')) {
                    return <li key={i} className="ml-5">{line.substring(2)}</li>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i}>{line}</p>;
                  }
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="modules" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
            <p className="text-neutral-500 mb-4">This tab would display the modules from the Course Materials section for {course.title}.</p>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Assignments</h2>
            <p className="text-neutral-500 mb-4">This tab would display the assignments for {course.title}.</p>
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
            <p className="text-neutral-500 mb-4">This tab would display the quizzes for {course.title}.</p>
          </TabsContent>
          
          <TabsContent value="grades" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Grades</h2>
            <p className="text-neutral-500 mb-4">This tab would display the grades for {course.title}.</p>
          </TabsContent>
          
          <TabsContent value="discussions" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course Discussions</h2>
            <p className="text-neutral-500 mb-4">This tab would display the discussion boards for {course.title}.</p>
          </TabsContent>
          
          <TabsContent value="people" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Course People</h2>
            <p className="text-neutral-500 mb-4">This tab would display the instructor and students enrolled in {course.title}.</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CourseHome;