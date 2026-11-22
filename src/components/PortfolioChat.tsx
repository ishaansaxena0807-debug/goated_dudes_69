import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  Bot,
  MessageSquare,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
  Zap,
} from 'lucide-react';

type ChatRole = 'user' | 'model';
type SpeedMode = 'fast' | 'deep';
type AssistantRolePreset = 'guide' | 'technical' | 'recruiter';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

interface PortfolioChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const STORAGE_KEY = 'ishaan_portfolio_chat_v1';

const ROLE_OPTIONS: { id: AssistantRolePreset; label: string; hint: string }[] = [
  { id: 'guide', label: 'Guide', hint: 'General portfolio Q&A' },
  { id: 'technical', label: 'Tech', hint: 'Code, stack & Agentic AI' },
  { id: 'recruiter', label: 'Recruiter', hint: 'Skills, role & readiness' },
];

const STARTER_PROMPTS = [
  "What are Ishaan's key achievements so far?",
  'Tell me about his role at The Foundry.',
  'How is he exploring Agentic AI?',
  'How can I contact or collaborate with him?',
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: "Hi! I'm Ishaan Saxena's AI portfolio assistant. Ask me about his B.Tech CSE (AI & ML) journey at GLA University, his work at The Foundry, technical skills, projects, or how to connect.",
};

function renderInlineFormatting(line: string) {
  const tokens = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          className="px-1 py-0.5 rounded bg-[#060608] border border-white/[0.12] font-mono text-[11px] text-[#35D9FF]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return <span key={idx}>{token}</span>;
  });
}

function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) {
          return <div key={idx} className="h-1" />;
        }
        const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#35D9FF] mt-0.5 select-none" aria-hidden="true">
                ·
              </span>
              <span>{renderInlineFormatting(bulletMatch[1])}</span>
            </div>
          );
        }
        return <p key={idx}>{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

export function PortfolioChat({ isOpen, onOpenChange }: PortfolioChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [INITIAL_MESSAGE];
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage parse failure
    }
    return [INITIAL_MESSAGE];
  });

  const [rolePreset, setRolePreset] = useState<AssistantRolePreset>('guide');
  const [speedMode, setSpeedMode] = useState<SpeedMode>('fast');
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const threadEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage quota errors
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onOpenChange]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const trimmed = rawText.trim();
      if (!trimmed || isStreaming) return;

      setErrorText(null);
      setInput('');

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
      };
      const assistantId = `model-${Date.now() + 1}`;
      const placeholderMsg: ChatMessage = {
        id: assistantId,
        role: 'model',
        text: '',
      };

      const conversationForApi = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome' && m.text.trim().length > 0)
        .map(({ role, text }) => ({ role, text }));

      setMessages((prev) => [...prev, userMsg, placeholderMsg]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: conversationForApi,
            mode: speedMode,
            rolePreset,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          let errMsg = `Request failed (${response.status}).`;
          try {
            const payload = (await response.json()) as { error?: string };
            if (payload.error) errMsg = payload.error;
          } catch {
            // Keep generic error message
          }
          throw new Error(errMsg);
        }

        if (!response.body) {
          throw new Error('No response stream received from server.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split(/\r?\n\r?\n/);
          buffer = events.pop() ?? '';

          for (const eventChunk of events) {
            const dataLines = eventChunk
              .split(/\r?\n/)
              .filter((line) => line.startsWith('data: '));
            for (const dataLine of dataLines) {
              const jsonStr = dataLine.slice(6).trim();
              if (!jsonStr) continue;
              let parsed: { delta?: string; error?: string; done?: boolean } | null = null;
              try {
                parsed = JSON.parse(jsonStr) as {
                  delta?: string;
                  error?: string;
                  done?: boolean;
                };
              } catch {
                parsed = null;
              }

              if (parsed?.error) {
                throw new Error(parsed.error);
              }

              if (parsed?.delta) {
                const deltaText = parsed.delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, text: m.text + deltaText } : m
                  )
                );
                threadEndRef.current?.scrollIntoView({ behavior: 'auto' });
              }
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId && !m.text.trim()
              ? { ...m, text: 'I could not generate a response. Please try rephrasing.' }
              : m
          )
        );
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'AbortError') {
          return;
        }
        const message =
          err instanceof Error ? err.message : 'Something went wrong while contacting Gemini.';
        setErrorText(message);
        setMessages((prev) => prev.filter((m) => m.id !== assistantId || m.text.trim().length > 0));
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [isStreaming, messages, rolePreset, speedMode]
  );

  const handleReset = () => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
    setErrorText(null);
    setMessages([INITIAL_MESSAGE]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const activeRoleMeta =
    ROLE_OPTIONS.find((item) => item.id === rolePreset) ?? ROLE_OPTIONS[0];

  return (
    <>
      {/* Floating Chat Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            onClick={() => onOpenChange(true)}
            aria-label="Open Ishaan's AI Assistant chat"
            className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-[#060608] font-bold text-sm [word-spacing:0.08em] shadow-[0_12px_36px_rgba(0,0,0,0.65)] hover:bg-[#E2E4E9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
          >
            <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Ask Portfolio AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-Up Multi-Turn Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            role="dialog"
            aria-modal="false"
            aria-label="Ishaan Saxena Portfolio AI Chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[min(430px,calc(100vw-2rem))] h-[min(620px,82vh)] rounded-2xl bg-[#0A0B0E] border border-white/[0.14] shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#101217] border-b border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#35D9FF]/10 border border-[#35D9FF]/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#35D9FF]" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-base font-bold [word-spacing:0.08em] text-white truncate">
                    Ishaan&apos;s Portfolio Assistant
                  </span>
                  <span className="font-mono text-[11px] text-[#9299AB] [word-spacing:0.1em] truncate">
                    {activeRoleMeta.hint}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="w-8 h-8 rounded-lg bg-[#161922] border border-white/[0.1] text-[#A3A8B5] hover:text-white hover:border-white/[0.24] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close chat panel"
                  className="w-8 h-8 rounded-lg bg-[#161922] border border-white/[0.1] text-[#A3A8B5] hover:text-white hover:border-[#35D9FF] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Role & Speed Controls */}
            <div className="px-4 py-2.5 bg-[#060608] border-b border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
              <div
                role="group"
                aria-label="Assistant role"
                className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#101217] border border-white/[0.08]"
              >
                {ROLE_OPTIONS.map((role) => {
                  const active = rolePreset === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setRolePreset(role.id)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-medium transition-colors ${
                        active
                          ? 'bg-white text-[#060608]'
                          : 'text-[#A3A8B5] hover:text-white'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setSpeedMode((prev) => (prev === 'fast' ? 'deep' : 'fast'))}
                title="Switch between Fast and Detailed response mode"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[11px] transition-colors ${
                  speedMode === 'fast'
                    ? 'bg-[#35D9FF]/10 border-[#35D9FF]/35 text-[#35D9FF]'
                    : 'bg-[#8B5CF6]/15 border-[#8B5CF6]/45 text-[#A78BFA]'
                }`}
              >
                {speedMode === 'fast' ? (
                  <>
                    <Zap className="w-3 h-3" aria-hidden="true" />
                    <span>Fast</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    <span>Detailed</span>
                  </>
                )}
              </button>
            </div>

            {/* Scrollable Conversation Thread */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                        isUser
                          ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/35 text-[#A78BFA]'
                          : 'bg-[#35D9FF]/10 border-[#35D9FF]/30 text-[#35D9FF]'
                      }`}
                    >
                      {isUser ? (
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </div>

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-xl border ${
                        isUser
                          ? 'bg-[#161922] border-white/[0.14] text-white'
                          : 'bg-[#101217] border-white/[0.08] text-[#A3A8B5]'
                      }`}
                    >
                      {msg.text ? (
                        <FormattedMessageText text={msg.text} />
                      ) : (
                        <span className="font-mono text-xs text-[#35D9FF]">
                          Responding...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Quick Starter Prompts on Fresh Thread */}
              {messages.length === 1 && !isStreaming && (
                <div className="pt-2 flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9299AB]">
                    Try asking
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="text-left px-3 py-2 rounded-lg bg-[#101217] border border-white/[0.08] hover:border-[#35D9FF]/50 text-xs text-[#A3A8B5] hover:text-white transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {/* Inline Error Alert */}
            {errorText && (
              <div
                role="alert"
                className="mx-4 mb-2 px-3 py-2 rounded-lg bg-[#4A1717] border border-[#8A2E2E] text-xs text-[#FFDAD6] flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">{errorText}</span>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-[#101217] border-t border-white/[0.08] flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ishaan's skills, projects, or goals..."
                disabled={isStreaming}
                aria-label="Message input"
                className="flex-1 max-h-28 px-3 py-2.5 rounded-lg bg-[#060608] border border-white/[0.1] text-sm text-white placeholder:text-[#9299AB] focus:outline-none focus:border-[#35D9FF] transition-colors resize-none disabled:opacity-60"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.94 }}
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-lg bg-white text-[#060608] hover:bg-[#E2E4E9] disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35D9FF]"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
