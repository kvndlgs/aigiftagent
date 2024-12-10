import React from 'react';
import { Gift, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Gift className="w-8 h-8 text-indigo-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">
              Gift Finder
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-sm text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center text-sm text-gray-700 hover:text-indigo-600"
              >
                <User className="w-4 h-4 mr-1" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
};
