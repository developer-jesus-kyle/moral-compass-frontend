import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { useAuth } from '../hooks/useAuth';
import { View, MoralCode } from '../types';
import { MENTOR_SYSTEM_INSTRUCTIONS } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface AiMentorProps {
    moralCode: MoralCode;
    setView: (view: View) => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const AiMentor: React.FC<AiMentorProps> = ({ moralCode, setView }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user?.subscription === 'premium' && !chatRef.current) {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                if (!apiKey) {
                    throw new Error("API key is not configured.");
                }
                const ai = new GoogleGenAI({ apiKey });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: MENTOR_SYSTEM_INSTRUCTIONS[moralCode],
                    },
                });
                setMessages([{ role: 'model', text: 'Hello! How can I help you reflect today?' }]);
            } catch (error) {
                console.error("Failed to initialize AI Mentor:", error);
                setMessages([{ role: 'model', text: 'Sorry, I am unable to connect at the moment. Please check your API key configuration and try again later.' }]);
            }
        }
    }, [moralCode, user?.subscription]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatRef.current.sendMessageStream({ message: input });
            
            setMessages(prev => [...prev, { role: 'model', text: '' }]);
            
            for await (const chunk of result) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.text += chunkText;
                    }
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'I seem to be having trouble responding. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (user?.subscription !== 'premium') {
        return (
            <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-2xl mx-auto">
                <SparklesIcon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Unlock the AI Mentor</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">This is a premium feature. Upgrade your account to get personalized guidance from an AI mentor aligned with your moral code.</p>
                <button 
                    onClick={() => setView(View.PRICING)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Upgrade to Premium
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <SparklesIcon className="w-8 h-8 text-purple-500" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AI Mentor</h1>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                {msg.text || (
                                    <div className="flex items-center space-x-2">
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your mentor anything..."
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600"
                        aria-label="Chat input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        aria-label="Send message"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AiMentor;