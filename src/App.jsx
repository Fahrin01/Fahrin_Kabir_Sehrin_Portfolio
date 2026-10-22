import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import AuroraBackground from './components/layout/AuroraBackground.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import GlassCursor from './components/layout/GlassCursor.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Skills from './components/sections/Skills.jsx';
import Projects from './components/sections/Projects.jsx';
import Certifications from './components/sections/Certifications.jsx';
import Education from './components/sections/Education.jsx';
import Experience from './components/sections/Experience.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  return (
    // LazyMotion + `m` components load only the animation features we use (smaller bundle).
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div id="top" className="flex min-h-screen flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <AuroraBackground />
          <ScrollProgress />
          <GlassCursor />
          <Navbar />
          <main id="main" className="flex-1">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Education />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
