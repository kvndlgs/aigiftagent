import { GiftIdea, ShoppingLink, MockGiftIdea, MockShoppingLink } from '../../types';




export const generateShoppingLinks = async (
  productName: string
): Promise<ShoppingLink[]> => {
  const encodedProduct = encodeURIComponent(productName);

  return [
    {
      platform: 'amazon',
      url: `https://www.amazon.com/s?k=${encodedProduct}`,
    },
    {
      platform: 'etsy',
      url: `https://www.etsy.com/search?q=${encodedProduct}`,
    },
  ];
};

export const generateMockShoppingLinks = async (
  productName: string
): Promise<MockShoppingLink[]> => {
  const encodedProduct = encodeURIComponent(productName);

  return [
    {
      platform: 'amazon',
      url: `https://amazon.com/s?k=${encodedProduct}`,
    },
    {
      platform: 'etsy',
      url: `https://etsy.com/search?q=${encodedProduct}`,
    }
  ]
};

export const enrichGiftIdeasWithLinks = async (
  ideas: GiftIdea[]
): Promise<GiftIdea[]> => {
  return Promise.all(
    ideas.map(async (idea) => {
      const links = await generateShoppingLinks(idea.title);
      return {
        ...idea,
        amazonLink: links.find((link) => link.platform === 'amazon')?.url,
        etsyLink: links.find((link) => link.platform === 'etsy')?.url,
      };
    })
  );
};

export const enrichMockGiftIdeasWithLinks = async (
  ideas: MockGiftIdea[]
): Promise<MockGiftIdea[]> => {
  return Promise.all(
    ideas.map(async (idea) => {
      const links = await generateMockShoppingLinks(idea.title);
      return {
        ...idea,
        amazonLink: links.find((link) => link.platform === 'amazon')?.url,
        etsyLink: links.find((link) => link.platform === 'etsy')?.url,
      };
    })
  );
};