import { motion } from 'motion/react';
import { Bot, Brain, Globe, GraduationCap, Terminal } from 'lucide-react';
import {
  ABOUT_COPY,
  CAPABILITIES,
  LEARNING_JOURNEY,
  STRENGTHS,
  type CapabilityItem,
} from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.16 } as const;

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
        {/* Top Editorial Split: Masked Slide-Up Narrative + Diagonal Capability Cascade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]"
            >
              About Me
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]"
              >
                Building strong engineering foundations through practical experimentation.
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4 text-[#B3BCC0] leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT }}
                className="text-base sm:text-lg text-[#E6E8E9]"
              >
                {ABOUT_COPY.lead}
              </motion.p>
              {ABOUT_COPY.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.45, delay: 0.14 + idx * 0.07, ease: EASE_OUT }}
                  className="text-sm sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Education Card with Slide-Up + Scale Reveal */}
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
              whileHover={{ y: -4 }}
              className="mt-2 p-6 rounded-xl bg-[#181C1E] border border-[#2B3236] hover:border-[#90D0E5]/50 transition-colors flex flex-col gap-2"
            >
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
            </motion.article>
          </div>

          {/* What I Do 2x2 Grid */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="font-mono text-xs uppercase tracking-widest text-[#838E93]"
            >
              Core Focus Areas
            </motion.span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {CAPABILITIES.map((cap, idx) => (
                <motion.article
                  key={cap.id}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.48, delay: 0.08 + idx * 0.09, ease: EASE_OUT }}
                  whileHover={{ y: -5 }}
                  className="group h-full p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] hover:border-[#90D0E5]/50 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#123A46] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <CapabilityIcon icon={cap.icon} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-[#E6E8E9] group-hover:text-[#90D0E5] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-[#B3BCC0] leading-relaxed">{cap.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Journey with Animated Progress Track */}
        <div className="pt-10 border-t border-[#2B3236] flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-2"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
                Learning Journey
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[#E6E8E9]">
                From fundamentals to autonomous systems
              </h3>
            </div>
            <span className="font-mono text-xs text-[#838E93]">01 → 04 Progression</span>
          </motion.div>

          {/* Animated Track Line */}
          <div className="relative h-[2px] w-full bg-[#2B3236] overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              className="h-full w-full origin-left bg-gradient-to-r from-[#90D0E5] via-[#90D0E5] to-[#FAB981]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEARNING_JOURNEY.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.45, delay: 0.12 + idx * 0.1, ease: EASE_OUT }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] hover:border-[#3D474C] transition-colors flex flex-col gap-2"
              >
                <span
                  className={`font-mono text-xs font-medium tabular-nums ${
                    idx === LEARNING_JOURNEY.length - 1 ? 'text-[#FAB981]' : 'text-[#90D0E5]'
                  }`}
                >
                  {item.step} — {item.title}
                </span>
                <p className="text-sm text-[#B3BCC0] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Strengths Stagger Wave */}
        <div className="pt-10 border-t border-[#2B3236] flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
              Strengths & Approach
            </span>
            <h3 className="mt-1 font-display text-2xl font-semibold text-[#E6E8E9]">
              How I approach learning and engineering challenges
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRENGTHS.map((strength, idx) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.42, delay: idx * 0.08, ease: EASE_OUT }}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-xl bg-[#181C1E] border border-[#2B3236] hover:border-[#90D0E5]/40 transition-colors flex flex-col gap-1.5 ${
                  idx === STRENGTHS.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <h4 className="text-base font-semibold text-[#E6E8E9]">{strength.title}</h4>
                <p className="text-sm text-[#B3BCC0] leading-relaxed">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
