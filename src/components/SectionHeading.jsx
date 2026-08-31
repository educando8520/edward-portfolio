import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../animations/variants'

/**
 * Reusable section heading: eyebrow + title + optional subtitle.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', accent }) {
  return (
    <motion.div
      className={`section-head ${align === 'center' ? 'is-center' : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="dot" />
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">
        {accent ? <>{title} <span className="grad">{accent}</span></> : title}
      </h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </motion.div>
  )
}
