
export interface Recipient {
  relationship: string;
  age: number;
  interests: string[];
  budget: number;
  occasion: string;
}

export interface MockRecipient {
  relationship: string;
  age: number;
  interests: string[];
  budget: number;
  occasion: string;
}



export interface GiftIdea {
  title: string;
  description: string;
  estimatedPrice: string;
  reasonForRecommendation: string;
  amazonLink?: string;
  etsyLink?: string;
}

export interface MockGiftIdea {
  title: string;
  description: string;
  estimatedPrice: string;
  reasonForRecommendation: string;
  amazonLink: string;
  etsyLink: string;
}

export interface GiftSuggestion {
  ideas: GiftIdea[];
  occasion: string;
}

export interface MockGiftSuggestion {
  ideas: MockGiftIdea[];
  occasion: string;
}

export interface ShoppingLink {
  platform: 'amazon' | 'etsy';
  url: string;
}

export interface MockShoppingLink {
  platform: 'amazon' | 'etsy';
  url: string;
}