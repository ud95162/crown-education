"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Laptop,
  Sparkles,
  BookOpen,
  Feather,
  UserCheck,
  MessageSquare,
  Smile,
  Cpu,
  Briefcase,
  TrendingUp,
  Target,
  Megaphone,
  Search,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Calculator,
  FlaskConical,
  Atom,
  Dna,
  Zap,
  ShoppingBag,
} from "lucide-react";
import { SUBJECT_FILTERS } from "@/lib/content";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  "Information Technology": Laptop,
  "AI literacy programs": Sparkles,
  "English Language": BookOpen,
  "English Literature": Feather,
  "Business studies": Briefcase,
  "Accounting": Calculator,
  "Marketing": Megaphone,
  "Maths": Calculator,
  "Science": FlaskConical,
  "Commerce": ShoppingBag,
  "Biology": Dna,
  "Physics": Zap,
  "Chemistry": Atom,
  "Professional development": UserCheck,
  "Spoken english": MessageSquare,
  "Personality building sessions": Smile,
  "AI Courses": Cpu,
  "Business consultancy": Briefcase,
  "Financial Planning Support": TrendingUp,
  "Business strategy consultancy for small businesses and beginners": Target,
  "Marketing plan development": Megaphone,
  "Research and development services": Search,
};

const DESCRIPTIONS: Record<string, string> = {
  "Information Technology":
    "Core IT concepts, programming fundamentals, and practical software application.",
  "AI literacy programs":
    "Foundational AI concepts, prompt engineering, generative AI tools, and ethical AI usage.",
  "English Language":
    "Grammar, essay writing, comprehension, vocabulary, and effective communication.",
  "English Literature":
    "Critical analysis of prose, poetry, drama, and analytical literary appreciation.",
  "Business studies":
    "Operations, management principles, economics, and strategic business decision-making.",
  "Accounting":
    "Financial reporting, bookkeeping, managerial accounting, ledger management, and auditing.",
  "Marketing":
    "Market analysis, target demographics, digital marketing channels, and campaign strategy.",
  "Maths":
    "Algebra, calculus, geometry, statistics, and problem-solving techniques for exam success.",
  "Science":
    "Core physical and natural science fundamentals, scientific enquiry, and practical experiments.",
  "Commerce":
    "Commercial practices, trade mechanics, supply chain fundamentals, and business economics.",
  "Biology":
    "Cellular biology, genetics, human anatomy, ecosystems, and biological systems.",
  "Physics":
    "Mechanics, energy, wave motion, electromagnetism, and fundamental physical laws.",
  "Chemistry":
    "Organic & inorganic chemistry, chemical reactions, bonding, and laboratory methods.",
  "Professional development":
    "Career advancement, executive skills, workplace communication, and leadership.",
  "Spoken english":
    "Fluency, pronunciation, accent training, and confident public speaking.",
  "Personality building sessions":
    "Self-confidence, interpersonal skills, presentation, and personal branding.",
  "AI Courses":
    "Advanced AI tools, workflow automation, and modern tech integration for professionals.",
  "Business consultancy":
    "Strategic guidance, business planning, process optimization, and growth advisory.",
  "Financial Planning Support":
    "Budgeting, financial analysis, investment fundamentals, and fiscal strategy.",
  "Business strategy consultancy for small businesses and beginners":
    "Mentorship, startup roadmap planning, and scalable growth strategies for entrepreneurs.",
  "Marketing plan development":
    "Market research, digital marketing strategies, branding, and customer acquisition.",
  "Research and development services":
    "Academic & commercial R&D, methodology, innovation strategy, and technical reporting.",
};

export default function Subjects() {
  const [active, setActive] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const filter = SUBJECT_FILTERS[active];

  // Scroll handler for manual arrow clicks
  const handleScroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 320;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoPlay || isHovered || viewMode !== "grid") return;

    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, viewMode, active]);

  return (
    <section
      id="subjects"
      className="section-pad relative overflow-hidden bg-navy-deep text-snow"
    >
      {/* layered background */}
      <div className="pattern-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#1c3f7a]/40 blur-[130px]" />
      <Image
        src="/images/crest.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={590}
        className="pointer-events-none absolute -bottom-16 right-0 hidden w-[340px] opacity-[0.04] lg:block"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Guidance For Every Curriculum
          </span>
          <h2 className="section-title mt-4">Subjects &amp; Curricula</h2>
          <p className="mt-4 text-mist">
            Select a curriculum pathway below to explore subjects and professional services offered under each stream.
          </p>
        </div>

        {/* Top Controls: Tabs & View Toggle */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* pill-tab filter */}
          <div
            role="tablist"
            aria-label="Curriculum pathways"
            className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
          >
            {SUBJECT_FILTERS.map((f, i) => {
              const selected = i === active;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActive(i);
                    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                  }}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    selected ? "text-navy-deep" : "text-mist hover:text-snow"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gold-gradient"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <span
                    className={`ml-2 hidden text-xs font-normal sm:inline ${
                      selected ? "text-navy-deep/70" : "text-mist/60"
                    }`}
                  >
                    ({f.subjects.length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls: Auto-Scroll & Grid/Table Toggle */}
          <div className="flex items-center gap-3">
            {viewMode === "grid" && (
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`glass flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isAutoPlay ? "text-gold border border-gold/30" : "text-mist hover:text-snow"
                }`}
                title={isAutoPlay ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
              >
                {isAutoPlay ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Auto Scrolling
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Auto Scroll Off
                  </>
                )}
              </button>
            )}

            <div className="glass inline-flex items-center rounded-lg p-1 text-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-gold text-navy-deep font-bold"
                    : "text-mist hover:text-snow"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Row View
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  viewMode === "table"
                    ? "bg-gold text-navy-deep font-bold"
                    : "text-mist hover:text-snow"
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                Guidance Table
              </button>
            </div>
          </div>
        </div>

        {/* Content View */}
        {viewMode === "grid" ? (
          <div className="mt-8">
            {/* Row Navigation Bar */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-snow flex items-center gap-2">
                  {filter.label} Curriculum
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-normal text-gold">
                    {filter.subjects.length} Offerings
                  </span>
                </h3>
                <p className="text-xs text-mist">{filter.caption}</p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => handleScroll("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-snow transition-all hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => handleScroll("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-snow transition-all hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Single Row Horizontal Scroll Carousel */}
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="no-scrollbar flex overflow-x-auto gap-5 py-4 scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-nowrap gap-5"
                >
                  {filter.subjects.map((s, si) => {
                    const IconComponent = SUBJECT_ICONS[s] ?? BookOpen;
                    return (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * si }}
                        style={{ scrollSnapAlign: "start" }}
                        className="group card-surface relative flex h-[280px] w-72 flex-none flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift sm:w-80"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                              <IconComponent className="h-5 w-5" />
                            </span>
                            <span className="text-xs font-mono text-mist/40">
                              #{String(si + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h4 className="mt-4 font-display text-lg font-bold leading-snug text-snow group-hover:text-gold transition-colors">
                            {s}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-mist line-clamp-3">
                            {DESCRIPTIONS[s] ?? filter.caption}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {filter.label} Grouped
                          </span>
                          <a
                            href="/apply"
                            className="text-xs font-semibold text-snow hover:text-gold transition-colors underline decoration-gold/40 underline-offset-4"
                          >
                            Inquire Class →
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Table View matching the guidance overview matrix */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 overflow-x-auto rounded-xl border border-white/15 bg-navy-surface p-4 sm:p-6"
          >
            <div className="mb-4 text-center">
              <h3 className="font-display text-lg font-bold text-gold uppercase tracking-wider">
                Guidance for every curriculum
              </h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gold/30 bg-white/[0.04]">
                  {SUBJECT_FILTERS.map((f) => (
                    <th
                      key={f.key}
                      className="px-4 py-3 font-display text-base font-bold text-snow border-r border-white/10 last:border-r-0"
                    >
                      {f.label}
                      <span className="block text-xs font-normal text-mist font-sans">
                        {f.caption}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {Array.from({
                  length: Math.max(...SUBJECT_FILTERS.map((f) => f.subjects.length)),
                }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-white/[0.02]">
                    {SUBJECT_FILTERS.map((f) => {
                      const subject = f.subjects[rowIndex];
                      return (
                        <td
                          key={f.key}
                          className="px-4 py-3 text-mist border-r border-white/10 last:border-r-0 align-top"
                        >
                          {subject ? (
                            <div className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                              <span className="text-snow font-medium">
                                {subject}
                              </span>
                            </div>
                          ) : (
                            <span className="text-mist/20">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* footer summary badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm">
          <span className="text-xs uppercase tracking-wider text-mist/60">
            Curriculum Pathways
          </span>
          {SUBJECT_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setActive(SUBJECT_FILTERS.findIndex((x) => x.key === f.key));
                setViewMode("grid");
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
              className="border border-gold/40 px-4 py-1.5 text-gold-light hover:bg-gold hover:text-navy-deep transition-colors text-xs font-semibold"
            >
              {f.label} ({f.subjects.length} subjects)
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
