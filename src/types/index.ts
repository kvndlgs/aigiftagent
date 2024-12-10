export interface Recipient {
  relationship: string;
  age: number;
  interests: string[];
  budget: number;
  occasion: string;
  purpose: string;
  context: string;
}

export interface GiftIdea {
  title: string;
  description: string;
  estimatedPrice: string;
  reasonForRecommendation: string;
  amazonLink?: string;
  etsyLink?: string;
}

export interface GiftSuggestion {
  ideas: GiftIdea[];
  occasion: string;
}

export interface ShoppingLink {
  platform: 'amazon' | 'etsy';
  url: string;
}
