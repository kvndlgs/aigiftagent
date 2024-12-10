import React from 'react';
import { Gift } from 'lucide-react';
import { useGiftStore } from '../store/giftStore';

const occasions = [
  'Birthday',
  'Christmas',
  'Anniversary',
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  'Graduation',
  'Wedding',
];

export const RecipientForm: React.FC = () => {
  const setRecipient = useGiftStore((state) => state.setRecipient);
  const [interests, setInterests] = React.useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setRecipient({
      relationship: formData.get('relationship') as string,
      age: Number(formData.get('age')),
      interests,
      budget: Number(formData.get('budget')),
      occasion: formData.get('occasion') as string,
      purpose: '',
      context: '',
    });
  };

  const addInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="flex items-center justify-center mb-8">
        <Gift className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900 ml-2">Gift Finder</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Relationship
          <input
            type="text"
            name="relationship"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., friend, sister, colleague"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Age
          <input
            type="number"
            name="age"
            required
            min="0"
            max="120"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interests
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., reading, cooking"
            />
            <button
              type="button"
              onClick={addInterest}
              className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {interest}
              <button
                type="button"
                onClick={() =>
                  setInterests(interests.filter((_, i) => i !== index))
                }
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                Ã—
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget ($)
          <input
            type="number"
            name="budget"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Occasion
          <select
            name="occasion"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select an occasion</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Gift Ideas
      </button>
    </form>
  );
};
