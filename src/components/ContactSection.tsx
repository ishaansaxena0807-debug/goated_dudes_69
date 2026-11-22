import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedNotice, setSubmittedNotice] = useState(false);

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
    const mailSubject = encodeURIComponent(subject.trim() || `Portfolio Inquiry from ${name.trim()}`);
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
    <section id="contact" className="bg-[#0E1112]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#90D0E5]">
              Contact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#E6E8E9]">
              Let&apos;s build, learn, and explore technology together.
            </h2>
            <p className="text-sm sm:text-base text-[#B3BCC0] leading-relaxed">
              Always open to learning, collaborating on engineering projects, and connecting with
              people interested in software development and Agentic AI.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Email Card + Copy Action */}
            <div className="p-5 rounded-xl bg-[#14181A] border border-[#2B3236] flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#90D0E5] hover:text-[#ADE0F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5] rounded-sm"
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
                </button>
              </div>
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="flex items-center justify-between gap-3 text-sm sm:text-base font-medium text-[#E6E8E9] hover:text-[#90D0E5] transition-colors break-all"
              >
                <span>{PORTFOLIO_PROFILE.email}</span>
                <Mail className="w-4 h-4 text-[#90D0E5] shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PORTFOLIO_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#14181A] border border-[#2B3236] hover:border-[#90D0E5] transition-colors flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                  LinkedIn
                </span>
                <span className="text-sm sm:text-base font-medium text-[#E6E8E9] truncate">
                  {PORTFOLIO_PROFILE.linkedinDisplay}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#90D0E5] shrink-0" aria-hidden="true" />
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-xl bg-[#14181A] border border-[#2B3236] flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#838E93]">
                  Location
                </span>
                <span className="text-sm sm:text-base font-medium text-[#E6E8E9]">
                  {PORTFOLIO_PROFILE.regionLabel}
                </span>
              </div>
              <MapPin className="w-4 h-4 text-[#FAB981] shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Message Composer */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-2xl bg-[#14181A] border border-[#2B3236] flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl font-semibold text-[#E6E8E9]">
                Compose a Message
              </h3>
              <p className="text-sm text-[#B3BCC0]">
                Prepare your inquiry below to open directly in your email client or copy to
                clipboard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="font-mono text-xs text-[#B3BCC0]">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1112] border border-[#2B3236] text-sm text-[#E6E8E9] placeholder:text-[#838E93] focus:outline-none focus:border-[#90D0E5] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="font-mono text-xs text-[#B3BCC0]">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1112] border border-[#2B3236] text-sm text-[#E6E8E9] placeholder:text-[#838E93] focus:outline-none focus:border-[#90D0E5] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-subject" className="font-mono text-xs text-[#B3BCC0]">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project collaboration or AI discussion"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1112] border border-[#2B3236] text-sm text-[#E6E8E9] placeholder:text-[#838E93] focus:outline-none focus:border-[#90D0E5] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="font-mono text-xs text-[#B3BCC0]">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what you'd like to build or discuss..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1112] border border-[#2B3236] text-sm text-[#E6E8E9] placeholder:text-[#838E93] focus:outline-none focus:border-[#90D0E5] transition-colors resize-y"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="font-mono text-xs text-[#FFB4AB]">
                {errorMessage}
              </p>
            )}

            {submittedNotice && (
              <div
                role="status"
                className="p-4 rounded-xl bg-[#123A46] border border-[#245A6B] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <span className="text-sm text-[#E1F6FF]">
                  Message ready for {PORTFOLIO_PROFILE.name}.
                </span>
                <a
                  href={buildMailtoHref()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#90D0E5] text-[#052B35] text-xs font-semibold hover:bg-[#ADE0F0] transition-colors shrink-0"
                >
                  <span>Open Email Client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#90D0E5] text-[#052B35] text-sm font-semibold hover:bg-[#ADE0F0] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Prepare Email</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#181C1E] text-[#E6E8E9] border border-[#2B3236] text-sm font-medium hover:border-[#90D0E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#90D0E5]"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-4 h-4 text-[#90D0E5]" aria-hidden="true" />
                    <span>Draft Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#B3BCC0]" aria-hidden="true" />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
