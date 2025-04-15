import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Video, Package2, Link, MessageCircle } from 'lucide-react';
import { ModuleData, ModuleItemData } from '@/lib/types';
import { fetchModuleItems } from '@/lib/data';

interface ModuleProps {
  module: ModuleData;
}

const Module: React.FC<ModuleProps> = ({ module }) => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<ModuleItemData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expanded && items.length === 0) {
      setLoading(true);
      fetchModuleItems(module.id)
        .then(data => {
          setItems(data);
          setLoading(false);
        });
    }
  }, [expanded, module.id, items.length]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'file':
      case 'pdf':
        return <FileText className="text-neutral-500 mr-2 h-5 w-5" />;
      case 'video':
        return <Video className="text-neutral-500 mr-2 h-5 w-5" />;
      case 'reading':
      case 'book':
        return <Package2 className="text-neutral-500 mr-2 h-5 w-5" />;
      case 'external_link':
        return <Link className="text-neutral-500 mr-2 h-5 w-5" />;
      case 'discussion':
        return <MessageCircle className="text-neutral-500 mr-2 h-5 w-5" />;
      default:
        return <FileText className="text-neutral-500 mr-2 h-5 w-5" />;
    }
  };

  return (
    <div className="module">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer module-header hover:bg-neutral-50"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          {expanded ? (
            <ChevronDown className="text-xl text-neutral-500 mr-2" />
          ) : (
            <ChevronRight className="text-xl text-neutral-500 mr-2" />
          )}
          <h3 className="font-medium">{module.title}</h3>
        </div>
        <div className="text-sm text-neutral-500">
          {module.itemCount || items.length} items
        </div>
      </div>
      
      {expanded && (
        <div className="pl-10 pr-4 pb-4">
          {loading ? (
            <div className="text-neutral-500 text-sm py-2">Loading...</div>
          ) : (
            <ul className="space-y-3">
              {items.map(item => (
                <li key={item.id} className="flex items-center">
                  {getItemIcon(item.type)}
                  <a href={item.url || '#'} className="text-primary hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Module;
