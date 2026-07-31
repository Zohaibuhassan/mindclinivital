import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    emoji: '🧠',
    title: 'Are you really okay?',
    description: 'Most people say "I\'m fine" without truly checking in with themselves. Your mental health matters more than you think.',
    color: '#00d4c8',
  },
  {
    emoji: '💭',
    title: 'Your mind deserves attention too.',
    description: 'We take care of our body — but what about our mind? Stress, anxiety, and burnout creep in silently.',
    color: '#a78bfa',
  },
  {
    emoji: '⚠️',
    title: 'You might be out of balance.',
    description: 'You might be out of balance without even knowing it. Early detection is the key to a healthier, happier life.',
    color: '#f97316',
  },
  {
    emoji: '🌙',
    title: 'Sleep affects everything.',
    description: 'Poor sleep disrupts mood, focus, and physical health. Our AI can detect sleep issues and sleep apnea risk before they worsen.',
    color: '#60a5fa',
  },
  {
    emoji: '✨',
    title: "Let's find out together.",
    description: "MindCliniVital gives you a private, judgment-free space to assess your mental and physical health — right from your phone.",
    color: '#00d4c8',
  },
];

const SplashScreen = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (index < slides.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[index];
  const isLast = index === slides.length - 1;

  return (
    <div className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-between overflow-hidden py-10 px-6">

      {/* Background glow */}
      <motion.div
        key={index + '-glow'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${slide.color}18 0%, transparent 65%)`,
        }}
      />

      {/* Top: Logo + Skip */}
      <div className="w-full max-w-md flex items-center justify-center relative z-10">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="14" fill="url(#sg)" opacity="0.15"/>
            <circle cx="15" cy="15" r="14" stroke="url(#sg)" strokeWidth="1.5"/>
            <path d="M7 15h4l2-5 3 10 2-7 2 2h3" stroke="#00d4c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="sg" x1="0" y1="0" x2="30" y2="30">
                <stop offset="0%" stopColor="#00d4c8"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-[15px] font-extrabold text-white tracking-tight">MindClini<span className="text-[#00d4c8]">Vital</span></span>
        </div>
      </div>

      {/* Center: Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center text-center gap-6 w-full"
          >
            {/* Emoji icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-[64px] shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${slide.color}22, ${slide.color}08)`,
                border: `1.5px solid ${slide.color}40`,
                boxShadow: `0 0 40px ${slide.color}20`,
              }}
            >
              {slide.emoji}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[clamp(24px,5vw,36px)] font-black text-white leading-tight tracking-tight"
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[15px] text-[#9ca3af] leading-relaxed max-w-sm"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom: Dots + Button */}
      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">
        {/* Progress dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? slide.color : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Next / Get Started button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: `0 12px 30px ${slide.color}40` }}
          whileTap={{ scale: 0.97 }}
          onClick={goNext}
          className="w-full py-4 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${slide.color}, ${isLast ? '#a78bfa' : '#0a84ff'})`,
            color: isLast ? '#fff' : '#000',
            boxShadow: `0 8px 24px ${slide.color}30`,
          }}
        >
          {isLast ? '✨ Get Started' : 'Next'}
          {!isLast && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          )}
        </motion.button>

        {/* Step counter */}
        <p className="text-[12px] text-gray-600">{index + 1} of {slides.length}</p>
      </div>
    </div>
  );
};

export default SplashScreen;
