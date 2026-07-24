import React from 'react';

const stats = [
  { value: '87%', label: 'Improved Patient Adherence',          color: 'text-[#a78bfa]' },
  { value: '72%', label: 'Reduction in Missed Appointments',    color: 'text-[#a78bfa]' },
  { value: '90%', label: 'Health Screening Accuracy',           color: 'text-[#60a5fa]' },
  { value: '100%', label: 'User Satisfaction',                  color: 'text-[#60a5fa]' },
];

const tags = [
  { text: 'AI ACTIVE',             style: 'bg-accent text-black' },
  { text: 'MindCliniVital 24/7',   style: 'bg-[#7c3aed] text-white' },
  { text: 'AI CARE COORDINATOR',   style: 'bg-transparent border-[1.5px] border-accent text-accent' },
];

const Hero = ({ onTryDemo }) => {
  return (
    <section id="home" className="relative bg-bg-primary min-h-[calc(100vh-62px)] flex items-center pt-[62px] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08)_0%,transparent_60%)] top-0 left-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:72px_72px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-[60px] pb-[80px] flex flex-col items-start gap-9 max-w-[900px]">

        {/* ── Headline ─────────────────── */}
        <h1 className="text-[clamp(34px,5vw,56px)] font-black leading-[1.15] tracking-[-1.5px] text-white max-w-[820px]">
          Your AI Companion for Smarter, Early, and{' '}
          <span className="text-accent">Accurate</span>
          {' '}Health Insights
        </h1>

        {/* ── Stats row ─────────────────── */}
        <div className="flex gap-3 md:gap-4 flex-wrap w-full">
          {stats.map((s, i) => (
            <div className="bg-[#131929] border border-white/5 rounded-xl py-4 px-5 sm:py-5 sm:px-7 min-w-full sm:min-w-[180px] flex-1 transition-colors duration-250 hover:border-white/10" key={i}>
              <div className={`text-[28px] sm:text-[36px] font-black leading-none mb-2 tracking-tight ${s.color}`}>{s.value}</div>
              <div className="text-[12.5px] text-[#8b95b0] leading-relaxed font-normal">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tags ─────────────────────── */}
        <div className="flex gap-2.5 flex-wrap items-center">
          {tags.map((t, i) => (
            <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold py-[7px] px-4 rounded-full tracking-wide uppercase ${t.style}`} key={i}>
              {t.text === 'AI ACTIVE' && <span className="w-[7px] h-[7px] bg-black rounded-full shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />}
              {t.text}
            </span>
          ))}
        </div>

        {/* ── CTA buttons ──────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-wrap w-full">
          <button onClick={onTryDemo} className="bg-gradient-to-br from-accent to-accent-2 text-black text-[14px] font-extrabold py-3 px-[30px] rounded-lg font-sans transition-all duration-250 tracking-wide hover:opacity-90 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,212,200,0.4)] text-center">Try Mental AI</button>
          <button className="bg-transparent text-white text-[14px] font-semibold py-[11px] px-7 border-[1.5px] border-white/25 rounded-lg font-sans transition-all duration-250 hover:border-white/50 hover:bg-white/5 hover:-translate-y-[2px] text-center">Get notified when we launch</button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
