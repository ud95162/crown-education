import Image from "next/image";
import { Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section-pad bg-navy">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* B&W portrait */}
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold/40" />
            <div className="relative overflow-hidden bg-navy-surface shadow-lift">
              <Image
                src="/images/teacher-about.jpg"
                alt="CrownEd lead educator"
                width={560}
                height={640}
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.1}>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Our Philosophy
          </span>
          <Quote className="mt-6 h-11 w-11 fill-gold text-gold" />
          <blockquote className="mt-4 font-display text-3xl font-medium italic leading-tight text-snow sm:text-4xl">
            &ldquo;Nothing is beyond the reach of one who is truly determined.&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <div className="font-display text-2xl font-semibold text-gold">
              Sandani Kumari
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
              Founder, Consultant &amp; Lead Tutor
            </div>
          </figcaption>

          <p className="mt-6 max-w-xl leading-relaxed text-mist">
            With extensive experience in the education industry across local and UK curricula, as an academic and researcher, Ms. Sandani Kumari founded CrownEd to provide meaningful, evidence-based support that goes beyond traditional education.          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-mist">
            CrownEd brings together education, business consultancy, research and development, marketing strategy, and professional and career development to empower individuals and organisations to grow, adapt, and achieve long-term success.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
