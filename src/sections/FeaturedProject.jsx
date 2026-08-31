import { motion } from 'framer-motion'
import { Radio, Waves, Grid3x3, Activity, Cpu, Radar } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { rfSpecs, rfComponents } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './FeaturedProject.css'

/** Conceptual sector radiation pattern (polar, SVG). */
function RadiationPattern() {
  // Build a sector-like lobe: narrow in azimuth, wider elevation — conceptual.
  const pts = []
  const sectors = 2
  for (let i = 0; i <= 180; i++) {
    const deg = i
    const rad = (deg * Math.PI) / 180
    // two lobes centered ~60° and ~120° to suggest a sector beam
    const lobe =
      Math.pow(Math.cos((deg - 60) * Math.PI / 180 / 0.6), 2) +
      Math.pow(Math.cos((deg - 120) * Math.PI / 180 / 0.6), 2)
    const r = 38 + lobe * 30
    pts.push([50 + r * Math.cos(rad), 50 - r * Math.sin(rad)])
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ' Z'

  return (
    <svg className="rf-polar" viewBox="0 0 100 100">
      {[15, 30, 45, 60].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(56,110,160,0.18)" strokeWidth="0.4" />
      ))}
      {[0, 45, 90, 135].map((a) => {
        const rad = (a * Math.PI) / 180
        return (
          <line key={a} x1="50" y1="50"
            x2={50 + 60 * Math.cos(rad)} y2={50 - 60 * Math.sin(rad)}
            stroke="rgba(56,110,160,0.18)" strokeWidth="0.3" />
        )
      })}
      <path d={d} fill="rgba(34,211,238,0.12)" stroke="#22d3ee" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="1.2" fill="#22d3ee" />
    </svg>
  )
}

/** Conceptual S11 / return-loss curve. */
function S11Curve() {
  // A dip around 2.45 GHz, conceptual.
  const pts = []
  for (let i = 0; i <= 100; i++) {
    const f = i / 100 // 0..1 across band 2.3–2.6
    const center = 0.5
    const dip = -28 * Math.exp(-Math.pow((f - center) / 0.12, 2))
    const noise = (Math.sin(f * 40) + Math.cos(f * 27)) * 1.1
    const y = -2 + dip + noise
    pts.push([i, 50 - y * 1.4])
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg className="rf-s11" viewBox="0 0 100 60" preserveAspectRatio="none">
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(56,110,160,0.3)" strokeWidth="0.4" />
      <line x1="50" y1="0" x2="50" y2="60" stroke="rgba(139,92,246,0.4)" strokeWidth="0.4" strokeDasharray="2 2" />
      <path d={d} fill="none" stroke="#8b5cf6" strokeWidth="0.8" />
    </svg>
  )
}

export default function FeaturedProject() {
  return (
    <section id="featured" className="section featured">
      <div className="container">
        <SectionHeading
          eyebrow="04 · Featured Project"
          title="2.4 GHz"
          accent="Sector Antenna"
          subtitle="Design, simulation & analysis of a passive sector antenna for drone signal detection in the 2.4 GHz ISM band."
        />

        <div className="featured-grid">
          {/* Left: visualizations */}
          <motion.div
            className="rf-viz"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div className="rf-panel glass" variants={fadeUp}>
              <div className="rf-panel-head">
                <Radar size={15} />
                <span>Radiation Pattern · Sector</span>
                <em>conceptual</em>
              </div>
              <RadiationPattern />
            </motion.div>

            <div className="rf-row">
              <motion.div className="rf-panel glass rf-small" variants={fadeUp}>
                <div className="rf-panel-head">
                  <Activity size={14} />
                  <span>S₁₁ · Return Loss</span>
                  <em>conceptual</em>
                </div>
                <S11Curve />
                <div className="rf-axis">
                  <span>2.3 GHz</span>
                  <span className="rf-center">2.45 GHz</span>
                  <span>2.6 GHz</span>
                </div>
              </motion.div>

              <motion.div className="rf-panel glass rf-small" variants={fadeUp}>
                <div className="rf-panel-head">
                  <Grid3x3 size={14} />
                  <span>Patch Array 4×2</span>
                </div>
                <div className="patch-array">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="patch"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div className="rf-panel glass rf-spectrum" variants={fadeUp}>
              <div className="rf-panel-head">
                <Waves size={15} />
                <span>Frequency Spectrum · 2.4 GHz ISM</span>
                <em>conceptual</em>
              </div>
              <div className="spectrum">
                {Array.from({ length: 48 }).map((_, i) => {
                  const center = 24
                  const h = 12 + 70 * Math.exp(-Math.pow((i - center) / 7, 2)) + (i % 3) * 4
                  return (
                    <motion.span
                      key={i}
                      className="bar"
                      initial={{ height: '8%' }}
                      whileInView={{ height: `${h}%` }}
                      viewport={viewport}
                      transition={{ duration: 0.6, delay: i * 0.015, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: specs + components */}
          <motion.div
            className="rf-info"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div className="rf-specs glass" variants={fadeUp}>
              <div className="rf-specs-head">
                <Cpu size={16} />
                <span>Specifications</span>
              </div>
              <div className="spec-grid">
                {rfSpecs.map((s) => (
                  <div key={s.k} className="spec-item">
                    <span className="spec-k">{s.k}</span>
                    <span className="spec-v">{s.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="rf-components glass" variants={fadeUp}>
              <div className="rf-specs-head">
                <Radio size={16} />
                <span>Project Scope</span>
              </div>
              <div className="comp-list">
                {rfComponents.map((c) => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
