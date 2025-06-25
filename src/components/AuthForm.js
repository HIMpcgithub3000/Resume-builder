import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthForm = ({ mode, onSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 500); // Simulate auth
  };

  return (
    <motion.form
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-5"
    >
      {mode === 'signup' && (
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-green-400" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="pl-10 pr-3 py-3 w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all peer"
          />
        </div>
      )}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-green-400" />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email Address"
          className="pl-10 pr-3 py-3 w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all peer"
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-green-400" />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="pl-10 pr-3 py-3 w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all peer"
        />
      </div>
      {mode === 'login' && (
        <div className="flex justify-end mb-2">
          <button type="button" className="text-green-300 text-sm hover:underline focus:outline-none">Forgot Password?</button>
        </div>
      )}
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-black/80 text-white font-semibold text-base shadow-md hover:bg-black/90 transition mb-2 border border-white/20"
        // onClick={handleGoogleLogin} // Simulate Google login
      >
        <FaGoogle className="text-lg" /> Continue with Google
      </button>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: '0 0 12px #22c55e' }}
        whileTap={{ scale: 0.97 }}
        className="w-full px-6 py-3 rounded-lg bg-green-500 text-white font-bold text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 flex items-center justify-center gap-2 mt-1"
        type="submit"
      >
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
};

export default AuthForm;
