"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { SUBJECTS } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

const STEPS = ["About you", "Your goals", "Message"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  level: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const canNext =
    step === 0
      ? form.name && form.phone && form.email
      : step === 1
        ? form.level && form.subject
        : true;

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad bg-navy">
      <div className="container-x">
        <div className="relative overflow-hidden border border-white/10 bg-navy-surface px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          {/* background */}
          <div className="pattern-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 rounded-full bg-gold/15 blur-[120px]" />
          <Image
            src="/images/crest.png"
            alt=""
            aria-hidden="true"
            width={520}
            height={590}
            className="pointer-events-none absolute -bottom-20 -right-10 hidden w-[300px] opacity-[0.05] lg:block"
          />

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left info */}
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold" />
                Admissions
              </span>
              <h2 className="section-title mt-4">Apply for a class</h2>
              <p className="mt-5 max-w-md leading-relaxed text-mist">
                Tell us about the student in three quick steps and we&apos;ll
                confirm your place and class details.
              </p>

              <div className="mt-8 space-y-4">
                <Row icon={Phone} label="Phone / WhatsApp" value="+94 70 000 0000" />
                <Row icon={Mail} label="Email" value="hello@crowned.lk" />
                <Row icon={MapPin} label="Location" value="Sri Lanka" />
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-xs text-mist/70">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Your details are kept private &amp; never shared.
              </div>
            </Reveal>

            {/* Right wizard */}
            <Reveal delay={0.1}>
              <div className="glass p-6 sm:p-8">
                {status === "success" ? (
                  <SuccessPanel />
                ) : (
                  <>
                    {/* progress */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        {STEPS.map((label, i) => (
                          <div key={label} className="flex items-center gap-2">
                            <span
                              className={`flex h-7 w-7 items-center justify-center text-xs font-bold transition-colors ${
                                i < step
                                  ? "bg-gold text-navy-deep"
                                  : i === step
                                    ? "border border-gold text-gold"
                                    : "border border-white/15 text-mist/50"
                              }`}
                            >
                              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                            </span>
                            <span
                              className={`hidden text-xs font-medium sm:block ${
                                i <= step ? "text-snow" : "text-mist/50"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 h-1 w-full bg-white/10">
                        <motion.div
                          className="h-full bg-gold-gradient"
                          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>

                    {/* steps */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {step === 0 && (
                          <>
                            <Field label="Full name">
                              <input className="input" value={form.name} onChange={set("name")} placeholder="Your name" />
                            </Field>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field label="Phone">
                                <input className="input" type="tel" value={form.phone} onChange={set("phone")} placeholder="+94…" />
                              </Field>
                              <Field label="Email">
                                <input className="input" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                              </Field>
                            </div>
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <Field label="Level">
                              <select className="input" value={form.level} onChange={set("level")}>
                                <option value="" disabled>Select level</option>
                                <option>O/Level</option>
                                <option>A/Level</option>
                                <option>Professional</option>
                              </select>
                            </Field>
                            <Field label="Subject">
                              <select className="input" value={form.subject} onChange={set("subject")}>
                                <option value="" disabled>Select subject</option>
                                {SUBJECTS.map((s) => (
                                  <option key={s}>{s}</option>
                                ))}
                              </select>
                            </Field>
                          </>
                        )}

                        {step === 2 && (
                          <Field label="Message (optional)">
                            <textarea className="input resize-none" rows={5} value={form.message} onChange={set("message")} placeholder="What would you like help with?" />
                          </Field>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {status === "error" && (
                      <p className="mt-4 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        Something went wrong. Please try again or use WhatsApp.
                      </p>
                    )}

                    {/* nav */}
                    <div className="mt-8 flex items-center justify-between gap-4">
                      {step > 0 ? (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-snow"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                      ) : (
                        <span className="text-xs text-mist/50">
                          Step {step + 1} of {STEPS.length}
                        </span>
                      )}

                      {step < STEPS.length - 1 ? (
                        <button
                          onClick={() => canNext && setStep((s) => s + 1)}
                          disabled={!canNext}
                          className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Continue <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={submit}
                          disabled={status === "sending"}
                          className="btn-gold disabled:opacity-60"
                        >
                          {status === "sending" ? "Sending…" : "Submit Application"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <span className="flex h-16 w-16 items-center justify-center bg-gold">
        <Check className="h-8 w-8 text-navy-deep" strokeWidth={3} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-bold text-snow">
        Application received
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
        Thank you! We&apos;ve received your details and will be in touch shortly.
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist/70">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-white/[0.04]">
        <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-mist/60">{label}</div>
        <div className="font-medium text-snow">{value}</div>
      </div>
    </div>
  );
}
