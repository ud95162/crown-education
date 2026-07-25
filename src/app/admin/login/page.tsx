"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock, User, KeyRound, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if already authenticated on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Login failed. Please check credentials.");
      }

      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Header Branding */}
        <div className="text-center flex flex-col items-center">
          <Logo />
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            <ShieldCheck className="h-4 w-4" />
            <span>Admin Portal Access</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold font-display text-snow">
            Sign In to Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-mist">
            Manage student applications & enrollment records
          </p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md shadow-lift">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-mist mb-2">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-mist">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full rounded-lg border border-white/20 bg-navy-deep/80 pl-10 pr-4 py-3 text-sm text-snow placeholder-mist/40 focus:border-gold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-mist mb-2">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-mist">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-white/20 bg-navy-deep/80 pl-10 pr-4 py-3 text-sm text-snow placeholder-mist/40 focus:border-gold focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold py-3.5 font-semibold text-navy-deep hover:bg-gold-light transition duration-200 shadow-gold disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
