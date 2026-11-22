import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Agentic AI', href: '#agentic-ai' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0E1112]/90 backdrop-blur-md border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title */}
        <a
          href="#top"
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#90D0E5] rounded-sm"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#90D0E5] text-[#052B35] font-mono text-xs font-semibold tracking-tight">
            {PORTFOLIO_PROFILE.initials}
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-[#E6E8E9]">
            {PORTFOLIO_PROFILE.name}
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-[#B3BCC0] hover:text-[#E6E8E9] transition-colors whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#90D0E5] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#90D0E5] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
          >
            Get in Touch
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#181C1E] text-[#E6E8E9] border border-[#2B3236] hover:border-[#90D0E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#2B3236] bg-[#14181A] px-6 py-4"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-[#B3BCC0] hover:text-[#90D0E5] border-b border-[#2B3236]/60 last:border-b-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
