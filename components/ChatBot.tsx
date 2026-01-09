
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/gemini';
import { Message } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! Welcome to BWB Shop. I can help you find the best script or API pack for your project. What are you looking for today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [m.text]
    }));

    const response = await getChatResponse(history, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 glass rounded-[2rem] border dark:border-slate-700 border-slate-200 shadow-3xl overflow-hidden flex flex-col h-[550px] animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-5 dark:bg-sky-600 bg-sky-500 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
              <span className="font-black text-white text-sm uppercase tracking-widest">Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-transform hover:scale-110">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 dark:bg-slate-900/50 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'dark:bg-sky-600 bg-sky-500 text-white rounded-br-none' 
                    : 'dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-800 rounded-bl-none border dark:border-slate-700 border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="dark:bg-slate-800 bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border dark:border-slate-700 border-slate-100">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 dark:bg-slate-800/80 bg-white border-t dark:border-slate-700 border-slate-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="How can we help?"
                className="flex-1 dark:bg-slate-900 bg-slate-50 border dark:border-slate-700 border-slate-200 rounded-xl px-5 py-3 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors font-medium shadow-inner"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-lg shadow-sky-600/20 active:scale-95"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-sky-600 hover:bg-sky-500 rounded-3xl shadow-2xl shadow-sky-600/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
