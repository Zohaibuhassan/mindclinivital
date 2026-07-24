import React from 'react';

const contacts = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke="#00d4c8" strokeWidth="1.6"/>
        <path d="M3 9l11 8 11-8" stroke="#00d4c8" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email Us',
    value: 'hello@mindclinivital.com',
    sub: 'We respond within 24 hours',
    href: 'mailto:hello@mindclinivital.com',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 4h4l2 5-2.5 1.5c1 2 3 4 5 5L18 13l5 2v4c0 1.1-.9 2-2 2C9 21 7 9 8 4z" stroke="#00d4c8" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Call Us',
    value: '+92 370 549 4955',
    sub: 'Mon–Fri, 9am–6pm PKT',
    href: 'tel:+923705494955',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C9.6 3 6 6.6 6 11c0 5.3 8 14 8 14s8-8.7 8-14c0-4.4-3.6-8-8-8z" stroke="#00d4c8" strokeWidth="1.6"/>
        <circle cx="14" cy="11" r="3" stroke="#00d4c8" strokeWidth="1.4"/>
      </svg>
    ),
    label: 'Find Our Offices',
    value: 'Chakwal, Punjab, Pakistan',
    sub: 'Visit us by appointment',
    href: '#contact',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative bg-bg-primary overflow-hidden py-[70px] md:py-[100px]">
      <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,212,200,0.06)_0%,transparent_70%)] bottom-0 left-0 blur-[60px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[rgba(0,212,200,0.15)] border border-[rgba(0,212,200,0.3)] text-accent text-[12px] font-semibold py-1.5 px-4 rounded-full mb-5 tracking-wide uppercase">📬 Reach Out</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] mb-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-[15px] text-[#9ca3af] max-w-[580px] leading-[1.7] mx-auto">
            Ready to transform your health journey? We'd love to hear from you.
            Reach out and our team will respond promptly.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contacts.map((c, i) => (
            <a className="flex flex-col items-center text-center bg-bg-card border border-white/10 rounded-[20px] py-9 px-6 gap-2.5 no-underline transition-all duration-300 group hover:border-accent hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,212,200,0.1)]" href={c.href} key={i}>
              <div className="w-16 h-16 bg-[rgba(0,212,200,0.08)] border border-[rgba(0,212,200,0.3)] rounded-[18px] flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-[rgba(0,212,200,0.15)] group-hover:shadow-[0_0_24px_rgba(0,212,200,0.25)]">{c.icon}</div>
              <div className="text-[12px] font-bold text-accent tracking-[1px] uppercase">{c.label}</div>
              <div className="text-[16px] font-bold text-white">{c.value}</div>
              <div className="text-[12px] text-[#6b7280]">{c.sub}</div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-[720px] mx-auto bg-bg-card border border-white/10 rounded-[24px] p-7 px-5 md:p-12">
          <h3 className="text-[22px] font-bold mb-8 text-center">Send Us a Message</h3>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#9ca3af]" htmlFor="name">Full Name</label>
                <input className="bg-bg-secondary border border-white/10 rounded-[10px] py-[13px] px-4 text-[14px] text-white font-sans outline-none transition-all duration-200 placeholder-[#6b7280] focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,200,0.1)]" id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#9ca3af]" htmlFor="email">Email Address</label>
                <input className="bg-bg-secondary border border-white/10 rounded-[10px] py-[13px] px-4 text-[14px] text-white font-sans outline-none transition-all duration-200 placeholder-[#6b7280] focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,200,0.1)]" id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#9ca3af]" htmlFor="subject">Subject</label>
              <input className="bg-bg-secondary border border-white/10 rounded-[10px] py-[13px] px-4 text-[14px] text-white font-sans outline-none transition-all duration-200 placeholder-[#6b7280] focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,200,0.1)]" id="subject" type="text" placeholder="How can we help?" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#9ca3af]" htmlFor="message">Message</label>
              <textarea className="bg-bg-secondary border border-white/10 rounded-[10px] py-[13px] px-4 text-[14px] text-white font-sans outline-none transition-all duration-200 placeholder-[#6b7280] focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,200,0.1)] resize-y min-h-[120px]" id="message" rows="5" placeholder="Tell us more about your needs..." />
            </div>
            <button type="submit" className="bg-gradient-to-br from-accent to-accent-2 text-black text-[15px] font-bold py-3.5 px-8 rounded-lg font-sans w-full max-w-[200px] self-center flex items-center justify-center gap-2 mt-2 transition-all duration-300 tracking-wide hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,212,200,0.4)]">
              Send Message
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l10 0M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
