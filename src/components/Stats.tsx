"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, TrendingUp, BookOpen, type LucideIcon } from "lucide-react";
import { STATS } from "@/lib/content";

const ICONS: LucideIcon[] = [Award, Users, TrendingUp, BookOpen];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1300;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-navy-deep py-16 lg:py-20">
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group card-surface rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift lg:p-8"
              >
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 transition-colors group-hover:bg-gold group-hover:[&>svg]:text-navy-deep">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
                </span>
                <div className="font-display text-4xl font-bold tracking-tight text-gold sm:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-display text-sm font-semibold uppercase tracking-wider text-snow">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-mist">{s.caption}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
