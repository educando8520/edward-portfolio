import './WaveDivider.css'

/** Subtle SVG wave divider for visual continuity between sections. */
export default function WaveDivider({ color = 'rgba(34,211,238,0.12)', flip = false }) {
  return (
    <div
      className="wave-divider"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
