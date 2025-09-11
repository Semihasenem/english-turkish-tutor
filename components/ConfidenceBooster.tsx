import React, { useState, useEffect } from 'react';
import { StarIcon, TrophyIcon, HeartIcon } from './Icons';

interface ConfidenceBoosterProps {
  onConfidenceBuilt: () => void;
  showTurkish?: boolean;
}

const ConfidenceBooster: React.FC<ConfidenceBoosterProps> = ({ onConfidenceBuilt, showTurkish = false }) => {
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'affirmation' | 'ready'>('welcome');
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase('affirmation'), 2000);
    const timer2 = setTimeout(() => setCurrentPhase('ready'), 4000);
    const timer3 = setTimeout(() => setShowStars(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const affirmations = [
    {
      english: "You're doing great, Cengo! Every word you learn makes you stronger!",
      turkish: "Harika gidiyorsun Cengo! Öğrendiğin her kelime seni daha güçlü yapıyor!"
    },
    {
      english: "Your English skills are growing every day, matey!",
      turkish: "İngilizce becerilerin her gün gelişiyor, dostum!"
    },
    {
      english: "Remember: Making mistakes is part of learning. You're brave for trying!",
      turkish: "Unutma: Hata yapmak öğrenmenin bir parçası. Denemek için cesursun!"
    }
  ];

  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <div className="relative bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto">
      {showStars && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <StarIcon 
              key={i}
              className={`absolute w-6 h-6 text-yellow-400 animate-ping opacity-60`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        {currentPhase === 'welcome' && (
          <div className="animate-fade-in">
            <HeartIcon className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Welcome aboard, Captain Cengo!
              {showTurkish && (
                <span className="block text-lg text-blue-600 font-normal italic mt-2">
                  Hoş geldin Kaptan Cengo!
                </span>
              )}
            </h2>
          </div>
        )}

        {currentPhase === 'affirmation' && (
          <div className="animate-fade-in">
            <TrophyIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-lg text-gray-700 leading-relaxed">
              {randomAffirmation.english}
              {showTurkish && (
                <span className="block text-blue-600 italic mt-3">
                  {randomAffirmation.turkish}
                </span>
              )}
            </p>
          </div>
        )}

        {currentPhase === 'ready' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                <HeartIcon className="w-8 h-8 text-red-400" />
                <TrophyIcon className="w-8 h-8 text-yellow-500" />
                <StarIcon className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                You're ready to learn and grow!
                {showTurkish && (
                  <span className="block text-lg text-blue-600 font-normal italic mt-1">
                    Öğrenmeye ve gelişmeye hazırsın!
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600">
                Remember: There's no rush, no pressure, just progress!
                {showTurkish && (
                  <span className="block text-blue-500 italic mt-1">
                    Unutma: Acele yok, baskı yok, sadece ilerleme!
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={onConfidenceBuilt}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              I'm Ready to Learn! 🚀
              {showTurkish && (
                <span className="block text-sm opacity-90 mt-1">Öğrenmeye Hazırım!</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfidenceBooster;