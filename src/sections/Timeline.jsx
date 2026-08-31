import { motion } from 'framer-motion'
import { GitBranch } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { timeline } from '../data/content'
import { fadeUp, viewport } from '../animations/variants'
import './Timeline.css'

const phaseColor = {
  Foundation: '#22d3ee',
  Core: '#3b82f6',
  Advanced: '#8b5cf6',
  Cloud: '#60a5fa',
  Future: '#67e8f9',
}

export default function Timeline() {
  return (
    <section id="journey" className="section timeline-section">
      <div className="container">
        <SectionHeading
          eyebrow="07 · Journey"
          title="My"
          accent="Journey"
          subtitle="From networking foundations to cloud architecture — a path that keeps building forward."
        />

        <div className="timeline">
          <div className="timeline-line" />
          {timeline.map((t, i) => {
            const color = phaseColor[t.phase] || '#22d3ee'
            return (
              <motion.div
                key={i}
                className="tl-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
              >
                <div className="tl-marker" style={{ '--c': color }}>
                  <span className="tl-dot" />
                </div>
                <div className="tl-card glass">
                  <div className="tl-meta">
                    <span className="tl-phase" style={{ color }}>{t.phase}</span>
                    <span className="tl-tag">{t.tag}</span>
                  </div>
                  <h3 className="tl-title">{t.title}</h3>
                  <p className="tl-desc">{t.desc}</p>
                </div>
              </motion.div>
            )
          })}
          <motion.div
            className="tl-end"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <GitBranch size={18} />
            <span>...in progress</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
