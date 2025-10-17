import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { View } from '../types';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const XIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

interface PricingProps {
    setView: (view: View) => void;
}

const Pricing: React.FC<PricingProps> = ({ setView }) => {
    const { user } = useAuth();

    const freeFeatures = [
        "Daily Bible study prompts",
        "Basic habit tracker",
        "3 AI Analyses per session"
    ];

    const premiumFeatures = [
        "Unlimited habit tracking",
        "Customizable Bible reading plans",
        "Audio devotionals or guided studies",
        "Premium community groups",
        "Advanced stats & insights",
        "Unlimited AI Analyses",
        "Christian coaching or mentor access powered by AI"
    ];

    const monthlyPaymentLink = "https://www.paypal.com/paypalme/KyleWilson420Jesus/4.99";
    const yearlyPaymentLink = "https://www.paypal.com/paypalme/KyleWilson420Jesus/39.99";

    if (user?.subscription === 'premium') {
        return (
             <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-2xl mx-auto">
                <CheckIcon />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-2">You are a Premium Member!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for your support. You have full access to all features.</p>
                <button 
                    onClick={() => setView(View.DASHBOARD)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go to Dashboard
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Find the Plan That's Right for You</h1>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">Start for free and upgrade to unlock powerful tools for your spiritual growth.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Tier */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Free</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Essential tools to start your journey.</p>
                    <p className="mt-6 text-4xl font-bold">$0<span className="text-lg font-medium text-gray-500 dark:text-gray-400">/month</span></p>
                    <ul className="mt-8 space-y-4">
                        {freeFeatures.map(feature => (
                            <li key={feature} className="flex items-center space-x-3">
                                <CheckIcon />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                        ))}
                         {premiumFeatures.map(feature => (
                            <li key={feature} className="flex items-center space-x-3">
                                <XIcon />
                                <span className="text-gray-500 dark:text-gray-400 line-through">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-auto w-full py-3 text-lg font-semibold border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors mt-8">
                        Current Plan
                    </button>
                </div>

                {/* Premium Tier */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-blue-500 relative flex flex-col">
                    <span className="absolute top-0 right-8 -mt-4 bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">MOST POPULAR</span>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Premium</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Unlock your full potential with advanced features.</p>
                     <p className="mt-6 text-4xl font-bold">$4.99<span className="text-lg font-medium text-gray-500 dark:text-gray-400">/month</span></p>
                    <p className="text-gray-500 dark:text-gray-400">or $39.99 per year</p>
                    <ul className="mt-8 space-y-4">
                        {freeFeatures.map(feature => (
                            <li key={feature} className="flex items-center space-x-3">
                                <CheckIcon />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                        ))}
                        {premiumFeatures.map(feature => (
                            <li key={feature} className="flex items-center space-x-3">
                                <CheckIcon />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto pt-8 space-y-4">
                        <a
                            href={monthlyPaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
                        >
                            Pay Monthly (via PayPal)
                        </a>
                        <a
                            href={yearlyPaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-3 text-lg font-semibold border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                        >
                            Pay Yearly (via PayPal)
                        </a>
                        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg text-center">
                            <p className="text-green-800 dark:text-green-200 text-sm">
                                <strong>Activation is automatic.</strong> After payment, your account will be upgraded within a few minutes. Please refresh or log in again to see the changes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;