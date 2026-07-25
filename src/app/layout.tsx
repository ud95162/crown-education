import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrownEd — Education That Crowns You",
  description:
    "CrownEd offers expert tuition across Local, UK (Edexcel, Cambridge) and Professional levels — covering Information Technology, AI literacy, English Language, English Literature, Spoken English, and Business & Career Consultancy.",
  keywords: [
    "tuition Sri Lanka",
    "IT tuition",
    "AI literacy programs",
    "English Language",
    "English Literature",
    "Edexcel",
    "Cambridge",
    "Spoken English",
    "business consultancy",
    "professional development",
  ],
  openGraph: {
    title: "CrownEd — Education That Crowns You",
    description:
      "Expert tuition across Local, UK and Professional curricula in Sri Lanka.",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="bg-navy font-sans text-mist antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
