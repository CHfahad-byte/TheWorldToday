
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
  onClick: (item: NewsItem) => void;
  featured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onClick, featured = false }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className={`
        group cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100
        ${featured ? 'md:grid md:grid-cols-2 rounded-2xl' : 'rounded-xl flex flex-col'}
      `}
    >
      <div className={`relative ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black rounded">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className={`font-bold leading-tight mb-3 group-hover:text-blue-600 transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {item.summary}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] text-gray-400 font-medium">{item.timestamp}</span>
          <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform">
            READ ANALYSIS
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
