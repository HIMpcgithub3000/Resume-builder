import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import ResumePreview from './ResumePreview';

const steps = [
  'Personal Info',
  'Education',
  'Social Links',
  'Professional Summary',
  'Skills',
  'Experience',
  'Projects',
  'Awards',
  'Extracurricular Activities',
  'Portfolio Links',
];

const socialTypes = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'GitHub', value: 'github' },
  { label: 'Website', value: 'website' },
  { label: 'Twitter', value: 'twitter' },
];

const StepForm = ({ form, setForm, onFinish }) => {
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState('');
  const resumeRef = useRef();
  const [done, setDone] = useState(false);

  const handleArrayChange = (section, idx, field, value) => {
    const updated = form[section].map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setForm({ ...form, [section]: updated });
  };

  const handleAddEntry = (section, emptyObj) => {
    setForm({ ...form, [section]: [...form[section], emptyObj] });
  };

  const handleRemoveEntry = (section, idx) => {
    setForm({ ...form, [section]: form[section].filter((_, i) => i !== idx) });
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm({ ...form, skills: [...form.skills, trimmed] });
      setSkillInput('');
    }
  };

  const handleSkillRemove = (idx) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== idx) });
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: 'Resume',
  });

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            <input
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col gap-6">
            {form.education.map((edu, idx) => (
              <div key={idx} className="border-b pb-4 mb-2">
                <input className="input" placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange('education', idx, 'degree', e.target.value)} />
                <input className="input" placeholder="School" value={edu.school} onChange={e => handleArrayChange('education', idx, 'school', e.target.value)} />
                <div className="flex gap-2">
                  <input className="input w-1/2" placeholder="Start" value={edu.start} onChange={e => handleArrayChange('education', idx, 'start', e.target.value)} />
                  <input className="input w-1/2" placeholder="End" value={edu.end} onChange={e => handleArrayChange('education', idx, 'end', e.target.value)} />
                </div>
                <button type="button" onClick={() => handleRemoveEntry('education', idx)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('education', { degree: '', school: '', start: '', end: '' })} className="text-green-600">+ Add Education</button>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-4">
            {form.social.map((s, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <select
                  className="input w-32"
                  value={s.type}
                  onChange={e => handleArrayChange('social', idx, 'type', e.target.value)}
                >
                  <option value="">Type</option>
                  {socialTypes.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  className="input flex-1"
                  placeholder="URL"
                  value={s.url}
                  onChange={e => handleArrayChange('social', idx, 'url', e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveEntry('social', idx)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('social', { type: '', url: '' })} className="text-green-600">+ Add Social Link</button>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-2">
            <textarea
              className="input min-h-[80px]"
              placeholder="Professional Summary"
              value={form.summary}
              onChange={e => {
                if (e.target.value.length <= 500) {
                  setForm({ ...form, summary: e.target.value });
                }
              }}
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500">{form.summary.length}/500 characters</div>
          </div>
        );

      case 4:
        return (
          <div>
            <div className="flex gap-2 mb-2">
              <input
                className="input flex-1"
                placeholder="Add a skill"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                autoComplete="off"
              />
              <button type="button" className="text-green-600" onClick={handleSkillAdd}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.length === 0 && (
                <span className="text-gray-400 text-sm">No skills added yet.</span>
              )}
              {form.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(idx)}
                    className="ml-1 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-6">
            {form.experience.map((exp, idx) => (
              <div key={idx} className="border-b pb-4 mb-2">
                <input className="input" placeholder="Job Title" value={exp.title} onChange={e => handleArrayChange('experience', idx, 'title', e.target.value)} />
                <input className="input" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', idx, 'company', e.target.value)} />
                <textarea
                  className="input"
                  placeholder="Description"
                  value={exp.description}
                  onChange={e => {
                    if (e.target.value.length <= 100) {
                      handleArrayChange('experience', idx, 'description', e.target.value);
                    }
                  }}
                  maxLength={100}
                />
                <div className="text-right text-xs text-gray-500">{exp.description.length}/100 characters</div>
                <div className="flex gap-2">
                  <input className="input w-1/2" placeholder="Start" value={exp.start} onChange={e => handleArrayChange('experience', idx, 'start', e.target.value)} />
                  <input className="input w-1/2" placeholder="End" value={exp.end} onChange={e => handleArrayChange('experience', idx, 'end', e.target.value)} />
                </div>
                <button type="button" onClick={() => handleRemoveEntry('experience', idx)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('experience', { title: '', company: '', start: '', end: '', description: '' })} className="text-green-600">+ Add Experience</button>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-6">
            {form.projects.map((proj, idx) => (
              <div key={idx} className="border-b pb-4 mb-2">
                <input className="input" placeholder="Project Title" value={proj.title} onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)} />
                <input className="input" placeholder="Skills Used (comma separated)" value={proj.highlights} onChange={e => handleArrayChange('projects', idx, 'highlights', e.target.value)} />
                <textarea
                  className="input"
                  placeholder="Description"
                  value={proj.description}
                  onChange={e => {
                    if (e.target.value.length <= 150) {
                      handleArrayChange('projects', idx, 'description', e.target.value);
                    }
                  }}
                  maxLength={150}
                />
                <div className="text-right text-xs text-gray-500">{proj.description.length}/150 characters</div>
                <button type="button" onClick={() => handleRemoveEntry('projects', idx)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('projects', { title: '', description: '', highlights: '' })} className="text-green-600">+ Add Project</button>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col gap-6">
            {form.awards.map((award, idx) => (
              <div key={idx} className="border-b pb-4 mb-2">
                <input className="input" placeholder="Award Title" value={award.title} onChange={e => handleArrayChange('awards', idx, 'title', e.target.value)} />
                <input className="input" placeholder="Year" value={award.year} onChange={e => handleArrayChange('awards', idx, 'year', e.target.value)} />
                <textarea className="input" placeholder="Description" value={award.description} onChange={e => handleArrayChange('awards', idx, 'description', e.target.value)} />
                <button type="button" onClick={() => handleRemoveEntry('awards', idx)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('awards', { title: '', year: '', description: '' })} className="text-green-600">+ Add Award</button>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col gap-6">
            {form.extracurriculars.map((act, idx) => (
              <div key={idx} className="border-b pb-4 mb-2">
                <input className="input" placeholder="Activity Title" value={act.title} onChange={e => handleArrayChange('extracurriculars', idx, 'title', e.target.value)} />
                <textarea className="input" placeholder="Description" value={act.description} onChange={e => handleArrayChange('extracurriculars', idx, 'description', e.target.value)} />
                <button type="button" onClick={() => handleRemoveEntry('extracurriculars', idx)} className="text-red-500 mt-1">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('extracurriculars', { title: '', description: '' })} className="text-green-600">+ Add Activity</button>
          </div>
        );
      case 9:
        return (
          <div className="flex flex-col gap-6">
            {form.portfolio.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input className="input flex-1" placeholder="Portfolio URL" value={link.url} onChange={e => handleArrayChange('portfolio', idx, 'url', e.target.value)} />
                <button type="button" onClick={() => handleRemoveEntry('portfolio', idx)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddEntry('portfolio', { url: '' })} className="text-green-600">+ Add Portfolio Link</button>
          </div>
        );
      default:
        return null;
    }
  };

  if (done) {
    return <ResumeReady onDownload={handlePrint} />;
  }

  return (
    <form className="w-full max-w-md flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-[#678D58] mb-2">{steps[step]}</h2>
          {renderStep()}
          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-6 py-3 rounded-full bg-gray-200 text-[#678D58] font-bold text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-200 hover:scale-105 transition-all"
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (step === steps.length - 1 && typeof onFinish === 'function') {
                  onFinish();
                } else {
                  setStep(Math.min(steps.length - 1, step + 1));
                }
              }}
              className="px-6 py-3 rounded-full bg-[#678D58] text-white font-bold text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              {step === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
          <div className="text-sm text-gray-500 mt-2 text-center">
            Step {step + 1} of {steps.length}
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <ResumePreview ref={resumeRef} form={form} />
      </div>
      <style>{`
        .input {
          @apply w-full rounded-lg border-2 border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none p-3 transition-all;
        }
      `}</style>
    </form>
  );
};

export default StepForm;