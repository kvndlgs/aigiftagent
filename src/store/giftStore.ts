import { create } from 'zustand';
import { GiftSuggestion, Recipient } from '../types';

interface GiftStore {
  recipient: Recipient | null;
  suggestions: GiftSuggestion[];
  isLoading: boolean;
  setRecipient: (recipient: Recipient) => void;
  setSuggestions: (suggestions: GiftSuggestion[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useGiftStore = create<GiftStore>((set) => ({
  recipient: null,
  suggestions: [],
  isLoading: false,
  setRecipient: (recipient) => set({ recipient }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setLoading: (isLoading) => set({ isLoading }),
}));
