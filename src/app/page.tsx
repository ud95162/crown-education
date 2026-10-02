import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import About from "@/components/About";
import Subjects from "@/components/Subjects";
import Consultancy from "@/components/Consultancy";
import Why from "@/components/Why";
import Philosophy from "@/components/Philosophy";
import BookConsultation from "@/components/BookConsultation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Consultancy />
        {/* <BookConsultation /> */}
        <About />
        <Subjects />
        <Why />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
