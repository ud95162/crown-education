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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-navy/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <a href="#home" aria-label="CrownEd home">
          <Logo variant="light" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-mist transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold">
            Apply Now
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-snow lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-navy px-6 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-mist hover:bg-white/5 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-3"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
