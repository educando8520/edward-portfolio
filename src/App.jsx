import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import NetworkBackground from './components/NetworkBackground'

import Hero from './sections/Hero'
import About from './sections/About'
import CloudInfrastructure from './sections/CloudInfrastructure'
import NetworkEngineering from './sections/NetworkEngineering'
import FeaturedProject from './sections/FeaturedProject'
import TechStack from './sections/TechStack'
import Projects from './sections/Projects'
import Timeline from './sections/Timeline'
import Terminal from './sections/Terminal'
import Contact from './sections/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <NetworkBackground />
      <Navbar />

      <main className="app-main">
        <Hero />
        <About />
        <CloudInfrastructure />
        <NetworkEngineering />
        <FeaturedProject />
        <TechStack />
        <Projects />
        <Timeline />
        <Terminal />
        <Contact />
      </main>

      <footer className="app-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Edward Benavides</span>
          <span className="footer-mid">Network & Telecommunications Engineer</span>
          <span>Built with React · Vite · R3F</span>
        </div>
      </footer>
    </>
  )
}
