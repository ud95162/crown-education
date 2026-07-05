"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SUBJECT_FILTERS } from "@/lib/content";

const DESCRIPTIONS: Record<string, string> = {
  Accounting: "Financial reporting and taxation mastery.",
  "Business Studies": "Strategy, economics and market analysis.",
  "Business Consultancy": "Advisory skills for real-world business.",
  "Professional Development": "Career-ready skills and workplace confidence.",
  English: "Literature and rhetoric for advanced learners.",
  Mathematics: "From core concepts to advanced problem-solving.",
  Science: "Theory and practicals across the disciplines.",
  Marketing: "Branding, digital and consumer insight.",
};

export default function Subjects() {
  const [active, setActive] = useState(0);
  const filter = SUBJECT_FILTERS[active];

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: number) => {
    const el = scrollRef.current ?? document.getElementById("subject-scroller");
    if (!el) return;
    el.scrollLeft += dir * 320;
  };

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
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            What You Can Learn
          </span>
          <h2 className="section-title mt-4">Subjects &amp; Curricula</h2>
          <p className="mt-4 text-mist">
            Filter by pathway to explore the subjects offered across each
            curriculum.
          </p>
        </div>

        {/* pill-tab filter */}
        <div className="mt-10 flex justify-center">
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
                  onClick={() => setActive(i)}
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
                    {f.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* scroll controls */}
        <div className="mt-10 flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Previous subjects"
            onClick={() => scrollByCards(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next subjects"
            onClick={() => scrollByCards(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* horizontal scrolling cards */}
        <div
          ref={scrollRef}
          id="subject-scroller"
          className="subject-scroll mt-4 flex overflow-x-auto pb-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-none gap-4"
            >
              {filter.subjects.map((s, si) => {
                return (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + si * 0.05 }}
                    className="group card-surface relative flex min-h-[260px] w-64 flex-none flex-col justify-end overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift sm:w-72"
                  >
                    {/* ghost number */}
                    <span className="pointer-events-none absolute right-5 top-4 font-display text-6xl font-bold text-white/[0.06] transition-colors duration-300 group-hover:text-gold/20">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-snug text-snow">
                      {s}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {DESCRIPTIONS[s] ?? filter.caption}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* level chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm">
          <span className="text-xs uppercase tracking-wider text-mist/60">
            Available for
          </span>
          {["O/Level", "A/Level", "Professional"].map((c) => (
            <span
              key={c}
              className="border border-gold/40 px-4 py-1.5 text-gold-light"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
