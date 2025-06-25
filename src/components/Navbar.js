import React from 'react';

const Navbar = () => (
  <header className="w-full h-16 bg-white shadow flex items-center px-4 md:px-8 sticky top-0 z-20 border-b border-gray-200">
    <img src="/icons8-resume-100.png" alt="Logo" className="w-8 h-8 mr-3" />
    <span className="text-xl font-bold text-[#678D58] mr-auto">Resume Builder</span>
  </header>
);

export default Navbar; 