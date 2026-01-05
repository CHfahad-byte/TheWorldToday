
import React from 'react';
import { NewsItem } from '../types';

interface DetailedViewProps {
  item: NewsItem;
  onClose: () => void;
  onAskAi: (query: string) => void;
}

export const DetailedView: React.FC<DetailedViewProps> = ({ item, onClose, onAskAi }) => {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-white sm:bg-black/40 sm:backdrop-blur-sm flex justify-center items-start sm:py-12 px-4">
      <div className="relative w-full max-w-4xl bg-white rounded-none sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-black/10 hover:bg-black/20 text-black p-2 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex flex-col">
          <div className="h-[30vh] md:h-[40vh] relative">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <div className="px-6 md:px-12 py-8 -mt-20 relative z-0">
            <div className="mb-4">
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{item.title}</h2>
              <div className="flex items-center gap-4 mt-4">
                <p className="text-gray-400 text-sm font-medium italic">Published {item.timestamp}</p>
                <button 
                  onClick={() => onAskAi(item.title)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Deepen Analysis with AI
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
              <div className="lg:col-span-2">
                <section className="mb-10">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">In-Depth Explanation</h4>
                  <div className="prose prose-lg text-gray-700 leading-relaxed font-serif text-lg">
                    {item.explanation}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">Original Sources</h4>
                  <div className="flex flex-wrap gap-3">
                    {item.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {source.title} →
                      </a>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 sticky top-24">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-4">Why It Matters</h4>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {item.whyItMatters}
                  </p>
                  <div className="mt-6 pt-6 border-t border-amber-200/50 flex items-center text-amber-700 text-[10px] font-bold tracking-widest uppercase">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Contextual Analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
