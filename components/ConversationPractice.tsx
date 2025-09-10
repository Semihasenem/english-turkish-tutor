import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PracticeProps } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import { SendIcon, UserIcon, ShipWheelIcon } from './Icons';
import ExplainableText from './ExplainableText';

const ConversationPractice: React.FC<PracticeProps> = ({ markDayAsPracticed }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [practiceLogged, setPracticeLogged] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sessionPrompt = sessionStorage.getItem('kc-conversation-prompt');
    if (sessionPrompt) {
        const initialMessage: ChatMessage = { role: 'model', parts: [{ text: sessionPrompt }] };
        setMessages([initialMessage]);
        sessionStorage.removeItem('kc-conversation-prompt');
    }
  }, []);

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
      const userMessagesCount = messages.filter(m => m.role === 'user').length;
      if (userMessagesCount >= 3 && !practiceLogged) {
          markDayAsPracticed();
          setPracticeLogged(true);
      }
  }, [messages, practiceLogged, markDayAsPracticed]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const history = [...messages, userMessage];
      const aiResponse = await sendMessageToAI(history);
      const aiMessage: ChatMessage = { role: 'model', parts: [{ text: aiResponse }] };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Arr! The connection be faulty. Try again, matey.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-gray-200 animate-fade-in">
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold font-display text-blue-900">Chat with Captain</h2>
            <ExplainableText 
                text="Practice your business English with the legendary Captain Jack Sparrow."
                className="text-sm text-gray-600"
            />
        </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="w-10 h-10 flex-shrink-0 bg-blue-800 rounded-full flex items-center justify-center">
                <ShipWheelIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <div
              className={`max-w-lg p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.parts[0].text}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-700" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
             <div className="w-10 h-10 flex-shrink-0 bg-blue-800 rounded-full flex items-center justify-center">
                <ShipWheelIcon className="w-6 h-6 text-white animate-spin" />
              </div>
              <div className="max-w-lg p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
           </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 disabled:bg-blue-300 transition-colors"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPractice;