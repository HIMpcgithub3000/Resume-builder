import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Auth = () => {
  const [mode, setMode] = useState('login'); // default to login
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    navigate('/intro');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#181c23] relative overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-white/10 blur-3xl opacity-80" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#2b2f3a]/30 blur-2xl opacity-60" />
      </div>
      {/* Glassmorphic Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="z-10 w-full max-w-md mx-auto rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl px-8 py-10 flex flex-col items-center border border-white/20"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.38)' }}
      >
        {/* Logo */}
        <img src="/icons8-resume-100.png" alt="Logo" className="w-14 h-14 mb-4" />
        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold text-white mb-1 text-center">{mode === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="text-gray-300 mb-6 text-center text-base">{mode === 'login' ? 'Please log in to your account.' : 'Sign up to get started.'}</p>
        {/* Toggle */}
        <div className="flex w-full mb-6 justify-center gap-2">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none ${mode === 'login' ? 'bg-green-500 text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none ${mode === 'signup' ? 'bg-green-500 text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
        {/* Auth Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AuthForm mode={mode} onSuccess={handleAuthSuccess} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-xs mt-8 z-10">
        © 2023 ResumeFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
