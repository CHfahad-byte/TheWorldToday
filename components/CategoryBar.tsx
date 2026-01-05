
import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['World', 'Politics', 'Economy', 'Technology', 'Climate', 'Culture'];

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 py-4" aria-label="Global">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`
                px-3 py-1 text-sm font-medium transition-colors
                ${activeCategory === cat 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
