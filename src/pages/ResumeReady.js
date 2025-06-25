import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import DownloadButton from '../components/DownloadButton';
import ResumePreview from '../components/ResumePreview';
import AISuggestionBox from '../components/AISuggestionBox';

const Printable = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ background: 'white', color: 'black', padding: 40 }}>
    <h1>Test Resume</h1>
    <p>This is a test.</p>
  </div>
));

const getRecommendations = (form) => {
  const recs = [];
  if (!form.name || form.name.trim().length < 3) recs.push('Add your full name.');
  if (!form.email || !form.email.includes('@')) recs.push('Provide a valid email address.');
  if (!form.phone || form.phone.length < 8) recs.push('Add a valid phone number.');
  if (!form.summary || form.summary.length < 30) recs.push('Expand your professional summary (at least 30 characters).');
  if (!form.skills || form.skills.length < 3) recs.push('Add at least 3 relevant skills.');
  if (!form.experience || !form.experience[0] || !form.experience[0].title) recs.push('Add at least one work experience.');
  if (!form.education || !form.education[0] || !form.education[0].degree) recs.push('Add at least one education entry.');
  // Add more checks as needed
  return recs;
};

const ResumeReady = ({ form }) => {
  const resumeRef = useRef();
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen relative">
      {/* Decorative circles */}
      {[80, 120, 200, 60, 100].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#A3D977] opacity-40"
          style={{
            width: size,
            height: size,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            zIndex: 0,
          }}
        />
      ))}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center max-w-md w-full">
        <FaCheckCircle className="text-green-400 text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your resume is ready!</h2>
        <p className="text-gray-500 text-center mb-6">Your resume has been successfully built. Click below to download your resume.</p>
        {/* AI Suggestions */}
        <AISuggestionBox form={form} apiKey={apiKey} />
        {/* Recommendations */}
        {getRecommendations(form).length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded w-full">
            <h4 className="font-bold mb-2 text-yellow-700">Suggestions for Improvement:</h4>
            <ul className="list-disc ml-5 text-yellow-800">
              {getRecommendations(form).map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        )}
        <div className="flex gap-4">
          <DownloadButton
            resumeRef={resumeRef}
            className="bg-[#B6E388] hover:bg-[#A3D977] text-green-900 font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow"
          />
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow"
            onClick={() => navigate('/')}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
        {/* Hidden resume for printing - this is the ONLY place the ref is used */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <ResumePreview ref={resumeRef} form={form} />
        </div>
      </div>
    </div>
  );
};

export default ResumeReady; 