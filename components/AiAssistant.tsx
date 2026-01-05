
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askAiAssistant } from '../services/newsService';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatMessage[];
  setHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose, history, setHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const { text, sources } = await askAiAssistant(userMsg, history);
      setHistory(prev => [...prev, { role: 'assistant', content: text, sources }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the global feed. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-[100] w-full sm:w-96 bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-black text-white">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-2 h-2 rounded-full animate-pulse"></div>
            <h3 className="text-xs font-black uppercase tracking-widest">Global AI Assistant</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-6">
          {history.length === 0 && (
            <div className="text-center py-10 px-4">
              <p className="text-gray-400 text-sm italic">Ask me to explain any global event, conflict, or trend in simple terms.</p>
              <div className="mt-6 space-y-2">
                {["Explain the latest in tech", "What is causing global inflation?", "Why is the Arctic melting so fast?"].map(q => (
                  <button 
                    key={q} 
                    onClick={() => setInput(q)}
                    className="block w-full text-left text-xs text-gray-500 hover:text-black hover:bg-gray-50 p-2 rounded border border-gray-100 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-gray-100 text-gray-900' : 'bg-blue-50 text-gray-900 border border-blue-100'}`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-blue-200/50 flex flex-wrap gap-2">
                    {msg.sources.map((s, si) => (
                      <a key={si} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tighter bg-white px-2 py-0.5 rounded shadow-sm">
                        {s.title.slice(0, 15)}...
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-50 rounded-2xl px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1.5 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3 uppercase tracking-widest font-bold">Powered by Global AI Insights</p>
        </form>
      </div>
    </div>
  );
};
