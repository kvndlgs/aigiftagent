import axios from 'axios'
import { GiftIdea } '../../types/index'


export const generateGiftIdeas = async (
  relationship: string,
  age: number,
  interests: string[],
  budget: number,
  occasion: string,
  purpose: string,
  context: string,
): Promise<GiftIdea[]> => {
  try {
    const response = await axios.post('http://localhost:3001/api/generate-gifts', {
      relationship,
      age,
      interests,
      budget,
      occasion,
      purpose,
      context,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating gift ideas:', error);
    throw error;
  }
};