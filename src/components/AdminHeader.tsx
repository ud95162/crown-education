"use client";

import Logo from "./Logo";
import { ShieldCheck, LogOut, RefreshCw, Download, UserCheck } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
  onResetData: () => void;
  onExportCSV: () => void;
  isResetting?: boolean;
}

export default function AdminHeader({
  onLogout,
  onResetData,
  onExportCSV,
  isResetting = false,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-deep/90 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        {/* Left: Branding & Badge */}
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin Portal</span>
          </div>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            title="Export Applications to CSV"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-snow transition hover:border-gold/50 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5 text-gold" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onResetData}
            disabled={isResetting}
            title="Reset Mock Data"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-mist transition hover:border-white/30 hover:bg-white/10 hover:text-snow disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isResetting ? "animate-spin" : ""}`} />
            <span>Reset Demo Data</span>
          </button>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 rounded-lg bg-navy-surface px-3 py-1.5 border border-white/10">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold font-semibold text-xs">
              A
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-snow leading-none">Administrator</p>
              <p className="text-[10px] text-mist leading-none mt-0.5">Maku Education</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
