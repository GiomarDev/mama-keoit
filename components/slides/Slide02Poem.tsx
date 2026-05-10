'use client'

import { motion } from 'framer-motion'
import PetalParticles from '../ui/PetalParticles'
import { POEM_LINES } from '@/lib/slides'

interface Props {
  onNext: () => void
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.6,
    },
  },
}

const verse = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

export default function Slide02Poem({ onNext }: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE4EC 0%, #FFF8F0 50%, #FFE8D4 100%)',
      }}
    >
      <PetalParticles count={15} />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg gap-10">
        {/* Ramo SVG animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'backOut' }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {/* Stem */}
            <motion.path
              d="M40 75 Q38 60 40 45"
              stroke="#5C8C5C"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            {/* Left leaf */}
            <motion.path
              d="M40 60 Q28 52 24 44 Q34 48 40 60"
              fill="#7AAB7A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ transformOrigin: '40px 60px' }}
            />
            {/* Rose center */}
            <motion.circle
              cx="40"
              cy="30"
              r="14"
              fill="#E8A0BF"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: 'backOut' }}
              style={{ transformOrigin: '40px 30px' }}
            />
            {/* Rose petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.ellipse
                key={i}
                cx={40 + Math.cos((angle * Math.PI) / 180) * 12}
                cy={30 + Math.sin((angle * Math.PI) / 180) * 12}
                rx="7"
                ry="5"
                fill="#F4B8CF"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: 1.1 + i * 0.06, duration: 0.35 }}
                style={{
                  transformOrigin: `${40 + Math.cos((angle * Math.PI) / 180) * 12}px ${30 + Math.sin((angle * Math.PI) / 180) * 12}px`,
                  transform: `rotate(${angle}deg)`,
                }}
              />
            ))}
            <circle cx="40" cy="30" r="6" fill="#D4607A" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Poema */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
        >
          {POEM_LINES.map((line, i) => (
            <motion.p
              key={i}
              variants={verse}
              className="text-xl sm:text-2xl leading-relaxed"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: '#5C2D44',
                fontStyle: 'italic',
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 rounded-full text-white font-medium text-base tracking-wide shadow-md"
          style={{
            background: 'linear-gradient(135deg, #5C2D44 0%, #7B3F5E 100%)',
            boxShadow: '0 8px 24px rgba(92,45,68,0.3)',
          }}
        >
          Quiero dedicarle algo →
        </motion.button>
      </div>
    </div>
  )
}
