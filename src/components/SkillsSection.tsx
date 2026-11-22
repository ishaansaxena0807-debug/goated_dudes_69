import { Fragment } from 'react';
import { motion } from 'motion/react';
import { SKILL_GROUPS } from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function SkillsSection() {
  return (
    <section id="skills" className="bg-[#14181A] border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-col gap-2 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
            Technical Skills
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.52, ease: EASE_OUT }}
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]"
            >
              Languages, web technologies, and AI foundations.
            </motion.h2>
          </div>
        </motion.div>

        <div className="rounded-xl bg-[#181C1E] border border-[#2B3236] divide-y divide-[#2B3236] overflow-hidden">
          {SKILL_GROUPS.map((group, rowIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: rowIdx % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: rowIdx * 0.08, ease: EASE_OUT }}
              whileHover={{ backgroundColor: 'rgba(144, 208, 229, 0.04)' }}
              className="group p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors"
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <span
                  className="font-mono text-xs text-[#838E93] group-hover:text-[#90D0E5] transition-colors tabular-nums"
                  aria-hidden="true"
                >
                  0{rowIdx + 1}
                </span>
                <h3 className="text-base font-semibold text-[#E6E8E9] group-hover:translate-x-1 transition-transform">
                  {group.category}
                </h3>
              </div>

              <div className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm">
                {group.items.map((item, idx) => (
                  <Fragment key={item}>
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.35,
                        delay: rowIdx * 0.08 + idx * 0.05,
                        ease: EASE_OUT,
                      }}
                      whileHover={{ y: -2 }}
                      className={`inline-block transition-colors ${
                        group.focus === 'ai'
                          ? 'text-[#90D0E5] font-medium'
                          : 'text-[#E6E8E9] hover:text-[#90D0E5]'
                      }`}
                    >
                      {item}
                    </motion.span>
                    {idx < group.items.length - 1 && (
                      <span className="text-[#3D474C]" aria-hidden="true">
                        /
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
