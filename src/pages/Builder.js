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
    <div className="min-h-screen bg-[#678D58] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 relative">
        <StepForm form={form} setForm={setForm} onFinish={handleFinish} />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        <ResumePreview ref={resumeRef} form={form} />
        <div className="absolute top-6 right-6">
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Builder;
