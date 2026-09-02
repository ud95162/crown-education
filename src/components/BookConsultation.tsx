"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  BookOpen,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Send,
  ShieldCheck,
} from "lucide-react";
import Reveal from "./Reveal";
import { SUBJECTS, WHATSAPP_NUMBER } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookConsultation() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    curriculum: "Local",
    subject: "General Consultation",
    preferredDate: "",
    preferredTime: "Morning (9 AM - 12 PM)",
    message: "",
  });

  const setField = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setErrorMessage("Please enter your name and phone number.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contactNumber: form.phone,
          email: form.email,
          curriculum: form.curriculum,
          subject: form.subject,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || "Failed to book consultation. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again or WhatsApp us.");
      setStatus("error");
    }
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi CrownEd! I've booked a consultation session. Name: ${form.name}, Curriculum: ${form.curriculum}, Subject: ${form.subject}.`
  )}`;

  return (
    <section id="consultation" className="section-pad relative overflow-hidden bg-navy-gradient text-snow">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-[#1c3f7a]/30 blur-[130px]" />
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            1-on-1 Academic Advisory
          </span>
          <h2 className="section-title mt-4">Book a Free Consultation</h2>
          <p className="mt-4 text-base text-mist sm:text-lg">
            Schedule a personalized session with our lead educator to discuss curriculum selection, exam strategy, and tailored tutoring plans.
          </p>
        </div>



        <div className="mt-12 mx-auto max-w-2xl">
          <div className="glass border border-white/10 p-6 sm:p-10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/40">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-snow">
                    Consultation Requested!
                  </h3>
                  <p className="mt-3 text-mist max-w-md mx-auto">
                    Thank you, <strong className="text-gold">{form.name}</strong>. We have received your booking and sent an email notification to our admissions team.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" /> Connect via WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm({
                          name: "",
                          phone: "",
                          email: "",
                          curriculum: "Local",
                          subject: "General Consultation",
                          preferredDate: "",
                          preferredTime: "Morning (9 AM - 12 PM)",
                          message: "",
                        });
                      }}
                      className="btn-outline"
                    >
                      Book Another Session
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kasun Perera"
                          value={form.name}
                          onChange={setField("name")}
                          className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow placeholder:text-mist/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Phone / WhatsApp <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +94 77 123 4567"
                          value={form.phone}
                          onChange={setField("phone")}
                          className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow placeholder:text-mist/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Email Address <span className="text-mist/50">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                        <input
                          type="email"
                          placeholder="kasun@example.com"
                          value={form.email}
                          onChange={setField("email")}
                          className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow placeholder:text-mist/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    {/* Curriculum */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Curriculum Stream
                      </label>
                      <select
                        value={form.curriculum}
                        onChange={setField("curriculum")}
                        className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 px-4 text-sm text-snow focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value="Local">Local (Sri Lankan Syllabus)</option>
                        <option value="UK Education">UK Education (Edexcel / Cambridge)</option>
                        <option value="Professional">Professional & Career Coaching</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Subject Interest
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                        <select
                          value={form.subject}
                          onChange={setField("subject")}
                          className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        >
                          <option value="General Consultation">General Consultation / Guidance</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={setField("preferredDate")}
                          className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-mist/60" />
                      <select
                        value={form.preferredTime}
                        onChange={setField("preferredTime")}
                        className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 pl-10 pr-4 text-sm text-snow focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-mist mb-2">
                      Any Specific Questions / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you'd like to discuss during the consultation..."
                      value={form.message}
                      onChange={setField("message")}
                      className="w-full rounded-lg border border-white/10 bg-navy-deep/70 py-3 px-4 text-sm text-snow placeholder:text-mist/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold shadow-lg shadow-gold/10"
                  >
                    {status === "submitting" ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-spin" /> Submitting Booking...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Confirm Consultation Booking
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-mist/70 pt-2">
                    <ShieldCheck className="h-4 w-4 text-gold" />
                    Instant Gmail notification &amp; privacy guaranteed.
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
