export const formatPrompt = (
  relationship: string,
  age: number,
  interests: string[],
  budget: number,
  occasion: string
): string => {
  return `You are a gift recommendation expert. I need specific, thoughtful gift ideas for a ${age}-year-old ${relationship} 
who is interested in ${interests.join(
    ', '
  )}. The budget is $${budget} and the occasion is ${occasion}.

Requirements:
1. Suggest exactly 3 gift ideas
2. Each gift should be within the $${budget} budget
3. Focus on items that are readily available on major shopping platforms
4. Make suggestions specific and searchable (avoid generic descriptions)

Provide your response in this exact JSON format:
[
  {
    "title": "Specific Product Name",
    "description": "Clear, concise description of the item",
    "estimatedPrice": "Actual price estimate (e.g., $X.XX)",
    "reasonForRecommendation": "Explanation of why this gift matches their interests and occasion"
  }
]

Important:
- Ensure all prices are within budget
- Make product names specific and searchable
- Keep descriptions concise but informative
- Provide clear reasoning that connects to their interests`;
};
