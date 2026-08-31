import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { terminalLines } from '../data/content'
import { fadeUp, viewport } from '../animations/variants'
import './Terminal.css'

export default function Terminal() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0) // which line we're typing
  const [typed, setTyped] = useState('') // current typed output
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStep(terminalLines.length)
      return
    }
    if (step >= terminalLines.length) return

    const line = terminalLines[step]
    let i = 0
    setTyped('')
    const speed = 32
    const id = setInterval(() => {
      i++
      setTyped(line.out.slice(0, i))
      if (i >= line.out.length) {
        clearInterval(id)
        setTimeout(() => setStep((s) => s + 1), 420)
      }
    }, speed)
    return () => clearInterval(id)
  }, [visible, step])

  return (
    <section id="terminal" className="section terminal-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="terminal glass"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="term-bar">
            <span className="term-dot r" />
            <span className="term-dot y" />
            <span className="term-dot g" />
            <span className="term-title">edward@network: ~</span>
          </div>
          <div className="term-body">
            {terminalLines.slice(0, step).map((l, i) => (
              <div key={i} className="term-line">
                <span className="term-prompt">{'>'}</span>
                <span className="term-cmd">{l.cmd}</span>
                <span className="term-out">{l.out}</span>
              </div>
            ))}
            {step < terminalLines.length && (
              <div className="term-line">
                <span className="term-prompt">{'>'}</span>
                <span className="term-cmd">{terminalLines[step].cmd}</span>
                <span className="term-out">
                  {typed}
                  <span className="term-caret" />
                </span>
              </div>
            )}
            {step >= terminalLines.length && (
              <div className="term-line term-idle">
                <span className="term-prompt">{'>'}</span>
                <span className="term-caret" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
