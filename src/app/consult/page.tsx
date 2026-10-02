import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";
import { Phone, Mail, MapPin, TrendingUp, CheckCircle2, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a Consultation — CrownEd Business Advisory",
  description:
    "Tell us about your organisation, challenge or project. CrownEd's advisory team will assess your requirements and explore how we can support you. Serving Corporates, SMEs, Startups, Educational Institutions & Professionals.",
};

export default function ConsultPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-navy-deep text-snow pt-28 pb-20">
        {/* Background Effects */}
        <div className="pattern-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-gold/15 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 top-96 h-[500px] w-[500px] rounded-full bg-[#1c3f7a]/40 blur-[150px]" />
        <Image
          src="/images/logo_new.png"
          alt=""
          aria-hidden="true"
          width={520}
          height={590}
          className="pointer-events-none absolute top-40 right-10 hidden w-[320px] opacity-[0.04] lg:block"
        />

        <div className="container-x relative">
          {/* Page Header */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Reveal>
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold" />
                Strategic Business Advisory
              </span>
              <h1 className="section-title mt-4">Request a Consultation</h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-mist">
                Tell us about your organisation, challenge or project. Our team will assess your requirements and explore how we can support you.
              </p>
              {/* Who We Serve strip */}
              <div className="mt-6 inline-flex flex-wrap justify-center gap-2">
                {["Corporates", "SMEs", "Startups", "Educational Institutions", "Professionals"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-mist/50 uppercase tracking-widest font-semibold">Who We Serve</p>
            </Reveal>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left: Form (8 cols) */}
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <ConsultationForm />
              </Reveal>
            </div>

            {/* Right: Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Reveal delay={0.2}>
                <div className="card-surface rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h3 className="font-display text-xl font-bold text-snow">
                    Prefer to Talk Directly?
                  </h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">
                    Reach out directly via phone, WhatsApp, or email to discuss your requirements.
                  </p>

                  <div className="mt-6 space-y-4 text-sm">
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-gold hover:bg-gold/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-mist/60">Phone / WhatsApp</div>
                        <div className="font-semibold text-snow group-hover:text-gold transition-colors">{CONTACT_PHONE}</div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-gold hover:bg-gold/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-mist/60">Email</div>
                        <div className="font-semibold text-snow group-hover:text-gold transition-colors">{CONTACT_EMAIL}</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-mist/60">Location</div>
                        <div className="font-semibold text-snow">Colombo, Sri Lanka</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
                  <h4 className="font-display text-lg font-bold text-snow flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gold" />
                    Why Consult With CrownEd?
                  </h4>
                  <ul className="space-y-3 text-xs text-mist">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Strategic Insight:</strong> Experienced advisory across multiple industries.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Tailored Solutions:</strong> No cookie-cutter approach — every engagement is bespoke.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Flexible Engagement:</strong> Online, on-site, or hybrid — at your pace.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Confidential & Trusted:</strong> All engagements handled with full discretion.</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
