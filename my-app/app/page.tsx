import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
      <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-white/10 bg-[#08080c] text-center">
        <p className="font-mono text-xs sm:text-sm text-gray-500">
          © 2026 최윤석 · Built with Next.js
        </p>
      </footer>
    </main>
  );
}
