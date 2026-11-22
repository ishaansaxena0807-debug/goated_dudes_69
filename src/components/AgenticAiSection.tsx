import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
    isActive ? 'text-[#90D0E5]' : 'text-[#838E93]'
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

  useEffect(() => {
    if (pauseStageCycle) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % AGENTIC_STAGES.length);
    }, 2100);
    return () => window.clearInterval(timer);
  }, [pauseStageCycle]);

  return (
    <section id="agentic-ai" className="bg-[#112A33] border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
            Agentic AI Focus
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
            Exploring the Future of Intelligent Systems
          </h2>
          <p className="text-base text-[#D2DFE4] leading-relaxed">
            Agentic AI focuses on systems that can understand goals, plan structured steps, use
            tools, and take actions to accomplish real-world tasks reliably.
          </p>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 360, damping: 25 }}
            className="p-5 rounded-xl bg-[#0E1112] border border-[#2B3236] hover:border-[#FAB981]/50 transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-[#FAB981]">
              Career Goal · {CAREER_GOAL.title}
            </span>
            <p className="mt-2 text-sm text-[#B3BCC0] leading-relaxed">
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
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
                whileInView={{ opacity: 1, y: isActive ? -6 : 0 }}
                viewport={{ once: true, amount: 0.2 }}
                animate={{ y: isActive ? -6 : 0 }}
                whileHover={{ y: -5 }}
                transition={{
                  opacity: { duration: 0.45, delay: idx * 0.08, ease: EASE_OUT },
                  y: { type: 'spring', stiffness: 340, damping: 24 },
                }}
                className={`relative text-left p-5 rounded-xl bg-[#0E1112] border transition-colors flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] ${
                  isActive
                    ? 'border-[#90D0E5]'
                    : 'border-[#2B3236] hover:border-[#3D474C]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="agentic-active-bar"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-x-4 top-0 h-[2px] bg-[#90D0E5]"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-between">
                  <StageIcon icon={stage.icon} isActive={isActive} />
                  <span className="font-mono text-[11px] text-[#838E93] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-base font-semibold transition-colors ${
                      isActive ? 'text-[#90D0E5]' : 'text-[#E6E8E9]'
                    }`}
                  >
                    {stage.stage}
                  </span>
                  <span className="font-mono text-xs text-[#838E93]">{stage.caption}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
