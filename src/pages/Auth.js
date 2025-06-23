import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const [mode, setMode] = useState(null); // 'login' or 'signup'

  return (
    <div className="min-h-screen bg-[#678D58] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="flex flex-col items-center"
      >
        {!mode && (
          <div className="flex gap-8 mb-8">
            <button
              className="px-8 py-3 rounded-full bg-white text-[#678D58] font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className="px-8 py-3 rounded-full bg-white text-[#678D58] font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
          </div>
        )}
        <AnimatePresence>
          {mode && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              className="w-full flex justify-center"
            >
              <AuthForm mode={mode} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
