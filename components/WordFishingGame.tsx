import React, { useState, useMemo, useEffect } from 'react';
import { VOCABULARY_LIST } from '../constants';
import { PracticeProps, VocabularyCategory, VocabularyItem } from '../types';
import { FishingRodIcon } from './Icons';
import ExplainableText from './ExplainableText';

// Fisher-Yates shuffle algorithm for robust randomization
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Helper to get random items from an array without the correct one
const getRandomOptions = (arr: VocabularyItem[], correctItem: VocabularyItem, count: number): VocabularyItem[] => {
  const filtered = arr.filter(item => item.english !== correctItem.english);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count);
};

const WordFishingGame: React.FC<PracticeProps> = ({ markDayAsPracticed }) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory | 'All'>('Eyewear');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<VocabularyItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const filteredList = useMemo(() => {
    const list = selectedCategory === 'All'
      ? VOCABULARY_LIST
      : VOCABULARY_LIST.filter(item => item.category === selectedCategory);
    return shuffleArray(list);
  }, [selectedCategory]);

  const currentItem = filteredList[currentQuestionIndex];

  useEffect(() => {
    if (currentItem) {
      const wrongOptions = getRandomOptions(VOCABULARY_LIST, currentItem, 3);
      const allOptions = shuffleArray([...wrongOptions, currentItem]);
      setOptions(allOptions);
    }
  }, [currentItem]);
  
  useEffect(() => {
    if (correctAnswersCount === 5) {
      markDayAsPracticed();
    }
  }, [correctAnswersCount, markDayAsPracticed]);

  const handleAnswer = (selectedItem: VocabularyItem) => {
    if (feedback) return; // Prevent multiple clicks

    setSelectedAnswer(selectedItem.turkish);

    if (selectedItem.english === currentItem.english) {
      setFeedback('correct');
      setScore(s => s + 10);
      setCorrectAnswersCount(c => c + 1);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(prev => (prev + 1) % filteredList.length);
    }, 1500);
  };
  
  const handleCategoryChange = (cat: VocabularyCategory | 'All') => {
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setCorrectAnswersCount(0);
  };

  const categories: (VocabularyCategory | 'All')[] = ['Eyewear', 'Business', 'Sailboats', 'Diving', 'Marine', 'AI & Tech', 'Global News', 'All'];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-1">
            <h2 className="text-3xl font-bold font-display text-blue-900">Word Fishing</h2>
            <div className="text-xl font-bold text-green-700 bg-green-100 px-4 py-2 rounded-lg">Score: {score}</div>
        </div>
        <div className="mb-4">
             <ExplainableText text="Match the English word to its Turkish meaning to score points." className="text-gray-600"/>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        {currentItem ? (
          <div className="text-center">
            <div className="relative mb-8 p-6 bg-blue-100 rounded-lg border-2 border-blue-300">
                <FishingRodIcon className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-8 h-8 text-blue-600"/>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-blue-400"></div>
                <p className="text-gray-600 mb-2">What is the Turkish for...</p>
                <h3 className="text-4xl font-bold text-blue-900">{currentItem.english}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option, index) => {
                    const isCorrect = option.english === currentItem.english;
                    let buttonClass = 'bg-white hover:bg-blue-50 border-gray-300';
                    if (feedback && selectedAnswer === option.turkish) {
                        buttonClass = isCorrect ? 'bg-green-500 text-white border-green-700' : 'bg-red-500 text-white border-red-700';
                    } else if (feedback && isCorrect) {
                        buttonClass = 'bg-green-500 text-white border-green-700';
                    }

                    return (
                        <button 
                            key={index} 
                            onClick={() => handleAnswer(option)}
                            disabled={!!feedback}
                            className={`p-4 rounded-lg border-2 text-lg font-semibold transition-all duration-300 ${buttonClass}`}
                        >
                            {option.turkish}
                        </button>
                    );
                })}
            </div>

            {feedback && (
                <p className={`mt-4 text-xl font-bold ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback === 'correct' ? 'Great job!' : `Not quite! The correct answer is '${currentItem.turkish}'.`}
                </p>
            )}
          </div>
        ) : (
             <p className="text-center text-gray-500 h-60 flex items-center justify-center">Select a category to start fishing for words!</p>
        )}
      </div>
    </div>
  );
};

export default WordFishingGame;