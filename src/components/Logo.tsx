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
  imgClassName = "h-14 sm:h-16 w-auto",
}: {
  className?: string;
  variant?: "light" | "dark";
  imgClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src="/images/logo_new.png"
        alt="CrownEd"
        width={300}
        height={300}
        priority
        className={`object-contain transition-transform duration-300 hover:scale-105 ${imgClassName}`}
      />
    </span>
  );
}

