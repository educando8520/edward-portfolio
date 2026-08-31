import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Globe, Split, Shield, Server, Boxes, Database, HardDrive, Cloud, ArrowDown,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { cloudLayers, cloudSkills } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './CloudInfrastructure.css'

const icons = { Globe, Split, Shield, Server, Boxes, Database, HardDrive, Cloud }

export default function CloudInfrastructure() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 30%'],
  })

  return (
    <section id="cloud" className="section cloud">
      <div className="container">
        <SectionHeading
          eyebrow="02 · Cloud"
          title="Cloud &"
          accent="Infrastructure"
          subtitle="From the public internet down to object storage — a cloud-native architecture, illuminated layer by layer as you scroll."
        />

        <div className="cloud-layout">
          {/* Architecture flow */}
          <div className="cloud-flow" ref={ref}>
            {cloudLayers.map((layer, i) => {
              const start = i / cloudLayers.length
              const end = (i + 1) / cloudLayers.length
              const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1])
              const glow = useTransform(scrollYProgress, [start, end], [0, 1])
              const Icon = icons[layer.icon] || Server
              return (
                <motion.div
                  key={layer.id}
                  className="flow-node"
                  style={{ opacity }}
                >
                  <motion.div
                    className="flow-glow"
                    style={{ opacity: glow }}
                  />
                  <div className="flow-icon">
                    <Icon size={20} />
                  </div>
                  <div className="flow-text">
                    <span className="flow-label">{layer.label}</span>
                    <span className="flow-desc">{layer.desc}</span>
                  </div>
                  {i < cloudLayers.length - 1 && (
                    <ArrowDown size={16} className="flow-arrow" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Side: skills + ecosystem */}
          <motion.div
            className="cloud-side"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div className="cloud-card glass" variants={fadeUp}>
              <Cloud size={18} className="cloud-card-icon" />
              <h3>Huawei Cloud Ecosystem</h3>
              <p>Currently deepening hands-on experience across the Huawei Cloud stack.</p>
              <div className="cloud-tags">
                {cloudSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="cloud-card glass" variants={fadeUp}>
              <Boxes size={18} className="cloud-card-icon" />
              <h3>Cloud Native</h3>
              <p>Containers, orchestration and distributed systems as the default deployment model.</p>
              <div className="cloud-tags">
                <span className="tag">Kubernetes</span>
                <span className="tag">Docker</span>
                <span className="tag">CCE</span>
                <span className="tag">Distributed Systems</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
