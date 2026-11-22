import { useEffect, useState } from 'react';

const RAIL_ITEMS = [
  { id: 'top', index: '01', label: 'Hero' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'achievements', index: '03', label: 'Work' },
  { id: 'agentic-ai', index: '04', label: 'Agentic' },
  { id: 'skills', index: '05', label: 'Stack' },
  { id: 'contact', index: '06', label: 'Contact' },
];

export function SideRail() {
  const [activeId, setActiveId] = useState<string>('top');

  useEffect(() => {
    const targets = RAIL_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Section index rail"
      className="hidden min-[1440px]:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 select-none"
    >
      <div
        className="w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        aria-hidden="true"
      />
      <nav className="flex flex-col items-center gap-3.5">
        {RAIL_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`font-mono text-[10px] tracking-[0.12em] [word-spacing:0.2em] uppercase transition-colors [writing-mode:vertical-rl] rotate-180 ${
                isActive ? 'text-[#35D9FF] font-semibold' : 'text-[#9299AB] hover:text-[#A78BFA]'
              }`}
            >
              {item.index} · {item.label}
            </a>
          );
        })}
      </nav>
      <div
        className="w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        aria-hidden="true"
      />
    </aside>
  );
}
