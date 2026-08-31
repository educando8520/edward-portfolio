import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element when it enters the viewport.
 * Returns a ref and a boolean "inView".
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px', ...options }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
