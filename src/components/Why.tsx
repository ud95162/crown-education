"use client";

import { motion } from "framer-motion";
import { WHY_POINTS } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Why CrownEd
          </span>
          <h2 className="section-title mt-4">
            More than tuition — a path to your best
          </h2>
          <p className="mt-4 text-ink">
            Every student follows the same proven journey with CrownEd.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* base track */}
          <div className="absolute left-7 top-7 bottom-7 w-0.5 -translate-x-1/2 bg-navy/10" />
          {/* animated gold fill that "draws" on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-7 top-7 bottom-7 w-0.5 origin-top -translate-x-1/2 bg-gold-gradient"
          />

          <ol className="relative space-y-10">
            {WHY_POINTS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex items-start gap-6"
              >
                {/* node */}
                <div className="relative z-10 flex-none">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-white font-serif text-lg font-bold text-navy shadow-gold transition-colors duration-300 group-hover:bg-gold-gradient">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* content */}
                <div className="flex-1 rounded-2xl border border-transparent bg-[#f7f8fa] px-6 py-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:bg-white group-hover:shadow-card">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-semibold text-navy">
                      {p.title}
                    </h3>
                    {i < WHY_POINTS.length - 1 && (
                      <span className="hidden text-xs font-semibold uppercase tracking-wider text-gold sm:inline">
                        Step {i + 1}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {p.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
