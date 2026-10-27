import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import LandingShowcase from "@/sections/LandingShowcase";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LandingShowcase />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}