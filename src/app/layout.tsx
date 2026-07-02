import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

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
    "CrownEd offers expert tuition across O/Level, A/Level and Professional levels — covering Edexcel, Cambridge, Sri Lankan Local and all UK curricula. Accounting, Business, English, Maths, Science and more.",
  keywords: [
    "tuition Sri Lanka",
    "O/Level tuition",
    "A/Level tuition",
    "Edexcel",
    "Cambridge",
    "Accounting",
    "Business Studies",
    "professional education",
  ],
  openGraph: {
    title: "CrownEd — Education That Crowns You",
    description:
      "Expert tuition across Local, UK and Professional curricula in Sri Lanka.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
