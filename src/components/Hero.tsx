"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Stats from "./Stats";

type Slide = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

const SLIDES: Slide[] = [
  {
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
  {
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
                  className={`transition-all ease-out ${
                    isActive
                      ? "translate-y-0 opacity-100 delay-200 duration-500"
                      : "pointer-events-none translate-y-4 opacity-0 duration-200"
                  }`}
                >
                  <span className="eyebrow">
                    <span className="h-px w-8 bg-gold" />
                    {s.eyebrow}
                  </span>

                  <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                    {s.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
                    {s.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a href={s.cta.href} className="btn-gold">
                      {s.cta.label}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* slide indicators */}
          <div className="mt-8 flex items-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-gold" : "w-3 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
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
          className="relative flex min-h-[440px] items-end justify-center self-end lg:min-h-[620px] lg:justify-end"
        >
          {/* geometric backdrops */}
          <div className="hero-square-a pointer-events-none absolute bottom-8 right-6 h-[380px] w-[380px] border border-gold/25 sm:right-12 lg:h-[460px] lg:w-[460px]" />
          <div className="hero-square-b pointer-events-none absolute bottom-24 right-20 h-[220px] w-[220px] border border-gold/15 lg:h-[280px] lg:w-[280px]" />
          {/* glow behind subject */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gold/25 blur-[100px] lg:left-auto lg:right-16 lg:translate-x-0" />

          {/* Portrait crossfades with the active slide; fixed height keeps
              the layout steady. */}
          <div className="relative z-10 h-[480px] w-full leading-none lg:h-[620px]">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end transition-opacity ease-out lg:left-auto lg:right-0 lg:translate-x-0 ${
                    isActive ? "opacity-100 delay-200 duration-500" : "opacity-0 duration-200"
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
          </div>

          {/* floating credential badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass absolute bottom-12 left-0 z-20 px-5 py-4 sm:left-4 lg:left-0"
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
