"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Stats from "./Stats";

type Slide = {
  shortTitle: string;
  shortDesc: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

const SLIDES: Slide[] = [
  {
    shortTitle: "Business Advisory",
    shortDesc: "Strategic Consultation",
    eyebrow: "Strategic Business Advisory",
    title: (
      <>
        <span className="bg-gold-gradient bg-clip-text text-transparent">
          Strategy
        </span>
        <br />
        That Crowns You
      </>
    ),
    description:
      "Strategic business consulting, professional development, and tailored solutions to help organizations enhance performance, achieve sustainable growth, and turn their vision into measurable results.",
    cta: { label: "Business Consultation", href: "#consultation" },
    image: "/images/business_consult.png",
    imageAlt: "CrownEd business consultant",
  },
  {
    shortTitle: "Academic Tuition",
    shortDesc: "Local & UK Curricula",
    eyebrow: "Local · UK · Professional Tuition",
    title: (
      <>
        Education
        <br />
        That{" "}
        <span className="bg-gold-gradient bg-clip-text text-transparent">
          Crowns You
        </span>
      </>
    ),
    description:
      "Expert tuition across O/Levels, A/Levels and Professional levels — covering Edexcel, Cambridge, the Sri Lankan Local curriculum and all UK examination boards.",
    cta: { label: "Apply for a Class", href: "/apply" },
    image: "/images/teacher-hero-cutout.png",
    imageAlt: "CrownEd lead educator",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-gradient pt-28 text-snow"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#1c3f7a]/40 blur-[130px]" />
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" />
      {/* Wide animated dot field spanning the hero */}
      <div className="pattern-dots pointer-events-none absolute inset-0" />

      <div className="container-x grid items-end gap-10 pt-6 lg:grid-cols-2 lg:gap-6 lg:pt-16">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 pb-10 lg:pb-16"
        >
          {/* All slides share one grid cell, so the block is always as tall
              as the tallest slide — the portrait on the right never shifts. */}
          <div className="grid">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  style={{ gridArea: "1 / 1" }}
                  aria-hidden={!isActive}
                  className={`transition-all ease-out ${isActive
                    ? "translate-y-0 opacity-100 delay-200 duration-500"
                    : "pointer-events-none translate-y-4 opacity-0 duration-200"
                    }`}
                >
                  <span className="eyebrow block">
                    <span className="h-px w-8 bg-gold inline-block" />
                    {s.eyebrow}
                  </span>

                  <h1 className="mt-5 uppercase font-display text-3xl font-bold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                    {s.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
                    {s.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a
                      href="#consultation"
                      className="btn-gold uppercase flex items-center gap-2 shadow-gold transition-transform duration-200 hover:scale-105"
                    >
                      Book Free Consultation
                    </a>
                    <a
                      href="/apply"
                      className="btn-outline uppercase flex items-center gap-2"
                    >
                      Apply for Class
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini-Screen Slide Switchers */}
          <div className="mt-8">

            <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
              {SLIDES.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition-all duration-300 ${isActive
                      ? "border-gold/80 bg-navy-surface/95 shadow-[0_4px_24px_rgba(212,175,55,0.25)] ring-1 ring-gold/40 scale-[1.02]"
                      : "border-white/10 bg-navy-surface/40 opacity-70 hover:border-white/30 hover:opacity-100"
                      }`}
                  >
                    {/* Mini-screen visual container */}
                    <div className="relative h-12 w-14 sm:h-14 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/15 bg-navy-deep">
                      {/* Screen bezel reflection */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-navy-deep/80 via-transparent to-white/10" />
                      <Image
                        src={s.image}
                        alt={s.shortTitle}
                        fill
                        sizes="64px"
                        className={`object-cover object-top transition-transform duration-500 ${isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                          }`}
                      />
                      {/* Screen active indicator dot */}
                      <span
                        className={`absolute right-1.5 top-1.5 z-20 h-2 w-2 rounded-full ${isActive
                          ? "bg-gold shadow-[0_0_8px_#D4AF37] animate-pulse"
                          : "bg-white/30"
                          }`}
                      />
                    </div>

                    {/* Mini-screen text content */}
                    <div className="min-w-0 flex-1 pr-1">
                      <div className="truncate text-xs font-bold text-snow sm:text-sm">
                        {s.shortTitle}
                      </div>
                      <div className="truncate text-[10px] text-mist/80 sm:text-[11px]">
                        {s.shortDesc}
                      </div>
                    </div>

                    {/* Progress bar for the active mini-screen */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-white/10">
                        <motion.div
                          key={`progress-${active}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6, ease: "linear" }}
                          className="h-full bg-gold-gradient shadow-gold"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Right portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center self-end lg:items-end pt-6"
        >
          {/* geometric backdrops */}
          <div className="hero-square-a pointer-events-none absolute bottom-20 right-6 h-[380px] w-[380px] border border-gold/25 sm:right-12 lg:h-[460px] lg:w-[460px]" />
          <div className="hero-square-b pointer-events-none absolute bottom-36 right-20 h-[220px] w-[220px] border border-gold/15 lg:h-[280px] lg:w-[280px]" />
          {/* glow behind subject */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gold/25 blur-[100px] lg:left-auto lg:right-16 lg:translate-x-0" />

          {/* Portrait crossfades with the active slide; fixed height keeps
              the layout steady. */}
          <div className="relative z-10 h-[480px] w-full leading-none lg:h-[580px]">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end transition-opacity ease-out lg:left-auto lg:right-0 lg:translate-x-0 ${isActive ? "opacity-100 delay-200 duration-500" : "opacity-0 duration-200"
                    }`}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={560}
                    height={1016}
                    priority={i === 0}
                    className="block max-h-[480px] w-auto align-bottom object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] lg:max-h-[620px]"
                  />
                </div>
              );
            })}
            {/* Stats overlay at bottom of portrait */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3">
              <div className="rounded-2xl border border-white/10 bg-navy-deep/70 backdrop-blur-md px-4 py-3">
                <Stats />
              </div>
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
