import { useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { HERO_ANCHORS, PORTFOLIO_PROFILE } from '../data/portfolio';

const MARQUEE_PHRASES = [
  'Aspiring Agentic AI Developer',
  'B.Tech CSE (AI & ML)',
  'GLA University, Mathura',
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

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

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

  const [firstName, ...restName] = PORTFOLIO_PROFILE.name.split(' ');
  const lastName = restName.join(' ');

  return (
    <section className="relative bg-arch-grid border-b border-white/[0.08] overflow-hidden isolate">
      {/* Ambient radial glow + scanlines + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_20%,rgba(53,217,255,0.10)_0%,rgba(139,92,246,0.08)_45%,transparent_75%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-scanlines opacity-65" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,6,8,0.88)_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Typographic Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="flex flex-col items-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: HERO_EASE }}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{PORTFOLIO_PROFILE.location} · GLA University</span>
              </motion.div>

              <div className="flex flex-col gap-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: HERO_EASE }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[0.01em] [word-spacing:0.14em] text-white leading-[1.06]"
                >
                  {firstName}{' '}
                  <span className="bg-gradient-to-br from-[#8CF4FF] via-[#4FDCFA] to-[#27B4EE] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(53,217,255,0.28)]">
                    {lastName}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: HERO_EASE }}
                  className="text-xl sm:text-2xl font-bold text-[#F4F4F6] tracking-[0.01em] [word-spacing:0.08em]"
                >
                  {PORTFOLIO_PROFILE.headline}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.5, delay: 0.22, ease: HERO_EASE }}
                  className="font-mono text-xs sm:text-sm text-[#A78BFA] tracking-[0.02em] [word-spacing:0.1em]"
                >
                  {PORTFOLIO_PROFILE.roleLine}
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, delay: 0.28, ease: HERO_EASE }}
                className="text-base sm:text-lg text-[#B5BAC7] leading-[1.75] [word-spacing:0.06em] max-w-2xl"
              >
                {PORTFOLIO_PROFILE.heroSummary}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.34, ease: HERO_EASE }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#achievements"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#060608] text-sm font-bold [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors shadow-[0_6px_28px_rgba(255,255,255,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                <span>Explore Achievements</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] backdrop-blur-md text-[#F4F4F6] border border-white/[0.16] text-sm font-bold [word-spacing:0.08em] hover:border-[#35D9FF]/60 hover:bg-white/[0.1] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                <span>Connect With Me</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Portrait Media Frame matching height with 3D Interactive Tilt */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.65, delay: 0.14, ease: HERO_EASE }}
            style={{ perspective: 1000 }}
            className="lg:col-span-5 flex"
          >
            <motion.figure
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full rounded-2xl bg-[#101217]/90 backdrop-blur-md border border-white/[0.12] hover:border-[#35D9FF]/45 transition-colors p-3 sm:p-4 flex flex-col gap-3 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
            >
              {/* Subtle Corner Reticles */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#35D9FF]/60"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#8B5CF6]/60"
              />

              <div className="relative w-full flex-1 min-h-[320px] sm:min-h-[380px] rounded-xl overflow-hidden bg-[#13151B] border border-white/[0.08]">
                {!imageError ? (
                  <img
                    src={PORTFOLIO_PROFILE.portraitPath}
                    alt={PORTFOLIO_PROFILE.portraitAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#13151B] text-[#A3A8B5] p-6 text-center">
                    <span className="font-display text-2xl font-bold text-[#35D9FF]">
                      {PORTFOLIO_PROFILE.initials}
                    </span>
                    <span className="text-sm font-medium text-white">{PORTFOLIO_PROFILE.name}</span>
                    <span className="font-mono text-xs text-[#9299AB]">
                      {PORTFOLIO_PROFILE.headline}
                    </span>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060608]/80 to-transparent"
                />
              </div>

              <figcaption className="flex items-center justify-between gap-3 px-1 pt-0.5">
                <span className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.12em]">
                  {PORTFOLIO_PROFILE.portraitCaption}
                </span>
                <span className="font-mono text-xs text-[#35D9FF] tabular-nums [word-spacing:0.12em]">
                  {PORTFOLIO_PROFILE.portraitMeta}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>

        {/* Full-Width Glass Anchor Pods Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.4, ease: HERO_EASE }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {HERO_ANCHORS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.44 + idx * 0.06, ease: HERO_EASE }}
              whileHover={{ y: -3 }}
              className="rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.1] hover:border-[#8B5CF6]/45 px-5 py-4 flex flex-col gap-1.5 transition-colors"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                {item.label}
              </span>
              <span className="text-[15px] font-bold text-white [word-spacing:0.06em]">
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Kinetic Section Divider Marquee */}
      <div
        aria-hidden="true"
        className="marquee-wrapper relative z-10 border-t border-white/[0.08] bg-[#0A0B0E] py-3.5 overflow-hidden select-none"
      >
        <div className="animate-marquee">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center shrink-0">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <div key={`${loopIndex}-${idx}`} className="flex items-center">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.2em] text-[#A3A8B5] px-5 whitespace-nowrap">
                    {phrase}
                  </span>
                  <span className="text-[#35D9FF] font-mono text-xs">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
