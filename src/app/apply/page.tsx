import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/ApplyForm";
import Reveal from "@/components/Reveal";
import { Phone, Mail, MapPin, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apply Now — CrownEd Tuition & Business Consultancy",
  description:
    "Register for Local, UK Education (Edexcel/Cambridge) and Professional Development courses at CrownEd. Complete the online student application form.",
};

export default function ApplyPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-navy-deep text-snow pt-28 pb-20">
        {/* Layered Background Effects */}
        <div className="pattern-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-gold/15 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 top-96 h-[500px] w-[500px] rounded-full bg-[#1c3f7a]/40 blur-[150px]" />
        <Image
          src="/images/crest.png"
          alt=""
          aria-hidden="true"
          width={520}
          height={590}
          className="pointer-events-none absolute top-40 right-10 hidden w-[320px] opacity-[0.04] lg:block"
        />

        <div className="container-x relative">
          {/* Header Banner */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Reveal>
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold" />
                Admissions &amp; Registration
              </span>
              <h1 className="section-title mt-4">Student Application Form</h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-mist">
                Take the first step towards academic mastery and professional growth. Fill out the application form below and our team will confirm your placement.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Main Form (8 cols) */}
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <ApplyForm />
              </Reveal>
            </div>

            {/* Right Information Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Reveal delay={0.2}>
                <div className="card-surface rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h3 className="font-display text-xl font-bold text-snow">
                    Need Direct Assistance?
                  </h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">
                    Have questions about class schedules, syllabi, or fee structures? Reach out directly via phone, WhatsApp, or email.
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
                    <Award className="h-5 w-5 text-gold" />
                    Why Apply With CrownEd?
                  </h4>

                  <ul className="space-y-3 text-xs text-mist">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Multi-Curriculum Mastery:</strong> Local, Edexcel &amp; Cambridge guidance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Flexible Learning Modes:</strong> Online, Onsite, Individual &amp; Group.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Structured Exam Practice:</strong> Past paper techniques &amp; grade boosting.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Confidential &amp; Verified:</strong> Private parent/student support.</span>
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
