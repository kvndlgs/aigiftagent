export interface Database {
  public: {
    Tables: {
      wishlists: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          gift_idea: {
            title: string;
            description: string;
            estimatedPrice: string;
            reasonForRecommendation: string;
          };
          occasion: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          gift_idea: {
            title: string;
            description: string;
            estimatedPrice: string;
            reasonForRecommendation: string;
          };
          occasion: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          gift_idea?: {
            title: string;
            description: string;
            estimatedPrice: string;
            reasonForRecommendation: string;
          };
          occasion?: string;
        };
      };
    };
  };
}
