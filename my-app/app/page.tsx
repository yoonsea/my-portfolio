import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-gray-900 dark:bg-black text-center text-gray-400">
        <p className="text-sm sm:text-base">© 2024 Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
