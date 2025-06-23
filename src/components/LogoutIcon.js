import React from 'react';

const LogoutIcon = () => (
  <button title="Logout" className="text-[#678D58] hover:text-red-500 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={32} height={32}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
    </svg>
  </button>
);

export default LogoutIcon;