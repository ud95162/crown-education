"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

export default function Why() {
  return (
    <section id="why" className="section-pad bg-navy">
      <div className="container-x">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Why CrownEd
          </span>
        </div>

        {/* Two-column cards */}
        <div className="relative mt-14 grid gap-8 lg:grid-cols-2">
          {/* Center divider */}
          <div className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:block" />

          {/* ── Education Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="card-surface relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift sm:p-9"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center border border-gold/40 bg-navy-surface text-gold">
                <GraduationCap className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Local &amp; UK Education
                </span>
                <h3 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  Why CrownEd for Education?
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-mist">
              At CrownEd, <strong className="text-snow font-semibold">we&apos;ve got you covered.</strong>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-mist">
              From academic excellence to professional success, entrepreneurship,
              and becoming a changemaker, we guide you at every stage of your journey.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-mist">
              We give parents confidence in their children&apos;s future and learners
              the knowledge, direction, and foundation to succeed.
            </p>

            <p className="mt-6 text-sm font-bold leading-relaxed text-snow">
              Your journey, your potential, your crown. We&apos;re here to crown you.
            </p>

            <a href="/subjects" className="btn-outline mt-8 self-start">
              Explore Subjects
            </a>
          </motion.div>

          {/* ── Business Consultancy Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="card-surface relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift sm:p-9"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center border border-gold/40 bg-navy-surface text-gold">
                <Briefcase className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Business Consultation
                </span>
                <h3 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  Why CrownEd for Business Consultancy?
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-mist">
              If you dare to think beyond the ordinary,{" "}
              <strong className="text-snow font-semibold">CrownEd empowers you</strong>{" "}
              to turn bold ideas into meaningful growth, professional excellence,
              and business success.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-mist">
              From personal guidance to strategic business consultancy, we help you
              find clarity, overcome challenges, and turn ambitions into achievements.
            </p>

            <p className="mt-6 text-sm font-bold leading-relaxed text-snow">
              Your vision, your ambition, your legacy. We&apos;re here to crown you.
            </p>

            <a href="#consultation" className="btn-outline mt-8 self-start">
              Book a Consultation
            </a>
          </motion.div>
        </div>

        {/* Closing tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center font-display text-2xl font-bold text-snow sm:text-3xl"
        >
          Your crown awaits.
        </motion.p>
      </div>
    </section>
  );
}

