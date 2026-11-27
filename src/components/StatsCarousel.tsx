"use client";

import { useEffect, useState } from "react";
import { STATS } from "@/lib/content";

export default function StatsCarousel() {
  const [active, setActive] = useState(0);

  // Auto-advance through the stats
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STATS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="w-full shrink-0 px-0.5">
              <div className="glass flex flex-col items-center rounded-2xl px-5 py-6 text-center">
                <div className="font-display text-4xl font-bold text-gold">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-snow">
                  {s.label}
                </div>
                <div className="mt-1 text-[11px] text-mist/80">{s.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {STATS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${s.label}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
