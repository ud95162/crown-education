"use client";

import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/content";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CrownEd on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none hidden max-w-0 overflow-hidden whitespace-nowrap rounded-xl bg-navy-surface px-0 py-2 text-sm font-medium text-snow opacity-0 shadow-lift transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-transform duration-200 group-hover:scale-105">
        {/* pulsing ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.593 4.462 1.72 6.402L3.2 28.8l6.57-1.713a12.74 12.74 0 0 0 6.23 1.616h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.053A12.717 12.717 0 0 0 16.004 3.2Zm0 23.04h-.004a10.63 10.63 0 0 1-5.42-1.484l-.39-.23-4.03 1.05 1.075-3.926-.254-.404a10.61 10.61 0 0 1-1.627-5.646c0-5.87 4.777-10.646 10.65-10.646a10.58 10.58 0 0 1 7.53 3.123 10.58 10.58 0 0 1 3.117 7.53c0 5.872-4.777 10.652-10.647 10.652Zm5.84-7.976c-.32-.16-1.894-.934-2.188-1.04-.293-.107-.507-.16-.72.16-.214.32-.827 1.04-1.014 1.253-.187.214-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.593-1.895-1.78-2.215-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.376-.26-.624-.524-.54-.72-.55l-.613-.01c-.214 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.669 0 1.574 1.147 3.096 1.307 3.31.16.213 2.256 3.443 5.466 4.828.764.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373Z" />
        </svg>
      </span>
    </a>
  );
}
