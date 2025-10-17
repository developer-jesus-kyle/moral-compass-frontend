import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    let success = false;
    if (isLogin) {
      success = await login(email, password);
      if (!success) {
        setError('Invalid credentials or user does not exist.');
      }
    } else {
      success = await signup(email, password);
      if (!success) {
        setError('User with this email already exists or signup failed.');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
            <ShieldCheckIcon className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                to the Moral Compass Protocol
            </p>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`w-1/2 py-4 text-sm font-medium text-center ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
                Sign In
            </button>
            <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`w-1/2 py-4 text-sm font-medium text-center ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
                Sign Up
            </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;