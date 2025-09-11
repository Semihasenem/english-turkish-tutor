import React, { useState, useEffect } from 'react';
import { AppView, DailySessionPlan, PracticeProps } from '../types';
import { GRAMMAR_LESSONS } from '../data/grammarLessons';
import { ShipWheelIcon, BookOpenIcon, Edit3Icon, MessageSquareIcon, CheckCircleIcon, ArrowLeftIcon } from './Icons';
import VocabularyBuilder from './VocabularyBuilder';
import FillInBlanks from './FillInBlanks';
import InteractiveExplanation from './InteractiveExplanation';
import ExplainableText from './ExplainableText';

enum ViewState {
    TOPIC_SELECTION,
    LOADING,
    LESSON
}

enum SessionStep {
    GRAMMAR,
    VOCABULULARY,
    PRACTICE,
    CONVERSATION,
    SUMMARY
}

const loadingMessages = [
    "Charting today's course...",
    "Consulting the ancient sea maps...",
    "Negotiating with mermaids for grammar rules...",
    "Polishing the cannons for practice...",
    "Waking the Kraken... just kidding, savvy?",
];

const beginnerTopics = GRAMMAR_LESSONS.map(lesson => lesson.grammarTopic);

const ProgressBar: React.FC<{ currentStep: SessionStep }> = ({ currentStep }) => {
    const steps = ['Grammar', 'Vocabulary', 'Practice', 'Conversation', 'Complete!'];
    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${currentStep >= index ? 'bg-blue-800 border-blue-800 text-white popIn' : 'bg-white border-gray-300 text-gray-500'}`}>
                            {currentStep > index ? <CheckCircleIcon className="w-6 h-6"/> : index + 1}
                        </div>
                        <p className={`mt-2 text-xs font-semibold ${currentStep >= index ? 'text-blue-800' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${currentStep > index ? 'bg-blue-800' : 'bg-gray-300'}`}>
                           <div className="h-1 bg-blue-800 rounded-full" style={{ width: currentStep > index ? '100%' : '0%', transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};


interface DailySessionProps extends PracticeProps {
    setView: (view: AppView) => void;
}

const DailySession: React.FC<DailySessionProps> = ({ setView, markDayAsPracticed }) => {
    const [viewState, setViewState] = useState<ViewState>(ViewState.TOPIC_SELECTION);
    const [sessionPlan, setSessionPlan] = useState<DailySessionPlan | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<SessionStep>(SessionStep.GRAMMAR);
    const [vocabCompleted, setVocabCompleted] = useState(false);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    useEffect(() => {
        let interval: number;
        if (viewState === ViewState.LOADING) {
            interval = window.setInterval(() => {
                setLoadingMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [viewState]);

    const fetchSession = (topic?: string) => {
        setViewState(ViewState.LOADING);
        setError(null);
        
        // Simulate brief loading for better UX
        setTimeout(() => {
            try {
                let plan: DailySessionPlan;
                
                if (topic) {
                    // Find the lesson with matching topic
                    const matchingLesson = GRAMMAR_LESSONS.find(lesson => 
                        lesson.grammarTopic.toLowerCase().includes(topic.toLowerCase()) ||
                        topic.toLowerCase().includes(lesson.grammarTopic.toLowerCase())
                    );
                    plan = matchingLesson || GRAMMAR_LESSONS[0];
                } else {
                    // Captain's choice - random lesson
                    const randomIndex = Math.floor(Math.random() * GRAMMAR_LESSONS.length);
                    plan = GRAMMAR_LESSONS[randomIndex];
                }
                
                setSessionPlan(plan);
                setCurrentStep(SessionStep.GRAMMAR);
                setVocabCompleted(false);
                setViewState(ViewState.LESSON);
            } catch (err) {
                setError("Blast! The sea charts for today's lesson are lost. Try again, matey.");
                console.error(err);
                setViewState(ViewState.TOPIC_SELECTION);
            }
        }, 800); // Brief loading animation
    };

    const handleNextStep = () => setCurrentStep(prev => prev + 1);
    const handleQuizComplete = () => setCurrentStep(SessionStep.CONVERSATION);
    const handleVocabComplete = () => { if (!vocabCompleted) setVocabCompleted(true); };
    
    const handleStartConversation = () => {
        if (sessionPlan) {
            sessionStorage.setItem('kc-conversation-prompt', sessionPlan.conversationPrompt);
            setView(AppView.CONVERSATION);
        }
    };

    const handleSessionComplete = () => {
        markDayAsPracticed();
        setCurrentStep(SessionStep.SUMMARY);
    };

    const changeTopic = () => {
        setSessionPlan(null);
        setViewState(ViewState.TOPIC_SELECTION);
    };
    
    const restartLesson = () => setCurrentStep(SessionStep.GRAMMAR);

    const renderContent = () => {
        switch (viewState) {
            case ViewState.LOADING:
                return (
                    <div className="flex flex-col items-center justify-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg h-96">
                        <ShipWheelIcon className="w-24 h-24 text-blue-800 animate-spin-slow" />
                        <h2 className="mt-6 text-2xl font-bold font-display text-blue-900">Ahoy!</h2>
                        <p className="mt-2 text-gray-600 h-6 transition-opacity duration-500">{loadingMessages[loadingMessageIndex]}</p>
                    </div>
                );
            case ViewState.TOPIC_SELECTION:
                return (
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center animate-fade-in">
                        <h2 className="text-3xl font-bold font-display text-blue-900">Choose Your Voyage</h2>
                        <p className="text-gray-600 mt-2 mb-6">What shall we learn today, matey?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {beginnerTopics.map(topic => (
                                <button key={topic} onClick={() => fetchSession(topic)} className="p-4 bg-white border-2 border-blue-300 rounded-lg text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
                                    {topic}
                                </button>
                            ))}
                        </div>
                        <div className="my-4 text-gray-500 font-semibold">OR</div>
                        <button onClick={() => fetchSession()} className="px-8 py-4 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-all shadow-md hover:shadow-lg">
                            🏴‍☠️ Captain's Choice
                        </button>
                    </div>
                );
            case ViewState.LESSON:
                if (!sessionPlan) return null;
                return (
                    <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
                        <button onClick={changeTopic} className="flex items-center gap-2 text-sm text-blue-700 hover:underline font-semibold mb-4">
                            <ArrowLeftIcon className="w-4 h-4" />
                            Change Topic
                        </button>
                        <ProgressBar currentStep={currentStep} />
                        <div className="mt-6">{renderLessonStep(sessionPlan)}</div>
                    </div>
                );
        }
    };
    
    const renderLessonStep = (plan: DailySessionPlan) => {
        const stepContentClass = "animate-fade-in";
        switch (currentStep) {
            case SessionStep.GRAMMAR:
                return (
                    <div className={stepContentClass}>
                        <h2 className="text-3xl font-bold font-display text-blue-900 text-center mb-2">Today's Topic: {plan.grammarTopic}</h2>
                        <p className="text-center text-gray-600 mb-6">{plan.explanation}</p>
                        <InteractiveExplanation parts={plan.detailedExplanation} />
                        <div className="text-center">
                            <button onClick={handleNextStep} className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg shadow-md hover:shadow-lg">
                                Learn the Words &rarr;
                            </button>
                        </div>
                    </div>
                );
            case SessionStep.VOCABULULARY:
                return (
                    <div className={`${stepContentClass} text-center`}>
                        <div className="flex items-center justify-center mb-4">
                             <BookOpenIcon className="w-6 h-6 mr-3 text-blue-700"/>
                            <ExplainableText text="Treasure Words" className="text-2xl font-bold font-display text-blue-900"/>
                        </div>
                        <VocabularyBuilder items={plan.vocabulary} markDayAsPracticed={() => {}} onComplete={handleVocabComplete} />
                        {vocabCompleted && (
                             <button onClick={handleNextStep} className="mt-8 px-8 py-3 w-full sm:w-auto bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg shadow-md hover:shadow-lg animate-fade-in">
                                Time to Practice &rarr;
                            </button>
                        )}
                    </div>
                );
            case SessionStep.PRACTICE:
                return (
                     <div className={`${stepContentClass} text-center`}>
                        <div className="flex items-center justify-center mb-4">
                             <Edit3Icon className="w-6 h-6 mr-3 text-blue-700"/>
                            <ExplainableText text="Map the Phrases" className="text-2xl font-bold font-display text-blue-900"/>
                        </div>
                        <FillInBlanks items={plan.fillInBlanks} onComplete={handleQuizComplete} markDayAsPracticed={()=>{}}/>
                    </div>
                );
            case SessionStep.CONVERSATION:
                 return (
                    <div className={`${stepContentClass} text-center`}>
                        <div className="flex items-center justify-center mb-4">
                            <MessageSquareIcon className="w-6 h-6 mr-3 text-blue-700"/>
                            <ExplainableText text="Parlay with the Captain" className="text-2xl font-bold font-display text-blue-900"/>
                        </div>
                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">Ready to use what you've learned? Practice your new skills in a conversation with Captain Jack.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <button onClick={handleStartConversation} className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg shadow-md hover:shadow-lg">
                                Let's Chat!
                            </button>
                            <button onClick={handleSessionComplete} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium text-lg">
                                Finish for Today
                            </button>
                        </div>
                    </div>
                 );
            case SessionStep.SUMMARY:
                return (
                    <div className={`${stepContentClass} text-center`}>
                        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-4"/>
                        <h2 className="text-3xl font-bold font-display text-blue-900">Lesson Complete!</h2>
                        <p className="text-lg text-gray-700 mt-2">{plan.summary}</p>
                        <button onClick={restartLesson} className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg shadow-md hover:shadow-lg">
                            Review Lesson
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="animate-fade-in">
             {error && !sessionPlan && (
                <div className="text-center p-8 bg-red-100 border-2 border-red-300 rounded-xl shadow-lg mb-4">
                    <h2 className="text-2xl font-bold font-display text-red-800">A Storm's A-Brewin'!</h2>
                    <p className="mt-2 text-red-700">{error}</p>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default DailySession;