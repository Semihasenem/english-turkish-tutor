import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, RefreshCwIcon, BrainIcon } from './Icons';

interface ReviewItem {
  id: string;
  english: string;
  turkish: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: number; // timestamp
  interval: number; // days
  repetitions: number;
}

interface SpacedRepetitionProps {
  items: Array<{english: string; turkish: string; category: string}>;
  onComplete: () => void;
  showTurkish?: boolean;
}

const SpacedRepetition: React.FC<SpacedRepetitionProps> = ({ items, onComplete, showTurkish = false }) => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initialize or load review items from localStorage
    const storageKey = 'konusCengo_spacedRepetition';
    const stored = localStorage.getItem(storageKey);
    let reviewItems: ReviewItem[] = [];

    if (stored) {
      reviewItems = JSON.parse(stored).filter((item: ReviewItem) => 
        items.some(i => i.english === item.english)
      );
    }

    // Add new items that aren't in storage
    const newItems = items.filter(item => 
      !reviewItems.some(r => r.english === item.english)
    ).map((item, index) => ({
      id: `${item.english}_${Date.now()}_${index}`,
      ...item,
      difficulty: 'medium' as const,
      nextReview: Date.now(),
      interval: 1,
      repetitions: 0
    }));

    reviewItems = [...reviewItems, ...newItems];

    // Filter items due for review (plus 20% for variety)
    const dueItems = reviewItems.filter(item => item.nextReview <= Date.now());
    const varietyItems = reviewItems.filter(item => Math.random() < 0.2);
    const finalItems = [...dueItems, ...varietyItems].slice(0, Math.min(8, items.length));

    setReviewItems(finalItems);
    if (finalItems.length > 0) {
      setCurrentItem(finalItems[0]);
    } else {
      setIsComplete(true);
    }
  }, [items]);

  const calculateNextInterval = (item: ReviewItem, performance: 'easy' | 'medium' | 'hard'): number => {
    // SuperMemo 2 algorithm simplified
    let interval = item.interval;
    let repetitions = item.repetitions + 1;

    if (performance === 'hard') {
      interval = 1;
      repetitions = 0;
    } else if (performance === 'medium') {
      interval = Math.max(1, Math.ceil(interval * 1.3));
    } else { // easy
      interval = Math.max(1, Math.ceil(interval * 2.5));
    }

    return Math.min(interval, 30); // Cap at 30 days
  };

  const handleAnswer = (performance: 'easy' | 'medium' | 'hard') => {
    if (!currentItem) return;

    const newInterval = calculateNextInterval(currentItem, performance);
    const nextReview = Date.now() + (newInterval * 24 * 60 * 60 * 1000);

    // Update the item
    const updatedItem = {
      ...currentItem,
      difficulty: performance,
      nextReview,
      interval: newInterval,
      repetitions: currentItem.repetitions + 1
    };

    // Update localStorage
    const storageKey = 'konusCengo_spacedRepetition';
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedStorage = stored.map((item: ReviewItem) => 
      item.id === updatedItem.id ? updatedItem : item
    );
    if (!stored.some((item: ReviewItem) => item.id === updatedItem.id)) {
      updatedStorage.push(updatedItem);
    }
    localStorage.setItem(storageKey, JSON.stringify(updatedStorage));

    // Update session stats
    const isCorrect = performance !== 'hard';
    setSessionStats(prev => ({ 
      correct: prev.correct + (isCorrect ? 1 : 0), 
      total: prev.total + 1 
    }));

    // Move to next item
    const remaining = reviewItems.filter(item => item.id !== currentItem.id);
    if (remaining.length > 0) {
      setCurrentItem(remaining[0]);
      setReviewItems(remaining);
      setShowAnswer(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;
    return (
      <div className="text-center p-8 bg-green-50 rounded-xl">
        <BrainIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Great Memory Training!
          {showTurkish && (
            <span className="block text-lg text-green-600 font-normal italic mt-1">
              Harika Hafıza Antrenmanı!
            </span>
          )}
        </h3>
        <p className="text-green-700 mb-4">
          You reviewed {sessionStats.total} items with {accuracy}% accuracy
          {showTurkish && (
            <span className="block text-green-600 italic text-sm mt-1">
              {sessionStats.total} öğeyi %{accuracy} doğrulukla tekrar ettiniz
            </span>
          )}
        </p>
        <p className="text-sm text-green-600 mb-6">
          These words will come back for review based on how well you knew them!
          {showTurkish && (
            <span className="block italic mt-1">
              Bu kelimeler ne kadar iyi bildiğinize göre tekrar için geri gelecek!
            </span>
          )}
        </p>
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Continue Learning
          {showTurkish && <span className="block text-sm opacity-90">Öğrenmeye Devam</span>}
        </button>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between text-sm text-blue-700">
          <span className="flex items-center gap-2">
            <BrainIcon className="w-4 h-4" />
            Memory Training {sessionStats.total + 1} / {sessionStats.total + reviewItems.length}
            {showTurkish && <span className="italic">Hafıza Antrenmanı</span>}
          </span>
          <span>{sessionStats.correct}/{sessionStats.total} correct</span>
        </div>
        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((sessionStats.total) / (sessionStats.total + reviewItems.length)) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mb-4">
            {currentItem.category}
          </span>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            {currentItem.english}
          </h3>
        </div>

        {!showAnswer ? (
          <div>
            <p className="text-gray-600 mb-6">
              Do you remember what this means in Turkish?
              {showTurkish && (
                <span className="block italic text-blue-600 mt-2">
                  Bunun Türkçe'de ne anlama geldiğini hatırlıyor musun?
                </span>
              )}
            </p>
            <button
              onClick={() => setShowAnswer(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Show Answer
              {showTurkish && <span className="block text-sm opacity-90">Cevabı Göster</span>}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-semibold text-blue-800">
                {currentItem.turkish}
              </p>
            </div>
            
            <p className="text-gray-600 mb-6">
              How well did you remember this?
              {showTurkish && (
                <span className="block italic text-blue-600 mt-1">
                  Bunu ne kadar iyi hatırladın?
                </span>
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleAnswer('hard')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                <XCircleIcon className="w-5 h-5" />
                Didn't Know
                {showTurkish && <span className="block text-xs opacity-90">Bilmiyordum</span>}
              </button>
              <button
                onClick={() => handleAnswer('medium')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold"
              >
                <RefreshCwIcon className="w-5 h-5" />
                Took Time
                {showTurkish && <span className="block text-xs opacity-90">Zaman Aldı</span>}
              </button>
              <button
                onClick={() => handleAnswer('easy')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Knew It!
                {showTurkish && <span className="block text-xs opacity-90">Biliyordum!</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpacedRepetition;