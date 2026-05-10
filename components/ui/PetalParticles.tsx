'use client'

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  duration: number
  delay: number
  size: number
  swayDuration: number
  opacity: number
  color: string
}

const PETAL_COLORS = ['#E8A0BF', '#F4C2D4', '#FFB6C1', '#D4A853', '#F9D0DC']

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 8,
    size: 8 + Math.random() * 14,
    swayDuration: 3 + Math.random() * 3,
    opacity: 0.5 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }))
}

export default function PetalParticles({ count = 20 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    setPetals(generatePetals(count))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s, ${petal.swayDuration}s`,
            animationDelay: `${petal.delay}s, ${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
          >
            <ellipse
              cx="10"
              cy="13"
              rx="8"
              ry="12"
              fill={petal.color}
              opacity="0.85"
            />
            <path
              d="M10 2 Q14 13 10 24 Q6 13 10 2Z"
              fill={petal.color}
              opacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
