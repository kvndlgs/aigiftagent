import axios from 'axios'
import { GiftIdea, MockGiftIdea } from '../../types/'

export const generateMockGiftIdeas = async (
  relationship: string ,
  age: number,
  interests: string[],
  budget: number,
  occasion: string,
): Promise<MockGiftIdea[]> => {
  try {
    const response = await axios.post(`http://localhost:3001/giftSuggestion`, {
      relationship,
      age,
      interests,
      budget,
      occasion,
    });
    return response.data;
  } catch(error) {
    console.error('niga');
    throw error;
  }
};


export const generateGiftIdeas = async (
  relationship: string,
  age: number,
  interests: string[],
  budget: number,
  occasion: string,
): Promise<GiftIdea[]> => {
  try {
    const response = await axios.post('http://localhost:3001/api/generate-gifts', {
      relationship,
      age,
      interests,
      budget,
      occasion,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating gift ideas:', error);
    throw error;
  }
};