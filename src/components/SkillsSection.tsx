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
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
            Languages, web technologies, and AI foundations.
          </h2>
        </motion.div>

        <div className="rounded-xl bg-[#181C1E] border border-[#2B3236] divide-y divide-[#2B3236] overflow-hidden">
          {SKILL_GROUPS.map((group, rowIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: rowIdx * 0.07, ease: EASE_OUT }}
              whileHover={{ backgroundColor: 'rgba(144, 208, 229, 0.04)' }}
              className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors"
            >
              <div className="md:col-span-4">
                <h3 className="text-base font-semibold text-[#E6E8E9]">{group.category}</h3>
              </div>

              <div className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm">
                {group.items.map((item, idx) => (
                  <Fragment key={item}>
                    <motion.span
                      whileHover={{ y: -1 }}
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
