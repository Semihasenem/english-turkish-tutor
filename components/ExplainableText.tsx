import React, { useState, useRef, useEffect } from 'react';
import { getTurkishExplanation } from '../services/geminiService';
import { HelpCircleIcon } from './Icons';

interface ExplainableTextProps {
  text: string;
  className?: string;
}

const ExplainableText: React.FC<ExplainableTextProps> = ({ text, className }) => {
  const [translation, setTranslation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFetchTranslation = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicks on parent elements (like Dashboard cards)
    
    if (translation && !isLoading) {
      setIsVisible(!isVisible);
      return;
    }
    
    if (isLoading) return;

    setIsLoading(true);
    setIsVisible(true);
    try {
      const explanation = await getTurkishExplanation(text);
      setTranslation(explanation);
    } catch (error) {
      console.error("Failed to fetch translation", error);
      setTranslation("Çeviri alınamadı."); // "Translation could not be retrieved."
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-flex items-center gap-2 ${className}`}>
      <span>{text}</span>
      <button
        onClick={handleFetchTranslation}
        className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
        aria-label="Get Turkish explanation"
      >
        <HelpCircleIcon className="w-5 h-5" />
      </button>
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] sm:max-w-xs bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3 z-50 animate-fade-in"
          role="tooltip"
        >
          {isLoading ? 'Çevriliyor...' : translation}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default ExplainableText;
