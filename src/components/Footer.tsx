import { RotateCcw } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

interface FooterProps {
  onReplayIntro?: () => void;
}

export function Footer({ onReplayIntro }: FooterProps) {
  return (
    <footer className="bg-[#0A0B0E] border-t border-white/[0.08] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.14em]">
          © 2026 {PORTFOLIO_PROFILE.name}
        </p>

        <div className="flex items-center gap-6">
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 font-mono text-xs [word-spacing:0.12em] text-[#35D9FF] hover:text-[#8CF4FF] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF] rounded-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replay Intro</span>
            </button>
          )}
          <p className="font-mono text-xs text-[#9299AB] [word-spacing:0.14em]">
            B.Tech CSE (AI &amp; ML) · GLA University
          </p>
        </div>
      </div>
    </footer>
  );
}
