import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import GlowingButton from '../components/GlowingButton';

const Intro = () => {
  // const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: `url('/aii.png') center/cover no-repeat` }}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container mx-auto flex flex-col items-center justify-center z-10 relative">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-2xl font-semibold text-center max-w-xl mt-6"
        >
          Get started with building your career to achieve your dream job by creating a well-structured resume.
        </motion.p>
      </div>
    </div>
  );
};

export default Intro;
