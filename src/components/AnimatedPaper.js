import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPaper = () => (
  <motion.div
    initial={{ y: -300, rotate: -20, opacity: 0 }}
    animate={{ y: 0, rotate: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 120, damping: 12 }}
    className="w-72 h-44 bg-white rounded-2xl shadow-2xl absolute top-1/4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
  >
    {/* Paper content can go here if needed */}
  </motion.div>
);

export default AnimatedPaper;
