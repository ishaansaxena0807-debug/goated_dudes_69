export type AchievementCategory = 'Certifications' | 'Experience' | 'Projects';

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  badgeLabel: string;
  timeframe: string;
  title: string;
  organizationOrStack: string;
  summary: string;
  highlights: string[];
  highlightHeading: string;
  location?: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  icon: 'terminal' | 'bot' | 'globe' | 'brain';
}

export interface SkillGroup {
  category: string;
  focus: 'core' | 'ai';
  items: string[];
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface StrengthItem {
  title: string;
  description: string;
}

export interface AgenticStage {
  stage: string;
  caption: string;
  icon: 'eye' | 'route' | 'zap' | 'refresh';
}

export const PORTFOLIO_PROFILE = {
  name: 'Ishaan Saxena',
  initials: 'IS',
  location: 'Agra, India',
  regionLabel: 'Greater Agra Area, India',
  headline: 'B.Tech CSE | Artificial Intelligence & Machine Learning',
  roleLine: 'Aspiring Agentic AI Developer · Software Development · AI & ML',
  heroSummary:
    'First-year Computer Science & Engineering student at GLA University building strong engineering foundations in programming, web development, Data Structures & Algorithms, and autonomous AI systems.',
  portraitPath: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_7.42.57_PM_017612f9.jpeg',
  portraitAlt: 'Portrait of Ishaan Saxena',
  portraitCaption: 'Perceive → Plan → Act → Learn',
  portraitMeta: 'GLA University · 2026',
  email: 'sgs.ishaan.8may.7@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/ishaan-saxena-17aa42412',
  linkedinDisplay: 'linkedin.com/in/ishaan-saxena-17aa42412',
};

export const HERO_ANCHORS = [
  { label: 'Education', value: 'GLA University · B.Tech CSE (AI & ML)' },
  { label: 'Current Role', value: "Technical Engineer · The Foundry" },
  { label: 'Certification', value: 'Agentic AI Workshop' },
  { label: 'Based In', value: 'Greater Agra Area, India' },
];

export const ABOUT_COPY = {
  lead: 'I am a first-year B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at GLA University.',
  paragraphs: [
    'I enjoy learning through practical projects, experimenting with new technologies, solving problems, and continuously improving my technical skills.',
    'My current focus is building strong foundations in programming, web development, Data Structures & Algorithms, and Agentic AI.',
  ],
  education: {
    institution: 'GLA University',
    degree: 'Bachelor of Technology — Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    period: '2026 – Present',
  },
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'software-dev',
    title: 'Software Development',
    description: 'Building my foundation in programming and problem solving.',
    icon: 'terminal',
  },
  {
    id: 'agentic-ai',
    title: 'AI & Agentic AI',
    description: 'Exploring intelligent systems, AI agents, planning, and automation.',
    icon: 'bot',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Learning and building websites using HTML, CSS, and JavaScript.',
    icon: 'globe',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description:
      'Learning by building projects, debugging problems, and experimenting with new technologies.',
    icon: 'brain',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'agentic-ai-workshop',
    category: 'Certifications',
    badgeLabel: 'Certification',
    timeframe: '2026',
    title: 'Agentic AI Workshop',
    organizationOrStack: 'Intelligent AI Systems · Autonomous Workflows',
    summary:
      'Completed intensive workshop training on Agentic AI concepts, multi-step planning, tool orchestration, and intelligent AI system design.',
    highlightHeading: 'Key Outcomes',
    highlights: [
      'Core Agentic AI architectures and reasoning patterns',
      'Goal understanding, structured planning, and tool usage',
      'Foundations of intelligent automation beyond static prompting',
    ],
  },
  {
    id: 'technical-engineer-foundry',
    category: 'Experience',
    badgeLabel: 'Engineering Role',
    timeframe: 'Nov 2026 – Present',
    title: 'Technical Engineer',
    organizationOrStack: "Let's Cook Community – The Foundry",
    location: 'Mathura, Uttar Pradesh, India',
    summary:
      'Contributing to community-driven technical initiatives, applying software engineering fundamentals, and collaborating on technology-focused builds.',
    highlightHeading: 'Responsibilities',
    highlights: [
      'Contributing to technical projects',
      'Applying programming and problem-solving skills',
      'Collaborating on technology-focused work',
      'Continuously learning new technologies',
    ],
  },
  {
    id: 'gla-btech-aiml',
    category: 'Certifications',
    badgeLabel: 'Academic Milestone',
    timeframe: '2026 – Present',
    title: 'B.Tech CSE (AI & ML) Cohort',
    organizationOrStack: 'GLA University · Computer Science & Engineering',
    location: 'Mathura / Greater Agra Area, India',
    summary:
      'Pursuing undergraduate engineering studies focused on Computer Science fundamentals, Object-Oriented Programming, Data Structures & Algorithms, and Machine Learning.',
    highlightHeading: 'Core Academic Focus',
    highlights: [
      'Data Structures & Algorithms and Object-Oriented Programming',
      'Programming fluency across Python, Java, and C#',
      'Artificial Intelligence and Machine Learning specialization',
    ],
  },
  {
    id: 'python-guessing-game',
    category: 'Projects',
    badgeLabel: 'CLI Build',
    timeframe: '2026',
    title: 'Python Number Guessing Game',
    organizationOrStack: 'Python · CLI · Problem Solving',
    summary:
      'A beginner-friendly command-line game built with Python focusing on clean control flow, defensive input handling, and replayable user interaction.',
    highlightHeading: 'Key Features',
    highlights: [
      'Random number generation',
      'Input validation',
      'Limited attempts',
      'Replay functionality',
    ],
  },
  {
    id: 'html-css-web-projects',
    category: 'Projects',
    badgeLabel: 'Web Build',
    timeframe: '2026',
    title: 'HTML & CSS Web Projects',
    organizationOrStack: 'HTML5 · CSS · JavaScript',
    summary:
      'Building and experimenting with modern responsive web pages using semantic markup, structured CSS stylesheets, and interactive layout patterns.',
    highlightHeading: 'Focus Areas',
    highlights: [
      'HTML forms and structured navigation',
      'Responsive page layouts and CSS styling',
      'Clean separation of HTML & CSS structure',
    ],
  },
  {
    id: 'agentic-ai-exploration',
    category: 'Projects',
    badgeLabel: 'AI Research & Build',
    timeframe: 'Ongoing',
    title: 'Agentic AI Exploration',
    organizationOrStack: 'AI · Agentic AI · Automation',
    summary:
      'Exploring how AI agents can move beyond simply answering questions to planning steps, making decisions, and performing autonomous tasks.',
    highlightHeading: 'Exploring',
    highlights: [
      'AI agent architecture and planning loops',
      'Structured decision making',
      'Autonomous actions and intelligent automation',
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming',
    focus: 'core',
    items: ['Python', 'Java', 'C#'],
  },
  {
    category: 'Web Development',
    focus: 'core',
    items: ['HTML5', 'CSS', 'JavaScript'],
  },
  {
    category: 'Computer Science',
    focus: 'core',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Problem Solving',
    ],
  },
  {
    category: 'AI & Automation',
    focus: 'ai',
    items: [
      'Artificial Intelligence',
      'Machine Learning',
      'Agentic AI',
      'Intelligent Automation',
    ],
  },
];

export const AGENTIC_STAGES: AgenticStage[] = [
  { stage: 'Perceive', caption: 'Understand goals', icon: 'eye' },
  { stage: 'Plan', caption: 'Structure steps', icon: 'route' },
  { stage: 'Act', caption: 'Use tools', icon: 'zap' },
  { stage: 'Learn', caption: 'Refine outcomes', icon: 'refresh' },
];

export const LEARNING_JOURNEY: JourneyStep[] = [
  {
    step: '01',
    title: 'Learn',
    description: 'Build strong foundations in programming and computer science.',
  },
  {
    step: '02',
    title: 'Build',
    description: 'Turn concepts into practical projects.',
  },
  {
    step: '03',
    title: 'Explore',
    description: 'Experiment with AI, Agentic AI, and emerging technologies.',
  },
  {
    step: '04',
    title: 'Create',
    description: 'Build intelligent systems that solve real-world problems.',
  },
];

export const STRENGTHS: StrengthItem[] = [
  {
    title: 'Adaptability',
    description: 'I enjoy learning and adjusting to new technologies and situations.',
  },
  {
    title: 'Persistence',
    description:
      "I keep working through problems instead of giving up when something doesn't work.",
  },
  {
    title: 'Problem Solving',
    description:
      'I enjoy finding errors, understanding why they happen, and working toward solutions.',
  },
  {
    title: 'Continuous Learning',
    description: 'I am always looking for opportunities to improve my technical knowledge.',
  },
  {
    title: 'Collaboration',
    description: 'I enjoy working and learning with others.',
  },
];

export const CAREER_GOAL = {
  title: 'Aspiring Agentic AI Developer',
  description:
    'My long-term goal is to become a successful Agentic AI Developer and build intelligent systems that can solve real-world problems through AI, automation, and autonomous decision-making.',
};
