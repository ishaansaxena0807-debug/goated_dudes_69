import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
      return <Award className="w-4 h-4 text-[#FAB981]" aria-hidden="true" />;
    case 'Experience':
      return <Briefcase className="w-4 h-4 text-[#90D0E5]" aria-hidden="true" />;
    case 'Projects':
      return <Code2 className="w-4 h-4 text-[#90D0E5]" aria-hidden="true" />;
  }
}

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

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
      <section id="achievements" className="bg-[#0E1112] border-b border-[#2B3236]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col gap-10">
          {/* Header & Interactive Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
                Achievements & Projects
              </span>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]"
                >
                  Certifications, engineering work, and practical builds.
                </motion.h2>
              </div>
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

          {/* Layout-Animated Achievements Grid with Staggered Scroll Entrance */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item, idx) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{
                    duration: 0.42,
                    delay: (idx % 3) * 0.08,
                    ease: EASE_OUT,
                  }}
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-xl bg-[#14181A] border border-[#2B3236] hover:border-[#90D0E5]/60 transition-colors flex flex-col justify-between p-6 gap-6"
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
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
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
                  {selectedItem.highlights.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + idx * 0.05, duration: 0.22 }}
                      className="flex items-start gap-2.5 text-sm text-[#E6E8E9]"
                    >
                      <Check className="w-4 h-4 text-[#90D0E5] shrink-0 mt-0.5" aria-hidden="true" />
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
