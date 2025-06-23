import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadButton = ({ resumeRef, className }) => {
  const handleDownload = async () => {
    const element = resumeRef?.current;
    if (!element) {
      alert('Resume preview is not ready.');
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (err) {
      console.error('PDF Download failed:', err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`px-6 py-3 rounded-full bg-[#678D58] text-white font-bold text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-200 hover:scale-105 transition-all ${className}`}
    >
      Download Resume
    </button>
  );
};

export default DownloadButton;
