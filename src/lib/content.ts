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
  "Information Technology",
  "AI literacy programs",
  "English Language",
  "English Literature",
  "Professional development",
  "Spoken english",
  "Personality building sessions",
  "AI Courses",
  "Business consultancy",
  "Financial Planning Support",
  "Business strategy consultancy for small businesses and beginners",
  "Marketing plan development",
  "Research and development services",
];

// Contact details & WhatsApp quick-action
export const CONTACT_EMAIL = "sandanithotage@gmail.com";
export const CONTACT_PHONE = "+94 76 848 0152";
export const WHATSAPP_NUMBER = "94768480152";
export const WHATSAPP_MESSAGE =
  "Hi CrownEd! I'd like to apply for a class. Please share the details.";

// Subjects grouped by pathway according to official curriculum guidance
export const SUBJECT_FILTERS = [
  {
    key: "local",
    label: "Local",
    caption: "Sri Lankan Curriculum",
    subjects: [
      "Information Technology",
      "AI literacy programs",
      "English Language",
      "English Literature",
    ],
  },
  {
    key: "uk",
    label: "UK Education",
    caption: "Edexcel / Cambridge & UK Boards",
    subjects: [
      "Information Technology",
      "AI literacy programs",
      "English Language",
      "English Literature",
    ],
  },
  {
    key: "pro",
    label: "Professional",
    caption: "Career & Business Solutions",
    subjects: [
      "Professional development",
      "Spoken english",
      "Personality building sessions",
      "AI Courses",
      "Business consultancy",
      "Financial Planning Support",
      "Business strategy consultancy for small businesses and beginners",
      "Marketing plan development",
      "Research and development services",
    ],
  },
] as const;

export const LEVELS = [
  {
    key: "local",
    name: "Local Syllabus",
    tagline: "Sri Lankan National Curriculum",
    desc: "Comprehensive coaching in IT, AI literacy, English Language, and English Literature.",
    subjects: [
      "Information Technology",
      "AI literacy programs",
      "English Language",
      "English Literature",
    ],
    curricula: ["Sri Lankan Local O/L & A/L"],
  },
  {
    key: "uk",
    name: "UK Education",
    tagline: "Edexcel & Cambridge International",
    desc: "Expertly tailored curriculum for IGCSE, O/Level, and A/Level UK examination boards.",
    subjects: [
      "Information Technology",
      "AI literacy programs",
      "English Language",
      "English Literature",
    ],
    curricula: ["Edexcel", "Cambridge", "All UK Boards"],
  },
  {
    key: "pro",
    name: "Professional",
    tagline: "Career & Business Solutions",
    desc: "Executive development, spoken skills, business consultancy, and AI integration.",
    subjects: [
      "Professional development",
      "Spoken english",
      "Personality building sessions",
      "AI Courses",
      "Business consultancy",
      "Financial Planning Support",
      "Business strategy consultancy for small businesses and beginners",
      "Marketing plan development",
      "Research and development services",
    ],
    curricula: ["Professional Coaching", "Business Consultancy"],
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

// NOTE: placeholder figures — update with the tutor's real numbers.
export const STATS = [
  { value: 10, suffix: "+", label: "Years Experience", caption: "Teaching across curricula" },
  { value: 500, suffix: "+", label: "Students Taught", caption: "And counting" },
  { value: 98, suffix: "%", label: "Pass Rate", caption: "Exam success" },
  { value: 8, suffix: "+", label: "Subjects", caption: "Local · UK · Professional" },
];
