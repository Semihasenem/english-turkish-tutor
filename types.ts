// Fix: Add React import to resolve 'React' namespace error for React.ElementType.
import React from 'react';

export enum AppView {
  DAILY_LESSON = 'DAILY_LESSON',
  DASHBOARD = 'DASHBOARD',
  VOCABULARY = 'VOCABULARY',
  CONVERSATION = 'CONVERSATION',
  GAME = 'GAME',
  WORD_FISHING = 'WORD_FISHING',
  FILL_IN_BLANKS = 'FILL_IN_BLANKS',
  PRONUNCIATION = 'PRONUNCIATION',
  FEEDBACK = 'FEEDBACK',
}

export type VocabularyCategory = 'Eyewear' | 'Business' | 'Marine' | 'Diving' | 'Sailboats' | 'AI & Tech' | 'Global News';

export type VocabularyItem = {
  english: string;
  turkish: string;
  category: VocabularyCategory;
};

export type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export type NonogramPuzzle = {
  name: string;
  icon: React.ElementType;
  solution: boolean[][];
  vocabulary: { english: string; turkish: string }[];
};

export type GridCellState = 'empty' | 'filled' | 'crossed';

export type FillInBlanksItem = {
  sentence: string; // "Could you give me a ___ on these frames?"
  turkish: string; // "Bu çerçevelerde bana bir ___ verir misiniz?"
  blank: string;   // "discount"
  options: string[];
};

export interface PracticeProps {
  markDayAsPracticed: () => void;
}

export type ExplanationPart =
  | { type: 'text'; content: string }
  | { type: 'example'; english: string; turkish: string }
  | {
      type: 'quiz';
      question: string;
      options: string[];
      answer: string;
    };

export type DailySessionPlan = {
  grammarTopic: string;
  explanation: string;
  detailedExplanation: ExplanationPart[];
  vocabulary: VocabularyItem[];
  fillInBlanks: FillInBlanksItem[];
  conversationPrompt: string;
  summary: string;
};