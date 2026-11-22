import { RotateCcw } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

interface FooterProps {
  onReplayIntro?: () => void;
}

export function Footer({ onReplayIntro }: FooterProps) {
  return (
    <footer className="bg-[#14181A] border-t border-[#2B3236] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#B3BCC0]">
          © 2026 {PORTFOLIO_PROFILE.name}
        </p>

        <div className="flex items-center gap-6">
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#90D0E5] hover:text-[#ADE0F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] rounded-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replay Intro</span>
            </button>
          )}
          <p className="font-mono text-xs text-[#838E93]">
            B.Tech CSE (AI &amp; ML) · GLA University
          </p>
        </div>
      </div>
    </footer>
  );
}
