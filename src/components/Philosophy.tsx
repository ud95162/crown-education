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
            &ldquo;True education is not the filling of a vessel, but the
            kindling of a flame that burns for a lifetime.&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <div className="font-display text-2xl font-semibold text-gold">
              Ms Sadani Kumari
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
              Founder &amp; Lead Tutor
            </div>
          </figcaption>

          <p className="mt-6 max-w-xl leading-relaxed text-mist">
            With years of experience in private education across local and UK
            curricula, Ms Sadani Kumari founded CrownEd to offer mentorship that
            goes beyond textbooks — combining rigorous academic discipline with
            the empathy required to guide every student through their most
            formative years.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
