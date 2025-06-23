import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Intro from './pages/Intro';
import Auth from './pages/Auth';
import Builder from './pages/Builder';
import ResumeReady from './pages/ResumeReady';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/done" element={<ResumeReady />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;