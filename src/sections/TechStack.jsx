import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Boxes } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { techStack } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './TechStack.css'

export default function TechStack() {
  const [active, setActive] = useState(0)
  const cat = techStack[active]

  // Position categories around a circle
  const angle = (i) => (i / techStack.length) * Math.PI * 2 - Math.PI / 2

  return (
    <section id="tech" className="section tech">
      <div className="container">
        <SectionHeading
          eyebrow="05 · Stack"
          title="Technology"
          accent="Stack"
          subtitle="A constellation of tools across cloud, networks, RF and code — select a cluster to inspect its technologies."
        />

        <div className="tech-layout">
          {/* Constellation */}
          <motion.div
            className="constellation glass"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <svg className="const-svg" viewBox="0 0 100 100">
              {/* lines from center to categories */}
              {techStack.map((c, i) => {
                const a = angle(i)
                const x = 50 + 38 * Math.cos(a)
                const y = 50 + 38 * Math.sin(a)
                return (
                  <line
                    key={c.cat}
                    x1="50" y1="50" x2={x} y2={y}
                    stroke={active === i ? c.color : 'rgba(56,110,160,0.3)'}
                    strokeWidth={active === i ? 0.7 : 0.35}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                )
              })}
            </svg>

            {/* center core */}
            <div className="const-core">
              <Boxes size={18} />
              <span>STACK</span>
            </div>

            {/* category nodes */}
            {techStack.map((c, i) => {
              const a = angle(i)
              const x = 50 + 38 * Math.cos(a)
              const y = 50 + 38 * Math.sin(a)
              return (
                <button
                  key={c.cat}
                  className={`const-node ${active === i ? 'is-active' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    '--node-color': c.color,
                  }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="node-dot" />
                  <span className="node-label">{c.cat}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Active category panel */}
          <div className="tech-panel-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.cat}
                className="tech-panel glass"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="tech-panel-head" style={{ '--c': cat.color }}>
                  <span className="tech-cat-dot" />
                  <h3>{cat.cat}</h3>
                  <span className="tech-count">{cat.items.length}</span>
                </div>
                <motion.div
                  className="tech-items"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                >
                  {cat.items.map((item) => (
                    <motion.div key={item} className="tech-item" variants={fadeUp}>
                      <span className="tech-item-bullet" style={{ '--c': cat.color }} />
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
