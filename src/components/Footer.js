import React from 'react';

const footerLinks = {
  Product: ['Features', 'Roadmap', 'Changelog', 'API Docs'],
  Company: ['About Us', 'Team', 'Blog', 'Press', 'Business Partners'],
  Support: ['Help Center', 'Community', 'Privacy Policy', 'Terms of Service', 'GDPR'],
  Contact: [
    'hello@mindclinivital.com',
    '+92 370 549 4955',
    'Chakwal, Punjab',
    'Pakistan',
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-bg-secondary border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-12 py-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 text-[18px] font-extrabold text-white no-underline">
              <div className="flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#00d4c8" strokeWidth="2"/>
                  <path d="M8 14h3l2-5 3 10 2-7 2 2h2" stroke="#00d4c8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>MindClinic<span className="text-accent">Vital</span></span>
            </a>
            <p className="text-[13px] text-[#9ca3af] leading-[1.7] max-w-[260px]">
              Your AI companion for smarter, earlier, and more accurate health insights.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {/* Twitter/X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-card border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] transition-all duration-200 hover:text-accent hover:border-accent hover:bg-[rgba(0,212,200,0.08)] hover:-translate-y-0.5" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.907l4.264 5.637zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-card border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] transition-all duration-200 hover:text-accent hover:border-accent hover:bg-[rgba(0,212,200,0.08)] hover:-translate-y-0.5" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-card border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] transition-all duration-200 hover:text-accent hover:border-accent hover:bg-[rgba(0,212,200,0.08)] hover:-translate-y-0.5" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div className="flex flex-col gap-4" key={col}>
              <h4 className="text-[13px] font-bold text-white tracking-[0.5px] uppercase">{col}</h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {links.map((link, i) => (
                  <li key={i}><a href="#" className="text-[13px] text-[#9ca3af] no-underline transition-colors duration-200 hover:text-accent">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4 text-center sm:text-left">
          <p className="text-[13px] text-[#6b7280]">
            © 2025 MindClinicVital. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#9ca3af]">Privacy</a>
            <a href="#" className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#9ca3af]">Terms</a>
            <a href="#" className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#9ca3af]">Cookies</a>
            <a href="#" className="text-[13px] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#9ca3af]">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
