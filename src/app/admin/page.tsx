"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import StudentDetailModal from "@/components/StudentDetailModal";
import {
  StudentApplication,
  ApplicationStatus,
} from "@/lib/applicationsStore";
import {
  Users,
  Clock,
  CheckCircle2,
  GraduationCap,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  MapPin,
  BookOpen,
} from "lucide-react";

interface Stats {
  total: number;
  pending: number;
  underReview: number;
  contacted: number;
  approved: number;
  enrolled: number;
  rejected: number;
}

const STATUS_BADGE_STYLE: Record<ApplicationStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Under Review": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Contacted: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Enrolled: "bg-gold/20 text-gold border-gold/40 font-bold",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    underReview: 0,
    contacted: 0,
    approved: 0,
    enrolled: 0,
    rejected: 0,
  });

  // Filters state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [curriculumFilter, setCurriculumFilter] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<StudentApplication | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Fetch applications & auth check
  const fetchApplications = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set("search", search);
      if (statusFilter !== "All") queryParams.set("status", statusFilter);
      if (curriculumFilter !== "All") queryParams.set("curriculum", curriculumFilter);

      const res = await fetch(`/api/admin/applications?${queryParams.toString()}`);
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.ok) {
        setApplications(data.data || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Error loading admin applications:", err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, curriculumFilter, router]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
  };

  // Handle reset data
  const handleResetData = async () => {
    if (confirm("Reset applications data to default sample records?")) {
      setIsResetting(true);
      await fetch("/api/admin/applications?reset=true");
      await fetchApplications();
      setIsResetting(false);
    }
  };

  // Update status or notes
  const handleUpdateStatus = async (
    id: string,
    newStatus: ApplicationStatus,
    adminNotes: string
  ) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      if (res.ok) {
        await fetchApplications();
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus, adminNotes } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete application
  const handleDeleteApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchApplications();
        if (selectedApp?.id === id) setSelectedApp(null);
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Email",
      "Contact Number",
      "Age",
      "City",
      "School/Business",
      "Guardian Details",
      "Curriculum",
      "Subjects",
      "Learning Mode",
      "Class Type",
      "Status",
      "Submitted At",
      "Admin Notes",
    ];

    const rows = applications.map((app) => [
      `"${app.id}"`,
      `"${app.name.replace(/"/g, '""')}"`,
      `"${app.email.replace(/"/g, '""')}"`,
      `"${app.contactNumber.replace(/"/g, '""')}"`,
      `"${app.age}"`,
      `"${app.city.replace(/"/g, '""')}"`,
      `"${app.schoolOrBusiness.replace(/"/g, '""')}"`,
      `"${app.guardianDetails.replace(/"/g, '""')}"`,
      `"${app.curriculum}"`,
      `"${app.subjects.join(", ").replace(/"/g, '""')}"`,
      `"${app.learningMode}"`,
      `"${app.classType}"`,
      `"${app.status}"`,
      `"${new Date(app.submittedAt).toLocaleString()}"`,
      `"${(app.adminNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CrownEd_Student_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-gold animate-spin" />
          <p className="text-sm font-medium text-mist">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-snow flex flex-col">
      {/* Admin Navbar */}
      <AdminHeader
        onLogout={handleLogout}
        onResetData={handleResetData}
        onExportCSV={handleExportCSV}
        isResetting={isResetting}
      />

      {/* Main Content Area */}
      <main className="container-x py-8 flex-1 space-y-8">
        {/* Page Title & Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-snow tracking-tight">
              Student Applications Portal
            </h1>
            <p className="text-sm text-mist mt-1">
              Review admissions inquiries, track student status, and manage enrollments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-mist">Total Applications:</span>
            <span className="text-lg font-bold font-mono text-gold bg-gold/10 px-3 py-1 rounded-lg border border-gold/30">
              {stats.total}
            </span>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="rounded-xl border border-white/10 bg-navy-surface p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-mist">
              <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
              <Users className="h-4 w-4 text-gold" />
            </div>
            <p className="text-2xl font-bold text-snow mt-3 font-mono">{stats.total}</p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
              <Clock className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-amber-400 mt-3 font-mono">{stats.pending}</p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Under Review</span>
              <Filter className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-blue-400 mt-3 font-mono">{stats.underReview}</p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Approved</span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-emerald-400 mt-3 font-mono">{stats.approved}</p>
          </div>

          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-gold">
              <span className="text-xs font-semibold uppercase tracking-wider">Enrolled</span>
              <GraduationCap className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-gold mt-3 font-mono">{stats.enrolled}</p>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="rounded-xl border border-white/10 bg-navy-surface p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center h-full w-9 text-mist" />
              <input
                type="text"
                placeholder="Search by student name, phone, email, city, subject, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-navy-deep pl-10 pr-4 py-2.5 text-sm text-snow placeholder-mist/50 focus:border-gold focus:outline-none"
              />
            </div>

            {/* Curriculum Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-mist font-medium whitespace-nowrap">Curriculum:</span>
              <select
                value={curriculumFilter}
                onChange={(e) => setCurriculumFilter(e.target.value)}
                className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2 text-sm text-snow focus:border-gold focus:outline-none"
              >
                <option value="All">All Curricula</option>
                <option value="Local">Local Curriculum</option>
                <option value="Edexcel">Edexcel (UK)</option>
                <option value="Cambridge">Cambridge (UK)</option>
                <option value="Professional">Professional & Corporate</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-white/5 pt-3">
            <span className="text-xs text-mist mr-2 font-medium">Status:</span>
            {["All", "Pending", "Under Review", "Contacted", "Approved", "Enrolled", "Rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  statusFilter === st
                    ? "bg-gold text-navy-deep font-semibold shadow-sm"
                    : "bg-white/5 text-mist hover:bg-white/10 hover:text-snow"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="rounded-xl border border-white/10 bg-navy-surface overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-snow">
              <thead className="bg-navy-deep/80 text-xs uppercase tracking-wider text-mist border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">ID / Submitted</th>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Curriculum & Subjects</th>
                  <th className="px-6 py-4">Contact & Location</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-mist">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="h-8 w-8 text-mist/50" />
                        <p className="text-base font-medium text-snow">No student applications found.</p>
                        <p className="text-xs text-mist">Try adjusting your search query or status filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-white/[0.03] transition cursor-pointer group"
                    >
                      {/* ID & Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-semibold text-gold block">{app.id}</span>
                        <span className="text-[11px] text-mist flex items-center gap-1 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {new Date(app.submittedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-snow block group-hover:text-gold transition">
                          {app.name}
                        </span>
                        <span className="text-xs text-mist flex items-center gap-1 mt-0.5">
                          <span>Age: {app.age || "N/A"}</span>
                          {app.schoolOrBusiness && (
                            <>
                              <span>•</span>
                              <span className="truncate max-w-[150px]">{app.schoolOrBusiness}</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Curriculum & Subjects */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-snow block">{app.curriculum}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {app.subjects.slice(0, 2).map((subj, i) => (
                            <span
                              key={i}
                              className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-mist border border-white/5"
                            >
                              {subj}
                            </span>
                          ))}
                          {app.subjects.length > 2 && (
                            <span className="text-[10px] text-gold font-medium">
                              +{app.subjects.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Contact & Location */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs text-snow block">{app.contactNumber}</span>
                        <span className="text-xs text-mist flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-gold" />
                          {app.city || "N/A"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${
                            STATUS_BADGE_STYLE[app.status] || "bg-white/10 text-snow"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-mist hover:bg-white/10 hover:text-snow transition"
                            title="View Full Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={`https://wa.me/${app.contactNumber.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition"
                            title="WhatsApp Chat"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Student Detail Modal Drawer */}
      <StudentDetailModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteApplication}
      />
    </div>
  );
}
