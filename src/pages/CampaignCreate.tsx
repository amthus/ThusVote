import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { PlusCircle, MinusCircle } from 'lucide-react';

const campaignSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  startDate: z.date().min(new Date()),
  endDate: z.date(),
  choices: z.array(z.string()).min(2),
  isPaid: z.boolean(),
  price: z.number().optional()
});

function CampaignCreate() {
  const navigate = useNavigate();
  const [choices, setChoices] = React.useState(['', '']);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const campaign = campaignSchema.parse({
        title: formData.get('title'),
        description: formData.get('description'),
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        choices: choices.filter(choice => choice.trim() !== ''),
        isPaid: formData.get('isPaid') === 'true',
        price: formData.get('isPaid') === 'true' ? 
          Number(formData.get('price')) : undefined
      });

      // TODO: Save campaign
      navigate('/campaigns');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="startDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              name="endDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choices
          </label>
          {choices.map((choice, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => {
                  const newChoices = [...choices];
                  newChoices[index] = e.target.value;
                  setChoices(newChoices);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Choice ${index + 1}`}
                required
              />
              {choices.length > 2 && (
                <button
                  type="button"
                  onClick={() => setChoices(choices.filter((_, i) => i !== index))}
                  className="ml-2 text-red-600 hover:text-red-700"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setChoices([...choices, ''])}
            className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Choice
          </button>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isPaid"
              id="isPaid"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
              This is a paid campaign
            </label>
          </div>
          
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Price (if paid)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
}