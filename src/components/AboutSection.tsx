import { useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import { Bot, Brain, Globe, GraduationCap, Terminal } from 'lucide-react';
import {
  ABOUT_COPY,
  CAPABILITIES,
  LEARNING_JOURNEY,
  STRENGTHS,
  type CapabilityItem,
} from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const FADE_UP_ITEM: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const SCALE_UP_CARD: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
};

function CapabilityIcon({ icon }: { icon: CapabilityItem['icon'] }) {
  const iconClass = 'w-5 h-5 text-[#35D9FF]';
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
  const topRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);

  const topInView = useInView(topRef, { once: true, amount: 0.16 });
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.2 });
  const strengthsInView = useInView(strengthsRef, { once: true, amount: 0.18 });

  return (
    <section id="about" className="bg-dot-matrix border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-16">
        {/* Top Editorial Split triggered by IntersectionObserver */}
        <div
          ref={topRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Narrative Column */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={topInView ? 'visible' : 'hidden'}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            <motion.span
              variants={FADE_UP_ITEM}
              className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]"
            >
              01 — About &amp; Foundations
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={topInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="font-display text-3xl sm:text-4xl font-bold tracking-normal [word-spacing:0.1em] leading-[1.18] text-white"
              >
                Building engineering foundations through practical experimentation.
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4 text-[#B5BAC7] leading-[1.75] [word-spacing:0.06em]">
              <motion.p variants={FADE_UP_ITEM} className="text-base sm:text-lg text-[#F4F4F6]">
                {ABOUT_COPY.lead}
              </motion.p>
              {ABOUT_COPY.paragraphs.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={FADE_UP_ITEM}
                  className="text-sm sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Education Card */}
            <motion.article
              variants={SCALE_UP_CARD}
              whileHover={{ y: -4 }}
              className="mt-2 p-6 rounded-xl bg-[#101217] border border-white/[0.1] hover:border-[#8B5CF6]/55 transition-colors flex flex-col gap-2 shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#35D9FF]">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  <span>Education</span>
                </div>
                <span className="font-mono text-xs text-[#A78BFA] tabular-nums [word-spacing:0.12em]">
                  {ABOUT_COPY.education.period}
                </span>
              </div>
              <h3 className="text-xl font-bold [word-spacing:0.08em] text-white pt-1">
                {ABOUT_COPY.education.institution}
              </h3>
              <p className="text-sm sm:text-base text-[#B5BAC7] [word-spacing:0.06em]">
                {ABOUT_COPY.education.degree}
              </p>
              <p className="font-mono text-xs text-[#35D9FF] [word-spacing:0.1em]">
                Specialization: {ABOUT_COPY.education.specialization}
              </p>
            </motion.article>
          </motion.div>

          {/* Core Focus Areas 2x2 Grid */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={topInView ? 'visible' : 'hidden'}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            <motion.span
              variants={FADE_UP_ITEM}
              className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#9299AB]"
            >
              Core Focus Areas
            </motion.span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {CAPABILITIES.map((cap) => (
                <motion.article
                  key={cap.id}
                  variants={SCALE_UP_CARD}
                  whileHover={{ y: -5 }}
                  className="group h-full p-6 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-[#35D9FF]/50 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#35D9FF]/10 border border-[#35D9FF]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <CapabilityIcon icon={cap.icon} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-bold [word-spacing:0.08em] text-white group-hover:text-[#35D9FF] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-[#B5BAC7] leading-[1.7] [word-spacing:0.06em]">
                      {cap.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Journey Pipeline */}
        <div ref={journeyRef} className="pt-12 border-t border-white/[0.08] flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-2"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]">
                Engineering Pipeline
              </span>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold [word-spacing:0.1em] text-white">
                From fundamentals to autonomous systems
              </h3>
            </div>
            <span className="font-mono text-xs text-[#9299AB] tabular-nums [word-spacing:0.14em]">
              01 → 04 Progression
            </span>
          </motion.div>

          {/* Animated Track Line */}
          <div className="relative h-[2px] w-full bg-white/[0.08] overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={journeyInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              className="h-full w-full origin-left bg-gradient-to-r from-[#35D9FF] via-[#8CF4FF] to-[#8B5CF6]"
            />
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={journeyInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {LEARNING_JOURNEY.map((item, idx) => (
              <motion.div
                key={item.step}
                variants={FADE_UP_ITEM}
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col gap-2"
              >
                <span
                  className={`font-mono text-xs font-semibold tabular-nums [word-spacing:0.12em] ${
                    idx === LEARNING_JOURNEY.length - 1 ? 'text-[#A78BFA]' : 'text-[#35D9FF]'
                  }`}
                >
                  {item.step} — {item.title}
                </span>
                <p className="text-sm text-[#B5BAC7] leading-[1.7] [word-spacing:0.06em]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Strengths Stagger Wave */}
        <div ref={strengthsRef} className="pt-12 border-t border-white/[0.08] flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={strengthsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#A78BFA]">
              Strengths &amp; Approach
            </span>
            <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold [word-spacing:0.1em] text-white">
              How I approach learning and engineering challenges
            </h3>
          </motion.div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={strengthsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {STRENGTHS.map((strength, idx) => (
              <motion.div
                key={strength.title}
                variants={SCALE_UP_CARD}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-[#8B5CF6]/45 transition-colors flex flex-col gap-1.5 ${
                  idx === STRENGTHS.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <h4 className="text-lg font-bold [word-spacing:0.08em] text-white">
                  {strength.title}
                </h4>
                <p className="text-sm text-[#B5BAC7] leading-[1.7] [word-spacing:0.06em]">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
