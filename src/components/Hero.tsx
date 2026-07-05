"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Stats from "./Stats";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-gradient pt-28 text-snow"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#1c3f7a]/40 blur-[130px]" />
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x grid items-center gap-10 pb-10 pt-6 lg:grid-cols-2 lg:gap-6 lg:pb-14 lg:pt-16">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Local · UK · Professional Tuition
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Education
            <br />
            That{" "}
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              Crowns You
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            Expert tuition across O/Levels, A/Levels and Professional levels —
            covering Edexcel, Cambridge, the Sri Lankan Local curriculum and all
            UK examination boards.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-gold">
              Apply for a Class
            </a>
            <a href="#subjects" className="btn-outline">
              Explore Subjects
            </a>
          </div>

          {/* stats */}
          <div className="mt-12">
            <Stats />
          </div>
        </motion.div>

        {/* Right portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[440px] items-end justify-center lg:min-h-[600px] lg:justify-end"
        >
          {/* geometric backdrops */}
          <div className="pointer-events-none absolute bottom-8 right-6 h-[380px] w-[380px] rotate-45 border border-gold/25 sm:right-12 lg:h-[460px] lg:w-[460px]" />
          <div className="pointer-events-none absolute bottom-24 right-20 h-[220px] w-[220px] rotate-12 border border-gold/15 lg:h-[280px] lg:w-[280px]" />
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-70" />
          {/* glow behind subject */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gold/25 blur-[100px] lg:left-auto lg:right-16 lg:translate-x-0" />

          <div className="relative z-10 flex items-end">
            <Image
              src="/images/teacher-hero-cutout.png"
              alt="CrownEd lead educator"
              width={560}
              height={1016}
              priority
              className="relative z-10 max-h-[460px] w-auto object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] lg:max-h-[600px]"
            />
          </div>

          {/* floating credential badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass absolute bottom-20 left-0 z-20 px-5 py-4 lg:left-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-gold">
                <GraduationCap className="h-5 w-5 text-navy-deep" strokeWidth={2} />
              </span>
              <div>
                <div className="font-display text-base font-bold text-snow">
                  Edexcel · Cambridge
                </div>
                <div className="text-xs text-mist">Certified curriculum tutor</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
