import React from 'react';
import { AppView } from '../types';
import { HomeIcon, BookOpenIcon, MessageSquareIcon, GridIcon, ShipWheelIcon, XIcon, FishingRodIcon, Edit3Icon, Volume2Icon, MailIcon } from './Icons';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const navItems = [
    { view: AppView.DAILY_LESSON, label: "Today's Lesson", icon: HomeIcon },
    { view: AppView.VOCABULARY, label: 'Vocabulary', icon: BookOpenIcon },
    { view: AppView.CONVERSATION, label: "Chat with Captain", icon: MessageSquareIcon },
    { view: AppView.WORD_FISHING, label: 'Word Fishing', icon: FishingRodIcon },
    { view: AppView.FILL_IN_BLANKS, label: 'Fill in the Blanks', icon: Edit3Icon },
    { view: AppView.PRONUNCIATION, label: 'Pronunciation', icon: Volume2Icon },
    { view: AppView.GAME, label: 'Puzzle Reef', icon: GridIcon },
    { view: AppView.FEEDBACK, label: 'Feedback & Ideas', icon: MailIcon },
  ];

  const handleNavClick = (view: AppView) => {
    setView(view);
    setIsOpen(false);
  };

  const NavLink: React.FC<{
    view: AppView;
    label: string;
    icon: React.ElementType;
  }> = ({ view, label, icon: Icon }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => handleNavClick(view)}
        className={`flex items-center w-full px-4 py-3 text-left transition-all duration-200 ease-in-out rounded-lg ${
          isActive
            ? 'bg-blue-800 text-white shadow-lg'
            : 'text-blue-100 hover:bg-blue-600 hover:text-white'
        }`}
        aria-current={isActive}
      >
        <Icon className="w-6 h-6 mr-4" />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(false)} 
        className={`fixed inset-0 bg-black/60 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />
      <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-4 flex flex-col space-y-4 shadow-2xl z-30 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex justify-between items-center text-center py-4 border-b border-blue-700">
            <ShipWheelIcon className="w-12 h-12 text-blue-300 animate-spin-slow"/>
            <h2 className="text-xl font-bold font-display">Konuş Cengo</h2>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-blue-200 hover:text-white">
                <XIcon className="w-6 h-6"/>
            </button>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.view} {...item} />
          ))}
        </nav>
        <div className="text-center text-xs text-blue-300 p-2">
          <p>&copy; 2024 Your Learning Voyage</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;