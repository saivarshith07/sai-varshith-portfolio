import Nav from './components/Nav'
import ScrollProgress from './components/ui/ScrollProgress'
import Cursor from './components/ui/Cursor'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
