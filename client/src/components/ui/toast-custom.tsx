import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, visible, onClose }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50 animate-in fade-in slide-in-from-bottom-4">
      <CheckCircle className="mr-2 h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default SuccessToast;
