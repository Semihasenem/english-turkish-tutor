import React, { useState } from 'react';
import { CheckCircleIcon, MailIcon } from './Icons';

const Feedback: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim() === '') return;
    // In a real app, you'd send this to a server.
    // For this client-side app, we'll just show a success message.
    console.log('Feedback submitted:', feedbackText);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold font-display text-blue-900">Thank You!</h2>
                <p className="text-gray-600 mt-2 text-lg">Your feedback has been received. We'll use it to make your learning voyage even better!</p>
                <button 
                    onClick={() => {
                        setIsSubmitted(false);
                        setFeedbackText('');
                    }}
                    className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg"
                >
                    Submit More Feedback
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <MailIcon className="w-8 h-8 text-blue-700 mr-3" />
          <div>
            <h2 className="text-3xl font-bold font-display text-blue-900">Feedback & Ideas</h2>
            <p className="text-gray-600">Help us improve your learning journey. What would you like to see?</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us your ideas for new features, topics, or anything else..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            aria-label="Feedback input"
          />
          <button
            type="submit"
            disabled={feedbackText.trim() === ''}
            className="mt-4 w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium text-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Send My Ideas
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
