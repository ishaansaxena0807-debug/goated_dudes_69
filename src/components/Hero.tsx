import { useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { HERO_ANCHORS, PORTFOLIO_PROFILE } from '../data/portfolio';

const MARQUEE_PHRASES = [
  'Aspiring Agentic AI Developer',
  'B.Tech CSE (AI & ML)',
  'GLA University',
  "Let's Cook Community – The Foundry",
  'Python · Java · C# · JavaScript',
  'Perceive → Plan → Act → Learn',
];

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xRatio);
    mouseY.set(yRatio);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative bg-[#0E1112] border-b border-[#2B3236] overflow-hidden">
      {/* Subtle drifting ambient backdrop */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 28, -14, 0],
          y: [0, -18, 12, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 right-[8%] w-96 h-96 rounded-full bg-[#90D0E5]/[0.06] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -24, 18, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-10 left-[4%] w-80 h-80 rounded-full bg-[#FAB981]/[0.05] blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Typographic Column with Intro-Synced Staggered Entrance */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.45, ease: HERO_EASE }}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FAB981]"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{PORTFOLIO_PROFILE.location} · GLA University</span>
            </motion.div>

            <div className="flex flex-col gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, delay: 0.08, ease: HERO_EASE }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#E6E8E9] leading-[1.08]"
              >
                {PORTFOLIO_PROFILE.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.16, ease: HERO_EASE }}
                className="text-lg sm:text-xl font-medium text-[#90D0E5]"
              >
                {PORTFOLIO_PROFILE.headline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, delay: 0.22, ease: HERO_EASE }}
                className="font-mono text-xs sm:text-sm text-[#B3BCC0] tracking-tight"
              >
                {PORTFOLIO_PROFILE.roleLine}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.28, ease: HERO_EASE }}
              className="text-base text-[#B3BCC0] leading-relaxed max-w-2xl"
            >
              {PORTFOLIO_PROFILE.heroSummary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.34, ease: HERO_EASE }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <motion.a
                href="#achievements"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <span>View Achievements</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#181C1E] text-[#E6E8E9] border border-[#2B3236] text-sm font-semibold hover:border-[#90D0E5] hover:text-[#90D0E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <span>Connect With Me</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Portrait Media Frame with 3D Interactive Tilt + Gentle Float */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.65, delay: 0.14, ease: HERO_EASE }}
            style={{ perspective: 1000 }}
            className="lg:col-span-5"
          >
            <motion.figure
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
              className="rounded-2xl bg-[#14181A] border border-[#2B3236] hover:border-[#3D474C] transition-colors p-3 sm:p-4 flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[4/4.3] rounded-xl overflow-hidden bg-[#181C1E] border border-[#2B3236]/80">
                {!imageError ? (
                  <img
                    src={PORTFOLIO_PROFILE.portraitPath}
                    alt={PORTFOLIO_PROFILE.portraitAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
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
            </motion.figure>
          </motion.div>
        </div>

        {/* Full-Width Key Anchors Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.4, ease: HERO_EASE }}
          className="mt-12 pt-8 border-t border-[#2B3236] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {HERO_ANCHORS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.44 + idx * 0.06, ease: HERO_EASE }}
              whileHover={{ x: 3 }}
              className="flex flex-col gap-1 transition-colors"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                {item.label}
              </span>
              <span className="text-sm font-medium text-[#E6E8E9]">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Kinetic Section Divider Marquee */}
      <div
        aria-hidden="true"
        className="marquee-wrapper border-t border-[#2B3236] bg-[#14181A] py-3 overflow-hidden select-none"
      >
        <div className="animate-marquee">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center shrink-0">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <div key={`${loopIndex}-${idx}`} className="flex items-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#838E93] px-5 whitespace-nowrap">
                    {phrase}
                  </span>
                  <span className="text-[#90D0E5]/70 font-mono text-xs">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
