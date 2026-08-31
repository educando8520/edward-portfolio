import { motion } from 'framer-motion'
import { Cpu, Layers, Target, GraduationCap, Cloud, Radio } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { profile, aboutMetrics, aboutFocus, aboutGoals, aboutLayers } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading
          eyebrow="01 · About"
          title="About"
          accent="Edward"
          subtitle="Networks & telecommunications engineer in the making — connecting hardware, RF, networks and cloud into one mental model."
        />

        <div className="about-grid">
          {/* Left: narrative */}
          <motion.div
            className="about-narrative glass"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <p>
              I'm <strong>{profile.name}</strong>, a final-year student of{' '}
              <strong>Ingeniería en Redes y Telecomunicaciones</strong> at the{' '}
              <strong>{profile.university}</strong>.
            </p>
            <p>
              My professional profile focuses on cloud computing, networking,
              telecommunications, wireless systems and RF engineering. I'm currently
              strengthening my experience inside the <strong>Huawei Cloud</strong> ecosystem.
            </p>
            <p>
              I'm driven by understanding how technological infrastructure works at every
              level — from hardware and radiofrequency up to distributed services — with the
              goal of evolving into <strong>Cloud Architect</strong> and technology leadership.
            </p>

            <div className="about-focus">
              {aboutFocus.map((f) => (
                <span key={f} className="tag">{f}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: metrics */}
          <motion.div
            className="about-metrics"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {aboutMetrics.map((m) => (
              <motion.div key={m.label} className="metric glass" variants={fadeUp}>
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Infrastructure layers */}
        <motion.div
          className="about-layers"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="layers-head">
            <Layers size={18} className="layers-icon" />
            <span>How I understand infrastructure — every layer</span>
          </div>
          <div className="layers-row">
            {aboutLayers.map((l, i) => (
              <motion.div key={l.k} className="layer-chip" variants={fadeUp} custom={i}>
                <span className="layer-idx">0{i + 1}</span>
                <span className="layer-k">{l.k}</span>
                <span className="layer-desc">{l.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div
          className="about-goals"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="goals-head">
            <Target size={18} className="goals-icon" />
            <span>Trajectory</span>
          </div>
          <div className="goals-row">
            {aboutGoals.map((g, i) => (
              <div key={g} className="goal-step">
                <span className="goal-name">{g}</span>
                {i < aboutGoals.length - 1 && <span className="goal-arrow">→</span>}
              </div>
            ))}
            <span className="goal-arrow">→</span>
            <span className="goal-name goal-final">Tech Leadership</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
