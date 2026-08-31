import { motion } from 'framer-motion'
import { Router, Shield, Network, Cloud, Server, Monitor, Activity } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { networkNodes, networkEdges, networkSkills, networkTools } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './NetworkEngineering.css'

const icons = { Router, Shield, Network, Cloud, Server, Monitor }

export default function NetworkEngineering() {
  const byId = Object.fromEntries(networkNodes.map((n) => [n.id, n]))

  return (
    <section id="network" className="section network">
      <div className="container">
        <SectionHeading
          eyebrow="03 · Networking"
          title="Network"
          accent="Engineering"
          subtitle="Packets flowing through routers, switches and firewalls — the nervous system of every infrastructure I build."
        />

        <div className="network-layout">
          {/* Topology */}
          <motion.div
            className="topology glass"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <div className="topology-head">
              <Activity size={15} />
              <span>live topology · packet flow</span>
            </div>
            <svg className="topology-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* edges */}
              {networkEdges.map(([a, b], i) => {
                const na = byId[a]
                const nb = byId[b]
                return (
                  <g key={i}>
                    <line
                      x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke="rgba(56,110,160,0.4)" strokeWidth="0.4"
                    />
                    {/* traveling packet */}
                    <circle r="0.9" fill="#22d3ee">
                      <animateMotion
                        dur={`${2.4 + i * 0.4}s`}
                        repeatCount="indefinite"
                        path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
                      />
                    </circle>
                    <circle r="0.7" fill="#3b82f6" opacity="0.8">
                      <animateMotion
                        dur={`${2.4 + i * 0.4}s`}
                        begin={`${1.2 + i * 0.2}s`}
                        repeatCount="indefinite"
                        path={`M${nb.x},${nb.y} L${na.x},${na.y}`}
                      />
                    </circle>
                  </g>
                )
              })}
              {/* nodes */}
              {networkNodes.map((n) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="3.4" fill="rgba(15,20,34,0.9)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.4" />
                  <text x={n.x} y={n.y + 0.8} textAnchor="middle" fontSize="2.4" fill="#e2e8f0" fontWeight="600">
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="network-info"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div className="network-block glass" variants={fadeUp}>
              <h3>Core Knowledge</h3>
              <div className="network-tags">
                {networkSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </motion.div>
            <motion.div className="network-block glass" variants={fadeUp}>
              <h3>Tooling</h3>
              <div className="network-tools">
                {networkTools.map((t) => (
                  <div key={t} className="tool-item">
                    <span className="tool-bullet" />
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
