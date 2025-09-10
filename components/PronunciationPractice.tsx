import React, { useState, useMemo, useEffect } from 'react';
import { VOCABULARY_LIST } from '../constants';
import { PracticeProps, VocabularyCategory } from '../types';
import { Volume2Icon, MicIcon } from './Icons';
import ExplainableText from './ExplainableText';

// Web Speech API interfaces
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

// Fix: Define the SpeechRecognitionErrorEvent interface to resolve missing type error.
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

const PronunciationPractice: React.FC<PracticeProps> = ({ markDayAsPracticed }) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory>('Eyewear');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [currentTarget, setCurrentTarget] = useState<string | null>(null);
  const [practicedWords, setPracticedWords] = useState<Set<string>>(new Set());

  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const instance = new SpeechRecognition();
    instance.lang = 'en-US';
    instance.continuous = false;
    instance.interimResults = false;
    return instance;
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const target = currentTarget?.toLowerCase().trim();
      
      if (target && transcript.includes(target)) {
        setFeedback(prev => ({ ...prev, [currentTarget!]: 'correct' }));
        const newPracticed = new Set(practicedWords).add(currentTarget!);
        setPracticedWords(newPracticed);
        if(newPracticed.size >= 5) {
            markDayAsPracticed();
        }
      } else {
        setFeedback(prev => ({ ...prev, [currentTarget!]: 'incorrect' }));
      }
      setCurrentTarget(null);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setCurrentTarget(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition, currentTarget, practicedWords, markDayAsPracticed]);

  const filteredList = useMemo(() => {
    return VOCABULARY_LIST.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handlePlaySound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const handleListen = (text: string) => {
    if (!recognition || isListening) return;
    setCurrentTarget(text);
    setFeedback(prev => ({ ...prev, [text]: null }));
    setIsListening(true);
    recognition.start();
  };

  const categories: VocabularyCategory[] = ['Eyewear', 'Business', 'Sailboats', 'Diving', 'Marine', 'AI & Tech', 'Global News'];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold font-display text-blue-900 mb-2">Pronunciation Practice</h2>
        <ExplainableText text="Listen, then click the mic to record your pronunciation." className="text-gray-600 mb-6" />

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

        {!recognition && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">Sorry, your browser doesn't support speech recognition.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredList.map((item, index) => {
            const itemFeedback = feedback[item.english];
            let feedbackClass = '';
            if (isListening && currentTarget === item.english) feedbackClass = 'ring-4 ring-blue-400';
            else if (itemFeedback === 'correct') feedbackClass = 'ring-4 ring-green-500';
            else if (itemFeedback === 'incorrect') feedbackClass = 'ring-4 ring-red-500';

            return (
              <div key={index} className={`bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center justify-between transition-all duration-300 ${feedbackClass}`}>
                <div>
                  <p className="font-bold text-lg text-blue-900">{item.english}</p>
                  <p className="text-sm text-gray-600">{item.turkish}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePlaySound(item.english)}
                    aria-label={`Listen to ${item.english}`}
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Volume2Icon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleListen(item.english)}
                    disabled={!recognition || isListening}
                    aria-label={`Pronounce ${item.english}`}
                    className={`p-3 rounded-full transition-colors ${
                      isListening && currentTarget === item.english
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    } disabled:opacity-50`}
                  >
                    <MicIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PronunciationPractice;