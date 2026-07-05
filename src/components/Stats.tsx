"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/content";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="glass rounded-xl px-4 py-4 transition-colors duration-300 hover:border-gold/50"
        >
          <div className="font-display text-2xl font-bold text-gold sm:text-3xl">
            <CountUp to={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-mist">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
