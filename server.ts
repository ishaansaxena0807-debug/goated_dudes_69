import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { GoogleGenAI, ThinkingLevel, type GenerateContentResponse } from '@google/genai';

type ChatRole = 'user' | 'model';
type SpeedMode = 'fast' | 'deep';
type AssistantRolePreset = 'guide' | 'technical' | 'recruiter';

interface IncomingChatMessage {
  role: ChatRole;
  text: string;
}

interface ChatRequestBody {
  messages?: IncomingChatMessage[];
  mode?: SpeedMode | 'standard';
  rolePreset?: AssistantRolePreset;
}

const PORTFOLIO_KNOWLEDGE_BASE = `
Verified Portfolio Profile for Ishaan Saxena:
- Name: Ishaan Saxena
- Location: Agra, India (Greater Agra Area, India)
- Education: B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning specialization) at GLA University (2026 – Present). First-year undergraduate student.
- Headline: Aspiring Agentic AI Developer | Software Development | AI & ML.
- Experience: Technical Engineer at Let's Cook Community – The Foundry (November 2026 – Present, Mathura, Uttar Pradesh, India). Responsibilities: contributing to technical projects, applying programming and problem-solving skills, collaborating on technology-focused work, continuously learning new technologies.
- Certification & Milestones: Agentic AI Workshop (learned Agentic AI concepts, multi-step planning, tool orchestration, and intelligent AI system design); B.Tech CSE (AI & ML) cohort at GLA University.
- Core Focus Areas: Software Development, AI & Agentic AI, Web Development, Continuous Learning.
- Technical Skills:
  * Programming: Python, Java, C#
  * Web Development: HTML5, CSS, JavaScript
  * Computer Science: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Problem Solving
  * AI & Automation: Artificial Intelligence, Machine Learning, Agentic AI, Intelligent Automation
- Projects:
  1. Python Number Guessing Game (Python | CLI | Problem Solving): random number generation, input validation, limited attempts, replay functionality.
  2. HTML & CSS Web Projects (HTML5 | CSS | JavaScript): HTML forms, navigation, responsive page layouts, CSS styling, clean separation of HTML & CSS structure.
  3. Agentic AI Exploration (AI | Agentic AI | Automation): exploring AI agent architecture, Perceive -> Plan -> Act -> Learn loop, planning, decision making, autonomous actions, and intelligent automation.
- Learning Journey: 01 Learn (build foundations) -> 02 Build (practical projects) -> 03 Explore (AI & Agentic AI) -> 04 Create (intelligent systems solving real-world problems).
- Strengths: Adaptability, Persistence, Problem Solving, Continuous Learning, Collaboration.
- Long-Term Career Goal: Become a successful Agentic AI Developer building intelligent systems that solve real-world problems through AI, automation, and autonomous decision-making.
- Contact: Email sgs.ishaan.8may.7@gmail.com | LinkedIn https://www.linkedin.com/in/ishaan-saxena-17aa42412
`.trim();

function getSystemInstruction(preset: AssistantRolePreset): string {
  const baseRules = `
Strictly ground your answers in the Verified Portfolio Profile below. Do not invent fake metrics, employers, degrees, awards, or projects that are not listed. If asked something outside Ishaan's portfolio (such as unrelated coding or AI concepts), answer helpfully and concisely while tying back to Ishaan's focus when relevant. Keep responses clear, well-structured, and concise (around 2-5 sentences or compact bullet points unless the visitor asks for deeper detail).

${PORTFOLIO_KNOWLEDGE_BASE}
`.trim();

  switch (preset) {
    case 'technical':
      return `You are Ishaan Saxena's Technical AI Companion. Focus on Ishaan's engineering stack (Python, Java, C#, HTML5, CSS, JavaScript, DSA, OOP), his projects (Python CLI game, Web layouts, Agentic AI exploration), and how the Perceive -> Plan -> Act -> Learn agent loop works.\n\n${baseRules}`;
    case 'recruiter':
      return `You are Ishaan Saxena's Recruiter & Collaboration Brief Assistant. Present crisp, high-signal summaries of Ishaan's education at GLA University, his Technical Engineer role at Let's Cook Community – The Foundry, his Agentic AI Workshop certification, core strengths, and contact channels.\n\n${baseRules}`;
    case 'guide':
    default:
      return `You are Ishaan Saxena's Portfolio Guide. Help visitors warmly and professionally explore Ishaan's background, achievements, projects, skills, Agentic AI interests, and ways to get in touch.\n\n${baseRules}`;
  }
}

async function streamGeminiResponse(
  ai: GoogleGenAI,
  model: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  latestMessage: string,
  systemInstruction: string,
  clientSignal: AbortSignal,
  timeoutMs: number,
  onDelta: (delta: string) => void
): Promise<boolean> {
  const attemptController = new AbortController();
  const onClientAbort = () => attemptController.abort();
  clientSignal.addEventListener('abort', onClientAbort, { once: true });

  let gotFirstToken = false;
  const firstTokenTimer = setTimeout(() => {
    if (!gotFirstToken) {
      attemptController.abort();
    }
  }, timeoutMs);

  try {
    const chat = ai.chats.create({
      model,
      history,
      config: {
        systemInstruction,
        abortSignal: attemptController.signal,
        ...(model === 'gemini-4-hydrogen'
          ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
          : {}),
      },
    });

    const stream = await chat.sendMessageStream({
      message: latestMessage,
    });

    for await (const chunk of stream) {
      const c = chunk as GenerateContentResponse;
      const delta = c.text;
      if (delta) {
        if (!gotFirstToken) {
          gotFirstToken = true;
          clearTimeout(firstTokenTimer);
        }
        onDelta(delta);
      }
    }

    return gotFirstToken;
  } finally {
    clearTimeout(firstTokenTimer);
    clientSignal.removeEventListener('abort', onClientAbort);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req: Request, res: Response) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error: 'Gemini API key is not configured. Please check Settings > Secrets.',
      });
      return;
    }

    const body = (req.body ?? {}) as ChatRequestBody;
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const cleanedMessages = rawMessages
      .filter(
        (m): m is IncomingChatMessage =>
          Boolean(m) &&
          (m.role === 'user' || m.role === 'model') &&
          typeof m.text === 'string' &&
          m.text.trim().length > 0
      )
      .slice(-24);

    if (cleanedMessages.length === 0) {
      res.status(400).json({ error: 'Please provide at least one message.' });
      return;
    }

    const latest = cleanedMessages[cleanedMessages.length - 1];
    if (latest.role !== 'user') {
      res.status(400).json({ error: 'The latest message must come from the user.' });
      return;
    }

    const useDeepModel = body.mode === 'deep';
    const primaryModel = useDeepModel ? 'gemini-4-hydrogen' : 'gemini-3.1-flash-lite';
    const preset: AssistantRolePreset =
      body.rolePreset === 'technical' || body.rolePreset === 'recruiter'
        ? body.rolePreset
        : 'guide';

    const history = cleanedMessages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.text.trim() }],
    }));

    const clientController = new AbortController();
    res.on('close', () => {
      if (!res.writableFinished) {
        clientController.abort();
      }
    });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: 18000,
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = getSystemInstruction(preset);
    const latestText = latest.text.trim();

    try {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();
      res.write(': stream-open\n\n');

      let activeModel = primaryModel;
      let receivedText = false;

      try {
        receivedText = await streamGeminiResponse(
          ai,
          primaryModel,
          history,
          latestText,
          systemInstruction,
          clientController.signal,
          useDeepModel ? 9000 : 12000,
          (delta) => {
            res.write(`data: ${JSON.stringify({ delta })}\n\n`);
          }
        );
      } catch (primaryError: unknown) {
        if (clientController.signal.aborted) {
          throw primaryError;
        }
        const errObj = primaryError as { status?: number };
        // Propagate key/rate-limit errors directly; otherwise fail over to fast gemini-3.1-flash-lite
        if (errObj?.status === 400 || errObj?.status === 403 || errObj?.status === 429) {
          throw primaryError;
        }
        activeModel = 'gemini-3.1-flash-lite';
        receivedText = await streamGeminiResponse(
          ai,
          activeModel,
          history,
          latestText,
          systemInstruction,
          clientController.signal,
          12000,
          (delta) => {
            res.write(`data: ${JSON.stringify({ delta })}\n\n`);
          }
        );
      }

      if (!receivedText) {
        res.write(
          `data: ${JSON.stringify({
            error: 'No response text was returned by the model. Please try again.',
          })}\n\n`
        );
      } else {
        res.write(`data: ${JSON.stringify({ done: true, model: activeModel })}\n\n`);
      }
      res.end();
    } catch (error: unknown) {
      if (clientController.signal.aborted) {
        res.end();
        return;
      }

      const errObj = error as { status?: number; name?: string; message?: string };
      console.error('[/api/chat error]', primaryModel, errObj?.status, errObj?.message);
      const status = typeof errObj?.status === 'number' ? errObj.status : 500;
      let userMessage = 'Unable to reach Gemini right now. Please try again.';

      if (errObj?.name === 'AbortError') {
        userMessage = 'Request timed out. Please try sending your question again.';
      } else if (status === 400 || status === 403) {
        userMessage =
          'API key validation failed. Please verify your Gemini API key in Settings > Secrets.';
      } else if (status === 429) {
        userMessage =
          'Rate limit reached. Please wait a moment before sending another message.';
      }

      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: userMessage })}\n\n`);
        res.end();
      } else {
        res.status(status >= 400 && status < 600 ? status : 500).json({ error: userMessage });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
