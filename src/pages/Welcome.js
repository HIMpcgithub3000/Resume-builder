import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Welcome() {
  const navigate = useNavigate();
  const paperControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    paperControls.start({
      y: [ -300, 20, 0, -10, 0 ],
      rotate: [ -15, 10, -5, 3, 0 ],
      transition: {
        duration: 1.6,
        times: [0, 0.5, 0.7, 0.9, 1],
        ease: ["easeIn", "easeOut", "easeInOut", "easeOut", "easeOut"],
      },
    }).then(() => {
      textControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" }
      });
    });
  }, [paperControls, textControls]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#181c23]">
      {/* Spotlight background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-white/10 blur-3xl opacity-80" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#2b2f3a]/30 blur-2xl opacity-60" />
      </div>
      {/* Logo and App Name Header */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pb-4 z-10">
        <img src="/icons8-resume-100.png" alt="Logo" className="w-16 h-16 mb-2" />
        <span className="text-2xl font-bold text-white drop-shadow-lg">Resume Builder</span>
      </div>
      {/* Animated Paper */}
      <motion.div
        initial={{ y: -300, rotate: -15 }}
        animate={paperControls}
        className="relative z-10 flex flex-col items-center"
        style={{ width: 320, height: 180, maxWidth: "90vw" }}
      >
        {/* Paper shape with white fill and subtle shadow */}
        <div className="w-full h-full bg-transparent rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
          {/* SVG Paper Illustration */}
          <svg
            viewBox="0 0 320 180"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
            aria-hidden="true"
          >
            <rect x="12" y="12" width="296" height="156" rx="24" fill="#fff" />
            <path d="M32 50 Q80 70 288 50" stroke="#e5e7eb" strokeWidth="3" fill="none"/>
            <path d="M32 90 Q160 120 288 90" stroke="#e5e7eb" strokeWidth="3" fill="none"/>
            <path d="M32 130 Q120 150 288 130" stroke="#e5e7eb" strokeWidth="3" fill="none"/>
          </svg>
          {/* Welcome Text on Paper */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={textControls}
            className="text-4xl md:text-5xl font-extrabold text-[#678D58] text-center select-none z-10"
            style={{ fontFamily: "'Quicksand', 'Raleway', sans-serif" }}
          >
            Welcome
          </motion.h1>
        </div>
      </motion.div>
      {/* Get Started Button */}
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 24px 6px #22c55e, 0 0 0 4px #fff",
        }}
        className="mt-8 px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg flex items-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 ring-offset-2 z-10"
        style={{
          boxShadow: "0 0 16px 2px #22c55e, 0 2px 8px 0 #234b1c22",
          animation: "pulse 2s infinite",
        }}
        onClick={() => navigate("/auth")}
      >
        Get Started
        <FaPaperPlane className="ml-1" />
      </motion.button>
      {/* Greeting below the button */}
      <div className="mt-8 text-white text-2xl md:text-3xl font-bold text-center drop-shadow-lg z-10">
        Welcome to Resume Builder
      </div>
    </div>
  );
}
