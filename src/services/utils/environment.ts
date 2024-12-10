import { toast } from 'react-hot-toast';

const cleanEnvValue = (value: string | undefined): string => {
  if (!value) return '';
  // Remove any "your_key_here=" prefix if present
  return value.replace(/^[^=]+=/, '').trim();
};

export const validateEnvironmentVariables = () => {
  const requiredVars = [
    'VITE_CLAUDE_API_KEY',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];

  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    const error = `Missing required environment variables: ${missingVars.join(
      ', '
    )}`;
    toast.error(error);
    throw new Error(error);
  }
};

export const getEnvVar = (key: string): string => {
  const value = cleanEnvValue(import.meta.env[key]);
  if (!value) {
    const error = `Environment variable ${key} is not defined`;
    toast.error(error);
    throw new Error(error);
  }
  return value;
};
