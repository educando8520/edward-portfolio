import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 140
const RADIUS = 1.7

function fibonacciSphere(n, radius) {
  const pts = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius))
  }
  return pts
}

function SphereContent() {
  const group = useRef(null)
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const { pointer } = useThree()
  const targetRot = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => fibonacciSphere(COUNT, RADIUS), [])

  const { linePositions, lineColors } = useMemo(() => {
    const segs = []
    const cols = []
    const maxDist = 0.95
    const cA = new THREE.Color('#22d3ee')
    const cB = new THREE.Color('#3b82f6')
    const cC = new THREE.Color('#8b5cf6')
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const d = positions[i].distanceTo(positions[j])
        if (d < maxDist) {
          const a = positions[i]
          const b = positions[j]
          segs.push(a.x, a.y, a.z, b.x, b.y, b.z)
          const t = d / maxDist
          const c = t < 0.5 ? cA.clone().lerp(cB, t * 2) : cB.clone().lerp(cC, (t - 0.5) * 2)
          const alpha = (1 - t) * 0.5
          cols.push(c.r * alpha, c.g * alpha, c.b * alpha, c.r * alpha, c.g * alpha, c.b * alpha)
        }
      }
    }
    return {
      linePositions: new Float32Array(segs),
      lineColors: new Float32Array(cols),
    }
  }, [positions])

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(positions.length * 3)
    positions.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [positions])

  useFrame((_, delta) => {
    if (!group.current) return
    targetRot.current.y += delta * 0.12
    const tx = pointer.y * 0.4
    const ty = pointer.x * 0.6
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.05
    group.current.rotation.y += (targetRot.current.y + ty - group.current.rotation.y) * 0.04
  })

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#67e8f9" sizeAttenuation transparent opacity={0.9} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.85} />
      </lineSegments>

      {/* inner glow core */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#1e3a5f" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

export default function NetworkSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <SphereContent />
    </Canvas>
  )
}
