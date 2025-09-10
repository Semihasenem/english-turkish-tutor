import React, { useState, useEffect } from 'react';
import { CalendarIcon } from './Icons';

const ProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const loadProgress = () => {
    try {
      const savedProgress = localStorage.getItem('konusCengoProgress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
  };

  useEffect(() => {
    loadProgress();
    // Listen for custom event to reload progress
    window.addEventListener('progressUpdated', loadProgress);
    return () => {
      window.removeEventListener('progressUpdated', loadProgress);
    };
  }, []);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday
  const today = new Date();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) }); // Adjust for Monday start
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
      <h3 className="text-2xl font-bold font-display text-blue-900 mb-4 flex items-center">
        <CalendarIcon className="w-6 h-6 mr-3" />
        Your Progress
      </h3>
      <div className="text-center mb-4">
        <span className="text-lg font-semibold text-gray-700">
          {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDays.map(day => (
          <div key={day} className="font-bold text-xs text-gray-500">{day}</div>
        ))}
        {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isPracticed = progress[dateStr];
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          
          let dayClass = 'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200';
          if (isToday) {
            dayClass += ' bg-blue-600 text-white font-bold ring-2 ring-blue-300';
          } else {
            dayClass += ' text-gray-700';
          }

          if (isPracticed) {
             dayClass += ' bg-green-400 text-white';
             if (isToday) {
                 dayClass += ' bg-green-500'; // Override for today + practiced
             }
          }

          return (
            <div key={day} className={dayClass}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;