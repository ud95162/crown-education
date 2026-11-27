"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = NAV_LINKS.filter((l) => l.href !== "#consultation");
  const leftLinks = navItems.slice(0, 5);  // Home, About, Subjects
  const rightLinks = navItems.slice(5);    // Consultancy, Why CrownEd, Contact

  const isSolid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isSolid
          ? "border-white/10 bg-navy/95 backdrop-blur-md shadow-lg py-1.5 lg:py-2"
          : "border-transparent bg-transparent py-2 sm:py-3 lg:py-4"
      }`}
    >
      <nav className="container-x">
        {/* Desktop Centered Navbar Layout */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left Wing Navigation Links */}
          <div className="flex items-center justify-end gap-4 xl:gap-6 pr-6 xl:pr-8">
            {leftLinks.map((l) => (
              <a
                key={l.href}
                href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                className="text-sm font-semibold uppercase tracking-widest text-mist transition-colors duration-200 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Center Brand Logo */}
          <div className="flex items-center justify-center px-2">
            <a
              href="/"
              aria-label="CrownEd home"
              className="group block transition-transform duration-300 hover:scale-105 focus:outline-none"
            >
              <Logo
                variant="light"
                imgClassName={`transition-all duration-300 ${
                  isSolid ? "h-16 w-auto" : "h-20 w-auto"
                }`}
              />
            </a>
          </div>

          {/* Right Wing Navigation Links & Dual Action Buttons */}
          <div className="flex items-center justify-end gap-3 xl:gap-5 pl-4 xl:pl-6">
            {rightLinks.map((l) => (
              <a
                key={l.href}
                href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                className="text-sm font-semibold uppercase tracking-widest text-mist whitespace-nowrap transition-colors duration-200 hover:text-gold"
              >
                {l.label}
              </a>
            ))}

            <div className="flex items-center gap-2 xl:gap-3">
              <a
                href="/apply"
                className={`2xl:inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  pathname === "/apply"
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-white/20 bg-white/5 text-snow hover:border-gold hover:text-gold"
                }`}
              >
                Apply for Class
              </a>
              <a
                href="/consult"
                className="btn-gold group relative overflow-hidden whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-gold animate-pulse-glow transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              >
                {/* sweeping sheen highlight */}
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                <span className="relative z-10">Request a Consultation</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Header Layout (< lg) */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="w-10"></div>

          <a href="/" aria-label="CrownEd home" className="flex items-center justify-center">
            <Logo
              variant="light"
              imgClassName="h-14 w-auto transition-all duration-300"
            />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-snow hover:bg-white/5 active:scale-95 transition-all"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-navy/98 backdrop-blur-xl px-6 pb-6 pt-3 lg:hidden shadow-2xl">
          <div className="flex flex-col gap-1">
            {navItems.map((l) => {
              const href = l.href.startsWith("#") ? `/${l.href}` : l.href;
              const isActive = pathname === l.href || (l.href === "#home" && pathname === "/");
              return (
                <a
                  key={l.href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold uppercase tracking-widest transition-colors ${
                    isActive
                      ? "bg-gold/15 text-gold font-bold"
                      : "text-mist hover:bg-white/5 hover:text-gold"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-3">
              <a
                href="/consult"
                onClick={() => setOpen(false)}
                className={`btn-gold justify-center py-3 text-xs font-bold uppercase tracking-wider shadow-gold ${
                  pathname === "/consult" ? "ring-2 ring-white/40" : ""
                }`}
              >
                Request a Consultation
              </a>
              <a
                href="/apply"
                onClick={() => setOpen(false)}
                className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  pathname === "/apply"
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-white/20 bg-white/5 text-snow hover:border-gold hover:text-gold"
                }`}
              >
                Apply for Class
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

