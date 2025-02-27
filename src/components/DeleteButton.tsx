import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
  small?: boolean;
}

export function DeleteButton({ onClick, className, small }: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "text-red-500 hover:text-red-600 transition-colors",
        "hover:bg-red-50 rounded-full p-1",
        className
      )}
      title="Delete entry"
    >
      <Trash2 className={small ? "w-4 h-4" : "w-5 h-5"} />
    </button>
  );
}