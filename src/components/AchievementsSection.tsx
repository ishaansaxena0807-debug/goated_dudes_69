import { useEffect, useState } from 'react';
import {
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

function StageIcon({ icon }: { icon: AgenticStage['icon'] }) {
  const cls = 'w-5 h-5 text-[#90D0E5]';
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              className="flex flex-wrap items-center gap-2"
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
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] ${
                      isActive
                        ? 'bg-[#90D0E5] text-[#052B35] border-[#90D0E5]'
                        : 'bg-[#181C1E] text-[#B3BCC0] border-[#2B3236] hover:text-[#E6E8E9] hover:border-[#3D474C]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {filteredAchievements.map((item) => (
              <article
                key={item.id}
                className="h-full rounded-xl bg-[#14181A] border border-[#2B3236] hover:border-[#3D474C] transition-colors flex flex-col justify-between p-6 gap-6"
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
                    <h3 className="text-lg font-semibold text-[#E6E8E9]">{item.title}</h3>
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
                        <Check className="w-4 h-4 text-[#90D0E5] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="mt-2 self-start font-mono text-xs font-medium text-[#90D0E5] hover:text-[#ADE0F0] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] rounded-sm"
                  >
                    Inspect details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic AI Architecture & Career Goal Band */}
      <section id="agentic-ai" className="bg-[#112A33] border-b border-[#2B3236]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
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
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AGENTIC_STAGES.map((stage) => (
              <div
                key={stage.stage}
                className="p-5 rounded-xl bg-[#0E1112] border border-[#2B3236] flex flex-col gap-3"
              >
                <StageIcon icon={stage.icon} />
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-[#E6E8E9]">{stage.stage}</span>
                  <span className="font-mono text-xs text-[#838E93]">{stage.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Lightbox / Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
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

              <button
                type="button"
                aria-label="Close details modal"
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-lg bg-[#181C1E] border border-[#2B3236] text-[#E6E8E9] hover:border-[#90D0E5] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
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
          </div>
        </div>
      )}
    </>
  );
}
