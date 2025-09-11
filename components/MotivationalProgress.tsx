import React, { useState, useEffect } from 'react';
import { TrophyIcon, StarIcon, FlameIcon, TargetIcon, TrendUpIcon } from './Icons';

interface ProgressStats {
  wordsLearned: number;
  lessonsCompleted: number;
  streakDays: number;
  weeklyGoal: number;
  weeklyProgress: number;
  level: number;
  xp: number;
  nextLevelXp: number;
}

interface MotivationalProgressProps {
  showTurkish?: boolean;
}

const MotivationalProgress: React.FC<MotivationalProgressProps> = ({ showTurkish = false }) => {
  const [stats, setStats] = useState<ProgressStats>({
    wordsLearned: 0,
    lessonsCompleted: 0,
    streakDays: 0,
    weeklyGoal: 3,
    weeklyProgress: 0,
    level: 1,
    xp: 0,
    nextLevelXp: 100
  });
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const loadProgress = () => {
      const stored = localStorage.getItem('konusCengo_progress');
      if (stored) {
        try {
          const progress = JSON.parse(stored);
          setStats(prevStats => ({ ...prevStats, ...progress }));
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      }

      // Calculate streak
      const streakData = localStorage.getItem('konusCengoProgress') || '{}';
      const dates = Object.keys(JSON.parse(streakData)).sort();
      let streak = 0;
      let currentDate = new Date();
      
      for (let i = dates.length - 1; i >= 0; i--) {
        const date = new Date(dates[i]);
        const daysDiff = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24));
        
        if (daysDiff === streak) {
          streak++;
          currentDate = date;
        } else {
          break;
        }
      }
      
      setStats(prev => ({ ...prev, streakDays: streak }));
    };

    loadProgress();
    
    // Listen for progress updates
    const handleProgressUpdate = () => {
      loadProgress();
      // Show celebration on certain milestones
      const currentStats = JSON.parse(localStorage.getItem('konusCengo_progress') || '{}');
      if (currentStats.lessonsCompleted % 5 === 0 && currentStats.lessonsCompleted > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, []);

  const updateProgress = (type: 'lesson' | 'words', amount: number = 1) => {
    const newStats = { ...stats };
    
    if (type === 'lesson') {
      newStats.lessonsCompleted += amount;
      newStats.xp += 50;
      newStats.weeklyProgress += 1;
    } else if (type === 'words') {
      newStats.wordsLearned += amount;
      newStats.xp += amount * 5;
    }

    // Level up logic
    while (newStats.xp >= newStats.nextLevelXp) {
      newStats.xp -= newStats.nextLevelXp;
      newStats.level += 1;
      newStats.nextLevelXp = Math.floor(newStats.nextLevelXp * 1.5);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    setStats(newStats);
    localStorage.setItem('konusCengo_progress', JSON.stringify(newStats));
    window.dispatchEvent(new CustomEvent('progressUpdated'));
  };

  const xpPercentage = (stats.xp / stats.nextLevelXp) * 100;
  const weeklyPercentage = Math.min((stats.weeklyProgress / stats.weeklyGoal) * 100, 100);
  const levelTitle = stats.level <= 5 ? 'Cabin Boy' : stats.level <= 10 ? 'Sailor' : stats.level <= 20 ? 'Navigator' : 'Captain';

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 rounded-xl">
          <div className="text-center text-white animate-bounce">
            <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Congratulations!</h3>
            {showTurkish && <p className="italic">Tebrikler!</p>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Level and XP */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">
              Level {stats.level} {levelTitle}
              {showTurkish && <span className="block text-sm text-blue-600 italic">Seviye {stats.level}</span>}
            </h3>
            <StarIcon className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {stats.xp} / {stats.nextLevelXp} XP
          </p>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">
              {stats.streakDays} Day Streak
              {showTurkish && <span className="block text-sm text-orange-600 italic">{stats.streakDays} Gün Seri</span>}
            </h3>
            <FlameIcon className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm text-gray-600">
            Keep it up, matey!
            {showTurkish && <span className="block italic text-orange-500">Böyle devam et!</span>}
          </p>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">
              Weekly Goal
              {showTurkish && <span className="block text-sm text-green-600 italic">Haftalık Hedef</span>}
            </h3>
            <TargetIcon className="w-6 h-6 text-green-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${weeklyPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {stats.weeklyProgress} / {stats.weeklyGoal} lessons
            {showTurkish && <span className="block italic"> ders</span>}
          </p>
        </div>

        {/* Total Progress */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">
              Total Progress
              {showTurkish && <span className="block text-sm text-purple-600 italic">Toplam İlerleme</span>}
            </h3>
            <TrendUpIcon className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Words Learned {showTurkish && <span className="italic">(Öğrenilen Kelime)</span>}
              </span>
              <span className="font-semibold text-purple-600">{stats.wordsLearned}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Lessons Completed {showTurkish && <span className="italic">(Tamamlanan Ders)</span>}
              </span>
              <span className="font-semibold text-blue-600">{stats.lessonsCompleted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 text-center">
        {stats.streakDays === 0 && (
          <p className="text-gray-700">
            Start your learning journey today!
            {showTurkish && <span className="block italic text-blue-600 mt-1">Öğrenme yolculuğuna bugün başla!</span>}
          </p>
        )}
        {stats.streakDays > 0 && stats.streakDays < 7 && (
          <p className="text-gray-700">
            Great start! Keep building that streak! 
            {showTurkish && <span className="block italic text-blue-600 mt-1">Harika başlangıç! O seriyi büyütmeye devam et!</span>}
          </p>
        )}
        {stats.streakDays >= 7 && (
          <p className="text-gray-700 font-semibold">
            🏆 You're on fire! {stats.streakDays} days straight! 
            {showTurkish && <span className="block italic text-gold-600 mt-1">Alev alev yanıyorsun! {stats.streakDays} gün üst üste!</span>}
          </p>
        )}
      </div>

      {/* Hidden progress updater for external use */}
      <div style={{ display: 'none' }}>
        <button onClick={() => updateProgress('lesson')}>Add Lesson</button>
        <button onClick={() => updateProgress('words', 5)}>Add Words</button>
      </div>
    </div>
  );
};

export default MotivationalProgress;