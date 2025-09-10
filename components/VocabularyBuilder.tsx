import React, { useState, useMemo, useEffect } from 'react';
import { VOCABULARY_LIST } from '../constants';
import { PracticeProps, VocabularyCategory, VocabularyItem } from '../types';
import { RefreshCwIcon } from './Icons';

// Fisher-Yates shuffle algorithm for robust randomization
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

interface VocabularyBuilderProps extends PracticeProps {
  items?: VocabularyItem[];
  onComplete?: () => void;
}

const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ markDayAsPracticed, items, onComplete }) => {
  const isEmbedded = !!items;
  const vocabularySource = useMemo(() => items || VOCABULARY_LIST, [items]);

  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffleTrigger, setShuffleTrigger] = useState(0);
  const [sessionProgress, setSessionProgress] = useState<Set<number>>(new Set());

  const filteredList = useMemo(() => {
    if (isEmbedded) {
      return shuffleArray(vocabularySource as VocabularyItem[]);
    }
    const list = selectedCategory === 'All'
      ? vocabularySource
      : vocabularySource.filter(item => item.category === selectedCategory);
    return shuffleArray(list as VocabularyItem[]);
  }, [selectedCategory, shuffleTrigger, isEmbedded, vocabularySource]);

  useEffect(() => {
    // Reset progress when category or items change
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionProgress(new Set());
  }, [selectedCategory, shuffleTrigger, items]);
  
  useEffect(() => {
    if (filteredList.length > 0) {
      const newProgress = new Set(sessionProgress).add(currentIndex);
      setSessionProgress(newProgress);
      if(newProgress.size === filteredList.length) {
        if (isEmbedded) {
          onComplete?.();
        } else {
          markDayAsPracticed();
        }
      }
    }
  }, [currentIndex, filteredList.length, isEmbedded, markDayAsPracticed, sessionProgress, onComplete]);

  const currentItem = filteredList[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredList.length);
    }, 150);
  };
  
  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredList.length) % filteredList.length);
    }, 150);
  };

  const handleShuffle = () => {
    setShuffleTrigger(t => t + 1);
  };

  const categories: (VocabularyCategory | 'All')[] = ['All', 'Eyewear', 'Business', 'Sailboats', 'Diving', 'Marine', 'AI & Tech', 'Global News'];

  return (
    <div className={`mx-auto animate-fade-in ${!isEmbedded ? 'max-w-2xl' : ''}`}>
      <div className={`${!isEmbedded ? 'bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200' : ''}`}>
        {!isEmbedded && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold font-display text-blue-900">Vocabulary</h2>
              <button onClick={handleShuffle} className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <RefreshCwIcon className="w-4 h-4" />
                Shuffle
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}

        {currentItem ? (
          <div>
            <div
              className="w-full h-64 perspective-1000 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                aria-live="polite"
              >
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-blue-100 border-2 border-blue-300 rounded-lg shadow-md">
                  <p className="text-4xl font-bold text-blue-900 text-center">{currentItem.turkish}</p>
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-green-100 border-2 border-green-300 rounded-lg shadow-md">
                  <p className="text-4xl font-bold text-green-900 text-center">{currentItem.english}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center w-full">
              <button onClick={handlePrev} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">Prev</button>
              <p className="text-gray-600 font-medium">{currentIndex + 1} / {filteredList.length}</p>
              <button onClick={handleNext} className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium">Next</button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 h-72 flex items-center justify-center">Select a category to start learning!</p>
        )}
      </div>
    </div>
  );
};

export default VocabularyBuilder;