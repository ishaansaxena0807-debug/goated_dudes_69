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
    <header className="sticky top-0 z-50 bg-[#0E1112]/90 backdrop-blur-md border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title */}
        <motion.a
          href="#top"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#90D0E5] rounded-sm"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#90D0E5] text-[#052B35] font-mono text-xs font-semibold tracking-tight">
            {PORTFOLIO_PROFILE.initials}
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-[#E6E8E9]">
            {PORTFOLIO_PROFILE.name}
          </span>
        </motion.a>

        {/* Zone 2: Navigation Links with Scroll-Synced Active Indicator */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.16 }}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#90D0E5] rounded-sm ${
                  isActive ? 'text-[#E6E8E9]' : 'text-[#B3BCC0] hover:text-[#E6E8E9]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#90D0E5]"
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.a
            href="#contact"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
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
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#181C1E] text-[#E6E8E9] border border-[#2B3236] hover:border-[#90D0E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
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
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[#90D0E5] via-[#ADE0F0] to-[#FAB981]"
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
            className="md:hidden overflow-hidden border-t border-[#2B3236] bg-[#14181A]"
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
                  className="py-2.5 text-sm font-medium text-[#B3BCC0] hover:text-[#90D0E5] border-b border-[#2B3236]/60 last:border-b-0 transition-colors"
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
                className="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors"
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
