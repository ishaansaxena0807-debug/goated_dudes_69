import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.18 });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const buildFormattedDraft = () => {
    const cleanSubject = subject.trim() || 'Portfolio Inquiry';
    return `Hi Ishaan,\n\n${message.trim()}\n\nBest regards,\n${name.trim()} (${senderEmail.trim()})\nSubject: ${cleanSubject}`;
  };

  const buildMailtoHref = () => {
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim()}`
    );
    const mailBody = encodeURIComponent(
      `Hi Ishaan,\n\n${message.trim()}\n\nFrom: ${name.trim()} (${senderEmail.trim()})`
    );
    return `mailto:${PORTFOLIO_PROFILE.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMessage('Please enter your name, email address, and message.');
      setSubmittedNotice(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setSubmittedNotice(false);
      return;
    }

    setSubmittedNotice(true);
  };

  const handleCopyMessage = async () => {
    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMessage('Fill in your name, email, and message before copying.');
      return;
    }
    try {
      await navigator.clipboard.writeText(buildFormattedDraft());
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2400);
    } catch {
      setCopiedDraft(false);
    }
  };

  return (
    <section id="contact" className="bg-[#060608]">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
      >
        {/* Left Column: Slide-in from Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.08em] [word-spacing:0.18em] text-[#35D9FF]">
              05 — Contact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-normal [word-spacing:0.1em] leading-[1.18] text-white">
              Let&apos;s build, learn, and explore technology together.
            </h2>
            <p className="text-sm sm:text-base text-[#B5BAC7] leading-[1.75] [word-spacing:0.06em]">
              Always open to learning, collaborating on engineering projects, and connecting with
              people interested in software development and Agentic AI.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Email Card + Copy Action */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 360, damping: 25 }}
              className="p-5 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-[#35D9FF]/50 transition-colors flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                  Direct Email
                </span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#35D9FF] hover:text-[#8CF4FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF] rounded-sm"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="flex items-center justify-between gap-3 text-sm sm:text-base font-medium text-white hover:text-[#35D9FF] transition-colors break-all"
              >
                <span>{PORTFOLIO_PROFILE.email}</span>
                <Mail className="w-4 h-4 text-[#35D9FF] shrink-0" aria-hidden="true" />
              </a>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.a
              href={PORTFOLIO_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 360, damping: 25 }}
              className="p-5 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-[#8B5CF6]/60 transition-colors flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                  LinkedIn
                </span>
                <span className="text-sm sm:text-base font-medium text-white truncate">
                  {PORTFOLIO_PROFILE.linkedinDisplay}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A78BFA] shrink-0" aria-hidden="true" />
            </motion.a>

            {/* Location Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 360, damping: 25 }}
              className="p-5 rounded-xl bg-[#101217] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] [word-spacing:0.16em] text-[#9299AB]">
                  Location
                </span>
                <span className="text-sm sm:text-base font-medium [word-spacing:0.06em] text-white">
                  {PORTFOLIO_PROFILE.regionLabel}
                </span>
              </div>
              <MapPin className="w-4 h-4 text-[#35D9FF] shrink-0" aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Slide-in from Right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-2xl bg-[#101217] border border-white/[0.1] flex flex-col gap-5 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-bold [word-spacing:0.1em] text-white">
                Compose a Message
              </h3>
              <p className="text-sm text-[#B5BAC7] [word-spacing:0.06em]">
                Prepare your inquiry below to open directly in your email client or copy to
                clipboard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.12em]"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060608] border border-white/[0.1] text-sm text-white placeholder:text-[#9299AB] focus:outline-none focus:border-[#35D9FF] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.12em]"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060608] border border-white/[0.1] text-sm text-white placeholder:text-[#9299AB] focus:outline-none focus:border-[#35D9FF] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-subject"
                className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.12em]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project collaboration or AI discussion"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#060608] border border-white/[0.1] text-sm text-white placeholder:text-[#9299AB] focus:outline-none focus:border-[#35D9FF] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="font-mono text-xs text-[#A3A8B5] [word-spacing:0.12em]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what you'd like to build or discuss..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#060608] border border-white/[0.1] text-sm text-white placeholder:text-[#9299AB] focus:outline-none focus:border-[#35D9FF] transition-colors resize-y"
              />
            </div>

            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="font-mono text-xs text-[#FDA4AF] [word-spacing:0.1em]"
                >
                  {errorMessage}
                </motion.p>
              )}

              {submittedNotice && (
                <motion.div
                  key="notice"
                  role="status"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="p-4 rounded-xl bg-[#35D9FF]/10 border border-[#35D9FF]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span className="text-sm text-white [word-spacing:0.06em]">
                    Message ready for {PORTFOLIO_PROFILE.name}.
                  </span>
                  <a
                    href={buildMailtoHref()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#060608] text-xs font-bold [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors shrink-0"
                  >
                    <span>Open Email Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#060608] text-sm font-bold [word-spacing:0.08em] hover:bg-[#E2E4E9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Prepare Email</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] text-[#F4F4F6] border border-white/[0.14] text-sm font-bold [word-spacing:0.08em] hover:border-[#35D9FF]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-4 h-4 text-[#35D9FF]" aria-hidden="true" />
                    <span>Draft Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A3A8B5]" aria-hidden="true" />
                    <span>Copy Draft</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
