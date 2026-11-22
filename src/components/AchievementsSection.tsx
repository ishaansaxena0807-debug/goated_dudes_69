import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowRight, Award, Briefcase, Check, Code2, X } from 'lucide-react';
import {
  ACHIEVEMENTS,
  type AchievementCategory,
  type AchievementItem,
} from '../data/portfolio';

type FilterTab = 'All' | AchievementCategory;

const FILTER_TABS: FilterTab[] = ['All', 'Certifications', 'Experience', 'Projects'];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function CategoryIcon({ category }: { category: AchievementCategory }) {
  switch (category) {
    case 'Certifications':
      return <Award className="w-4 h-4 text-[#A78BFA]" aria-hidden="true" />;
    case 'Experience':
      return <Briefcase className="w-4 h-4 text-[#35D9FF]" aria-hidden="true" />;
    case 'Projects':
      return <Code2 className="w-4 h-4 text-[#35D9FF]" aria-hidden="true" />;
  }
}

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.25 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.12 });

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

  return (
    <>
      <section id="achievements" className="bg-[#060608] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">
          {/* Header & Interactive Filter Controls */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]">
                02 — Achievements &amp; Projects
              </span>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  animate={headerInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="font-display text-3xl sm:text-4xl font-bold tracking-normal [word-spacing:0.1em] leading-[1.18] text-white"
                >
                  Certifications, engineering work, and practical builds.
                </motion.h2>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Filter achievements by category"
              className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#101217] border border-white/[0.1]"
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
                    className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium tracking-[0.02em] [word-spacing:0.1em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF] ${
                      isActive ? 'text-[#060608]' : 'text-[#A3A8B5] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="achievement-filter-bg"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-white"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Layout-Animated Achievements Grid triggered by IntersectionObserver */}
          <motion.div
            ref={gridRef}
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item, idx) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={
                    gridInView
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.94, y: 24 }
                  }
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 3) * 0.08,
                    ease: EASE_OUT,
                  }}
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-xl bg-[#101217] border border-white/[0.08] hover:border-[#35D9FF]/50 transition-colors flex flex-col justify-between p-6 gap-6 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] [word-spacing:0.14em] text-[#A3A8B5]">
                        <CategoryIcon category={item.category} />
                        <span>{item.badgeLabel}</span>
                      </span>
                      <span className="font-mono text-xs text-[#9299AB] tabular-nums [word-spacing:0.12em]">
                        {item.timeframe}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-bold [word-spacing:0.08em] text-white group-hover:text-[#35D9FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#A78BFA] [word-spacing:0.1em]">
                        {item.organizationOrStack}
                      </p>
                      {item.location && (
                        <p className="font-mono text-[11px] text-[#9299AB] [word-spacing:0.1em]">
                          {item.location}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#B5BAC7] leading-[1.7] [word-spacing:0.06em]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                      {item.highlightHeading}
                    </span>
                    <ul className="flex flex-col gap-2">
                      {item.highlights.slice(0, 3).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#B5BAC7] leading-[1.6] [word-spacing:0.06em]"
                        >
                          <Check
                            className="w-4 h-4 text-[#35D9FF] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="mt-2 self-start inline-flex items-center gap-1.5 font-mono text-xs font-semibold [word-spacing:0.12em] text-white hover:text-[#35D9FF] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF] rounded-sm"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="w-full max-w-xl rounded-2xl bg-[#101217] border border-white/[0.16] p-6 sm:p-8 flex flex-col gap-5 shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] [word-spacing:0.14em] text-[#35D9FF]">
                    <CategoryIcon category={selectedItem.category} />
                    <span>{selectedItem.badgeLabel}</span>
                    <span className="text-[#9299AB]">·</span>
                    <span className="text-[#9299AB] tabular-nums">{selectedItem.timeframe}</span>
                  </div>
                  <h3
                    id="achievement-modal-title"
                    className="text-2xl font-display font-bold [word-spacing:0.1em] text-white pt-1"
                  >
                    {selectedItem.title}
                  </h3>
                  <p className="font-mono text-xs text-[#A78BFA] [word-spacing:0.1em]">
                    {selectedItem.organizationOrStack}
                  </p>
                  {selectedItem.location && (
                    <p className="font-mono text-xs text-[#9299AB] [word-spacing:0.1em]">
                      {selectedItem.location}
                    </p>
                  )}
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close details modal"
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-lg bg-[#161922] border border-white/[0.12] text-white hover:border-[#35D9FF] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </div>

              <p className="text-sm sm:text-base text-[#B5BAC7] leading-[1.75] [word-spacing:0.06em]">
                {selectedItem.summary}
              </p>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                  {selectedItem.highlightHeading}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {selectedItem.highlights.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + idx * 0.05, duration: 0.22 }}
                      className="flex items-start gap-2.5 text-sm text-[#F4F4F6] [word-spacing:0.06em]"
                    >
                      <Check
                        className="w-4 h-4 text-[#35D9FF] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </motion.li>
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
