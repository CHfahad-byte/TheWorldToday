
import React from 'react';

interface HeaderProps {
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAssistant }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">The World Today</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">AI Analysis Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              ASK AI
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
