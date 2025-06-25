import React from 'react';

const suggestions = {
  0: [
    'Enter your full legal name as it should appear on your resume.',
    'Use a professional email address.',
    'Double-check your phone number for accuracy.'
  ],
  1: [
    'List your most recent education first.',
    'Include degree, school, and dates attended.',
    'Add multiple entries for multiple degrees.'
  ],
  2: [
    'Add relevant social links (LinkedIn, GitHub, portfolio, etc.).',
    'Ensure your profiles are up to date and professional.'
  ],
  3: [
    'Summarize your experience in 2-3 sentences.',
    'Use action verbs and quantify achievements if possible.'
  ],
  4: [
    'List both technical and soft skills.',
    'Include skills relevant to your target job.'
  ],
  5: [
    'Describe your most recent roles first.',
    'Focus on achievements and impact, not just duties.',
    'Use bullet points for clarity.'
  ],
  6: [
    'Highlight projects relevant to your target job.',
    'Describe your role and key outcomes.'
  ],
  7: [
    'List awards that are relevant and recent.',
    'Include a brief description if needed.'
  ],
  8: [
    'Mention extracurriculars that show leadership or teamwork.',
    'Keep descriptions concise.'
  ],
  9: [
    'Add links to your portfolio or personal website.',
    'Make sure links are working and up to date.'
  ]
};

export default function SuggestionBox({ step }) {
  if (!suggestions[step]) return null;
  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded">
      <h4 className="font-bold mb-2 text-green-700">Tips for this section:</h4>
      <ul className="list-disc ml-5 text-green-800">
        {suggestions[step].map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
} 