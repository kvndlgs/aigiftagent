import React from 'react';
import { useGiftStore } from '../store/giftStore';
import { Package } from 'lucide-react';
import { GiftCard } from './GiftCard';

export const GiftSuggestions: React.FC = () => {
  const { suggestions, isLoading } = useGiftStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl space-y-8">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Package className="w-7 h-7 text-indigo-600" />
            <h3 className="text-2xl font-semibold ml-2">
              {suggestion.occasion} Gift Ideas
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {suggestion.ideas.map((idea, ideaIndex) => (
              <GiftCard key={ideaIndex} idea={idea} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
