export const profile = {
  name: 'Sai Varshith Pachipulusu',
  short: 'Sai Varshith',
  role: 'Software Engineer II',
  company: 'Simply Vyapar',
  location: 'Bengaluru, India',
  email: 'saivarshith07012001@gmail.com',
  phone: '+91 83743 96028',
  phoneHref: 'tel:+918374396028',
  github: 'https://github.com/saivarshith07',
  linkedin: 'https://linkedin.com/in/saivarshithp',
  resume: 'Sai_Varshith_Pachipulusu_Resume.pdf',
  available: 'Open to frontend and full-stack roles',
  /** The line under the headline. Kept short: it is a tagline, not a summary. */
  tagline:
    'Building thoughtful interfaces, reliable systems, and everything in between.',
  intro:
    'Three years at Vyapar on software that small businesses bill and sell on. React and TypeScript up front, the NestJS services behind them, shipped from one codebase to web, Windows, macOS and Android.',
}

/** The stack worth leading with. `lead` items get the accent treatment. */
export const coreStack = [
  { name: 'React', lead: true },
  { name: 'Next.js', lead: true },
  { name: 'TypeScript', lead: false },
  { name: 'Tailwind CSS', lead: false },
  { name: 'NestJS', lead: false },
]

/** Where the same frontend codebase ends up. */
export const shipsTo = ['Web', 'Windows', 'macOS', 'WebView']

export const stats = [
  { value: '50K+', label: 'merchants on the retail POS I build for' },
  { value: '15K+', label: 'new users a month on the platform I own' },
  { value: '25K+', label: 'invoices a month through a layer I designed' },
  { value: '4.7%', label: 'referral conversion at launch' },
] as const

export type Project = {
  id: string
  name: string
  tagline: string
  year: string
  role: string
  kind: 'product' | 'open-source'
  featured?: boolean
  metric?: { value: string; label: string }
  summary: string
  bullets: string[]
  stack: string[]
  link?: { href: string; label: string }
  accent: 'mint' | 'coral'
}

export const projects: Project[] = [
  {
    id: 'flyy',
    name: 'Flyy',
    tagline: 'WhatsApp marketing platform',
    year: '2024 to now',
    role: 'Bootstrapped and owned it end to end',
    kind: 'product',
    featured: true,
    accent: 'mint',
    metric: { value: '15K+', label: 'new users / month' },
    summary:
      'A WhatsApp marketing platform I started from an empty repo and still own. It ships as one React codebase to web, Windows, macOS and Android, and I built both the product surface and the infrastructure that delivers it.',
    bullets: [
      'Built the core React product on RSPack and shipped the same codebase to Web, Windows, macOS and Android WebView.',
      'Added AI poster generation in Next.js, streaming progress to the client over Server-Sent Events with its own Razorpay checkout.',
      'Designed the NestJS REST APIs behind licensing, covering purchase and renewal flows with secure Razorpay payment handling.',
      'Wrote an in-app auto-updater that checks S3 for new versions and hot-swaps resources through worker threads, cutting a Windows/macOS release from a full day to under five minutes.',
      'Set up the Jenkins pipeline that builds from GitLab, pushes artifacts to S3 and serves them through CloudFront.',
    ],
    stack: ['React', 'RSPack', 'Next.js', 'NestJS', 'SSE', 'Razorpay', 'Electron', 'AWS', 'Jenkins'],
  },
  {
    id: 'network',
    name: 'Vyapar Network',
    tagline: 'Invoice sharing between connected businesses',
    year: '2024',
    role: 'Led system design and development',
    kind: 'product',
    featured: true,
    accent: 'coral',
    metric: { value: '25K+', label: 'invoices tracked / month' },
    summary:
      'Businesses were sending invoices to each other over WhatsApp and email and losing track of them. Vyapar Network moves that exchange inside the product, so both sides see the same document and its live status.',
    bullets: [
      'Led the system design for invoice sharing between Vyapar-connected users, from data model to delivery.',
      'Removed the dependency on external channels. Documents now move inside the product, with a proper audit trail.',
      'Built real-time tracking that keeps sender and receiver on the same state for 25K+ invoices a month.',
    ],
    stack: ['React', 'System design', 'Real-time sync', 'Node.js'],
  },
  {
    id: 'pos',
    name: 'Retail POS',
    tagline: 'Counter software for physical stores',
    year: '2023 to 2024',
    role: 'Frontend',
    kind: 'product',
    accent: 'mint',
    metric: { value: '50K+', label: 'merchants' },
    summary:
      'Point-of-sale modules used at real counters, where a dropped transaction means a queue of unhappy customers. Built to stay responsive and to fail safely.',
    bullets: [
      'Shipped fault-tolerant inventory, checkout and EDC payment modules for a retail system used by 50K+ merchants.',
      'Kept the whole surface mobile-responsive so the same build works on a counter monitor and a phone.',
      'Hardened the flows against partial failures, with retries, recovery and reconciliation rather than a lost sale.',
    ],
    stack: ['React', 'Redux Toolkit', 'EDC payments', 'TypeScript'],
  },
  {
    id: 'referral',
    name: 'Referral & Earn',
    tagline: 'Organic growth loop',
    year: '2024',
    role: 'Frontend + backend',
    kind: 'product',
    accent: 'coral',
    metric: { value: '4.7%', label: 'conversion at launch' },
    summary:
      'A referral program built end to end: the share surface, the attribution, and the reward ledger behind it.',
    bullets: [
      'Designed and launched the referral system, hitting 4.7% conversion in its first rollout.',
      'Built the attribution and reward flow on NestJS, with the share and redeem surfaces in React.',
    ],
    stack: ['React', 'NestJS', 'Growth'],
  },
  {
    id: 'astro',
    name: 'Astro Vyapar',
    tagline: 'Daily business horoscope for shop owners',
    year: '2024',
    role: 'Frontend',
    kind: 'product',
    accent: 'coral',
    metric: { value: '2', label: 'platforms' },
    summary:
      'A daily horoscope built for business owners rather than a general audience, delivered inside the apps they already open every morning.',
    bullets: [
      'Built the responsive React and Tailwind UI, sized for everything from a phone to a desktop window.',
      'Shipped to both Android and desktop through WebViews, so one build served both surfaces.',
      'Rendered personalised daily insights framed around the reader\'s business rather than generic predictions.',
    ],
    stack: ['React', 'Tailwind CSS', 'WebView', 'TypeScript'],
  },
  {
    id: 'dashboards',
    name: 'Sales Dashboards & UI Kit',
    tagline: 'Where it started',
    year: '2023',
    role: 'Software Engineer Intern',
    kind: 'product',
    accent: 'mint',
    metric: { value: '10K+', label: 'users' },
    summary:
      'My first work at Vyapar: turning raw sales data into something a shop owner can act on, and leaving behind components the rest of the team could reuse.',
    bullets: [
      'Built React + Chart.js dashboards for online store reports and sales analytics, used by 10K+ business owners.',
      'Shipped a user-centric onboarding flow for the Loyalty feature that drove adoption.',
      'Modelled the relationships between sale orders, sales and delivery challans in SQLite and tuned the queries behind them.',
      'Created a reusable TypeScript + Material UI component library documented in Storybook for cross-team reuse.',
    ],
    stack: ['React', 'Chart.js', 'TypeScript', 'Material UI', 'Storybook', 'SQLite'],
  },
  {
    id: 'reliability',
    name: 'Crash Reporting & Recovery',
    tagline: 'Keeping the desktop app diagnosable in production',
    year: '2025 to now',
    role: 'Owned',
    kind: 'product',
    accent: 'coral',
    summary:
      'Desktop software fails on machines you will never see. This is the layer that makes those failures visible and survivable for the accounting app small businesses keep their books in.',
    bullets: [
      'Built an app-wide logging layer feeding Sentry, with event de-duplication so one recurring fault does not flood the dashboard.',
      'Added automatic recovery when the UI process crashes, so a merchant mid-invoice is not left staring at a dead window.',
      'Introduced structured database error reporting across the data layer, so production failures are diagnosable instead of silent.',
    ],
    stack: ['Electron', 'React', 'TypeScript', 'Sentry', 'SQLite'],
  },
  {
    id: 'sketch-board',
    name: 'Sketch Board',
    tagline: 'Real-time collaborative whiteboard',
    year: 'Side project',
    role: 'Solo build',
    kind: 'open-source',
    accent: 'mint',
    summary:
      'A whiteboard where several people draw on the same canvas at once, with the state synced live over Socket.IO.',
    bullets: [
      'Live multi-user sync over Socket.IO, covering pencil, eraser, colour picker and sticky text notes.',
      'Smooth drawing interactions with undo/redo and one-click export of the board as an image.',
    ],
    stack: ['JavaScript', 'Node.js', 'Express', 'Socket.IO', 'Canvas API'],
    link: { href: 'https://github.com/saivarshith07/sketch-board', label: 'Source' },
  },
  {
    id: 'hn-scraper',
    name: 'Hacker News Scraper',
    tagline: 'Scheduled scraper with a live feed',
    year: 'Side project',
    role: 'Solo build',
    kind: 'open-source',
    accent: 'coral',
    summary:
      'A service that scrapes Hacker News on a schedule, deduplicates what it finds, and pushes new stories to connected clients the moment they land.',
    bullets: [
      'Puppeteer scrapes on an interval and stores deduplicated stories in MySQL.',
      'WebSockets stream live updates to clients; a REST API serves the historical archive.',
      'Ships with a lightweight HTML client for watching the feed in real time.',
    ],
    stack: ['TypeScript', 'Node.js', 'Puppeteer', 'MySQL', 'WebSocket', 'Express'],
    link: { href: 'https://github.com/saivarshith07/hacker-news-scraper', label: 'Source' },
  },
]

export const experience = [
  {
    company: 'Simply Vyapar',
    title: 'Software Engineer II',
    period: 'June 2023 to Present',
    location: 'Bengaluru',
    kind: 'work' as const,
    blurb:
      'Promoted out of the internship after six months. I run one product line on my own and lead frontend work across the desktop product, from the release pipeline down to the crash reporting under it.',
    points: [
      'Sole engineer on a product line: I scope it, build it, ship it and support it, backend and release process included.',
      'Lead system design on features that cross product boundaries, where the hard part is the contract between two teams rather than the code.',
      'Work the full surface: React and TypeScript in the app, NestJS for services, Electron and RSPack for the desktop builds.',
      'Own what happens after deploy, so production reliability, what gets logged, what recovers on its own and what is worth waking someone up for.',
      'Took release time from a full working day to under five minutes by owning CI/CD end to end.',
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Electron', 'RSPack', 'AWS', 'Jenkins', 'Sentry'],
  },
  {
    company: 'Simply Vyapar',
    title: 'Software Engineer Intern',
    period: 'Jan 2023 to June 2023',
    location: 'Bengaluru',
    kind: 'work' as const,
    blurb:
      'Started on the analytics surface and moved into the shared component layer the rest of the team builds on. Converted to a full-time offer at the end of it.',
    points: [
      'First production React work: turning raw sales data into dashboards a shop owner could actually act on.',
      'Built and documented the shared component library in Storybook, so other teams stopped rewriting the same inputs and tables.',
      'Modelled the relationships behind sale orders, sales and delivery challans, and tuned the SQL underneath them.',
    ],
    stack: ['React', 'TypeScript', 'Chart.js', 'Material UI', 'Storybook', 'SQLite'],
  },
  {
    company: 'PES University',
    title: 'B.Tech, Computer Science and Engineering',
    period: 'Aug 2019 to May 2023',
    location: 'Bengaluru',
    kind: 'education' as const,
    blurb:
      'Graduated with a CGPA of 8.71, in the top 5% of the batch, which carried the MRD Scholarship.',
    points: [
      'Published “Personalized Film Discovery Service” at Springer ICAIS, on hybrid ML recommendation systems.',
    ],
    stack: ['Java', 'C', 'C++', 'Python'],
  },
]

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'SQL', 'C++', 'C'] },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Redux Toolkit', 'Electron', 'Tailwind CSS', 'Material UI'],
  },
  { group: 'Backend & data', items: ['Node.js', 'NestJS', 'MySQL', 'MongoDB', 'SQLite'] },
  {
    group: 'Build & ship',
    items: ['RSPack', 'Vite', 'Webpack', 'Jest', 'Docker', 'Jenkins', 'Git'],
  },
  { group: 'Cloud & observability', items: ['AWS S3', 'CloudFront', 'EC2', 'Sentry', 'Mixpanel'] },
]

export const marquee = [
  'React',
  'TypeScript',
  'Next.js',
  'NestJS',
  'Electron',
  'RSPack',
  'Node.js',
  'Redux Toolkit',
  'Tailwind CSS',
  'MySQL',
  'MongoDB',
  'Docker',
  'Jenkins',
  'AWS',
  'Razorpay',
  'Socket.IO',
]

export const highlights = [
  {
    tag: 'Hackathon',
    title: '1st place, Vyapar Hackathon 2023',
    detail: 'Built an AI-powered inventory management solution and took first place.',
  },
  {
    tag: 'Published',
    title: 'Springer ICAIS paper',
    detail: '“Personalized Film Discovery Service,” on hybrid ML-based recommendation systems.',
  },
  {
    tag: 'Scholarship',
    title: 'MRD Scholarship',
    detail: 'Awarded for ranking in the top 5% of the B.Tech batch at PES University.',
  },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]
