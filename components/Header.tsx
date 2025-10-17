import React from 'react';
import { View } from '../types';
import { useAuth } from '../hooks/useAuth';
import BookOpenIcon from './icons/BookOpenIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import LogoutIcon from './icons/LogoutIcon';

interface HeaderProps {
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView(View.DASHBOARD)}>
          <ShieldCheckIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Moral Compass Protocol</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm hidden md:block">{user?.email}</span>
          <button onClick={() => setView(View.DASHBOARD)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Dashboard</button>
          <button onClick={() => setView(View.STUDY_BIBLE)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Study Bible</button>
          <button onClick={() => setView(View.HABIT_MAINTENANCE)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Habits</button>
          {user?.subscription === 'premium' && (
            <button onClick={() => setView(View.AI_MENTOR)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">AI Mentor</button>
          )}
          {user?.subscription === 'free' && (
            <button onClick={() => setView(View.PRICING)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Upgrade</button>
          )}
          <button onClick={logout} title="Logout" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
            <LogoutIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;