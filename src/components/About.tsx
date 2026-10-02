import { Check } from "lucide-react";
import Reveal from "./Reveal";

const FEATURES = [
  "Small-group & one-to-one sessions for focused attention",
  "Lessons mapped precisely to your exam syllabus",
  "Regular past-paper practice & timed mock exams",
  "Progress tracking with updates for parents",
  "Flexible in-person or online scheduling",
];

export default function About() {
  return (
    <section
      id="about"
      className="pt-12 lg:pt-16 pb-12 lg:pb-16 relative overflow-hidden bg-navy-deep"
    >
      {/* background image + overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=60"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep/70" />

      <div className="container-x relative flex flex-col items-center text-center max-w-4xl mx-auto">
        <Reveal>
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            About the Classes
          </span>
          <h2 className="section-title mt-4">
            Structured classes built for real results
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="w-full mt-12">
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="group flex w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors duration-300">
                  <Check className="h-6 w-6" strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium leading-relaxed text-mist group-hover:text-snow transition-colors duration-300">
                  {f}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a href="#contact" className="btn-gold">
              Apply for a Class
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
