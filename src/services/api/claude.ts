import { Anthropic } from '@anthropic-ai/sdk';
import { validateEnvironmentVariables } from '../utils/environment';
import { formatPrompt } from '../utils/prompt';
import { parseClaudeResponse } from '../utils/parser';
import { GiftIdea } from '../../types';
import { enrichGiftIdeasWithLinks } from './shopping';

validateEnvironmentVariables(['VITE_CLAUDE_API_KEY']);

let anthropicClient: Anthropic | null = null;

const getAnthropicClient = (): Anthropic => {
  if (!import.meta.env.VITE_CLAUDE_API_KEY) {
    throw new Error('API key is not configured');
  }

  if (!anthropicClient) {
    try {
      anthropicClient = new Anthropic({
        apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
        dangerouslyAllowBrowser: true,
        baseURL: 'https://api.anthropic.com/v1',
      });
    } catch (error) {
      console.error('Failed to initialize Anthropic client:', error);
      throw new Error(
        `Failed to create Anthropic client: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
  return anthropicClient;
};
const handleApiError = (error: unknown): never => {
  console.error('Full error object:', error);

  if (error instanceof Error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }

  // Additional network error detection
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new Error(
      'Network fetch failed. Check internet connection and API endpoint.'
    );
  }

  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();

    // Detailed error logging
    console.error('Detailed error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    // Specific error handling
    if (
      errorMessage.includes('401') ||
      errorMessage.includes('invalid_api_key')
    ) {
      throw new Error(
        'Authentication failed. Please verify your Anthropic API key.'
      );
    }

    if (
      errorMessage.includes('429') ||
      errorMessage.includes('rate_limit_exceeded')
    ) {
      throw new Error('API rate limit exceeded. Please wait and try again.');
    }

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      throw new Error(
        'Network connectivity issue. Check your internet connection and API endpoint.'
      );
    }

    if (
      errorMessage.includes('cors') ||
      errorMessage.includes('access-control-allow-origin')
    ) {
      throw new Error(
        'CORS configuration error. Ensure proper API access is configured.'
      );
    }
  }

  // Generic fallback error
  throw new Error(
    `Unexpected error communicating with AI service: ${
      error instanceof Error ? error.message : 'Unknown error'
    }`
  );
};

export const generateGiftIdeas = async (
  relationship: string,
  age: number,
  interests: string[],
  budget: number,
  occasion: string
): Promise<GiftIdea[]> => {
  if (!relationship || !age || interests.length === 0 || !budget || !occasion) {
    throw new Error('Missing required parameters for gift generation');
  }

  try {
    const anthropic = getAnthropicClient();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: formatPrompt(relationship, age, interests, budget, occasion),
        },
      ],
    });

    console.log('Full API Response', response);

    if (!response || !response.content) {
      throw new Error('Received empty response from Claude API');
    }

    const ideas = parseClaudeResponse(response);

    console.log('Parsed gift ideas:', ideas);

    return await enrichGiftIdeasWithLinks(ideas);
  } catch (error) {
    return handleApiError(error); // This was previously throwing, now return the result of handleApiError
  }
};
