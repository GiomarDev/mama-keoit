'use client'

import { motion } from 'framer-motion'

interface SlideProgressProps {
  current: number
  total: number
  dark?: boolean
}

export default function SlideProgress({ current, total, dark = false }: SlideProgressProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 8,
            backgroundColor:
              i === current
                ? dark ? '#D4A853' : '#7B3F5E'
                : dark ? 'rgba(212,168,83,0.3)' : 'rgba(123,63,94,0.25)',
          }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  )
}
