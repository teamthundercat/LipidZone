import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Notification({ message, onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={cn(
        "bg-green-50 text-green-700 rounded-lg shadow-md p-4",
        "flex items-center gap-3 pr-12 relative"
      )}>
        <CheckCircle className="w-5 h-5" />
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-green-600 hover:text-green-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}