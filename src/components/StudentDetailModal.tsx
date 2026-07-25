"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  Send,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  HelpCircle,
  XCircle,
  Award,
} from "lucide-react";
import { StudentApplication, ApplicationStatus } from "@/lib/applicationsStore";

interface StudentDetailModalProps {
  application: StudentApplication | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus, notes: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const STATUS_OPTIONS: { label: ApplicationStatus; color: string }[] = [
  { label: "Pending", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  { label: "Under Review", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { label: "Contacted", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  { label: "Approved", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  { label: "Enrolled", color: "bg-gold/20 text-gold border-gold/40" },
  { label: "Rejected", color: "bg-red-500/10 text-red-400 border-red-500/30" },
];

export default function StudentDetailModal({
  application,
  onClose,
  onUpdateStatus,
  onDelete,
}: StudentDetailModalProps) {
  const [status, setStatus] = useState<ApplicationStatus>("Pending");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (application) {
      setStatus(application.status);
      setAdminNotes(application.adminNotes || "");
    }
  }, [application]);

  if (!application) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdateStatus(application.id, status, adminNotes);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete application ${application.id} for ${application.name}?`)) {
      setIsDeleting(true);
      await onDelete(application.id);
      setIsDeleting(false);
      onClose();
    }
  };

  // Generate pre-filled WhatsApp link
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello ${application.name},\n\nThis is CrownEd / Maku Education contacting you regarding your application (${application.id}) for the ${application.curriculum} program.\n\nWe would love to discuss your enrollment and class schedule!`
    );
    const cleanPhone = application.contactNumber.replace(/[^0-9+]/g, "");
    return `https://wa.me/${cleanPhone.replace("+", "")}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-navy-surface p-6 sm:p-8 shadow-2xl my-8 text-snow animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-mist hover:bg-white/10 hover:text-snow transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header section */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gold px-2.5 py-0.5 rounded border border-gold/30 bg-gold/10">
                {application.id}
              </span>
              <span className="text-xs text-mist">
                Submitted: {new Date(application.submittedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-snow mt-2">{application.name}</h2>
            <p className="text-sm text-mist flex items-center gap-2 mt-1">
              <Building className="h-3.5 w-3.5 text-gold" />
              <span>{application.schoolOrBusiness || "N/A"}</span>
              <span>•</span>
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span>{application.city || "N/A"}</span>
            </p>
          </div>

          {/* Quick Contact Actions */}
          <div className="flex items-center gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            {application.contactNumber && (
              <a
                href={`tel:${application.contactNumber}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-snow hover:bg-white/10 transition"
                title="Call phone"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span className="hidden sm:inline">Call</span>
              </a>
            )}
            {application.email && (
              <a
                href={`mailto:${application.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-snow hover:bg-white/10 transition"
                title="Send Email"
              >
                <Mail className="h-4 w-4 text-gold" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-white/10 text-sm">
          {/* Left Column: Personal & Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <User className="h-4 w-4" /> Student Profile Details
            </h3>

            <div className="space-y-2.5 rounded-xl border border-white/5 bg-navy-deep/60 p-4">
              <div>
                <span className="text-xs text-mist block">Contact Phone</span>
                <span className="font-mono text-snow font-medium">{application.contactNumber}</span>
              </div>
              <div>
                <span className="text-xs text-mist block">Email Address</span>
                <span className="text-snow font-medium">{application.email || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-xs text-mist block">Age / Age Group</span>
                <span className="text-snow font-medium">{application.age || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-xs text-mist block">Guardian Details</span>
                <span className="text-snow font-medium">{application.guardianDetails || "None / Self"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Request */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> Academic & Program Choices
            </h3>

            <div className="space-y-2.5 rounded-xl border border-white/5 bg-navy-deep/60 p-4">
              <div>
                <span className="text-xs text-mist block">Curriculum</span>
                <span className="text-gold font-semibold">{application.curriculum}</span>
              </div>
              <div>
                <span className="text-xs text-mist block">Selected Subjects</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {application.subjects.map((subj, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white/10 px-2 py-0.5 text-xs text-snow border border-white/10"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-xs text-mist block">Learning Mode</span>
                  <span className="text-snow font-medium">{application.learningMode}</span>
                </div>
                <div>
                  <span className="text-xs text-mist block">Class Type</span>
                  <span className="text-snow font-medium">{application.classType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes section */}
        {application.additionalNotes && (
          <div className="py-4 border-b border-white/10">
            <h4 className="text-xs font-semibold text-mist uppercase tracking-wider mb-1">
              Applicant Notes & Requirements
            </h4>
            <p className="text-sm italic text-snow/90 bg-white/5 rounded-lg p-3 border border-white/5">
              "{application.additionalNotes}"
            </p>
          </div>
        )}

        {/* Admin Management Section (Status + Notes) */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
            <Award className="h-4 w-4" /> Administrative Controls
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status selector */}
            <div>
              <label className="text-xs font-medium text-mist block mb-1.5">Application Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full rounded-lg border border-white/20 bg-navy px-3 py-2.5 text-sm text-snow focus:border-gold focus:outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label} className="bg-navy text-snow">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Internal Notes */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-mist block mb-1.5">
                Internal Admin Notes (Private)
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about student consultation, payment, assigned tutor..."
                rows={2}
                className="w-full rounded-lg border border-white/20 bg-navy px-3 py-2 text-sm text-snow placeholder-mist/50 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Record</span>
            </button>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Saved!
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-navy-deep hover:bg-gold-light transition shadow-gold disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
