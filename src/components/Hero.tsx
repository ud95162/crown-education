"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { STATS } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-gradient pt-28 text-white"
    >
      {/* decorative gold glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gold-light/10 blur-[120px]" />

      <div className="container-x grid items-center gap-10 pb-8 lg:grid-cols-2 lg:gap-6 lg:pb-0">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 py-10 lg:py-24"
        >
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Local · UK · Professional Tuition
          </span>

          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Education That
            <br />
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              Crowns You
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Expert tuition across O/Levels, A/Levels and Professional levels —
            covering Edexcel, Cambridge, the Sri Lankan Local curriculum and all
            UK examination boards.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-gold">
              Book a Free Consultation
            </a>
            <a href="#subjects" className="btn-outline">
              Explore Subjects
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl font-semibold text-gold sm:text-3xl">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[420px] items-end justify-center lg:min-h-[560px] lg:justify-end"
        >
          {/* --- pattern backdrop --- */}
          {/* dotted texture */}
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-[0.5]" />
          {/* concentric gold rings */}
          <div className="pointer-events-none absolute bottom-4 right-2 h-[360px] w-[360px] rounded-full border border-gold/30 sm:right-8 lg:h-[440px] lg:w-[440px]" />
          <div className="pointer-events-none absolute bottom-16 right-14 h-[240px] w-[240px] rounded-full border border-gold/20 sm:right-20 lg:h-[300px] lg:w-[300px]" />
          {/* glowing podium disc behind subject */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gold/25 blur-[90px] lg:left-auto lg:right-16 lg:translate-x-0" />

          <div className="relative z-10 flex items-end">
            <Image
              src="/images/teacher-hero-cutout.png"
              alt="CrownEd lead educator"
              width={560}
              height={1016}
              priority
              className="relative z-10 max-h-[440px] w-auto object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)] lg:max-h-[580px]"
            />
          </div>

          {/* floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-16 left-0 z-20 rounded-2xl bg-white/95 px-5 py-4 shadow-card backdrop-blur lg:left-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <div className="font-serif text-lg font-semibold text-navy">
                  Edexcel · Cambridge
                </div>
                <div className="text-xs text-ink">Certified curriculum tutor</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* wave divider */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 80h1440V40c-240 30-480 40-720 40S240 60 0 40v40z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
