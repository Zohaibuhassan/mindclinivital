import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080c18]/98 shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-[#0a0e1e]/85 backdrop-blur-md border-b border-white/5 py-3.5'}`}>
      <div className="container mx-auto px-6 flex items-center">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 no-underline shrink-0">
          <div className="flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" fill="url(#logoGrad)" opacity="0.15"/>
              <circle cx="15" cy="15" r="14" stroke="url(#logoGrad)" strokeWidth="1.5"/>
              <path d="M7 15h4l2-5 3 10 2-7 2 2h3" stroke="#00d4c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="30" y2="30">
                  <stop offset="0%" stopColor="#00d4c8"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[17px] font-extrabold text-white tracking-tight whitespace-nowrap">MindClini<span className="text-accent">Vital</span></span>
        </a>

        {/* Center Nav Links */}
        <ul className={`lg:flex lg:items-center lg:gap-9 lg:mx-auto lg:p-0 list-none ${menuOpen ? 'fixed top-[62px] left-0 right-0 bg-[#080c18]/98 backdrop-blur-xl flex-col p-6 gap-5 border-b border-white/5 opacity-100 pointer-events-auto' : 'hidden opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
          <li><a href="#home" className="text-[14px] font-medium text-[#c9d1e3] transition-colors duration-200 hover:text-white relative group" onClick={() => setMenuOpen(false)}>Home<span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100"></span></a></li>
          <li><a href="#capabilities" className="text-[14px] font-medium text-[#c9d1e3] transition-colors duration-200 hover:text-white relative group" onClick={() => setMenuOpen(false)}>Services<span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100"></span></a></li>
          <li><a href="#about" className="text-[14px] font-medium text-[#c9d1e3] transition-colors duration-200 hover:text-white relative group" onClick={() => setMenuOpen(false)}>About<span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100"></span></a></li>
          <li><a href="#contact" className="text-[14px] font-medium text-[#c9d1e3] transition-colors duration-200 hover:text-white relative group" onClick={() => setMenuOpen(false)}>Contact<span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100"></span></a></li>
        </ul>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 ml-auto">
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 text-[#9ca3af] rounded-md transition-all duration-200 hover:text-white hover:bg-white/10" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 text-[#9ca3af] rounded-md transition-all duration-200 hover:text-white hover:bg-white/10" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </a>
          {/* Language */}
          <button className="bg-white/5 border border-white/10 text-[#c9d1e3] text-[12px] font-bold px-2.5 py-1.5 rounded-md font-sans tracking-wide transition-all duration-200 hover:bg-white/10 hover:text-white">EN</button>
          {/* Sign In */}
          <button className="bg-transparent border border-white/20 text-white text-[13px] font-semibold px-4.5 py-2 rounded-lg font-sans transition-all duration-200 hover:bg-white/5 hover:border-white/30">Sign In</button>
          {/* Sign Up */}
          <button className="bg-gradient-to-br from-accent to-accent-2 text-black text-[13px] font-bold px-5 py-2 rounded-lg font-sans tracking-wide transition-all duration-250 hover:opacity-90 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,212,200,0.35)]">Sign Up</button>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 ml-3"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${menuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${menuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
