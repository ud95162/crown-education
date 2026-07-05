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
      className="section-pad relative overflow-hidden bg-navy-deep"
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

      <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            About the Classes
          </span>
          <h2 className="section-title mt-4">
            Structured classes built for real results
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            Every CrownEd class is designed around one goal — measurable
            progress. Lessons follow a clear structure aligned to your
            curriculum, blend theory with exam technique, and adapt to each
            student&apos;s pace, so you always know exactly where you stand and
            what comes next.
          </p>
          <a href="#contact" className="btn-gold mt-9">
            Apply for a Class
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="space-y-4 lg:pt-2">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-4 border-b border-white/10 pb-4 text-snow"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center bg-gold text-navy-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
