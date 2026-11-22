import { Fragment } from 'react';
import { SKILL_GROUPS } from '../data/portfolio';

export function SkillsSection() {
  return (
    <section id="skills" className="bg-[#14181A] border-b border-[#2B3236]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
            Technical Skills
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
            Languages, web technologies, and AI foundations.
          </h2>
        </div>

        <div className="rounded-xl bg-[#181C1E] border border-[#2B3236] divide-y divide-[#2B3236]">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-4">
                <h3 className="text-base font-semibold text-[#E6E8E9]">{group.category}</h3>
              </div>

              <div className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm">
                {group.items.map((item, idx) => (
                  <Fragment key={item}>
                    <span
                      className={
                        group.focus === 'ai' ? 'text-[#90D0E5] font-medium' : 'text-[#E6E8E9]'
                      }
                    >
                      {item}
                    </span>
                    {idx < group.items.length - 1 && (
                      <span className="text-[#3D474C]" aria-hidden="true">
                        /
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
