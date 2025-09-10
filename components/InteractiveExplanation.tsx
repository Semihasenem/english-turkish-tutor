import React, { useState } from 'react';
import { ExplanationPart } from '../types';

interface InteractiveExplanationProps {
  parts: ExplanationPart[];
}

const TextPart: React.FC<{ content: string }> = ({ content }) => (
  <p className="text-gray-700 leading-relaxed my-3">{content}</p>
);

const ExamplePart: React.FC<{ english: string; turkish: string }> = ({ english, turkish }) => {
  const [showTurkish, setShowTurkish] = useState(false);
  return (
    <div className="my-4 p-4 bg-blue-50/70 border-l-4 border-blue-400 rounded-r-lg">
      <p className="font-semibold text-blue-900 italic">"{english}"</p>
      <button
        onClick={() => setShowTurkish(!showTurkish)}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        {showTurkish ? 'Hide' : 'Show'} Turkish
      </button>
      {showTurkish && (
        <p className="mt-1 text-gray-600 italic animate-fade-in text-sm">"{turkish}"</p>
      )}
    </div>
  );
};

const QuizPart: React.FC<{ question: string; options: string[]; answer: string }> = ({
  question,
  options,
  answer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleSelect = (option: string) => {
    if (feedback) return;
    setSelected(option);
    if (option === answer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className="my-6 p-4 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-lg">
      <p className="font-semibold text-amber-900 mb-3">{question}</p>
      <div className="flex flex-col space-y-2">
        {options.map((option) => {
          let buttonClass = 'bg-white hover:bg-gray-100 border-gray-300';
          if (feedback && selected === option) {
            buttonClass = option === answer ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400';
          } else if (feedback && option === answer) {
            buttonClass = 'bg-green-200 border-green-400';
          }
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!feedback}
              className={`p-3 rounded-lg border-2 text-left font-medium transition-colors ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {feedback && (
        <p className={`mt-3 font-bold animate-fade-in ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
          {feedback === 'correct' ? "That's the spirit, matey!" : `Not quite! The correct answer is "${answer}".`}
        </p>
      )}
    </div>
  );
};

const InteractiveExplanation: React.FC<InteractiveExplanationProps> = ({ parts }) => {
  // Failsafe if the entire detailedExplanation is not an array
  if (!Array.isArray(parts)) {
    console.error("InteractiveExplanation received non-array 'parts'", parts);
    return <div className="text-red-500 p-4 bg-red-100 rounded-lg">Error: Lesson content could not be loaded correctly.</div>;
  }
  
  return (
    <div className="prose prose-sm max-w-none">
      {parts.map((part, index) => {
        // Defensive checks to ensure the part has the expected type and properties
        if (!part || typeof part.type !== 'string') {
          return null; // Skip malformed parts
        }

        switch (part.type) {
          case 'text':
            return 'content' in part && typeof part.content === 'string' ? (
              <TextPart key={index} content={part.content} />
            ) : null;

          case 'example':
            return 'english' in part && typeof part.english === 'string' && 'turkish' in part && typeof part.turkish === 'string' ? (
              <ExamplePart key={index} english={part.english} turkish={part.turkish} />
            ) : null;
            
          case 'quiz':
            return 'question' in part &&
                   'options' in part &&
                   'answer' in part &&
                   typeof part.question === 'string' &&
                   Array.isArray(part.options) &&
                   part.options.every(opt => typeof opt === 'string') &&
                   typeof part.answer === 'string' ? (
              <QuizPart key={index} question={part.question} options={part.options} answer={part.answer} />
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default InteractiveExplanation;