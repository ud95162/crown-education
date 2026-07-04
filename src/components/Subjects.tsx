"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SUBJECT_FILTERS } from "@/lib/content";

// Placeholder cover images — swap these for the tutor's own photos later.
const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=70`;
const IMAGES: Record<string, string> = {
  Accounting: U("photo-1554224155-6726b3ff858f"),
  "Business Studies": U("photo-1486406146926-c627a92ad1ab"),
  "Business Consultancy": U("photo-1600880292203-757bb62b4baf"),
  "Professional Development": U("photo-1552581234-26160f608093"),
  English: U("photo-1519682337058-a94d519337bc"),
  Mathematics: U("photo-1509228468518-180dd4864904"),
  Science: U("photo-1532094349884-543bc11b234d"),
  Marketing: U("photo-1460925895917-afdab827c52f"),
};

export default function Subjects() {
  const [active, setActive] = useState(0);
  const filter = SUBJECT_FILTERS[active];

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

        {/* horizontal scrolling cards */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="subject-scroll flex snap-x gap-4 overflow-x-auto pb-4"
            >
              {filter.subjects.map((s, si) => {
                return (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + si * 0.05 }}
                    className="group card-surface flex w-52 flex-none snap-start flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift sm:w-56"
                  >
                    {/* top image */}
                    <div className="relative h-28 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={IMAGES[s]}
                        alt={s}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-surface via-navy-surface/30 to-transparent" />
                    </div>
                    {/* bottom content */}
                    <div className="flex items-center justify-between gap-2 px-4 py-3">
                      <div>
                        <h3 className="font-display text-base font-bold leading-snug text-snow">
                          {s}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-mist">
                          {filter.caption}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-none text-mist/40 transition-colors group-hover:text-gold" />
                    </div>
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
