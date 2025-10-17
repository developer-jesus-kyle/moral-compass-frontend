import React, { useState } from 'react';
import { UserData, MoralCode } from '../types';
import { MORAL_CODE_OPTIONS } from '../constants';

interface OnboardingProps {
  onComplete: (data: Omit<UserData, 'hasOnboarded'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    moralCode: null as MoralCode | null,
    psiTriggers: ['', '', ''],
    pact: '',
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleMoralCodeChange = (code: MoralCode) => {
    setUserData(prev => ({ ...prev, moralCode: code }));
  };

  const handleTriggerChange = (index: number, value: string) => {
    const newTriggers = [...userData.psiTriggers];
    newTriggers[index] = value;
    setUserData(prev => ({ ...prev, psiTriggers: newTriggers }));
  };
  
  const isStep1Valid = userData.moralCode !== null;
  const isStep2Valid = userData.psiTriggers.every(t => t.trim() !== '');

  const renderStep = () => {
    switch (step) {
      case 1: // Moral Code Selection
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">Select Your Moral Code</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">Choose the foundation for your moral compass.</p>
            <div className="space-y-4">
              {MORAL_CODE_OPTIONS.map(({ id, label }) => (
                <label key={id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${userData.moralCode === id ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="moralCode"
                    value={id}
                    checked={userData.moralCode === id}
                    onChange={() => handleMoralCodeChange(id)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-800 dark:text-gray-200">{label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 2: // Personal Sin Inventory (PSI)
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">Personal Inventory</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">Identify 3 personal triggers or actions you want to work on.</p>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Trigger ${i} (e.g., Gossip, Procrastination)`}
                  value={userData.psiTriggers[i-1]}
                  onChange={(e) => handleTriggerChange(i-1, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ))}
            </div>
          </div>
        );
      case 3: // The Moral Pact
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">The Moral Pact</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">Define your commitment or name an accountability partner.</p>
            <textarea
              placeholder="e.g., 'I commit to reviewing my actions daily.' or 'My accountability partner is John Doe.'"
              value={userData.pact}
              onChange={(e) => setUserData(prev => ({ ...prev, pact: e.target.value }))}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div style={{ width: `${(step / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
            </div>
        </div>

        <div>{renderStep()}</div>
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={handleBack} className="px-6 py-2 text-blue-600 dark:text-blue-400 bg-transparent rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">Back</button>
          )}
          <div className="flex-grow"></div>
          {step < 3 && (
            <button onClick={handleNext} disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)} className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Next</button>
          )}
          {step === 3 && (
            <button onClick={() => onComplete(userData)} className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">Complete Setup</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;