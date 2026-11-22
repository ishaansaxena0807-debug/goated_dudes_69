import { Bot, Brain, Globe, GraduationCap, Terminal } from 'lucide-react';
import {
  ABOUT_COPY,
  CAPABILITIES,
  LEARNING_JOURNEY,
  STRENGTHS,
  type CapabilityItem,
} from '../data/portfolio';

function CapabilityIcon({ icon }: { icon: CapabilityItem['icon'] }) {
  const iconClass = 'w-5 h-5 text-[#90D0E5]';
  switch (icon) {
    case 'terminal':
      return <Terminal className={iconClass} aria-hidden="true" />;
    case 'bot':
      return <Bot className={iconClass} aria-hidden="true" />;
    case 'globe':
      return <Globe className={iconClass} aria-hidden="true" />;
    case 'brain':
      return <Brain className={iconClass} aria-hidden="true" />;
  }
}

export function AboutSection() {
  return (
    <section id="about" className="bg-[#14181A] border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col gap-14">
        {/* Top Editorial Split: Narrative + Education & Core Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
              Building strong engineering foundations through practical experimentation.
            </h2>
            <div className="flex flex-col gap-4 text-[#B3BCC0] leading-relaxed">
              <p className="text-base sm:text-lg text-[#E6E8E9]">{ABOUT_COPY.lead}</p>
              {ABOUT_COPY.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education Block */}
            <article className="mt-2 p-6 rounded-xl bg-[#181C1E] border border-[#2B3236] flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#90D0E5]">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  <span>Education</span>
                </div>
                <span className="font-mono text-xs text-[#FAB981] tabular-nums">
                  {ABOUT_COPY.education.period}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#E6E8E9] pt-1">
                {ABOUT_COPY.education.institution}
              </h3>
              <p className="text-sm text-[#B3BCC0]">{ABOUT_COPY.education.degree}</p>
              <p className="font-mono text-xs text-[#90D0E5]">
                Specialization: {ABOUT_COPY.education.specialization}
              </p>
            </article>
          </div>

          {/* What I Do 2x2 Grid */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#838E93]">
              Core Focus Areas
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {CAPABILITIES.map((cap) => (
                <article
                  key={cap.id}
                  className="h-full p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#123A46] flex items-center justify-center">
                    <CapabilityIcon icon={cap.icon} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-[#E6E8E9]">{cap.title}</h3>
                    <p className="text-sm text-[#B3BCC0] leading-relaxed">{cap.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Journey Strip */}
        <div className="pt-10 border-t border-[#2B3236] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
                Learning Journey
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[#E6E8E9]">
                From fundamentals to autonomous systems
              </h3>
            </div>
            <span className="font-mono text-xs text-[#838E93]">01 → 04 Progression</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEARNING_JOURNEY.map((item, idx) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] flex flex-col gap-2"
              >
                <span
                  className={`font-mono text-xs font-medium tabular-nums ${
                    idx === LEARNING_JOURNEY.length - 1 ? 'text-[#FAB981]' : 'text-[#90D0E5]'
                  }`}
                >
                  {item.step} — {item.title}
                </span>
                <p className="text-sm text-[#B3BCC0] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Strengths */}
        <div className="pt-10 border-t border-[#2B3236] flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
              Strengths & Approach
            </span>
            <h3 className="mt-1 font-display text-2xl font-semibold text-[#E6E8E9]">
              How I approach learning and engineering challenges
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRENGTHS.map((strength, idx) => (
              <div
                key={strength.title}
                className={`p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] flex flex-col gap-1.5 ${
                  idx === STRENGTHS.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <h4 className="text-base font-semibold text-[#E6E8E9]">{strength.title}</h4>
                <p className="text-sm text-[#B3BCC0] leading-relaxed">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
