"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Send,
  ShieldCheck,
  User,
  Building2,
  MessageCircle,
  Sparkles,
  Briefcase,
  Target,
  FileText,
} from "lucide-react";
import { WHATSAPP_NUMBER, CONTACT_PHONE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const ORG_TYPES = [
  "Corporate",
  "SME",
  "Startup",
  "Educational Institution",
  "Professional / Individual",
  "Other",
];

const SERVICE_AREAS = [
  "Business Strategy",
  "Organisational Development",
  "Professional Development",
  "Performance Improvement",
  "Project Management",
  "Educational Consulting",
  "Financial Advisory",
  "HR & People Management",
  "Marketing & Growth",
  "Other",
];

const ENGAGEMENT_MODES = ["Online", "On-site", "Hybrid"];

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    role: "",
    contactNumber: "",
    email: "",
    orgType: "",
    serviceAreas: [] as string[],
    engagementMode: "Online",
    challenge: "",
    timeline: "",
    additionalNotes: "",
  });

  const toggleService = (area: string) => {
    setFormData((prev) => {
      const exists = prev.serviceAreas.includes(area);
      return {
        ...prev,
        serviceAreas: exists
          ? prev.serviceAreas.filter((s) => s !== area)
          : [...prev.serviceAreas, area],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactNumber) {
      alert("Please fill in your name and contact number.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "consultation" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const getWhatsAppLink = () => {
    const text = `*New Consultation Request — CrownEd*

👤 *Name:* ${formData.name}
🏢 *Organisation:* ${formData.organisation || "N/A"}
💼 *Role / Title:* ${formData.role || "N/A"}
🏷️ *Organisation Type:* ${formData.orgType || "N/A"}
📞 *Contact Number:* ${formData.contactNumber}
📧 *Email:* ${formData.email || "N/A"}

🎯 *Service Areas:* ${formData.serviceAreas.length > 0 ? formData.serviceAreas.join(", ") : "N/A"}
💻 *Engagement Mode:* ${formData.engagementMode}
⏳ *Timeline:* ${formData.timeline || "N/A"}

📋 *Challenge / Project Brief:*
${formData.challenge || "N/A"}

📝 *Additional Notes:* ${formData.additionalNotes || "None"}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setStatus("idle");
    setFormData({
      name: "",
      organisation: "",
      role: "",
      contactNumber: "",
      email: "",
      orgType: "",
      serviceAreas: [],
      engagementMode: "Online",
      challenge: "",
      timeline: "",
      additionalNotes: "",
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-surface p-6 sm:p-10 shadow-2xl">
      <div className="pattern-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 py-12 text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/40">
            <Check className="h-10 w-10" strokeWidth={3} />
          </div>
          <h3 className="mt-6 font-display text-3xl font-bold text-snow">
            Request Submitted Successfully!
          </h3>
          <p className="mt-3 mx-auto max-w-md text-base leading-relaxed text-mist">
            Thank you, <span className="text-gold font-semibold">{formData.name}</span>. Our team will review your requirements and reach out shortly to discuss next steps.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Send Copy via WhatsApp
            </a>
            <button onClick={resetForm} className="btn-outline">
              Submit Another Request
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Business Consultation
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-snow">
              Tell Us About Your Organisation
            </h2>
            <p className="mt-1 text-sm text-mist">
              Share your challenge or project brief. Our team will assess your requirements and explore how we can best support you.
            </p>
          </div>

          {/* Section 1: Contact Details */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <User className="h-4 w-4" /> 1. Your Contact Details
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Full Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Role / Job Title
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. CEO, HR Manager, Director"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Contact Number <span className="text-gold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="input"
                  placeholder="e.g. 076 848 0152"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Email Address <span className="text-mist/50">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@organisation.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Organisation */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <Building2 className="h-4 w-4" /> 2. Organisation Details
            </h3>
            <div className="mt-4">
              <label className="block text-xs font-medium text-mist mb-1">
                Organisation / Company Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your organisation or company name"
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-mist mb-2">
                Organisation Type <span className="text-gold">*</span>
              </label>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                {ORG_TYPES.map((type) => {
                  const active = formData.orgType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, orgType: type })}
                      className={`rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all text-left ${
                        active
                          ? "border-gold bg-gold/15 text-snow shadow-glow"
                          : "border-white/10 bg-white/[0.03] text-mist hover:border-gold/40 hover:text-snow"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Service Areas */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <Target className="h-4 w-4" /> 3. Areas of Support Needed
            </h3>
            <p className="mt-1 text-xs text-mist/70">Select all that apply</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => {
                const isSelected = formData.serviceAreas.includes(area);
                return (
                  <button
                    type="button"
                    key={area}
                    onClick={() => toggleService(area)}
                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium border transition-all ${
                      isSelected
                        ? "border-gold bg-gold text-navy-deep font-bold"
                        : "border-white/15 bg-white/[0.04] text-mist hover:border-gold/50 hover:text-snow"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Project Brief */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <FileText className="h-4 w-4" /> 4. Your Challenge or Project Brief
            </h3>
            <div className="mt-4">
              <label className="block text-xs font-medium text-mist mb-1">
                Describe Your Challenge / Project <span className="text-gold">*</span>
              </label>
              <textarea
                rows={5}
                required
                className="input resize-none"
                placeholder="Tell us about your organisation, the challenge you're facing, or the project you need support with..."
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-mist mb-2">
                  Preferred Engagement Mode
                </label>
                <div className="inline-flex rounded-lg border border-white/15 p-1 bg-white/[0.03] w-full">
                  {ENGAGEMENT_MODES.map((mode) => {
                    const selected = formData.engagementMode === mode;
                    return (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setFormData({ ...formData, engagementMode: mode })}
                        className={`flex-1 rounded-md py-2 text-xs font-semibold transition-colors ${
                          selected ? "bg-gold text-navy-deep" : "text-mist hover:text-snow"
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  <Briefcase className="inline h-3.5 w-3.5 text-gold mr-1" />
                  Expected Timeline
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. ASAP, 1 month, Q1 2025"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-mist mb-1">
                Additional Notes <span className="text-mist/50">(Optional)</span>
              </label>
              <textarea
                rows={2}
                className="input resize-none"
                placeholder="Any other context, preferences, or questions..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>

          {/* Error */}
          {status === "error" && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-300">
              Something went wrong. Please check your connection or contact us directly on WhatsApp ({CONTACT_PHONE}).
            </div>
          )}

          {/* Submit */}
          <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="inline-flex items-center gap-2 text-xs text-mist/70">
              <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
              Your details are confidential &amp; protected by CrownEd.
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold w-full sm:w-auto disabled:opacity-60"
            >
              {status === "submitting" ? (
                "Submitting Request..."
              ) : (
                <>
                  Submit Consultation Request <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
