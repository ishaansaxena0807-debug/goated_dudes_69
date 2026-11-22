import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Eye, MessageSquare, RefreshCw, Route, Zap } from 'lucide-react';
import { AGENTIC_STAGES, CAREER_GOAL, type AgenticStage } from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function StageIcon({
  icon,
  isActive,
}: {
  icon: AgenticStage['icon'];
  isActive: boolean;
}) {
  const cls = `w-5 h-5 transition-colors duration-300 ${
    isActive ? 'text-[#35D9FF]' : 'text-[#9299AB]'
  }`;
  switch (icon) {
    case 'eye':
      return <Eye className={cls} aria-hidden="true" />;
    case 'route':
      return <Route className={cls} aria-hidden="true" />;
    case 'zap':
      return <Zap className={cls} aria-hidden="true" />;
    case 'refresh':
      return <RefreshCw className={cls} aria-hidden="true" />;
  }
}

interface AgenticAiSectionProps {
  onOpenChat?: () => void;
}

export function AgenticAiSection({ onOpenChat }: AgenticAiSectionProps) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [pauseStageCycle, setPauseStageCycle] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (pauseStageCycle) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % AGENTIC_STAGES.length);
    }, 2100);
    return () => window.clearInterval(timer);
  }, [pauseStageCycle]);

  return (
    <section
      id="agentic-ai"
      className="relative bg-[#0A0B0E] border-b border-white/[0.08] overflow-hidden isolate"
    >
      {/* Ambient Violet & Cyan Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_50%,rgba(139,92,246,0.12)_0%,rgba(53,217,255,0.06)_45%,transparent_75%)]"
      />

      <div
        ref={sectionRef}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#A78BFA]">
            03 — Agentic AI Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-normal [word-spacing:0.1em] leading-[1.18] text-white">
            Exploring the Future of Intelligent Systems
          </h2>
          <p className="text-base text-[#B5BAC7] leading-[1.75] [word-spacing:0.06em]">
            Agentic AI focuses on systems that can understand goals, plan structured steps, use
            tools, and take actions to accomplish real-world tasks reliably.
          </p>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 360, damping: 25 }}
            className="p-5 rounded-xl bg-[#101217] border border-white/[0.1] hover:border-[#8B5CF6]/55 transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#35D9FF]">
              Career Goal · {CAREER_GOAL.title}
            </span>
            <p className="mt-2 text-sm text-[#B5BAC7] leading-[1.7] [word-spacing:0.06em]">
              {CAREER_GOAL.description}
            </p>
          </motion.div>

          {onOpenChat && (
            <div>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#060608] text-sm font-bold [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors shadow-[0_6px_24px_rgba(255,255,255,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Ask Portfolio AI Assistant</span>
              </motion.button>
            </div>
          )}
        </motion.div>

        <div
          className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
          onMouseEnter={() => setPauseStageCycle(true)}
          onMouseLeave={() => setPauseStageCycle(false)}
        >
          {AGENTIC_STAGES.map((stage, idx) => {
            const isActive = activeStageIdx === idx;
            return (
              <motion.button
                key={stage.stage}
                type="button"
                onClick={() => setActiveStageIdx(idx)}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  inView
                    ? { opacity: 1, y: isActive ? -6 : 0 }
                    : { opacity: 0, y: 24 }
                }
                whileHover={{ y: -5 }}
                transition={{
                  opacity: { duration: 0.45, delay: idx * 0.08, ease: EASE_OUT },
                  y: { type: 'spring', stiffness: 340, damping: 24 },
                }}
                className={`relative text-left p-5 rounded-xl bg-[#101217] border transition-colors flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF] ${
                  isActive
                    ? 'border-[#35D9FF] shadow-[0_0_24px_rgba(53,217,255,0.14)]'
                    : 'border-white/[0.08] hover:border-white/[0.22]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="agentic-active-bar"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-[#35D9FF] to-[#8B5CF6]"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-between">
                  <StageIcon icon={stage.icon} isActive={isActive} />
                  <span className="font-mono text-[11px] text-[#9299AB] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`font-display text-lg font-bold transition-colors ${
                      isActive ? 'text-[#35D9FF]' : 'text-white'
                    }`}
                  >
                    {stage.stage}
                  </span>
                  <span className="font-mono text-xs text-[#9299AB] [word-spacing:0.1em]">
                    {stage.caption}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
