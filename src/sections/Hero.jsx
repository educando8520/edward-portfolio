import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, User, Mail, ChevronDown, Activity } from 'lucide-react'
import { profile } from '../data/content'
import './Hero.css'

const NetworkSphere = lazy(() => import('../components/NetworkSphere'))

function RotatingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % profile.rotating.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rotating-wrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="rotating-word"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.rotating[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <div className="hero-sphere">
        <Suspense fallback={null}>
          <NetworkSphere />
        </Suspense>
        <div className="hero-sphere-ring" />
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Activity size={14} />
          <span>SYSTEM ONLINE · {profile.location}</span>
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.name}
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-role-static">{profile.role}</span>
          <span className="hero-role-sep">/</span>
          <RotatingWord />
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="btn btn-primary" onClick={() => go('projects')}>
            Explore My Work <ArrowRight size={17} />
          </button>
          <button className="btn btn-ghost" onClick={() => go('about')}>
            <User size={16} /> About Me
          </button>
          <button className="btn btn-ghost" onClick={() => go('contact')}>
            <Mail size={16} /> Contact
          </button>
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll"
        onClick={() => go('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </motion.button>
    </section>
  )
}
