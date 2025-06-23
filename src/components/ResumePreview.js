import React, { forwardRef } from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const socialIcons = {
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  twitter: FaTwitter,
};

const ResumePreview = forwardRef(({ form }, ref) => {
  // Helper to render bullet points from description
  const renderBullets = (text) => {
    if (!text) return null;
    // Split by newlines or dashes
    const lines = text.split(/\n|\r|\u2022|\-/).map(l => l.trim()).filter(Boolean);
    if (lines.length <= 1) return <span>{text}</span>;
    return (
      <ul className="ml-6 list-disc print:ml-4 print:text-sm">
        {lines.map((line, idx) => <li key={idx}>{line}</li>)}
      </ul>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: 'Resume',
  });

  return (
    <div ref={ref} className="bg-white p-8 max-w-2xl w-full border border-gray-200 print:border-0 print:p-4 print:max-w-full print:w-full print:bg-white print:shadow-none print:rounded-none rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-col items-center mb-2 print:mb-0 print:items-start">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide mb-1 print:text-2xl print:mb-0 print:font-bold print:tracking-normal" style={{ letterSpacing: '1px' }}>{form.name || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-2 text-gray-700 text-sm items-center justify-center print:justify-start print:text-xs">
          {form.phone && <span>{form.phone}</span>}
          {form.email && <span className="print:ml-2">{form.email}</span>}
          {form.social && form.social.filter(s => s.type && s.url).map((s, idx) => {
            const Icon = socialIcons[s.type] || FaGlobe;
            return (
              <span key={idx} className="flex items-center gap-1 print:ml-2">
                <Icon className="inline text-green-700 print:text-black" style={{ fontSize: '1em' }} />
                <span className="underline text-green-700 print:text-black">{s.url}</span>
              </span>
            );
          })}
        </div>
      </div>
      {/* Divider */}
      <hr className="my-2 border-gray-300 print:my-1" />
      {/* Education (top, as in sample) */}
      {form.education && form.education[0] && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">EDUCATION</div>
          <div className="flex flex-col print:flex-row print:justify-between">
            <span className="font-semibold text-gray-900 print:text-sm">{form.education[0].degree} {form.education[0].school && '—'} {form.education[0].school}</span>
            <span className="text-gray-600 text-xs print:text-xs">{form.education[0].start} {form.education[0].start && form.education[0].end && '–'} {form.education[0].end}</span>
          </div>
          {form.education[0].description && <div className="text-gray-700 text-xs print:text-xs">{form.education[0].description}</div>}
        </div>
      )}
      {/* Section: Skills/Tools */}
      {(form.skills && form.skills.length > 0) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">TECHNICAL SKILLS</div>
          <div className="text-gray-900 text-sm print:text-xs">
            <b>Languages:</b> {form.skills.join(', ')}
          </div>
        </div>
      )}
      {/* Section: Experience */}
      {form.experience && form.experience.some(e => e.title || e.company) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0"> EXPERIENCE</div>
          {form.experience.map((exp, idx) => (
            (exp.title || exp.company) && (
              <div key={idx} className="mb-1 print:mb-0">
                <div className="flex flex-col print:flex-row print:justify-between">
                  <span className="font-bold text-gray-900 print:text-sm">{exp.title}</span>
                  <span className="text-gray-600 text-xs print:text-xs">{exp.start} {exp.start && exp.end && '–'} {exp.end}</span>
                </div>
                <div className="text-gray-700 text-xs print:text-xs font-semibold">{exp.company}</div>
                <div className="text-gray-800 text-xs print:text-xs">
                  {renderBullets(exp.description)}
                </div>
              </div>
            )
          ))}
        </div>
      )}
      {/* Section: Projects */}
      {form.projects && form.projects.some(p => p.title) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">PROJECTS</div>
          {form.projects.map((proj, idx) => (
            proj.title && (
              <div key={idx} className="mb-1 print:mb-0">
                <span className="font-bold text-gray-900 print:text-sm">{proj.title}</span>
                <div className="text-gray-800 text-xs print:text-xs">
                  {renderBullets(proj.description)}
                </div>
                {proj.highlights && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.highlights.split(',').map((h, i) => (
                      <span key={i} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs print:bg-white print:text-black print:border print:border-gray-400">{h.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
      {/* Section: Summary */}
      {form.summary && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">PROFESSIONAL SUMMARY</div>
          <div className="text-gray-800 text-xs print:text-xs">{form.summary}</div>
        </div>
      )}
      {/* Section: Awards */}
      {form.awards && form.awards.some(a => a.title) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">AWARDS & CERTIFICATIONS</div>
          {form.awards.map((award, idx) => (
            award.title && (
              <div key={idx} className="mb-1 print:mb-0">
                <span className="font-bold text-gray-900 print:text-sm">{award.title}</span>
                <span className="text-gray-600 text-xs ml-2 print:text-xs">{award.year}</span>
                <div className="text-gray-800 text-xs print:text-xs">{award.description}</div>
              </div>
            )
          ))}
        </div>
      )}
      {/* Section: Extracurricular Activities */}
      {form.extracurriculars && form.extracurriculars.some(a => a.title) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">EXTRACURRICULAR ACTIVITIES</div>
          {form.extracurriculars.map((activity, idx) => (
            activity.title && (
              <div key={idx} className="mb-1 print:mb-0">
                <span className="font-bold text-gray-900 print:text-sm">{activity.title}</span>
                <div className="text-gray-800 text-xs print:text-xs">{activity.description}</div>
              </div>
            )
          ))}
        </div>
      )}
      {/* Section: Portfolio Links */}
      {form.portfolio && form.portfolio.some(p => p.url) && (
        <div className="mb-2 print:mb-1">
          <div className="uppercase font-bold text-xs text-gray-700 tracking-widest print:text-xs print:font-bold print:mb-0">PORTFOLIO</div>
          <div className="flex flex-col gap-1">
            {form.portfolio.map((p, idx) => (
              p.url && (
                <a key={idx} href={p.url} className="text-green-700 underline print:text-black print:no-underline" target="_blank" rel="noopener noreferrer">{p.url}</a>
              )
            ))}
          </div>
        </div>
      )}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\:text-xs { font-size: 11px !important; }
          .print\:text-sm { font-size: 13px !important; }
          .print\:mb-0 { margin-bottom: 0 !important; }
          .print\:ml-2 { margin-left: 0.5rem !important; }
          .print\:ml-4 { margin-left: 1rem !important; }
          .print\:font-bold { font-weight: bold !important; }
          .print\:shadow-none { box-shadow: none !important; }
          .print\:rounded-none { border-radius: 0 !important; }
          .print\:border { border: 1px solid #bbb !important; }
          .print\:border-0 { border: 0 !important; }
          .print\:p-4 { padding: 1rem !important; }
          .print\:max-w-full { max-width: 100% !important; }
          .print\:w-full { width: 100% !important; }
        }
      `}</style>
    </div>
  );
});

export default ResumePreview;