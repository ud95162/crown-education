import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Subjects from "@/components/Subjects";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Subjects & Curricula | CrownEd",
  description:
    "Explore CrownEd's full range of subjects across Local, UK, Professional, and Specialist curriculum pathways — structured classes built for real results.",
};

export default function SubjectsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-navy-deep text-snow">
        {/* top spacing so content clears the fixed navbar */}
        <div className="pt-24 sm:pt-28" />
        <About />
        <Subjects />
      </main>
      <Footer />
    </>
  );
}
