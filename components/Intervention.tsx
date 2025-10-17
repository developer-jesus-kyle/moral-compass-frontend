

import React, { useState, useEffect, useRef } from 'react';
import { MoralCode } from '../types';
import { EMPATHY_PROJECTIONS } from '../constants';

interface InterventionProps {
  moralCode: MoralCode;
  onComplete: () => void;
}

const Intervention: React.FC<InterventionProps> = ({ moralCode, onComplete }) => {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(20);
  // FIX: In a browser environment, setInterval returns a number, not a NodeJS.Timeout.
  const timerRef = useRef<number | null>(null);

  const [costs, setCosts] = useState({ immediate: '', longTerm: '' });
  const [alternative, setAlternative] = useState('');

  useEffect(() => {
    if (step === 2) {
      setTimer(20);
      // FIX: Use window.setInterval to ensure the browser's implementation is used, which returns a number.
      timerRef.current = window.setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            if(timerRef.current) window.clearInterval(timerRef.current);
            setStep(3); // Auto advance
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Core Question</h2>
            <p className="text-xl mb-8">Is the action you're considering aligned with your chosen moral code?</p>
            <div className="flex justify-center space-x-6">
              <button onClick={onComplete} className="px-12 py-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600">Yes</button>
              <button onClick={() => setStep(1)} className="px-12 py-4 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600">No</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Empathy Projection</h2>
            <p className="text-xl mb-8 p-6 bg-blue-100 dark:bg-gray-700 rounded-lg">{EMPATHY_PROJECTIONS[moralCode]}</p>
            <button onClick={() => setStep(2)} className="px-12 py-4 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600">Continue</button>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Consequence Mapping</h2>
            <p className="text-xl mb-4">You have <span className="font-bold text-red-500">{timer}</span> seconds to reflect.</p>
            <div className="space-y-4">
              <textarea
                placeholder="Immediate Cost..."
                value={costs.immediate}
                onChange={(e) => setCosts(c => ({...c, immediate: e.target.value}))}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
              />
              <textarea
                placeholder="Long-Term Cost..."
                value={costs.longTerm}
                onChange={(e) => setCosts(c => ({...c, longTerm: e.target.value}))}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Reframing Challenge</h2>
            <p className="text-xl mb-8">What is a positive, alternative action you can take right now?</p>
            <textarea
              placeholder="e.g., 'Instead of gossiping, I will compliment someone.'"
              value={alternative}
              onChange={(e) => setAlternative(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={4}
            />
            <button onClick={onComplete} disabled={!alternative.trim()} className="mt-6 px-12 py-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400">Complete Intervention</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-2xl text-gray-800 dark:text-gray-200">
        {renderContent()}
      </div>
    </div>
  );
};

export default Intervention;