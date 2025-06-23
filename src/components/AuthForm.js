import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => navigate('/builder'), 500); // Simulate auth
  };

  return (
    <motion.form
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-80 flex flex-col gap-6 relative"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
    >
      {mode === 'signup' && (
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-[#678D58]" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all peer bg-transparent"
          />
          <label className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 ${form.name ? '-top-2 text-xs text-green-600' : ''}`}>Name</label>
        </div>
      )}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-[#678D58]" />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all peer bg-transparent"
        />
        <label className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 ${form.email ? '-top-2 text-xs text-green-600' : ''}`}>Email</label>
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-[#678D58]" />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all peer bg-transparent"
        />
        <label className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 ${form.password ? '-top-2 text-xs text-green-600' : ''}`}>Password</label>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 12px #b6e388' }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 px-6 py-3 rounded-full bg-[#678D58] text-white font-bold text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center justify-center gap-2"
        type="submit"
      >
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
};

export default AuthForm;
