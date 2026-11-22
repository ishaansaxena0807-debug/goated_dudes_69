import { PORTFOLIO_PROFILE } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="bg-[#14181A] border-t border-[#2B3236] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#B3BCC0]">
          © 2026 {PORTFOLIO_PROFILE.name}
        </p>
        <p className="font-mono text-xs text-[#838E93]">
          B.Tech CSE (AI &amp; ML) · GLA University
        </p>
      </div>
    </footer>
  );
}
