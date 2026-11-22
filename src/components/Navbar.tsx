import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'agentic-ai', label: 'Agentic AI', href: '#agentic-ai' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#060608]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <motion.a
          href="#top"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="font-display text-xl font-bold tracking-normal [word-spacing:0.1em] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35D9FF] rounded-sm"
        >
          {PORTFOLIO_PROFILE.name}
        </motion.a>

        {/* Zone 2: 5 Concise Single-Line Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.16 }}
                className={`relative py-1 text-[15px] font-medium tracking-[0.015em] [word-spacing:0.08em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35D9FF] rounded-sm ${
                  isActive ? 'text-white' : 'text-[#A3A8B5] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-gradient-to-r from-[#35D9FF] to-[#8B5CF6]"
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#060608] text-sm font-bold tracking-[0.01em] [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
          >
            Get in Touch
          </motion.a>

          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#101217] text-white border border-white/[0.12] hover:border-[#35D9FF] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Scroll-linked Progress Hairline */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[#35D9FF] via-[#8CF4FF] to-[#8B5CF6]"
        aria-hidden="true"
      />

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#0A0B0E]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-base font-medium [word-spacing:0.08em] text-[#A3A8B5] hover:text-[#35D9FF] border-b border-white/[0.06] last:border-b-0 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-[#060608] text-sm font-bold [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
