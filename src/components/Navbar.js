import React, { useState, useEffect, useRef } from 'react';
import { UserCircle, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const user = auth.currentUser;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080c18]/98 shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-[#0a0e1e]/85 backdrop-blur-md border-b border-white/5 py-3.5'}`}>
      <div className="container mx-auto px-6 flex items-center relative">

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
        <div className="hidden lg:flex items-center gap-4 shrink-0 ml-auto relative" ref={profileRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center justify-center text-[#c9d1e3] transition-all duration-200 hover:text-[#00d4c8] hover:scale-105" 
            aria-label="Account"
          >
            <UserCircle className="w-8 h-8" strokeWidth={1.5} />
          </button>

          {/* Account Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-4 w-64 bg-[rgba(20,25,40,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 shadow-2xl z-50 origin-top-right"
              >
                <div className="flex flex-col items-center pb-4 border-b border-[rgba(255,255,255,0.1)]">
                  <div className="w-12 h-12 bg-gradient-to-tr from-[rgba(0,212,200,0.2)] to-[rgba(10,132,255,0.2)] rounded-full flex items-center justify-center mb-3">
                    <User className="w-6 h-6 text-[#00d4c8]" />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] truncate w-full text-center">
                    {user?.displayName || 'Wellness User'}
                  </h3>
                  <p className="text-gray-400 text-[13px] truncate w-full text-center">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-300 hover:bg-[rgba(255,59,48,0.1)] hover:text-[#ff453a] transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
