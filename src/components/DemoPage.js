import React from 'react';

const DemoPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(52,211,153,0.05)_0%,transparent_60%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Back button */}
      <button 
        onClick={onBack}
        className="absolute top-24 left-6 md:left-12 flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span className="font-medium">Back</span>
      </button>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center mt-8">
        {/* Headline */}
        <h1 className="text-[clamp(32px,5vw,52px)] font-black tracking-tight mb-4 text-white">
          <span className="text-[#34d399]">Talk with</span> MindCliniVital AI
        </h1>
        
        {/* Subheadline */}
        <p className="text-[16px] text-[#9ca3af] max-w-[600px] mx-auto mb-16 leading-relaxed">
          Speak naturally, MindCliniVital listens, responds, and keeps the conversation going automatically.
        </p>

        {/* Big Mic Button */}
        <div className="mb-16">
          <button className="w-28 h-28 rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(52,211,153,0.5)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>

        {/* Response Card */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 text-left max-w-2xl mx-auto shadow-lg">
          <p className="text-[13px] text-[#94a3b8] mb-3 font-medium">You said:</p>
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            <span className="text-[#34d399] text-[15px] font-semibold">Waiting for your voice...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
