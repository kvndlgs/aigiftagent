import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-gifts', async (req, res) => {
  try {
    const { relationship, age, interests, budget, occasion } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not defined');
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

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

    res.json(response);
  } catch (error) {
    console.error('API generation error:', error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
});

function formatPrompt(
  relationship: string,
  age: number,
  interests: string,
  budget: number,
  occasion: string
): string {
  return `Please suggest gift ideas for a ${age}-year-old ${relationship} who is interested in ${interests}. 
          The budget is ${budget} and the occasion is ${occasion}.`;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
