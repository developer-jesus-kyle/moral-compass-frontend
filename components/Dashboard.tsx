
import React from 'react';
import { View } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import SparklesIcon from './icons/SparklesIcon';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Your Moral Compass</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">Ready to align your actions with your values? Start an intervention when you feel a trigger.</p>
      
      <div className="flex justify-center mb-16">
        <button
          onClick={() => setView(View.INTERVENTION)}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-bold text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            <span className="relative px-16 py-10 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                Begin 60-Second Intervention
            </span>
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Your Toolkit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Study Bible */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col" onClick={() => setView(View.STUDY_BIBLE)}>
            <BookOpenIcon className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Study Bible</h3>
            <p className="text-gray-600 dark:text-gray-400">Get AI-powered insights on any verse.</p>
          </div>
          
          {/* Habit Maintenance */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col" onClick={() => setView(View.HABIT_MAINTENANCE)}>
            <ShieldCheckIcon className="w-10 h-10 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Habit Maintenance</h3>
            <p className="text-gray-600 dark:text-gray-400">Build consistency with daily and weekly reviews.</p>
          </div>

          {/* AI Mentor */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col" onClick={() => setView(View.AI_MENTOR)}>
            <SparklesIcon className="w-10 h-10 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Mentor <span className="text-xs bg-purple-200 text-purple-800 font-bold px-2 py-1 rounded-full ml-1">PREMIUM</span></h3>
            <p className="text-gray-600 dark:text-gray-400">Chat with a personal AI guide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;