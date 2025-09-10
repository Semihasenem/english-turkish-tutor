import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import DailySession from './components/DailySession';
import VocabularyBuilder from './components/VocabularyBuilder';
import ConversationPractice from './components/ConversationPractice';
import NonogramGame from './components/NonogramGame';
import WordFishingGame from './components/WordFishingGame';
import FillInBlanks from './components/FillInBlanks';
import PronunciationPractice from './components/PronunciationPractice';
import Feedback from './components/Feedback';
import ExplainableText from './components/ExplainableText';
import { ShipWheelIcon, MenuIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DAILY_LESSON);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const markDayAsPracticed = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    try {
      const progress = JSON.parse(localStorage.getItem('konusCengoProgress') || '{}');
      if (!progress[today]) {
        progress[today] = true;
        localStorage.setItem('konusCengoProgress', JSON.stringify(progress));
        // Optional: Dispatch a custom event to notify components like the tracker
        window.dispatchEvent(new CustomEvent('progressUpdated'));
      }
    } catch (error) {
      console.error("Failed to update progress in localStorage", error);
    }
  };

  const renderView = () => {
    const practiceProps = { markDayAsPracticed };
    switch (currentView) {
      case AppView.VOCABULARY:
        return <VocabularyBuilder {...practiceProps} />;
      case AppView.CONVERSATION:
        return <ConversationPractice {...practiceProps} />;
      case AppView.GAME:
        return <NonogramGame {...practiceProps} />;
      case AppView.WORD_FISHING:
        return <WordFishingGame {...practiceProps} />;
      case AppView.FILL_IN_BLANKS:
        return <FillInBlanks {...practiceProps} />;
      case AppView.PRONUNCIATION:
        return <PronunciationPractice {...practiceProps} />;
      case AppView.FEEDBACK:
        return <Feedback />;
      case AppView.DAILY_LESSON:
      default:
        return <DailySession setView={setCurrentView} {...practiceProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 relative">
      <div className="wave-bg"></div>
      <div className="floating-elements">
        <span>🕶️</span>
        <span></span>
        <span></span>
        <span>👓</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>😎</span>
      </div>
      
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="relative md:pl-64">
        <main className="p-4 sm:p-8 z-10 relative">
            <header className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <ShipWheelIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-800" />
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 font-display">Konuş Cengo</h1>
                        <ExplainableText 
                          text="Let's get ready for the trade fair!"
                          className="text-gray-600 mt-1 text-sm sm:text-base"
                        />
                    </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200"
                  aria-label="Open navigation menu"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
            </header>
            {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;