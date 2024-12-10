import { Anthropic } from '@anthropic-ai/sdk';
import { getEnvVar } from './utils/environment';
import { formatPrompt } from './utils/prompt';
import { parseClaudeResponse } from './utils/parser';
import { GiftIdea } from '../types';
import toast from 'react-hot-toast';

let anthropicClient: Anthropic | null = null;

const getAnthropicClient = (): Anthropic => {
  if (!anthropicClient) {
    try {
      anthropicClient = new Anthropic({
        apiKey: getEnvVar('VITE_CLAUDE_API_KEY'),
        dangerouslyAllowBrowser: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to initialize Claude API';
      toast.error(message);
      throw error;
    }
  }
  return anthropicClient;
};

export const generateGiftIdeas = async (
  relationship: string,
  age: number,
  interests: string[],
  budget: number,
  occasion: string
): Promise<GiftIdea[]> => {
  try {
    const anthropic = getAnthropicClient();

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: formatPrompt(relationship, age, interests, budget, occasion),
        },
      ],
    });

    if (!response.content?.[0]?.text) {
      throw new Error('Empty response from Claude API');
    }

    return parseClaudeResponse(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate gift ideas';
    toast.error(message);
    throw error;
  }
};
