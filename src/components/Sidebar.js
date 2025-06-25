import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaFileAlt } from 'react-icons/fa';

const navItems = [
  { to: '/intro', label: 'Intro', icon: <FaUser /> },
  { to: '/builder', label: 'Builder', icon: <FaFileAlt /> },
];

const Sidebar = () => (
  <aside className="h-full w-20 md:w-56 bg-white shadow-xl flex flex-col items-center py-6 fixed left-0 top-0 z-30 border-r border-gray-200">
    <div className="mb-8 flex flex-col items-center">
      <img src="/icons8-resume-100.png" alt="Logo" className="w-12 h-12 mb-2" />
      <span className="text-lg font-bold text-[#678D58] hidden md:block">Resume Builder</span>
    </div>
    <nav className="flex flex-col gap-6 w-full items-center md:items-start">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg w-16 md:w-44 transition-colors font-medium text-gray-700 hover:bg-[#B6E388] hover:text-[#234b1c] ${isActive ? 'bg-[#B6E388] text-[#234b1c]' : ''}`
          }
        >
          <span className="text-xl">{item.icon}</span>
          <span className="hidden md:inline">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar; 