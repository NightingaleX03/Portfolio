export interface RigLink {
  label: string;
  href: string;
}

export interface RigPart {
  id: string;
  part: string;
  title: string;
  subtitle?: string;
  status?: string;
  summary: string;
  points?: string[];
  tools?: string[];
  links?: RigLink[];
  route?: string;
}

export interface CatalogProject {
  title: string;
  role: string;
  description: string;
  tools: string[];
  inProgress?: boolean;
  links: {
    github?: string;
    githubTwo?: string;
    devpost?: string;
    demo?: string;
  };
}

export const owner = {
  name: "Sarah Mathew",
  handle: "NightingaleX03",
  role: "Aspiring compiler engineer",
  blurb:
    "I like finding out what happens between the code you write and the instructions a chip runs. Right now that means building my own compiled language and writing GPU kernels for AMD's ROCm stack.",
  model: "Model SM-X03 · rev. 2026",
};

export interface ContactLink {
  id: "github" | "linkedin" | "email" | "devpost" | "leetcode" | "resume";
  label: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/NightingaleX03" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sarah-mathew-0a4a06204/" },
  { id: "email", label: "Email", href: "mailto:smthayil03@gmail.com" },
  { id: "devpost", label: "Devpost", href: "https://devpost.com/NightingaleX03" },
  { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/nightingaleX_03/" },
  { id: "resume", label: "Resume", href: `${process.env.PUBLIC_URL ?? ""}/resume.pdf` },
];

export const cpu: RigPart = {
  id: "cpu",
  part: "CPU socket",
  title: "Lyra Compiler",
  subtitle: "A statically-typed language, built from scratch",
  status: "Frontend complete · LLVM backend in progress",
  summary:
    "My own compiled language. Source goes through a hand-written lexer and parser, gets checked against a scoped symbol table and a static type checker, and is on its way to native code through LLVM IR.",
  points: [
    "Hand-written lexer and recursive descent parser that builds an AST",
    "Scoped symbol table that handles nested scopes and shadowing",
    "Static type checker with error messages that point at the actual problem",
    "Now: LLVM IR code generation targeting x86-64",
    "Next: first-class functions with closures, constant folding and dead code elimination",
  ],
  tools: ["C++", "LLVM IR", "x86-64"], // TODO(Sarah): confirm language
};

export const gpu: RigPart = {
  id: "gpu",
  part: "PCIe x16 · GPU",
  title: "ROCm GPU Kernel Suite",
  subtitle: "Compute kernels in HIP, profiled on AMD hardware",
  status: "Four kernels done · prefix scan next",
  summary:
    "A set of GPU compute kernels written to learn how AMD GPUs actually spend their time: where memory goes, how threads cooperate, and what the compiler turns HIP into.",
  points: [
    "Vector add as the baseline for the toolchain and profiling setup",
    "Matrix multiplication, naive vs. tiled with LDS (on-chip shared memory) so threads reuse data",
    "Parallel reduction and a privatized histogram",
    "Profiled with rocprof to compare memory behaviour between versions",
    "Traced HIP → LLVM IR → AMDGPU ISA in Compiler Explorer",
    "Next: Blelloch prefix scan",
  ],
  tools: ["HIP", "C++", "ROCm", "rocprof", "Compiler Explorer"],
};

export const ram: RigPart[] = [
  {
    id: "dimm-a1",
    part: "DIMM A1",
    title: "TiketFix",
    subtitle: "Software developer · May 2026 – present",
    summary:
      "Client-facing features on a legal client-intake platform used by 300+ law firm offices across North America.",
    points: [
      "Traced which screens were re-rendering more than they needed to and rebuilt the rendering logic to cut the redundant work",
      "Debug by reproducing first, then narrowing down where the cause actually lives before changing anything",
      "Peer code review every sprint",
    ],
    tools: ["TypeScript", "Express.js"],
  },
  {
    id: "dimm-a2",
    part: "DIMM A2",
    title: "ReliablyME",
    subtitle: "Front-end developer co-op · 10 weeks",
    summary: "Sole developer on a 10-week engagement, taking four pages from wireframe to production.",
    points: [
      "Built production pages in React and TypeScript from design wireframes",
      "Ran moderated usability tests and turned the friction points into code-level UI fixes",
    ],
    tools: ["React", "TypeScript"],
  },
  {
    id: "dimm-b1",
    part: "DIMM B1",
    title: "Exceed Robotics",
    subtitle: "STEM instructor · until April 2026",
    summary: "Taught kids robotics and programming fundamentals through hands-on builds.",
  },
  {
    id: "dimm-b2",
    part: "DIMM B2",
    title: "ACM-W Ontario Tech",
    subtitle: "Chapter chair · since July 2025",
    summary:
      "Running the student chapter after a year as vice-chair: networking events, mentorship and technical workshops aimed at closing the gender gap in tech.",
  },
];

export const m2a: RigPart = {
  id: "m2a",
  part: "M.2 slot 1",
  title: "Note Ease",
  subtitle: "MLH Best Use of AI in Education",
  summary: "AI note-taking app built in 36 hours at GDSC Hacks 2024. Won out of 200+ submissions.",
  points: [
    "Real-time speech-to-notes pipeline on Google Cloud Speech-to-Text and Gemini",
    "MediaPipe hand-gesture recognition for hands-free formatting",
    "Full MERN stack",
  ],
  links: [
    { label: "Devpost", href: "https://devpost.com/software/note-ease" },
    { label: "Code", href: "https://github.com/SharuSiv/GDSC_Hacks2024" },
  ],
};

export const m2b: RigPart = {
  id: "m2b",
  part: "M.2 slot 2",
  title: "StartupConnect",
  subtitle: "Perplexity AI hackathon",
  summary: "Networking and recommendation platform that matches early-stage startups with VC firms.",
  points: [
    "Instant AI pitch feedback through the Perplexity Sonar API in a gamified Angular dashboard",
    "Owned Firebase Authentication end to end and co-built the Flask + PostgreSQL data layer",
  ],
  links: [
    { label: "Devpost", href: "https://devpost.com/software/startup-connect-06dqug" },
    { label: "Code", href: "https://github.com/NightingaleX03/perplexity-hackathon" },
    { label: "Demo", href: "https://www.youtube.com/watch?v=x9600zRwCZg" },
  ],
};

export const vrm: RigPart = {
  id: "vrm",
  part: "VRM",
  title: "Education",
  summary:
    "Ontario Tech University, Honours Computer Science with a Data Science specialization, 2024 – present. Seneca Polytechnic, Diploma in Computer Programming, 2023 – 2024.",
  points: [
    "Ontario Tech University, Honours Computer Science with a Data Science specialization, 2024 – present",
    "Seneca Polytechnic, Diploma in Computer Programming, 2023 – 2024",
  ],
};

export const chip: RigPart = {
  id: "chip",
  part: "Chipset",
  title: "Toolchain",
  summary:
    "Systems: C, C++, LLVM IR, HIP / ROCm, x86-64. Languages: TypeScript, JavaScript, Python, Java, SQL. Web: React, Angular, Node.js, Express, Flask. Data and ML: PostgreSQL, MongoDB, TensorFlow, MediaPipe.",
  points: [
    "Systems: C, C++, LLVM IR, HIP / ROCm, x86-64",
    "Languages: TypeScript, JavaScript, Python, Java, SQL",
    "Web: React, Angular, Node.js, Express, Flask",
    "Data and ML: PostgreSQL, MongoDB, TensorFlow, MediaPipe",
  ],
};

export const bios: RigPart = {
  id: "bios",
  part: "BIOS",
  title: "About me",
  summary: owner.blurb,
  points: [
    "Computer Science at Ontario Tech University",
    "Diploma in Computer Programming, Seneca Polytechnic (2024)",
    "Outside of code: video games, stargazing and volunteering",
  ],
};

export const bat: RigPart = {
  id: "bat",
  part: "CMOS battery",
  title: "My journey",
  subtitle: "The log since 2023",
  summary: "The log since 2023.",
  route: "/commit/v1/journey",
};

export const sata: RigPart = {
  id: "sata",
  part: "SATA 0",
  title: "Every project",
  subtitle: "Hackathons, coursework, experiments",
  summary: "Hackathons, coursework, experiments.",
  route: "/commit/v1/projects",
};

export const newProjects: CatalogProject[] = [
  {
    title: cpu.title,
    role: cpu.status ?? cpu.part,
    description: cpu.summary,
    tools: cpu.tools ?? [],
    inProgress: true,
    links: {},
  },
  {
    title: gpu.title,
    role: gpu.status ?? gpu.part,
    description: gpu.summary,
    tools: gpu.tools ?? [],
    inProgress: true,
    links: {},
  },
];
