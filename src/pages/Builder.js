import React, { useRef, useState } from 'react';
import StepForm from '../components/StepForm';
import ResumePreview from '../components/ResumePreview';
import LogoutIcon from '../components/LogoutIcon';
import ResumeReady from './ResumeReady';
import { useReactToPrint } from 'react-to-print';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  social: [{ type: '', url: '' }],
  skills: [],
  experience: [{ title: '', company: '', start: '', end: '', description: '' }],
  education: [{ degree: '', school: '', start: '', end: '', description: '' }],
  projects: [{ title: '', description: '', highlights: '' }],
  awards: [{ title: '', year: '', description: '' }],
  extracurriculars: [{ title: '', description: '' }],
  portfolio: [{ url: '' }],
};

const Builder = () => {
  const resumeRef = useRef();
  const [form, setForm] = useState(initialForm);
  const [done, setDone] = useState(false);

  // When user finishes the last step, show ResumeReady page
  const handleFinish = () => setDone(true);

  if (done) {
    return <ResumeReady resumeRef={resumeRef} form={form} />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: `url('/ChatGPT Image Jun 23, 2025, 10_48_27 PM.png') center/cover no-repeat` }}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container mx-auto flex flex-col md:flex-row gap-8 z-10 relative">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 relative">
          <StepForm form={form} setForm={setForm} onFinish={handleFinish} />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
          <ResumePreview ref={resumeRef} form={form} />
          <div className="absolute top-6 right-6">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
