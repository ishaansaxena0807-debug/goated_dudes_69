import { Fragment, useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import { SKILL_GROUPS } from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const MATRIX_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const TOKEN_LIST_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const TOKEN_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.25 });
  const matrixInView = useInView(matrixRef, { once: true, amount: 0.18 });

  return (
    <section id="skills" className="bg-dot-matrix border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-col gap-2 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]">
            04 — Technical Stack
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={headerInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{ duration: 0.52, ease: EASE_OUT }}
              className="font-display text-3xl sm:text-4xl font-bold tracking-normal [word-spacing:0.1em] leading-[1.18] text-white"
            >
              Languages, web technologies, and AI foundations.
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          ref={matrixRef}
          variants={MATRIX_VARIANTS}
          initial="hidden"
          animate={matrixInView ? 'visible' : 'hidden'}
          className="rounded-xl bg-[#101217] border border-white/[0.08] divide-y divide-white/[0.08] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
        >
          {SKILL_GROUPS.map((group, rowIdx) => (
            <motion.div
              key={group.category}
              variants={{
                hidden: { opacity: 0, x: rowIdx % 2 === 0 ? -24 : 24 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.48, ease: EASE_OUT },
                },
              }}
              whileHover={{ backgroundColor: 'rgba(53, 217, 255, 0.03)' }}
              className="group p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors"
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <span
                  className="font-mono text-xs text-[#9299AB] group-hover:text-[#35D9FF] transition-colors tabular-nums"
                  aria-hidden="true"
                >
                  0{rowIdx + 1}
                </span>
                <h3 className="text-lg font-bold [word-spacing:0.08em] text-white group-hover:translate-x-1 transition-transform">
                  {group.category}
                </h3>
              </div>

              <motion.div
                variants={TOKEN_LIST_VARIANTS}
                className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm [word-spacing:0.12em]"
              >
                {group.items.map((item, idx) => (
                  <Fragment key={item}>
                    <motion.span
                      variants={TOKEN_ITEM_VARIANTS}
                      whileHover={{ y: -2 }}
                      className={`inline-block transition-colors ${
                        group.focus === 'ai'
                          ? 'text-[#35D9FF] font-medium'
                          : 'text-[#F4F4F6] hover:text-[#A78BFA]'
                      }`}
                    >
                      {item}
                    </motion.span>
                    {idx < group.items.length - 1 && (
                      <span className="text-[#444957]" aria-hidden="true">
                        /
                      </span>
                    )}
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
