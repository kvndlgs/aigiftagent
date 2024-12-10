import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { getEnvVar } from '../services/utils/environment';
import toast from 'react-hot-toast';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    try {
      const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
      const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

      if (!supabaseUrl.startsWith('https://')) {
        throw new Error('Invalid Supabase URL format');
      }

      supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to initialize Supabase';
      toast.error(message);
      throw error;
    }
  }
  return supabaseClient;
};

export const supabase = getSupabaseClient();
