import Message from '@anthropic-ai/sdk';
import { GiftIdea } from '../../types';

const extractJsonFromText = (text: string): string => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in the response');
    }
    return jsonMatch[0];
  } catch (error) {
    throw new Error('Failed to extract JSON from Claude response');
  }
};

const validateGiftIdea = (idea: any): idea is GiftIdea => {
  if (!idea || typeof idea !== 'object') {
    return false;
  }

  const requiredFields = [
    'title',
    'description',
    'estimatedPrice',
    'reasonForRecommendation',
  ];
  return requiredFields.every(
    (field) => typeof idea[field] === 'string' && idea[field].trim().length > 0
  );
};

const validateGiftIdeas = (ideas: any[]): asserts ideas is GiftIdea[] => {
  if (!Array.isArray(ideas)) {
    throw new Error('Response is not an array');
  }

  if (ideas.length === 0) {
    throw new Error('No gift ideas found in response');
  }

  if (ideas.length !== 3) {
    throw new Error('Expected exactly 3 gift ideas');
  }

  const invalidIdeas = ideas.filter((idea) => !validateGiftIdea(idea));
  if (invalidIdeas.length > 0) {
    throw new Error(
      'Some gift ideas are missing required fields or have invalid data'
    );
  }
};

export const parseClaudeResponse = (response: Message): GiftIdea[] => {
  try {
    if (!response.content?.[0]?.text) {
      throw new Error('Empty or invalid response from Claude');
    }

    const jsonString = extractJsonFromText(response.content[0].text);
    const parsedData = JSON.parse(jsonString);
    validateGiftIdeas(parsedData);

    return parsedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse Claude response: ${error.message}`);
    }
    throw new Error('Failed to parse Claude response');
  }
};
