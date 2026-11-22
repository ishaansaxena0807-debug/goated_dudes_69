import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { IntroCurtain } from './components/IntroCurtain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setShowIntro(true);
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroCurtain visible={showIntro} onComplete={handleIntroComplete} />
      <div className="min-h-screen flex flex-col bg-[#0E1112] text-[#E6E8E9] overflow-x-clip">
        <Navbar />
        <main id="top" className="flex-1">
          <Hero ready={!showIntro} />
          <AboutSection />
          <AchievementsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer onReplayIntro={handleReplayIntro} />
      </div>
    </MotionConfig>
  );
}
