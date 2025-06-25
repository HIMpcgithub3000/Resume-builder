import React, { useState } from 'react';

export default function AISuggestionBox({ form, apiKey }) {
  // Use prop if provided, otherwise use env variable
  const groqKey = apiKey || process.env.REACT_APP_GROQ_API_KEY;
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant that reviews resume data and provides actionable, concise suggestions for improvement. Focus on phrasing, missing sections, and industry best practices.',
              },
              {
                role: 'user',
                content: `Here is the user resume data as JSON: ${JSON.stringify(
                  form
                )}. Please provide improvement suggestions as a bullet list.`,
              },
            ],
            max_tokens: 300,
          }),
        }
      );
      if (!response.ok) throw new Error('Failed to fetch AI suggestions');
      const data = await response.json();
      const aiText =
        data.choices?.[0]?.message?.content || 'No suggestions found.';
      setSuggestions(aiText);
    } catch (err) {
      setError('Could not fetch AI suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded w-full">
      <h4 className="font-bold mb-2 text-blue-700">AI Suggestions for Improvement:</h4>
      {suggestions ? (
        <div className="text-blue-800 whitespace-pre-line">{suggestions}</div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
          onClick={fetchSuggestions}
          disabled={loading || !groqKey}
        >
          {loading ? 'Loading...' : 'Get AI Suggestions'}
        </button>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {!groqKey && (
        <div className="text-xs text-gray-500 mt-2">
          Add your Groq API key to a .env.local file as REACT_APP_GROQ_API_KEY to enable AI suggestions.
        </div>
      )}
    </div>
  );
} 