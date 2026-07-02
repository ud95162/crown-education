/**
 * CrownEd crest + wordmark.
 *
 * Uses the real crest artwork (public/images/crest.png, transparent) as the
 * mark, paired with adaptive wordmark text so it reads on both light and dark
 * backgrounds. The full lockup lives at public/images/logo.png.
 */
import Image from "next/image";

export default function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const wordColor = variant === "light" ? "#FFFFFF" : "#0B234B";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#5b6472";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/images/crest.png"
        alt="CrownEd crest"
        width={44}
        height={50}
        priority
        className="h-11 w-auto"
      />
      <span className="leading-none">
        <span className="block font-serif text-2xl font-semibold tracking-wide">
          <span style={{ color: wordColor }}>Crown</span>
          <span style={{ color: "#D4A12A" }}>Ed</span>
        </span>
        <span
          className="block text-[9px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: subColor }}
        >
          Education That Crowns You
        </span>
      </span>
    </span>
  );
}
