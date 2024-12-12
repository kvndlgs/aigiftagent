import { create } from 'zustand';
import { GiftSuggestion, Recipient, MockRecipient, MockGiftSuggestion } from '../types';

interface GiftStore {
  recipient: Recipient | null;
  suggestions: GiftSuggestion[];
  isLoading: boolean;
  setRecipient: (recipient: Recipient) => void;
  setSuggestions: (suggestions: GiftSuggestion[]) => void;
  setLoading: (loading: boolean) => void;
}

interface MockGiftStore {
  mockRecipient: MockRecipient | null;
  mockSuggestions: MockSuggestion[];
  isMockLoading: true;
  setMockRecipient: (mockRecipient: MockRecipient) => void;
  setMockSuggestions: (mockSuggestions: MockGiftSuggestion[]) => void;
  setMockLoading: (mockLoading: boolean) => void;
}


export const useGiftStore = create<GiftStore>((set) => ({
  recipient: null,
  suggestions: [],
  isLoading: false,
  setRecipient: (recipient) => set({ recipient }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export const useMockGiftStore = create<MockGiftStore>((set) => ({
  mockRecipient: null,
  mockSuggestions: [],
  isMockLoading: false,
  setMockRecipient: (mockRecipient) => set({ mockRecipient}),
  setMockSuggestions: (mockSuggestions) => set({ mockSuggestions }),
  setMockLoading: (mockLoading: boolean) => set({ isMockLoading }),
}));
