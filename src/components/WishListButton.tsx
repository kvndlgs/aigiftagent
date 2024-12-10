import React from 'react';
import { Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { GiftIdea } from '../types';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
  giftIdea: GiftIdea;
  occasion: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  giftIdea,
  occasion,
}) => {
  const user = useAuthStore((state) => state.user);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('gift_idea->title', giftIdea.title)
        .single();

      setIsSaved(!!data);
    };

    checkIfSaved();
  }, [user, giftIdea.title]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save to wishlist');
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('gift_idea->title', giftIdea.title);
        toast.success('Removed from wishlist');
      } else {
        await supabase.from('wishlists').insert({
          user_id: user.id,
          gift_idea: giftIdea,
          occasion,
        });
        toast.success('Added to wishlist');
      }
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors ${
        isSaved
          ? 'bg-red-100 text-red-600'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  );
};
