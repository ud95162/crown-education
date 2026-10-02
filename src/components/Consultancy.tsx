"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Target,
  BookOpen,
  BarChart2,
  TrendingUp,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Search,
  DollarSign,
  Presentation,
} from "lucide-react";

const CONSULTANCY_FILTERS = [
  {
    key: "strategy",
    label: "Business & Strategy",
    caption: "Strategic planning, development & organisational excellence",
    icon: Target,
    services: [
      "Strategic Planning",
      "Business Development",
      "Feasibility Studies",
      "Business Process Improvement",
      "Market Analysis",
      "Business Performance Analysis",
      "Organisational Development",
    ],
  },
  {
    key: "education",
    label: "Education Consultancy",
    caption: "Curriculum, quality assurance & institutional development",
    icon: GraduationCap,
    services: [
      "Curriculum & Programme Development",
      "Academic Quality Assurance",
      "Institutional Development",
      "Academic Staff Development",
      "Education Business Consultancy",
      "Accreditation Support",
      "Learning & Teaching Consultancy",
    ],
  },
  {
    key: "research",
    label: "Research & Analytics",
    caption: "Data-driven insights, research design & reporting",
    icon: Search,
    services: [
      "Market Research",
      "Academic Research Consultancy",
      "Research Design",
      "Quantitative & Qualitative Research",
      "Data Analysis",
      "Survey Development",
      "Literature / Scoping / Systematic Reviews",
      "Research Reports",
    ],
  },
  {
    key: "financial",
    label: "Financial Advisory",
    caption: "Financial planning, forecasting & investment readiness",
    icon: DollarSign,
    services: [
      "Financial Planning",
      "Financial Forecasting",
      "Feasibility Analysis",
      "Cost Analysis",
      "Business Performance Analysis",
      "Investment-Readiness Support",
    ],
  },
  {
    key: "training",
    label: "Training & Development",
    caption: "Leadership, management & professional growth programmes",
    icon: Presentation,
    services: [
      "Leadership Development",
      "Management Training",
      "Communication Skills",
      "Research Methodology",
      "Professional Development",
      "Business Skills Training",
    ],
  },
];

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Strategic Planning": Target,
  "Business Development": TrendingUp,
  "Feasibility Studies": BarChart2,
  "Business Process Improvement": Briefcase,
  "Market Analysis": Search,
  "Business Performance Analysis": BarChart2,
  "Organisational Development": Users,
  "Curriculum & Programme Development": BookOpen,
  "Academic Quality Assurance": CheckCircle2,
  "Institutional Development": GraduationCap,
  "Academic Staff Development": Users,
  "Education Business Consultancy": Briefcase,
  "Accreditation Support": CheckCircle2,
  "Learning & Teaching Consultancy": BookOpen,
  "Market Research": Search,
  "Academic Research Consultancy": BookOpen,
  "Research Design": BarChart2,
  "Quantitative & Qualitative Research": BarChart2,
  "Data Analysis": BarChart2,
  "Survey Development": Target,
  "Literature / Scoping / Systematic Reviews": BookOpen,
  "Research Reports": BookOpen,
  "Financial Planning": DollarSign,
  "Financial Forecasting": TrendingUp,
  "Feasibility Analysis": BarChart2,
  "Cost Analysis": DollarSign,
  "Investment-Readiness Support": TrendingUp,
  "Leadership Development": Users,
  "Management Training": Briefcase,
  "Communication Skills": Presentation,
  "Research Methodology": Search,
  "Professional Development": TrendingUp,
  "Business Skills Training": Briefcase,
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Strategic Planning": "Define your long-term vision with structured strategic frameworks that align your people, processes and resources.",
  "Business Development": "Identify growth opportunities, build partnerships, and create scalable revenue strategies for sustainable expansion.",
  "Feasibility Studies": "Rigorous analysis of market viability, financial sustainability, and operational risks before key investment decisions.",
  "Business Process Improvement": "Streamline operations, eliminate inefficiencies, and implement best-practice workflows for peak performance.",
  "Market Analysis": "Deep-dive competitor intelligence, customer segmentation, and market sizing to guide confident business decisions.",
  "Business Performance Analysis": "Data-led evaluation of KPIs, financials, and operational metrics to identify growth levers and bottlenecks.",
  "Organisational Development": "Strengthen structures, culture, and talent pipelines to build resilient, high-performing organisations.",
  "Curriculum & Programme Development": "Design future-ready academic programmes aligned with regulatory standards and learner outcomes.",
  "Academic Quality Assurance": "Implement robust QA frameworks to maintain and elevate the standard of academic delivery.",
  "Institutional Development": "Strategic support for educational institutions seeking growth, governance, and operational excellence.",
  "Academic Staff Development": "Tailored training and CPD programmes to elevate faculty performance and teaching quality.",
  "Education Business Consultancy": "Bridge academic expertise with business strategy for education-sector organisations and ventures.",
  "Accreditation Support": "End-to-end guidance through national and international accreditation processes and compliance requirements.",
  "Learning & Teaching Consultancy": "Pedagogical strategy, instructional design, and blended learning solutions for modern education.",
  "Market Research": "Primary and secondary research to uncover market trends, customer needs, and competitive landscapes.",
  "Academic Research Consultancy": "Expert support across all stages of academic research from proposal to publication.",
  "Research Design": "Develop methodologically sound research frameworks for quantitative, qualitative, and mixed-method studies.",
  "Quantitative & Qualitative Research": "Comprehensive data collection, analysis, and interpretation using robust research methodologies.",
  "Data Analysis": "Statistical and thematic analysis to extract actionable insights from complex datasets.",
  "Survey Development": "Design, validate, and deploy surveys that generate reliable, meaningful, and actionable data.",
  "Literature / Scoping / Systematic Reviews": "Structured, evidence-based reviews of academic and grey literature for research and policy.",
  "Research Reports": "Clear, compelling research reports tailored to academic, commercial, and policy audiences.",
  "Financial Planning": "Develop comprehensive financial plans that align budget allocation with strategic business goals.",
  "Financial Forecasting": "Build evidence-based financial projections to support decision-making, funding, and growth planning.",
  "Feasibility Analysis": "Assess the financial viability of new ventures, expansions, or investment opportunities.",
  "Cost Analysis": "Detailed cost modelling and efficiency analysis to optimise margins and resource allocation.",
  "Investment-Readiness Support": "Prepare your business for investor engagement with compelling financial narratives and documentation.",
  "Leadership Development": "Build transformational leaders through structured coaching, workshops, and leadership frameworks.",
  "Management Training": "Practical management skills programmes covering delegation, performance, and team leadership.",
  "Communication Skills": "Professional communication training for presentations, negotiations, and stakeholder engagement.",
  "Research Methodology": "Applied training in research methods for professionals, academics, and postgraduate students.",
  "Professional Development": "Customised CPD programmes designed to accelerate career growth and professional competency.",
  "Business Skills Training": "Practical business skills covering strategy, operations, finance, and commercial acumen.",
};

export default function Consultancy() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const filter = CONSULTANCY_FILTERS[active];

  const handleScroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 320;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, active]);

  return (
    <section
      id="consultancy"
      className="section-pad relative overflow-hidden bg-navy text-snow"
    >
      {/* layered background */}
      <div className="pattern-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gold/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#1c3f7a]/40 blur-[130px]" />
      <Image
        src="/images/logo_new.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={590}
        className="pointer-events-none absolute -bottom-16 left-0 hidden w-[340px] opacity-[0.04] lg:block"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold" />
            Research-Driven Advisory
          </span>
          <h2 className="section-title mt-4">Business Consultancy</h2>
          <p className="mt-4 text-mist">
            A research-driven consultancy providing strategic, business, education and professional development solutions. Select a service area to explore what we offer.
          </p>
        </div>

        {/* Service Area Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Consultancy service areas"
            className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
          >
            {CONSULTANCY_FILTERS.map((f, i) => {
              const selected = i === active;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActive(i);
                    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                  }}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    selected ? "text-navy-deep" : "text-mist hover:text-snow"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="consultancy-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gold-gradient"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <span className={`ml-2 hidden text-xs font-normal sm:inline ${
                    selected ? "text-navy-deep/70" : "text-mist/60"
                  }`}>
                    ({f.services.length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
            {/* Row Navigation Bar */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-snow flex items-center gap-2">
                  {filter.label}
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-normal text-gold">
                    {filter.services.length} Services
                  </span>
                </h3>
                <p className="text-xs text-mist">{filter.caption}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => handleScroll("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-snow transition-all hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => handleScroll("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-snow transition-all hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="no-scrollbar flex overflow-x-auto gap-5 py-4 scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-nowrap gap-5"
                >
                  {filter.services.map((s, si) => {
                    const IconComponent = SERVICE_ICONS[s] ?? Briefcase;
                    return (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * si }}
                        style={{ scrollSnapAlign: "start" }}
                        className="group card-surface relative flex h-[280px] w-72 flex-none flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift sm:w-80"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                              <IconComponent className="h-5 w-5" />
                            </span>
                            <span className="text-xs font-mono text-mist/40">
                              #{String(si + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h4 className="mt-4 font-display text-lg font-bold leading-snug text-snow group-hover:text-gold transition-colors">
                            {s}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-mist line-clamp-3">
                            {SERVICE_DESCRIPTIONS[s] ?? filter.caption}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {filter.label}
                          </span>
                          <a
                            href="/consult"
                            className="text-xs font-semibold text-snow hover:text-gold transition-colors underline decoration-gold/40 underline-offset-4"
                          >
                            Request Consult →
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
        </div>

        {/* Footer Summary Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm">
          <span className="text-xs uppercase tracking-wider text-mist/60">
            Service Areas
          </span>
          {CONSULTANCY_FILTERS.map((f, i) => (
            <button
              key={f.key}
              onClick={() => {
                setActive(i);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
              className="border border-gold/40 px-4 py-1.5 text-gold-light hover:bg-gold hover:text-navy-deep transition-colors text-xs font-semibold"
            >
              {f.label} ({f.services.length})
            </button>
          ))}
          <a
            href="/consult"
            className="btn-gold px-5 py-1.5 text-xs font-bold uppercase tracking-wider"
          >
            Request a Consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
