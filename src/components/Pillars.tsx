"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, Globe2, Briefcase, type LucideIcon } from "lucide-react";
import { PILLARS } from "@/lib/content";

const PILLAR_ICONS: LucideIcon[] = [Landmark, Globe2, Briefcase];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.9, delay: 0.25 + i * 0.15 } },
  }),
};

export default function Pillars() {
  return (
    <section id="pillars" className="bg-[#f7f8fa] py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Three Pathways, One Standard
          </span>
          <h2 className="section-title mt-4">Guidance for every curriculum</h2>
          <p className="mt-4 text-ink">
            Three routes for every learner — all held to the same standard of
            teaching and results.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* --- Central hub --- */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-full bg-gold-gradient p-[3px] shadow-gold">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
                  <Image
                    src="/images/crest.png"
                    alt="CrownEd"
                    width={72}
                    height={82}
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light shadow">
                One Standard
              </span>
            </motion.div>
          </div>

          {/* --- Converging connectors (desktop) --- */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="mt-4 hidden h-24 w-full lg:block"
            aria-hidden="true"
          >
            {[
              "M50 0 C 50 60, 16 42, 16 100",
              "M50 0 L 50 100",
              "M50 0 C 50 60, 84 42, 84 100",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#D4A12A"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                variants={draw}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              />
            ))}
          </svg>

          {/* mobile connector */}
          <div className="mx-auto my-6 h-10 w-0.5 bg-gold-gradient lg:hidden" />

          {/* --- Pathway nodes --- */}
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Landmark;
              return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className="group relative rounded-2xl border border-navy/10 bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
              >
                {/* connection dot */}
                <span className="absolute -top-1.5 left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-gold ring-4 ring-[#f7f8fa] lg:block" />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy transition-colors group-hover:bg-gold-gradient">
                  <Icon
                    className="h-7 w-7 text-gold transition-colors group-hover:text-navy"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-navy">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">{p.desc}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
