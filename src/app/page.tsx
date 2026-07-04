import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Pillars from "@/components/Pillars";
import About from "@/components/About";
import Subjects from "@/components/Subjects";
import Why from "@/components/Why";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <About />
        <Subjects />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
