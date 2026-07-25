"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Send,
  ShieldCheck,
  User,
  GraduationCap,
  BookOpen,
  Monitor,
  Users,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  SUBJECT_FILTERS,
  WHATSAPP_NUMBER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    schoolOrBusiness: "",
    city: "",
    contactNumber: "",
    email: "",
    guardianDetails: "",
    curriculum: "Local",
    subjects: [] as string[],
    learningMode: "Online",
    classType: "Individual",
    additionalNotes: "",
  });

  // Available subjects for the currently selected curriculum
  const currentFilter =
    SUBJECT_FILTERS.find((f) => f.label.toLowerCase().includes(formData.curriculum.toLowerCase())) ??
    SUBJECT_FILTERS[0];

  const toggleSubject = (subjectName: string) => {
    setFormData((prev) => {
      const exists = prev.subjects.includes(subjectName);
      if (exists) {
        return { ...prev, subjects: prev.subjects.filter((s) => s !== subjectName) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subjectName] };
      }
    });
  };

  const handleCurriculumChange = (currLabel: string) => {
    const newFilter =
      SUBJECT_FILTERS.find((f) => f.label.toLowerCase().includes(currLabel.toLowerCase())) ??
      SUBJECT_FILTERS[0];
    setFormData((prev) => ({
      ...prev,
      curriculum: currLabel,
      // Default select the first subject of the new curriculum if empty
      subjects: [newFilter.subjects[0]],
    }));
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
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const getWhatsAppLink = () => {
    const text = `*New Student Application — CrownEd*
    
📌 *Name:* ${formData.name}
🎂 *Age:* ${formData.age || "N/A"}
🏫 *School / Business / Occupation:* ${formData.schoolOrBusiness || "N/A"}
📍 *City:* ${formData.city || "N/A"}
📞 *Contact Number:* ${formData.contactNumber}
👨‍👩‍👧 *Guardian Details:* ${formData.guardianDetails || "N/A"}

📚 *Curriculum:* ${formData.curriculum}
📖 *Subject/s:* ${formData.subjects.length > 0 ? formData.subjects.join(", ") : "All"}
💻 *Mode:* ${formData.learningMode}
👥 *Class Type:* ${formData.classType}
📝 *Additional Notes:* ${formData.additionalNotes || "None"}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-surface p-6 sm:p-10 shadow-2xl">
      {/* background glows */}
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
            Application Submitted Successfully!
          </h3>
          <p className="mt-3 mx-auto max-w-md text-base leading-relaxed text-mist">
            Thank you, <span className="text-gold font-semibold">{formData.name}</span>. We have received your application details and will get in touch with you shortly.
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
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  age: "",
                  schoolOrBusiness: "",
                  city: "",
                  contactNumber: "",
                  email: "",
                  guardianDetails: "",
                  curriculum: "Local",
                  subjects: [],
                  learningMode: "Online",
                  classType: "Individual",
                  additionalNotes: "",
                });
              }}
              className="btn-outline"
            >
              Submit Another Application
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Student Registration
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-snow">
              Student Details &amp; Course Preferences
            </h2>
            <p className="mt-1 text-sm text-mist">
              Please complete the details below to register for classes or business consultancy services.
            </p>
          </div>

          {/* Section 1: Personal & Contact Information */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <User className="h-4 w-4" /> 1. Personal &amp; Contact Info
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Student Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  Age <span className="text-mist/50">(e.g. 16)</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
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
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Colombo, Kandy"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-mist mb-1">
                  School / Business Name / Occupation
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="School name, business, or role"
                  value={formData.schoolOrBusiness}
                  onChange={(e) => setFormData({ ...formData, schoolOrBusiness: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-mist mb-1">
                  Guardian Name &amp; Contact Details <span className="text-mist/50">(If applicable for school students)</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Parent / Guardian Name & Phone number"
                  value={formData.guardianDetails}
                  onChange={(e) => setFormData({ ...formData, guardianDetails: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Curriculum & Subject Selection */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <GraduationCap className="h-4 w-4" /> 2. Curriculum &amp; Subjects
            </h3>

            {/* Curriculum Selector */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-mist mb-2">
                Select Curriculum / Stream <span className="text-gold">*</span>
              </label>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { label: "Local", title: "Local Syllabus", caption: "Sri Lankan O/L & A/L" },
                  { label: "UK Education", title: "UK Education", caption: "Edexcel / Cambridge" },
                  { label: "Professional", title: "Professional", caption: "Career & Business" },
                ].map((c) => {
                  const active = formData.curriculum === c.label;
                  return (
                    <button
                      type="button"
                      key={c.label}
                      onClick={() => handleCurriculumChange(c.label)}
                      className={`flex flex-col text-left rounded-xl p-3.5 border transition-all ${
                        active
                          ? "border-gold bg-gold/15 text-snow shadow-glow"
                          : "border-white/10 bg-white/[0.03] text-mist hover:border-gold/40 hover:text-snow"
                      }`}
                    >
                      <span className="font-display font-bold text-sm text-snow">{c.title}</span>
                      <span className="text-xs text-mist/70">{c.caption}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Subjects Multi-select */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-mist mb-2 flex items-center justify-between">
                <span>Select Subject(s) <span className="text-gold">*</span></span>
                <span className="text-mist/50 text-[11px]">Click to select multiple</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {currentFilter.subjects.map((sub) => {
                  const isSelected = formData.subjects.includes(sub);
                  return (
                    <button
                      type="button"
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium border transition-all ${
                        isSelected
                          ? "border-gold bg-gold text-navy-deep font-bold"
                          : "border-white/15 bg-white/[0.04] text-mist hover:border-gold/50 hover:text-snow"
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <BookOpen className="h-3.5 w-3.5 text-gold" />}
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Learning Preference & Options */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
              <Monitor className="h-4 w-4" /> 3. Class Format &amp; Mode
            </h3>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {/* Online / Onsite */}
              <div>
                <label className="block text-xs font-medium text-mist mb-2">
                  Learning Mode <span className="text-gold">*</span>
                </label>
                <div className="inline-flex rounded-lg border border-white/15 p-1 bg-white/[0.03] w-full">
                  {["Online", "Onsite", "Both / Either"].map((mode) => {
                    const selected = formData.learningMode === mode;
                    return (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setFormData({ ...formData, learningMode: mode })}
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

              {/* Individual / Group */}
              <div>
                <label className="block text-xs font-medium text-mist mb-2 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-gold" />
                  Class Structure <span className="text-gold">*</span>
                </label>
                <div className="inline-flex rounded-lg border border-white/15 p-1 bg-white/[0.03] w-full">
                  {["Individual", "Group"].map((type) => {
                    const selected = formData.classType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, classType: type })}
                        className={`flex-1 rounded-md py-2 text-xs font-semibold transition-colors ${
                          selected ? "bg-gold text-navy-deep" : "text-mist hover:text-snow"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-mist mb-1">
                Additional Notes <span className="text-mist/50">(Optional)</span>
              </label>
              <textarea
                rows={3}
                className="input resize-none"
                placeholder="Mention any specific goals, preferred class times, or questions..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>

          {/* Error notification */}
          {status === "error" && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-300">
              Something went wrong sending your details. Please check your connection or contact us directly on WhatsApp ({CONTACT_PHONE}).
            </div>
          )}

          {/* Submit Actions */}
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
                "Submitting Application..."
              ) : (
                <>
                  Submit Application <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
