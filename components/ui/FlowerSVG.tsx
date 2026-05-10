'use client'

import { motion } from 'framer-motion'

interface FlowerSVGProps {
  size?: number
  color?: string
  delay?: number
  className?: string
}

export default function FlowerSVG({
  size = 120,
  color = '#E8A0BF',
  delay = 0,
  className = '',
}: FlowerSVGProps) {
  const petalPaths = [
    'M60 60 Q60 20 60 10 Q75 35 60 60',
    'M60 60 Q85 35 95 27 Q85 55 60 60',
    'M60 60 Q95 60 105 60 Q85 75 60 60',
    'M60 60 Q85 85 95 93 Q70 85 60 60',
    'M60 60 Q60 95 60 105 Q45 80 60 60',
    'M60 60 Q35 85 27 93 Q35 68 60 60',
    'M60 60 Q25 60 15 60 Q35 45 60 60',
    'M60 60 Q35 35 27 27 Q52 35 60 60',
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
    >
      {petalPaths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.4,
            ease: 'backOut',
          }}
          style={{ transformOrigin: '60px 60px' }}
        />
      ))}
      <motion.circle
        cx="60"
        cy="60"
        r="10"
        fill="#D4A853"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.3, ease: 'backOut' }}
        style={{ transformOrigin: '60px 60px' }}
      />
    </svg>
  )
}
