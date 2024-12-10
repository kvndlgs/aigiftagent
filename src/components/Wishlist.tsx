import React from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type WishlistItem = Database['public']['Tables']['wishlists']['Row'];

export const Wishlist: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [items, setItems] = React.useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('wishlists')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        toast.error('Failed to load wishlist');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('wishlists').delete().eq('id', id);
      setItems(items.filter((item) => item.id !== id));
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to view your wishlist</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-indigo-600">
                {item.gift_idea.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.gift_idea.description}
              </p>
              <p className="text-sm font-medium text-indigo-600 mt-2">
                {item.gift_idea.estimatedPrice}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Saved for: {item.occasion}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
