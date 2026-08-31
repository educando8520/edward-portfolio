import { motion } from 'framer-motion'
import { ArrowUpRight, FolderCog } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading
          eyebrow="06 · Projects"
          title="Selected"
          accent="Projects"
          subtitle="Hands-on work across RF, cloud architecture, network infrastructure and cloud-native systems."
        />

        <motion.div
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {projects.map((p) => (
            <motion.article
              key={p.name}
              className={`project-card glass ${p.featured ? 'is-featured' : ''}`}
              variants={fadeUp}
              whileHover={{ y: -6 }}
            >
              <div className="project-glow" />
              <div className="project-top">
                <span className="project-cat">{p.category}</span>
                {p.featured && <span className="project-featured-flag">Featured</span>}
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tech">
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="project-foot">
                <button className="project-view">
                  {p.status === 'detailed' ? 'View Details' : 'Coming Soon'}
                  <ArrowUpRight size={15} />
                </button>
                <FolderCog size={18} className="project-icon" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
