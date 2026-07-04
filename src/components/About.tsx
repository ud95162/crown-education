import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "./Reveal";

const QUALS = [
  "Multi-curriculum tutor — Local, Edexcel & Cambridge",
  "Specialist in Accounting, Business & Professional studies",
  "Proven exam preparation & results-focused coaching",
  "Personalised, student-first teaching approach",
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-navy-deep">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/40" />
            <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-gold/10" />
            <div className="relative overflow-hidden bg-navy-surface shadow-lift">
              <Image
                src="/images/teacher-about.jpg"
                alt="CrownEd lead educator portrait"
                width={560}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            About the Educator
          </span>
          <h2 className="section-title mt-4">
            A dedicated tutor with a passion for results
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            With years of experience guiding students across multiple levels and
            curricula, CrownEd is built on a simple belief: every student
            deserves teaching tailored to how they learn. From O/Level
            foundations to A/Level mastery and professional development, lessons
            are structured, engaging and focused on measurable progress.
          </p>

          <ul className="mt-7 space-y-3">
            {QUALS.map((q) => (
              <li key={q} className="flex items-start gap-3 text-sm text-snow">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center bg-gold text-navy-deep">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {q}
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-gold mt-9">
            Apply Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
