import React from 'react';
import { motion } from 'framer-motion';

const GlowingButton = ({ children, onClick, className = '' }) => (
  <motion.button
    whileHover={{ scale: 1.08, boxShadow: '0 0 16px #b6e388, 0 0 32px #b6e388' }}
    whileTap={{ scale: 0.97 }}
    className={`px-8 py-3 rounded-full bg-white text-[#678D58] font-bold text-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 ${className}`}
    style={{ boxShadow: '0 0 16px #b6e388' }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export default GlowingButton;
