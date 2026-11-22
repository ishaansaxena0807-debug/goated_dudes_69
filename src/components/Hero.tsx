import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { HERO_ANCHORS, PORTFOLIO_PROFILE } from '../data/portfolio';

export function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="bg-[#0E1112] border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Typographic Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FAB981]">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{PORTFOLIO_PROFILE.location} · GLA University</span>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#E6E8E9] leading-[1.08]">
                {PORTFOLIO_PROFILE.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#90D0E5]">
                {PORTFOLIO_PROFILE.headline}
              </p>
              <p className="font-mono text-xs sm:text-sm text-[#B3BCC0] tracking-tight">
                {PORTFOLIO_PROFILE.roleLine}
              </p>
            </div>

            <p className="text-base text-[#B3BCC0] leading-relaxed max-w-2xl">
              {PORTFOLIO_PROFILE.heroSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#achievements"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <span>View Achievements</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#181C1E] text-[#E6E8E9] border border-[#2B3236] text-sm font-semibold hover:border-[#90D0E5] hover:text-[#90D0E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <span>Connect With Me</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Portrait Media Frame */}
          <div className="lg:col-span-5">
            <figure className="rounded-2xl bg-[#14181A] border border-[#2B3236] p-3 sm:p-4 flex flex-col gap-3">
              <div className="relative w-full aspect-[4/4.3] rounded-xl overflow-hidden bg-[#181C1E] border border-[#2B3236]/80">
                {!imageError ? (
                  <img
                    src={PORTFOLIO_PROFILE.portraitPath}
                    alt={PORTFOLIO_PROFILE.portraitAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#181C1E] text-[#B3BCC0] p-6 text-center">
                    <span className="font-mono text-2xl font-semibold text-[#90D0E5]">
                      {PORTFOLIO_PROFILE.initials}
                    </span>
                    <span className="text-sm font-medium text-[#E6E8E9]">
                      {PORTFOLIO_PROFILE.name}
                    </span>
                    <span className="font-mono text-xs text-[#838E93]">
                      {PORTFOLIO_PROFILE.headline}
                    </span>
                  </div>
                )}
              </div>

              <figcaption className="flex items-center justify-between gap-3 px-1 pt-0.5">
                <span className="font-mono text-xs text-[#B3BCC0]">
                  {PORTFOLIO_PROFILE.portraitCaption}
                </span>
                <span className="font-mono text-xs text-[#90D0E5] tabular-nums">
                  {PORTFOLIO_PROFILE.portraitMeta}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width Key Anchors Row below split */}
        <div className="mt-12 pt-8 border-t border-[#2B3236] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_ANCHORS.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                {item.label}
              </span>
              <span className="text-sm font-medium text-[#E6E8E9]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
