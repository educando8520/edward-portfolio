import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, FileText, ArrowUpRight, Radio } from 'lucide-react'
import { contactLinks, profile } from '../data/content'
import { fadeUp, stagger, viewport } from '../animations/variants'
import './Contact.css'

const icons = { Linkedin, Github, Mail, FileText }

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="contact-inner"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="dot" /> 08 · Contact
          </motion.span>

          <motion.h2 className="contact-title" variants={fadeUp}>
            Let's Build Something
            <br />
            <span className="grad">Connected.</span>
          </motion.h2>

          <motion.p className="contact-sub" variants={fadeUp}>
            Open to opportunities in cloud engineering, networking and telecommunications.
            If it involves infrastructure that connects things — let's talk.
          </motion.p>

          <motion.div className="contact-links" variants={fadeUp}>
            {contactLinks.map((l) => {
              const Icon = icons[l.icon] || Radio
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`contact-card glass ${l.placeholder ? 'is-placeholder' : ''}`}
                >
                  <span className="cc-icon">
                    <Icon size={20} />
                  </span>
                  <span className="cc-label">{l.label}</span>
                  <ArrowUpRight size={16} className="cc-arrow" />
                  {l.placeholder && <span className="cc-flag">replace link</span>}
                </a>
              )
            })}
          </motion.div>

          <motion.div className="contact-foot" variants={fadeUp}>
            <Radio size={14} />
            <span>{profile.name} · {profile.location}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
