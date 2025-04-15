import React from 'react';
import { AnnouncementData } from '@/lib/types';
import { formatTimeAgo } from '@/lib/data';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnnouncementItemProps {
  announcement: AnnouncementData;
  onMarkAsRead?: () => void;
  onReply?: () => void;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ 
  announcement, 
  onMarkAsRead, 
  onReply 
}) => {
  return (
    <div className={`p-5 ${announcement.read ? 'bg-neutral-50' : ''}`}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">{announcement.title}</h3>
        <span className="text-sm text-neutral-500">{formatTimeAgo(announcement.createdAt)}</span>
      </div>
      <div className="text-sm text-neutral-500 mb-2">
        {announcement.courseName} • {announcement.authorName}
      </div>
      <p className="mb-3">{announcement.content}</p>
      <div className="flex items-center text-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:underline mr-4"
          onClick={onMarkAsRead}
        >
          {announcement.read ? 'Mark as Unread' : 'Mark as Read'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:underline mr-4"
          onClick={onReply}
        >
          Reply
        </Button>
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-700">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementItem;
