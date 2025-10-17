import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { View } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface HabitMaintenanceProps {
    setView: (view: View) => void;
}

const HabitMaintenance: React.FC<HabitMaintenanceProps> = ({ setView }) => {
    const { user } = useAuth();
    const [dailyGoal, setDailyGoal] = useState('');
    const [weeklySuccess, setWeeklySuccess] = useState('');
    const [weeklyFailure, setWeeklyFailure] = useState('');
    const [weeklyAnalysis, setWeeklyAnalysis] = useState('');

    if (user?.subscription !== 'premium') {
        return (
            <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-2xl mx-auto">
                <SparklesIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Unlock Habit Maintenance</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">This is a premium feature. Upgrade your account to access daily goals, weekly reviews, and accountability reporting to supercharge your moral growth.</p>
                <button 
                    onClick={() => setView(View.PRICING)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Upgrade to Premium
                </button>
            </div>
        )
    }

    const handleExport = () => {
        const report = `
Weekly Moral Compass Report
===========================

Success of the Week:
--------------------
${weeklySuccess || 'Not filled.'}

Failure of the Week:
--------------------
${weeklyFailure || 'Not filled.'}

Analysis & Reflection:
----------------------
${weeklyAnalysis || 'Not filled.'}
        `;
        alert("Report has been generated and copied to clipboard (simulated). You can now paste it into an email.");
        navigator.clipboard.writeText(report.trim());
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Habit Maintenance</h1>

            {/* Daily Moral Mindfulness */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Daily Moral Mindfulness</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Based on a random trigger from your inventory, what is your action goal for today?</p>
                <textarea
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    placeholder="Today, when I feel the urge to procrastinate, I will..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                />
                 <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Log Goal</button>
            </div>

            {/* Weekly Success/Failure Log */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Weekly Review (Sunday)</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Reflect on the past week's intervention logs.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Describe one success:</label>
                        <input type="text" value={weeklySuccess} onChange={(e) => setWeeklySuccess(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Describe one failure or challenge:</label>
                        <input type="text" value={weeklyFailure} onChange={(e) => setWeeklyFailure(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Brief analysis:</label>
                        <textarea value={weeklyAnalysis} onChange={(e) => setWeeklyAnalysis(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3}></textarea>
                    </div>
                </div>
            </div>

            {/* Accountability Reporting */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Accountability Reporting</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Generate a summary of your weekly logs to share with your accountability partner.</p>
                <button 
                    onClick={handleExport}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Export Weekly Report
                </button>
            </div>
        </div>
    );
};

export default HabitMaintenance;