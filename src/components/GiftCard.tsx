import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { GiftIdea } from '../types';

interface GiftCardProps {
  idea: GiftIdea;
}

export const GiftCard: React.FC<GiftCardProps> = ({ idea }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h4 className="font-semibold text-xl text-indigo-600 mb-3">
        {idea.title}
      </h4>

      <p className="text-gray-600 mb-4">{idea.description}</p>

      <div className="mb-4">
        <p className="text-lg font-medium text-indigo-600">
          {idea.estimatedPrice}
        </p>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">
          Why we recommend it:
        </h5>
        <p className="text-sm text-gray-600">{idea.reasonForRecommendation}</p>
      </div>

      <div className="border-t pt-4">
        <h5 className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <ShoppingBag className="w-4 h-4 mr-1" />
          Shop this gift:
        </h5>
        <div className="flex space-x-3">
          {idea.amazonLink && (
            <a
              href={idea.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
            >
              Amazon
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
          {idea.etsyLink && (
            <a
              href={idea.etsyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
            >
              Etsy
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
