import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Code2,
  Eye,
  RefreshCw,
  Route,
  X,
  Zap,
} from 'lucide-react';
import {
  ACHIEVEMENTS,
  AGENTIC_STAGES,
  CAREER_GOAL,
  type AchievementCategory,
  type AchievementItem,
  type AgenticStage,
} from '../data/portfolio';

type FilterTab = 'All' | AchievementCategory;

const FILTER_TABS: FilterTab[] = ['All', 'Certifications', 'Experience', 'Projects'];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function CategoryIcon({ category }: { category: AchievementCategory }) {
  switch (category) {
    case 'Certifications':
      return <Award className="w-4 h-4 text-[#FAB981]" aria-hidden="true" />;
    case 'Experience':
      return <Briefcase className="w-4 h-4 text-[#90D0E5]" aria-hidden="true" />;
    case 'Projects':
      return <Code2 className="w-4 h-4 text-[#90D0E5]" aria-hidden="true" />;
  }
}

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

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [pauseStageCycle, setPauseStageCycle] = useState(false);

  const filteredAchievements =
    activeFilter === 'All'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  useEffect(() => {
    if (pauseStageCycle) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % AGENTIC_STAGES.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [pauseStageCycle]);

  return (
    <>
      <section id="achievements" className="bg-[#0E1112] border-b border-[#2B3236]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col gap-10">
          {/* Header & Interactive Filter Controls with Shared-Layout Sliding Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
                Achievements & Projects
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
                Certifications, engineering work, and practical builds.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter achievements by category"
              className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#14181A] border border-[#2B3236]"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab)}
                    className={`relative px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] ${
                      isActive ? 'text-[#052B35]' : 'text-[#B3BCC0] hover:text-[#E6E8E9]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="achievement-filter-bg"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-[#90D0E5]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Layout-Animated Achievements Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  whileHover={{ y: -4 }}
                  className="group h-full rounded-xl bg-[#14181A] border border-[#2B3236] hover:border-[#90D0E5]/50 transition-colors flex flex-col justify-between p-6 gap-6"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B3BCC0]">
                        <CategoryIcon category={item.category} />
                        <span>{item.badgeLabel}</span>
                      </span>
                      <span className="font-mono text-xs text-[#838E93] tabular-nums">
                        {item.timeframe}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-semibold text-[#E6E8E9] group-hover:text-[#90D0E5] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#90D0E5]">
                        {item.organizationOrStack}
                      </p>
                      {item.location && (
                        <p className="font-mono text-[11px] text-[#838E93]">{item.location}</p>
                      )}
                    </div>

                    <p className="text-sm text-[#B3BCC0] leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-[#2B3236] flex flex-col gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                      {item.highlightHeading}
                    </span>
                    <ul className="flex flex-col gap-2">
                      {item.highlights.slice(0, 3).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#B3BCC0]"
                        >
                          <Check
                            className="w-4 h-4 text-[#90D0E5] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="mt-2 self-start inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#90D0E5] hover:text-[#ADE0F0] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] rounded-sm"
                    >
                      <span>Inspect details</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Agentic AI Architecture & Live Cycling Workflow */}
      <section id="agentic-ai" className="bg-[#112A33] border-b border-[#2B3236]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
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
            <div className="p-5 rounded-xl bg-[#0E1112] border border-[#2B3236]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FAB981]">
                Career Goal · {CAREER_GOAL.title}
              </span>
              <p className="mt-2 text-sm text-[#B3BCC0] leading-relaxed">
                {CAREER_GOAL.description}
              </p>
            </div>
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
                  animate={{ y: isActive ? -5 : 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
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

      {/* Spring-Animated Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="w-full max-w-xl rounded-2xl bg-[#14181A] border border-[#3D474C] p-6 sm:p-8 flex flex-col gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#90D0E5]">
                    <CategoryIcon category={selectedItem.category} />
                    <span>{selectedItem.badgeLabel}</span>
                    <span className="text-[#838E93]">·</span>
                    <span className="text-[#838E93] tabular-nums">{selectedItem.timeframe}</span>
                  </div>
                  <h3
                    id="achievement-modal-title"
                    className="text-2xl font-display font-semibold text-[#E6E8E9] pt-1"
                  >
                    {selectedItem.title}
                  </h3>
                  <p className="font-mono text-xs text-[#FAB981]">
                    {selectedItem.organizationOrStack}
                  </p>
                  {selectedItem.location && (
                    <p className="font-mono text-xs text-[#838E93]">{selectedItem.location}</p>
                  )}
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close details modal"
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-lg bg-[#181C1E] border border-[#2B3236] text-[#E6E8E9] hover:border-[#90D0E5] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </div>

              <p className="text-sm sm:text-base text-[#B3BCC0] leading-relaxed">
                {selectedItem.summary}
              </p>

              <div className="pt-4 border-t border-[#2B3236] flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#838E93]">
                  {selectedItem.highlightHeading}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {selectedItem.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#E6E8E9]">
                      <Check className="w-4 h-4 text-[#90D0E5] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
