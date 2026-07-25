import Logo from "./Logo";
import { NAV_LINKS, SUBJECTS, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Expert tuition across Local, UK and Professional curricula in Sri
            Lanka. Education that crowns every student with confidence and
            results.
          </p>
          <div className="mt-4 space-y-1 text-sm text-white/80">
            <p>
              <span className="text-gold font-medium">Phone / WhatsApp:</span>{" "}
              <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">
                {CONTACT_PHONE}
              </a>
            </p>
            <p>
              <span className="text-gold font-medium">Email:</span>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Subjects
          </h4>
          <ul className="grid grid-cols-1 gap-2 text-sm">
            {SUBJECTS.slice(0, 6).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} CrownEd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Education That Crowns You</p>
            <span>•</span>
            <a href="/admin/login" className="hover:text-gold transition-colors">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
