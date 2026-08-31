import { useEffect, useRef } from 'react'
import './NetworkBackground.css'

/**
 * Lightweight canvas network: drifting nodes connected by faint lines,
 * with small "packets" traveling along the strongest links.
 * Respects prefers-reduced-motion and pauses when tab is hidden.
 */
export default function NetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes = []
    let packets = []
    let raf = 0
    let running = true

    const NODE_COUNT = window.innerWidth < 768 ? 34 : 64

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      nodes = []
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.6,
        })
      }
      packets = []
      for (let i = 0; i < 10; i++) spawnPacket()
    }

    const spawnPacket = () => {
      if (nodes.length < 2) return
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      const b = nodes[Math.floor(Math.random() * nodes.length)]
      if (a === b) return
      packets.push({ a, b, t: 0, speed: Math.random() * 0.012 + 0.004, hue: Math.random() < 0.5 ? 188 : 215 })
    }

    const LINK_DIST = 150

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // move nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.22
            ctx.strokeStyle = `rgba(56, 110, 160, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(120, 170, 210, 0.55)'
        ctx.fill()
      }

      // packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.t += p.speed
        if (p.t >= 1) {
          packets.splice(i, 1)
          if (packets.length < 12) spawnPacket()
          continue
        }
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 6)
        glow.addColorStop(0, `hsla(${p.hue}, 90%, 65%, 0.9)`)
        glow.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      if (running) raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    }

    resize()
    init()
    if (reduced) {
      draw()
    } else {
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', () => {
      resize()
      init()
    })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-bg" aria-hidden="true" />
}
