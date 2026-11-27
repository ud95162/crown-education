"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function FeatureCarousel({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);

  // Auto-advance through the feature cards
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="sm:hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {items.map((f) => (
            <div key={f} className="w-full shrink-0 px-1">
              <div className="flex min-h-[190px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Check className="h-6 w-6" strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium leading-relaxed text-mist">
                  {f}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((f, i) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show feature ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
