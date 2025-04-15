import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { fetchUserCourses, fetchCourseModules } from '@/lib/data';
import { CourseData, ModuleData } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Module from '@/components/Module';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseModules: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingModules, setLoadingModules] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const coursesData = await fetchUserCourses();
      setCourses(coursesData);
      if (coursesData.length > 0) {
        setSelectedCourseId(coursesData[0].id.toString());
      }
      setLoading(false);
    };
    loadCourses();
  }, []);

  useEffect(() => {
    const loadModules = async () => {
      if (!selectedCourseId) return;
      
      setLoadingModules(true);
      const moduleData = await fetchCourseModules(parseInt(selectedCourseId));
      setModules(moduleData);
      setLoadingModules(false);
    };
    
    loadModules();
  }, [selectedCourseId]);

  const handleUploadMaterials = () => {
    toast({
      title: "Upload Materials",
      description: "This feature would allow you to upload course materials in a real implementation.",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Materials</h2>
        <p className="text-neutral-600">Access your course content, readings, and resources.</p>
      </div>

      {/* Course Selection Dropdown */}
      <div className="mb-6">
        <Label htmlFor="course-select" className="block text-sm font-medium text-neutral-700 mb-1">
          Select Course
        </Label>
        {loading ? (
          <div className="text-neutral-500">Loading courses...</div>
        ) : (
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="course-select">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.code} {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Modules */}
      <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200 mb-6">
        {loadingModules ? (
          <div className="p-4 text-neutral-500">Loading modules...</div>
        ) : modules.length > 0 ? (
          modules.map(module => <Module key={module.id} module={module} />)
        ) : (
          <div className="p-4 text-neutral-500 text-center">
            No modules found for this course.
          </div>
        )}
      </div>

      {/* Upload Materials (Instructor View) */}
      <div className="mt-8">
        <Button 
          onClick={handleUploadMaterials}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Course Materials
        </Button>
      </div>
    </div>
  );
};

export default CourseModules;
