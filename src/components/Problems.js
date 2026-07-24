import React from 'react';

const problems = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="10" r="5" stroke="#00d4c8" strokeWidth="1.8"/>
        <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#00d4c8" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 12l4 4M28 12l-4 4" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    number: '01',
    title: 'Shortage of Doctors',
    description: 'There is a global crisis: the world faces a shortage of 10 million healthcare workers by 2030. Rural communities and underserved populations bear the worst burden, with limited access to timely diagnoses and specialist care. Patients wait weeks — sometimes months — for appointments, causing preventable health deterioration. MindClinicVital bridges this gap by providing AI-powered triage and monitoring at scale.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="#00d4c8" strokeWidth="1.8"/>
        <path d="M10 16h5M17 16h5M16 10v5M16 17v5" stroke="#00d4c8" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2" fill="#00d4c8" opacity="0.4"/>
        <circle cx="22" cy="22" r="2" fill="#00d4c8" opacity="0.4"/>
      </svg>
    ),
    number: '02',
    title: 'Remote Access Barriers',
    description: 'Millions of people live in remote areas where accessing qualified medical professionals is physically and financially impossible. Telemedicine exists, but it still requires a qualified physician on the other end. Geography should never determine the quality of healthcare someone receives. Our AI platform works offline, on low-bandwidth connections, making world-class health intelligence accessible anywhere on Earth.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="#00d4c8" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="3" fill="rgba(0,212,200,0.2)" stroke="#00d4c8" strokeWidth="1.2"/>
      </svg>
    ),
    number: '03',
    title: 'Your AI Hygiene Gap',
    description: 'Modern healthcare is reactive — we treat disease after it manifests. But 80% of chronic diseases are preventable with early detection and consistent lifestyle changes. The problem is that tracking health continuously and understanding what the data means has historically required expensive wearables, doctors, and lab tests. MindClinicVital makes proactive AI health hygiene as routine as brushing your teeth.',
  },
];

const Problems = () => {
  return (
    <section id="about" className="relative bg-bg-secondary overflow-hidden py-[70px] md:py-[100px]">
      <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,212,200,0.06)_0%,transparent_70%)] top-0 right-0 blur-[60px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[rgba(0,212,200,0.15)] border border-[rgba(0,212,200,0.3)] text-accent text-[12px] font-semibold py-1.5 px-4 rounded-full mb-5 tracking-wide uppercase">⚠️ The Challenge</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] mb-4">
            Born from <span className="text-accent">3 Big Problems</span> in{' '}
            <br />Healthcare Challenge
          </h2>
          <p className="text-[15px] text-[#9ca3af] max-w-[580px] leading-[1.7] mx-auto">
            We didn't build MindClinicVital in a vacuum. It was born from watching real people
            suffer from real, fixable healthcare failures.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {problems.map((p, i) => (
            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 relative transition-all duration-300 group hover:border-[rgba(0,212,200,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,212,200,0.08)]" key={i}>
              <div className="flex justify-between items-start mb-5">
                <div className="text-[48px] font-black text-[rgba(0,212,200,0.15)] leading-none tracking-[-2px]">{p.number}</div>
                <div className="w-[60px] h-[60px] bg-[rgba(0,212,200,0.08)] border border-[rgba(0,212,200,0.3)] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(0,212,200,0.15)] group-hover:shadow-[0_0_20px_rgba(0,212,200,0.2)]">{p.icon}</div>
              </div>
              <h3 className="text-[19px] font-bold text-white mb-3.5">{p.title}</h3>
              <p className="text-[13.5px] text-[#9ca3af] leading-[1.75]">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom mission statement */}
        <div className="max-w-[860px] mx-auto">
          <div className="bg-gradient-to-br from-[rgba(0,212,200,0.05)] to-[#111827]/80 border border-[rgba(0,212,200,0.3)] rounded-[24px] p-8 px-6 md:p-12 text-center relative">
            <div className="text-[80px] leading-[0.6] text-accent opacity-30 font-serif mb-4">"</div>
            <p className="text-[17px] text-[#9ca3af] leading-[1.85] mb-8">
              We believe that <span className="text-accent">access to proactive health intelligence</span> is a
              fundamental human right, not a privilege. MindClinicVital is our commitment to
              democratising healthcare through responsible, accurate, and compassionate AI —
              so that every person on this planet can live a longer, healthier, and more
              fulfilling life. <span className="text-accent">Together.</span>
            </p>
            <div className="flex items-center justify-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-2 border-2 border-[rgba(0,212,200,0.3)]" />
              <div className="text-left">
                <div className="text-[15px] font-bold text-white">Dr. Sarah Chen</div>
                <div className="text-[12px] text-[#6b7280]">CEO & Co-founder, MindClinicVital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
