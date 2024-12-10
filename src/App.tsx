import React from 'react';
import { RecipientForm } from './components/RecipientForm';
import { GiftSuggestions } from './components/GiftSuggestions';
import { Wishlist } from './components/Wishlist';
import { Header } from './components/Header';
import { useGiftStore } from './store/giftStore';
import { useAuthStore } from './store/authStore';
import { generateGiftIdeas } from './services/claude';
import { Toaster } from 'react-hot-toast';

function App() {
  const { recipient, setLoading, setSuggestions } = useGiftStore();
  const user = useAuthStore((state) => state.user);
  const [showWishlist, setShowWishlist] = React.useState(false);

  React.useEffect(() => {
    const fetchGiftIdeas = async () => {
      if (!recipient) return;

      try {
        setLoading(true);
        const ideas = await generateGiftIdeas(
          recipient.relationship,
          recipient.age,
          recipient.interests,
          recipient.budget,
          recipient.occasion
        );
        setSuggestions([{ ideas, occasion: recipient.occasion }]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (recipient) {
      fetchGiftIdeas();
    }
  }, [recipient, setLoading, setSuggestions]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {user && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowWishlist(!showWishlist)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md shadow-sm hover:bg-indigo-50"
            >
              {showWishlist ? 'Hide Wishlist' : 'Show Wishlist'}
            </button>
          </div>
        )}

        <div className="flex flex-col items-center space-y-8">
          {showWishlist ? (
            <Wishlist />
          ) : (
            <>
              <RecipientForm />
              <GiftSuggestions />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
