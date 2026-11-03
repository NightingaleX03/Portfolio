export interface RigLink {
  label: string;
  href: string;
}

export interface RigSection {
  text: string;
  points?: string[];
}

export interface RigPart {
  id: string;
  part: string;
  title: string;
  subtitle?: string;
  status?: string;
  summary: string;
  points?: string[];
  sections?: RigSection[];
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
  role: "Aspiring compiler and GPU engineer",
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
  status: "LLVM backend generating x86-64",
  summary:
    "A statically-typed compiled language in C++, from a hand-written lexer and parser through an LLVM IR backend that emits native x86-64.",
  points: [
    "Hand-written lexer, recursive descent parser, scoped symbol table, and a static type checker with descriptive error messages",
    "LLVM IR backend with first-class functions and closure/upvalue capture, generating native x86-64 binaries",
    "AST-level constant folding and dead code elimination, plus LLVM mem2reg, GVN, and CFG simplification",
    "Correctness and memory safety checked across 30+ test programs with zero Valgrind errors, with IR instruction-count reductions measured on benchmark programs",
  ],
  tools: ["C++", "LLVM", "x86-64"],
};

export const gpu: RigPart = {
  id: "gpu",
  part: "PCIe x16 · GPU",
  title: "ROCm GPU Kernel Suite",
  subtitle: "Compute kernels in HIP, profiled on AMD hardware",
  status: "Profiled with rocprof",
  summary:
    "GPU compute kernels in HIP, written to see where memory goes, how threads cooperate, and what the compiler turns HIP into.",
  points: [
    "Tiled matrix multiplication using LDS (on-chip shared memory), parallel reduction with warp shuffle, Blelloch prefix scan, and a privatized histogram",
    "Tiled matmul improved over a naive global-memory baseline, with GFLOPS and L2 cache hit rate checked in rocprof",
    "Traced HIP → LLVM IR → AMDGPU ISA in Compiler Explorer",
  ],
  tools: ["HIP", "C++", "rocprof"],
};

export const ram: RigPart[] = [
  {
    id: "dimm-a1",
    part: "DIMM A1",
    title: "TiketFix",
    subtitle: "Software engineer · May 2026 – present",
    summary: "Client-intake platform for legal practices.",
    points: [
      "Delivered frontend for 4 products, including a CRM, two client-facing websites, and an iOS/Android app, serving 300+ law firms across North America",
      "Enhanced user engagement by implementing core features like live chat, real-time lawyer-client messaging, and case submission and acceptance flows, contributing to a platform that has processed 80,000+ ticket submissions",
      "Streamlined client payments by integrating a Stripe-powered billing UI, enabling clients to pay lawyers directly through the platform",
    ],
    tools: ["React Native", "TypeScript", "Next.js", "Node.js"],
  },
  {
    id: "dimm-a2",
    part: "DIMM A2",
    title: "ReliablyME",
    subtitle: "Frontend and UX developer · Jan. 2025 – Mar. 2025",
    summary: "Commitment-tracking platform, through Riipen.",
    points: [
      "Delivered 4 core pages as sole developer in a 10-week engagement, owning the full pipeline from Figma wireframes to production React.js and TypeScript",
      "Improved user task efficiency by identifying and resolving UX friction points through moderated usability testing, leading to direct code-level UI enhancements",
    ],
    tools: ["React.js", "TypeScript", "Figma"],
  },
  {
    id: "dimm-b1",
    part: "DIMM B1",
    title: "Exceed Robotics",
    subtitle: "STEM instructor · Oct. 2025 – Apr. 2026",
    summary: "Taught C, Python, and embedded systems through hardware-software projects.",
    points: [
      "Strengthened technical skills for 40+ students aged 7–15 by teaching C, Python, and embedded systems through hardware-software projects on ESP32 and Arduino covering GPIO, PWM, and serial communication",
      "Increased hands-on engagement by leading weekly 3D printing workshops connecting software logic to physical hardware",
    ],
    tools: ["C", "Python", "Arduino", "OnShape"],
  },
  {
    id: "dimm-b2",
    part: "DIMM B2",
    title: "Watchborg",
    subtitle: "Vision language model software developer · October 2026 – present",
    summary:
      "Remote, via Riipen Level UP. Developing a vision-language model capability within Watchborg’s existing AI-powered virtual supervision MVP, focused on automated cleaning-quality verification for short-term rentals.",
    points: [
      "Designing controlled test scenarios using real property-management use cases to evaluate model performance and limitations",
      "Writing source code, setup instructions and technical documentation, with weekly code reviews and mentorship from the founder",
      "Working alongside two market-research teammates to align technical findings with target-market and product requirements",
    ],
  },
];

export const m2a: RigPart = {
  id: "m2a",
  part: "M.2 slot 1",
  title: "Note Ease",
  subtitle: "MLH Best Use of AI in Education",
  summary: "Won MLH Best Use of AI in Education out of 200+ submissions by shipping a full MERN app in 36 hours.",
  points: [
    "Real-time speech-to-notes pipeline with Google Cloud Speech-to-Text and Gemini",
    "MediaPipe hand-gesture recognition for document formatting",
  ],
  tools: ["MERN", "TensorFlow", "Google Cloud"],
  links: [
    { label: "Devpost", href: "https://devpost.com/software/note-ease" },
    { label: "Code", href: "https://github.com/SharuSiv/GDSC_Hacks2024" },
  ],
};

export const m2b: RigPart = {
  id: "m2b",
  part: "M.2 slot 2",
  title: "Contribution Garden",
  subtitle: "GitHub Action",
  summary:
    "Turns a year of GitHub contributions into a garden on a floating island. Every day is a tile, and the more you code, the more it grows. It updates itself once a day.",
  points: [
    "Each day grows from GitHub's contribution levels: grass, a sprout, a bush with a bud, flowers, or a full bloom in a planter",
    "Milestones unlock a cottage, a fence, a cherry blossom, lanterns, a bench, and a storybook cottage as the year's contributions add up",
    "A streak of 7 or more days grows a vine arch, repo stars become butterflies, and forks become bees",
    "Each language is its own flower, and a teapot bouquet matches the year's language mix",
    "Shipped as the GitHub Action NightingaleX03/github-contribution, so a profile README can show the garden from one workflow",
  ],
  tools: ["TypeScript", "GitHub Actions"],
  links: [{ label: "Code", href: "https://github.com/NightingaleX03/Gardening-Commits" }],
};

export const vrm: RigPart = {
  id: "vrm",
  part: "VRM",
  title: "Education",
  summary:
    "Ontario Tech University, B.S. Computer Science, Software Development specialization, Sept. 2024 – May 2028.",
  sections: [
    {
      text: "Ontario Tech University, B.S. Computer Science, Software Development specialization, Sept. 2024 – May 2028",
      points: [
        "Coursework: data structures and algorithms, compilers, operating systems, systems programming, computer graphics",
        "ACM chapter chair, 2024–2026: set strategic direction and organized women-in-tech workshops and networking events",
      ],
    },
    {
      text: "Seneca Polytechnic, A.S. Computer Programming, Sept. 2023 – Dec. 2024",
      points: [
        "Coursework: object-oriented programming, software testing, project management, web and frameworks",
      ],
    },
  ],
};

export const chip: RigPart = {
  id: "chip",
  part: "Chipset",
  title: "Toolchain",
  summary: "",
  points: [
    "Languages: C++, C, Python, Java, JavaScript, TypeScript, SQL, Shell, HTML/CSS",
    "Compilers and systems: LLVM IR, LLVM Pass Manager, ROCm/HIP",
    "GPU and graphics: HIP kernels, GPU memory hierarchy, OpenGL",
    "Frameworks: Next.js, React, React Native, Angular, Node.js/Express, Flask, TensorFlow, MediaPipe",
    "Tools: Git, Valgrind, CMake, Linux/Unix, Figma, PostgreSQL, MongoDB",
  ],
};

export const bios: RigPart = {
  id: "bios",
  part: "BIOS",
  title: "About me",
  summary: owner.blurb,
  points: [
    "B.S. Computer Science, Software Development specialization, Ontario Tech University, Sept. 2024 – May 2028",
    "A.S. Computer Programming, Seneca Polytechnic, Sept. 2023 – Dec. 2024",
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
    links: {},
  },
  {
    title: gpu.title,
    role: gpu.status ?? gpu.part,
    description: gpu.summary,
    tools: gpu.tools ?? [],
    links: {},
  },
];
