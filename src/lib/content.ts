// Central content source for CrownEd. Edit copy here without touching layout.

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Subjects", href: "#subjects" },
  { label: "Why CrownEd", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const PILLARS = [
  {
    flag: "🇱🇰",
    title: "Local Sri Lankan",
    desc: "O/Level & A/Level tuition aligned to the national curriculum, taught by an experienced educator.",
    tags: ["O/Level", "A/Level", "Local Syllabus"],
  },
  {
    flag: "🇬🇧",
    title: "UK Education",
    desc: "Full support for Edexcel, Cambridge and all UK examination boards, from IGCSE to A-Level.",
    tags: ["Edexcel", "Cambridge", "IGCSE"],
  },
  {
    flag: "💼",
    title: "Professional",
    desc: "Business consultancy and professional development coaching for career-focused learners.",
    tags: ["Consultancy", "Prof. Dev.", "Careers"],
  },
];

export const SUBJECTS = [
  "Accounting",
  "Business Studies",
  "Business Consultancy",
  "Professional Development",
  "English",
  "Mathematics",
  "Science",
  "Marketing",
];

export const LEVELS = [
  {
    key: "ol",
    name: "O/Level",
    tagline: "Building strong foundations",
    desc: "Core subjects taught for confidence and clarity — aligned to the Local, Edexcel and Cambridge syllabi.",
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "Accounting",
      "Business Studies",
    ],
    curricula: ["Sri Lankan Local", "Edexcel", "Cambridge"],
  },
  {
    key: "al",
    name: "A/Level",
    tagline: "Mastery for university & beyond",
    desc: "Advanced, exam-focused coaching that turns deep understanding into top grades.",
    subjects: [
      "Accounting",
      "Business Studies",
      "Marketing",
      "English",
      "Mathematics",
    ],
    curricula: ["Edexcel", "Cambridge", "All UK Boards"],
  },
  {
    key: "pro",
    name: "Professional",
    tagline: "Career-ready skills",
    desc: "Practical coaching for working professionals and career-focused learners.",
    subjects: [
      "Business Consultancy",
      "Professional Development",
      "Marketing",
      "Accounting",
    ],
    curricula: ["Professional Bodies", "UK Standards"],
  },
] as const;

export const WHY_POINTS = [
  {
    title: "Multi-Curriculum Expertise",
    desc: "One tutor fluent across Local, Edexcel, Cambridge and UK boards — consistent guidance no matter your path.",
  },
  {
    title: "Personalised Attention",
    desc: "Lessons tailored to each student's pace and goals, with regular progress feedback for parents.",
  },
  {
    title: "Exam-Ready Results",
    desc: "Structured revision, past-paper practice and proven techniques that turn effort into grades.",
  },
  {
    title: "Career-Focused Guidance",
    desc: "Beyond exams — business and professional development coaching that prepares students for the real world.",
  },
];

export const STATS = [
  { value: "8", suffix: "+", label: "Subjects taught" },
  { value: "3", suffix: "", label: "Curricula covered" },
  { value: "O/L · A/L · Pro", suffix: "", label: "Levels supported" },
];
