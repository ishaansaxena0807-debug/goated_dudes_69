import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

interface IntroCurtainProps {
  visible: boolean;
  onComplete: () => void;
}

const STEPS = ['PERCEIVE', 'PLAN', 'ACT', 'LEARN'] as const;
const EXPO_EASE = [0.76, 0, 0.24, 1] as const;

export function IntroCurtain({ visible, onComplete }: IntroCurtainProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setActiveStep(0);
    setExiting(false);

    const stepTimers = [
      window.setTimeout(() => setActiveStep(1), 360),
      window.setTimeout(() => setActiveStep(2), 620),
      window.setTimeout(() => setActiveStep(3), 880),
      window.setTimeout(() => setExiting(true), 1320),
      window.setTimeout(() => onComplete(), 1880),
    ];

    return () => {
      stepTimers.forEach((id) => window.clearTimeout(id));
    };
  }, [visible, onComplete]);

  const handleSkip = () => {
    setExiting(true);
    window.setTimeout(() => onComplete(), 320);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Portfolio intro animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none"
        >
          {/* Upper Split Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: exiting ? '-100%' : '0%' }}
            transition={{ duration: 0.58, ease: EXPO_EASE }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#090B0C] border-b border-[#1E2528]"
          />

          {/* Lower Split Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: exiting ? '100%' : '0%' }}
            transition={{ duration: 0.58, ease: EXPO_EASE }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#090B0C] border-t border-[#1E2528]"
          />

          {/* Subtle Radial Ambient Glow */}
          <motion.div
            animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.15 : 1 }}
            transition={{ duration: 0.45, ease: EXPO_EASE }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[460px] h-[460px] rounded-full bg-[#90D0E5]/[0.08] blur-3xl" />
          </motion.div>

          {/* Architectural Corner Reticles */}
          <motion.div
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-6 sm:inset-10"
          >
            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#90D0E5]/45" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#90D0E5]/45" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#FAB981]/45" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FAB981]/45" />
          </motion.div>

          {/* Center Choreographed Stage */}
          <motion.div
            animate={{
              opacity: exiting ? 0 : 1,
              scale: exiting ? 0.96 : 1,
            }}
            transition={{ duration: 0.3, ease: EXPO_EASE }}
            className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Monogram Lockup */}
            <motion.div
              initial={{ scale: 0.72, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="w-14 h-14 rounded-xl bg-[#90D0E5] text-[#052B35] font-mono text-lg font-bold flex items-center justify-center shadow-[0_0_40px_rgba(144,208,229,0.28)]"
            >
              {PORTFOLIO_PROFILE.initials}
            </motion.div>

            {/* Masked Name Reveal */}
            <div className="mt-6 overflow-hidden">
              <motion.h2
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#E6E8E9]"
              >
                {PORTFOLIO_PROFILE.name.toUpperCase()}
              </motion.h2>
            </div>

            {/* Masked Role Subtitle */}
            <div className="mt-2.5 overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-[#90D0E5]"
              >
                Aspiring Agentic AI Developer
              </motion.p>
            </div>

            {/* Agentic Sequence Progress Bar & Steps */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.32 }}
              className="mt-8 w-full max-w-sm flex flex-col gap-3"
            >
              <div className="h-[2px] w-full bg-[#1F2427] overflow-hidden rounded-full">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.05, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full origin-left bg-gradient-to-r from-[#90D0E5] via-[#ADE0F0] to-[#FAB981]"
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest">
                {STEPS.map((step, idx) => {
                  const active = idx <= activeStep;
                  return (
                    <span
                      key={step}
                      className={`transition-colors duration-200 ${
                        idx === activeStep
                          ? 'text-[#FAB981] font-semibold'
                          : active
                          ? 'text-[#90D0E5]'
                          : 'text-[#4D575C]'
                      }`}
                    >
                      {step}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Skip Intro Control */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.25 }}
              onClick={handleSkip}
              className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#838E93] hover:text-[#E6E8E9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#90D0E5] rounded-sm"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
