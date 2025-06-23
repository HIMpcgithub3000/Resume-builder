import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlowingButton from '../components/GlowingButton';

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#678D58] flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ scaleY: 0.7, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.2 }}
        className="w-80 h-52 bg-white rounded-2xl shadow-2xl flex items-center justify-center mb-8"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      >
        {/* Paper stays static here */}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-white text-2xl font-semibold text-center max-w-xl mt-6"
      >
        Get started with building your career to achieve your dream job by creating a well-structured resume.
      </motion.p>
      <GlowingButton className="mt-10" onClick={() => navigate('/auth')}>
        Get Started
      </GlowingButton>
    </div>
  );
};

export default Intro;
