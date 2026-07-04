"use client";

import { motion } from "framer-motion";
import { WHY_POINTS } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="section-pad bg-navy">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Why CrownEd
          </span>
          <h2 className="section-title mt-4">
            More than tuition — a path to your best
          </h2>
          <p className="mt-4 text-mist">
            Every student follows the same proven journey with CrownEd.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-7 top-7 bottom-7 w-px -translate-x-1/2 bg-white/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-7 top-7 bottom-7 w-px origin-top -translate-x-1/2 bg-gold-gradient"
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
                <div className="relative z-10 flex-none">
                  <span className="flex h-14 w-14 items-center justify-center border-2 border-gold bg-navy-surface font-display text-lg font-bold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 card-surface px-6 py-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:shadow-lift">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-bold text-snow">
                      {p.title}
                    </h3>
                    {i < WHY_POINTS.length - 1 && (
                      <span className="hidden text-xs font-semibold uppercase tracking-wider text-gold sm:inline">
                        Step {i + 1}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
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
