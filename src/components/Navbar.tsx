"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = NAV_LINKS.filter((l) => l.href !== "#consultation");
  const leftLinks = navItems.slice(0, 5);  // Home, About, Subjects
  const rightLinks = navItems.slice(5);    // Consultancy, Why CrownEd, Contact

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
        ? "border-white/10 bg-navy/90 backdrop-blur-md shadow-lg py-2"
        : "border-transparent bg-transparent py-3 sm:py-4"
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
                imgClassName={`transition-all duration-300 ${scrolled ? "h-16 w-auto" : "h-20 w-auto"
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
                className=" 2xl:inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-snow hover:border-gold hover:text-gold transition-all duration-200 whitespace-nowrap"
              >
                Apply for Class
              </a>
              <a
                href="/consult"
                className="btn-gold relative whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-gold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-deep animate-ping" />
                  Request a Consultation
                </span>
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
              imgClassName="h-16 w-auto"
            />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-snow"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-navy px-6 pb-6 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-widest text-mist hover:bg-white/5 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-3">
              <a
                href="/consult"
                onClick={() => setOpen(false)}
                className="btn-gold justify-center py-3 text-xs font-bold uppercase tracking-wider shadow-gold"
              >
                Request a Consultation
              </a>
              <a
                href="/apply"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-snow hover:border-gold hover:text-gold transition-all duration-200"
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

