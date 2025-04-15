import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { fetchAnnouncements, createAnnouncement } from '@/lib/data';
import { AnnouncementData } from '@/lib/types';
import AnnouncementItem from '@/components/AnnouncementItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchUserCourses } from '@/lib/data';
import { CourseData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    courseId: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Fetch announcements
      const announcementsData = await fetchAnnouncements();
      
      // Fetch courses to get course names
      const coursesData = await fetchUserCourses();
      setCourses(coursesData);
      
      // Enhance announcement data with course and author names (in a real app this would be done server-side)
      const enhancedAnnouncements = announcementsData.map(announcement => ({
        ...announcement,
        courseName: coursesData.find(c => c.id === announcement.courseId)?.title || 'Unknown Course',
        authorName: 'Professor Johnson',
        read: Math.random() > 0.5, // Randomly mark some as read for demo
      }));
      
      setAnnouncements(enhancedAnnouncements);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleCreateAnnouncement = async () => {
    if (!formData.title || !formData.content || !formData.courseId) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const result = await createAnnouncement({
        title: formData.title,
        content: formData.content,
        courseId: parseInt(formData.courseId),
        status: 'published'
      });
      
      if (result) {
        // Add the new announcement to the list with necessary fields for display
        const newAnnouncement: AnnouncementData = {
          ...result,
          courseName: courses.find(c => c.id === parseInt(formData.courseId))?.title || 'Unknown Course',
          authorName: 'Professor Johnson',
          read: false
        };
        
        setAnnouncements([newAnnouncement, ...announcements]);
        
        toast({
          title: "Success!",
          description: "Announcement created successfully",
        });
        
        // Reset form and close dialog
        setFormData({ title: '', content: '', courseId: '' });
        setCreateDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsRead = (index: number) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index].read = !updatedAnnouncements[index].read;
    setAnnouncements(updatedAnnouncements);
  };

  const handleReply = (index: number) => {
    toast({
      title: "Reply",
      description: `You would reply to "${announcements[index].title}" in a real implementation.`,
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Announcements</h2>
          <p className="text-neutral-600">Important updates and information for your courses.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded flex items-center"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {/* Announcement List */}
      <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200">
        {loading ? (
          <div className="p-5 text-neutral-500">Loading announcements...</div>
        ) : announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <AnnouncementItem 
              key={announcement.id} 
              announcement={announcement}
              onMarkAsRead={() => handleMarkAsRead(index)}
              onReply={() => handleReply(index)}
            />
          ))
        ) : (
          <div className="p-5 text-neutral-500 text-center">No announcements found.</div>
        )}
      </div>

      {/* Create Announcement Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Create New Announcement</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="announcement-title">Title</Label>
              <Input 
                id="announcement-title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter announcement title"
              />
            </div>
            
            <div>
              <Label htmlFor="announcement-course">Course</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => setFormData({...formData, courseId: value})}
              >
                <SelectTrigger id="announcement-course">
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
            </div>
            
            <div>
              <Label htmlFor="announcement-content">Content</Label>
              <Textarea 
                id="announcement-content" 
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Enter announcement content"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAnnouncement}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Announcement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
