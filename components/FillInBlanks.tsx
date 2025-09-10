import React, { useState, useMemo, useEffect } from 'react';
import { FILL_IN_BLANKS_PRACTICE } from '../constants';
import { FillInBlanksItem, PracticeProps } from '../types';
import { RefreshCwIcon } from './Icons';
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

interface FillInBlanksProps extends PracticeProps {
  items?: FillInBlanksItem[];
  onComplete?: () => void;
}

const FillInBlanks: React.FC<FillInBlanksProps> = ({ markDayAsPracticed, items, onComplete }) => {
  const isEmbedded = !!items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffleTrigger, setShuffleTrigger] = useState(0);

  const practiceList = useMemo(() => {
    return shuffleArray(items || [...FILL_IN_BLANKS_PRACTICE]);
  }, [shuffleTrigger, items]);
  
  useEffect(() => {
      handleShuffle();
  }, [items])

  const currentItem = practiceList[currentIndex];
  const isLastQuestion = currentIndex === practiceList.length - 1;

  const handleAnswer = (option: string) => {
    if (feedback) return;

    setSelectedAnswer(option);
    if (option === currentItem.blank) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (isEmbedded) {
          onComplete?.();
      } else {
          markDayAsPracticed();
      }
      handleShuffle();
    } else {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const handleShuffle = () => {
    setShuffleTrigger(t => t + 1);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
  };

  if(!currentItem) {
      return null;
  }

  return (
    <div className={`mx-auto animate-fade-in ${!isEmbedded ? 'max-w-3xl' : ''}`}>
      <div className={`${!isEmbedded ? 'bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200' : ''}`}>
        {!isEmbedded && (
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold font-display text-blue-900">Fill in the Blanks</h2>
            <button onClick={handleShuffle} className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <RefreshCwIcon className="w-4 h-4" />
                New Quiz
            </button>
            </div>
        )}
        <ExplainableText text="Complete the sentence with the correct word." className="text-gray-600 mb-2" />
         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentIndex + (feedback ? 1 : 0)) / practiceList.length) * 100}%` }}></div>
        </div>
        
        <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-200 mb-6 text-center space-y-2">
          <p className="text-2xl font-sans text-blue-900 font-medium">
            {currentItem.sentence.split('___').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < currentItem.sentence.split('___').length - 1 && (
                  <span className="inline-block bg-blue-200 w-32 h-8 rounded-md align-middle mx-2"></span>
                )}
              </React.Fragment>
            ))}
          </p>
          <p className="text-lg text-gray-500">{currentItem.turkish.replace('___', '___')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItem.options.map(option => {
            const isCorrect = option === currentItem.blank;
            let buttonClass = 'bg-white hover:bg-blue-50 border-gray-300';
            if (feedback && selectedAnswer === option) {
                buttonClass = isCorrect ? 'bg-green-500 text-white border-green-700' : 'bg-red-500 text-white border-red-700';
            } else if (feedback && isCorrect) {
                buttonClass = 'bg-green-500 text-white border-green-700';
            }
            
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!feedback}
                className={`p-4 rounded-lg border-2 text-lg font-semibold transition-all duration-300 ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className="mt-6 text-center" aria-live="assertive">
            <p className={`text-xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
              {feedback === 'correct' ? 'Excellent!' : `Not quite. The correct word is "${currentItem.blank}".`}
            </p>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg"
            >
              {isLastQuestion ? 'Finish & Start New Quiz' : 'Next Question'} &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FillInBlanks;