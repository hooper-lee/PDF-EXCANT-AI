'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColors[type]} border rounded-xl shadow-lg p-4 pr-12 max-w-md backdrop-blur-sm`}>
        <div className="flex items-start gap-3">
          {icons[type]}
          <div className="flex-1">
            <p className={`${textColors[type]} text-sm font-medium whitespace-pre-line`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`${textColors[type]} hover:opacity-70 transition-opacity absolute top-3 right-3`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
