import React from 'react';

const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8 5 13c0 3 1.5 5.5 4 7l1 4h8l1-4c2.5-1.5 4-4 4-7 0-5-4-9-9-9z" stroke="#00d4c8" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M10 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#00d4c8" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="13" r="1.5" fill="#00d4c8"/>
      </svg>
    ),
    title: 'Mental Health Prediction',
    subtitle: 'Vocal AI — SMHD-AI',
    features: [
      'Detects depression and anxiety via voice biomarkers',
      '87% early detection accuracy validated',
      'Non-invasive, passive daily monitoring',
      'Weekly mental wellness trend reports',
      'Integrated mood journaling & insights',
    ],
    cta: 'Try Mental AI',
    type: 'mental',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5C9 5 5 9 5 14s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="#00d4c8" strokeWidth="1.6"/>
        <path d="M14 10v4l3 3" stroke="#00d4c8" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M7 14h2M19 14h2M14 7v2M14 19v2" stroke="#00d4c8" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sleep Apnea Monitoring',
    subtitle: 'Sleep AI — SAAD-AI',
    features: [
      'Real-time breathing pattern analysis',
      'Identifies sleep apnea episodes overnight',
      'SpO2 & respiratory event tracking',
      'Personalised sleep quality score',
      'Physician-ready diagnostic reports',
    ],
    cta: 'Try Sleep AI',
    type: 'sleep',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L6 10v8l8 5 8-5V10L14 5z" stroke="#00d4c8" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 14h3l2-3 2 6 1.5-3H21" stroke="#00d4c8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Stroke Risk Predictions',
    subtitle: 'Stroke AI — SRP-AI',
    features: [
      'Predicts stroke risk 12 months in advance',
      'Analyses 40+ cardiovascular risk factors',
      'Continuous blood pressure trend monitoring',
      'Personalised prevention action plans',
      'Alert system for high-risk anomalies',
    ],
    cta: 'Try Stroke AI',
    type: 'stroke',
  },
];

const Capabilities = ({ onTryMentalAI, onTrySleepAI, onTryStrokeAI }) => {
  const handleCTAClick = (type) => {
    if (type === 'mental') {
      onTryMentalAI && onTryMentalAI();
    } else if (type === 'sleep') {
      onTrySleepAI && onTrySleepAI();
    } else if (type === 'stroke') {
      onTryStrokeAI && onTryStrokeAI();
    }
  };

  return (
    <section id="capabilities" className="relative bg-bg-secondary overflow-hidden py-[70px] md:py-[100px]">
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,212,200,0.06)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[rgba(0,212,200,0.15)] border border-[rgba(0,212,200,0.3)] text-accent text-[12px] font-semibold py-1.5 px-4 rounded-full mb-5 tracking-wide uppercase">🤖 AI-Powered</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] mb-4">
            Your AI <span className="text-accent">MindClinicVital</span> Capabilities
          </h2>
          <p className="text-[15px] text-[#9ca3af] max-w-[600px] leading-[1.7] mx-auto">
            Four intelligent health modules working seamlessly together to deliver comprehensive,
            personalised health intelligence 24/7.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group hover:border-[rgba(0,212,200,0.3)] hover:bg-bg-card-hover hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,212,200,0.1)]" key={i}>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 min-w-[56px] bg-[rgba(0,212,200,0.08)] border border-[rgba(0,212,200,0.3)] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(0,212,200,0.15)] group-hover:shadow-[0_0_20px_rgba(0,212,200,0.2)]">{cap.icon}</div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-white mb-1 leading-tight">{cap.title}</h3>
                  <p className="text-[12px] text-accent font-semibold tracking-wide">{cap.subtitle}</p>
                </div>
              </div>
              <ul className="list-none mb-7 flex flex-col gap-2.5">
                {cap.features.map((f, j) => (
                  <li className="flex items-start gap-2.5 text-[13.5px] text-[#9ca3af] leading-relaxed" key={j}>
                    <span className="shrink-0 w-5 h-5 bg-[rgba(0,212,200,0.08)] rounded-full flex items-center justify-center mt-px">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="#00d4c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCTAClick(cap.type)} 
                className="bg-gradient-to-br from-accent to-accent-2 text-black text-[13px] font-bold py-2.5 px-[22px] rounded-lg font-sans w-full flex items-center justify-center transition-all duration-300 tracking-wide hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,212,200,0.4)]"
              >
                {cap.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;