"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Building2,
  Handshake,
  Rocket,
  BookOpen,
  Sigma,
  FlaskConical,
  Megaphone,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { LEVELS } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Accounting: Calculator,
  "Business Studies": Building2,
  "Business Consultancy": Handshake,
  "Professional Development": Rocket,
  English: BookOpen,
  Mathematics: Sigma,
  Science: FlaskConical,
  Marketing: Megaphone,
};

export default function Subjects() {
  const [active, setActive] = useState(0);
  const level = LEVELS[active];

  return (
    <section
      id="subjects"
      className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28"
    >
      {/* layered background */}
      <div className="pattern-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#1c3f7a]/50 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/5 blur-[110px]" />
      {/* faint crest watermark */}
      <Image
        src="/images/crest.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={590}
        className="pointer-events-none absolute -bottom-16 right-0 hidden w-[360px] opacity-[0.05] lg:block"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            What You Can Learn
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
            Subjects &amp; Levels
          </h2>
          <p className="mt-4 text-white/70">
            Choose a level to see the subjects and curricula covered.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          {/* Level selector */}
          <div
            role="tablist"
            aria-label="Levels"
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {LEVELS.map((l, i) => {
              const selected = i === active;
              return (
                <button
                  key={l.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`group relative flex-none rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:flex-1 ${
                    selected
                      ? "border-gold/60 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg font-serif text-sm font-bold transition-colors ${
                        selected
                          ? "bg-gold-gradient text-navy"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-serif text-lg font-semibold leading-tight">
                        {l.name}
                      </div>
                      <div className="hidden text-xs text-white/55 sm:block">
                        {l.tagline}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="min-h-[320px] rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={level.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-gold-light">
                    {level.name}
                  </h3>
                  <span className="text-sm text-white/55">{level.tagline}</span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  {level.desc}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {level.subjects.map((s, si) => {
                    const Icon = ICONS[s] ?? GraduationCap;
                    return (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + si * 0.05 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-gold/50 hover:bg-white/[0.07]"
                      >
                        <Icon className="h-5 w-5 flex-none text-gold" strokeWidth={2} />
                        <span className="text-sm font-medium">{s}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/45">
                    Curricula
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.curricula.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold-light"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
