"use client";

import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { SUBJECTS } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-gradient px-6 py-12 shadow-card sm:px-10 lg:px-14 lg:py-16">
          {/* layered background */}
          <div className="pattern-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#1c3f7a]/50 blur-[120px]" />
          <Image
            src="/images/crest.png"
            alt=""
            aria-hidden="true"
            width={520}
            height={590}
            className="pointer-events-none absolute -bottom-20 -right-10 hidden w-[320px] opacity-[0.06] lg:block"
          />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold" />
                Get Started
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Book a free consultation
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/75">
                Tell us about the student and what you&apos;re looking for.
                We&apos;ll get back to you with the right plan — no obligation.
              </p>

          <div className="mt-8 space-y-4">
            <ContactRow icon={Phone} label="Phone / WhatsApp" value="+94 70 000 0000" />
            <ContactRow icon={Mail} label="Email" value="hello@crowned.lk" />
            <ContactRow icon={MapPin} label="Location" value="Sri Lanka" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-card"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Full name" required />
              <Field name="phone" label="Phone" type="tel" required />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field name="email" label="Email" type="email" required />
              <div>
                <Label>Level</Label>
                <select name="level" className="input" defaultValue="">
                  <option value="" disabled>
                    Select level
                  </option>
                  <option>O/Level</option>
                  <option>A/Level</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Label>Subject</Label>
              <select name="subject" className="input" defaultValue="">
                <option value="" disabled>
                  Select subject
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <Label>Message</Label>
              <textarea
                name="message"
                rows={4}
                className="input resize-none"
                placeholder="What would you like help with?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold mt-6 w-full !text-navy disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Inquiry"}
            </button>

            {status === "success" && (
              <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                Thank you! Your inquiry has been received. We&apos;ll be in touch
                shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                Something went wrong. Please try again or WhatsApp us directly.
              </p>
            )}
          </form>
        </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(11,35,75,0.15);
          background: #fff;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #0B234B;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: #D4A12A;
          box-shadow: 0 0 0 3px rgba(212,161,42,0.15);
        }
      `}</style>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
      {children}
    </label>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} required={required} className="input" />
    </div>
  );
}

function ContactRow({
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
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-white/10">
        <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">
          {label}
        </div>
        <div className="font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
