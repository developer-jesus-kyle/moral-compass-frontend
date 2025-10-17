import React, { useState, useEffect } from 'react';
import { getBibleContext } from '../services/geminiService';
import { useAuth } from '../hooks/useAuth';
import SparklesIcon from './icons/SparklesIcon';

const FREE_TIER_LIMIT = 3;

const StudyBible: React.FC = () => {
  const { user } = useAuth();
  const [verse, setVerse] = useState('John 3:16');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestsMade, setRequestsMade] = useState(0);

  const isPremium = user?.subscription === 'premium';
  const requestsRemaining = isPremium ? Infinity : FREE_TIER_LIMIT - requestsMade;
  const canRequest = requestsRemaining > 0;

  useEffect(() => {
    const savedRequests = sessionStorage.getItem('mcp-study-requests');
    if (savedRequests) {
      setRequestsMade(parseInt(savedRequests, 10));
    }
  }, []);
  
  const handleStudy = async () => {
    if (!canRequest) {
      setError("You've reached your limit of free AI analyses for this session.");
      return;
    }

    if (!verse.trim()) {
      setError('Please enter a Bible verse or passage.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await getBibleContext(verse);
      setAnalysis(result);
      if (!isPremium) {
          const newRequestCount = requestsMade + 1;
          setRequestsMade(newRequestCount);
          sessionStorage.setItem('mcp-study-requests', newRequestCount.toString());
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedAnalysis = analysis
  ? analysis
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') // Bold
      .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') // Italic
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>') // H3
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>') // H2
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>') // H1
      .replace(/\n/g, '<br />')
  : '';


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
            <SparklesIcon className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">AI-Assisted Study Bible</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Enter a bible verse to get historical context, language insights, and more.</p>
        
        {!isPremium && (
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
                <p className="text-blue-800 dark:text-blue-200">You have <span className="font-bold">{requestsRemaining}</span> free AI analyses remaining this session. Upgrade for unlimited insights.</p>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
            placeholder="e.g., John 3:16"
            className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleStudy}
            disabled={isLoading || !canRequest}
            className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                'Generate Insights'
            )}
          </button>
        </div>

        {error && <div className="p-4 mb-4 text-red-800 bg-red-100 border border-red-400 rounded-lg dark:bg-red-900 dark:text-red-200 dark:border-red-800">{error}</div>}

        {analysis && (
          <div className="mt-8 p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Analysis for <span className="text-purple-600 dark:text-purple-400">{verse}</span></h2>
            <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyBible;