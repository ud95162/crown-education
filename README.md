# CrownEd — Website

Marketing site for CrownEd tuition services, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Brand palette: Navy `#0B234B` · Gold `#D4A12A` · Accent Gold `#E7C768` · White · Dark Gray `#444444`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/
    layout.tsx           # fonts, metadata, SEO
    page.tsx             # Home page (assembles all sections)
    globals.css          # Tailwind + brand component classes
    api/inquiry/route.ts # inquiry endpoint (STUB — see below)
  components/
    Navbar, Hero, Pillars, About, Subjects, Why, Contact, Footer
    Logo.tsx             # SVG crest stand-in
    Reveal.tsx           # scroll-in animation wrapper
  lib/content.ts         # all site copy (edit here)
public/images/
    teacher-hero.jpg     # hero portrait (white-bg cutout)
    teacher-about.jpg    # About portrait (black-bg studio)
```

## To swap in the real logo

Save the crest PNG to `public/images/logo.png`, then set `USE_IMAGE_LOGO = true`
in `src/components/Logo.tsx`.

## Still to wire (deferred by request)

The Home page is complete. Remaining proposal scope:

1. **Inquiry storage + email** — `src/app/api/inquiry/route.ts` currently validates
   and logs only. Add a DB (Prisma + SQLite/Postgres) and email alerts
   (Resend / Nodemailer) here.
2. **Admin panel** — login-protected `/admin` dashboard to view/manage inquiries.
3. **Additional pages** — currently a single-page site with anchor navigation;
   can be split into `/about`, `/subjects`, `/contact` routes if preferred.

## Editing copy

Contact details are placeholders in `src/components/Contact.tsx`
(phone `+94 70 000 0000`, email `hello@crowned.lk`) — update with real values.
Subjects, pillars and other copy live in `src/lib/content.ts`.
