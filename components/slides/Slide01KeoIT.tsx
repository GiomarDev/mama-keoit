'use client'

import { motion } from 'framer-motion'
import FlowerSVG from '../ui/FlowerSVG'
import { KEOIT_MESSAGES } from '@/lib/slides'

interface Props {
  onNext: () => void
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
}

const line = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function Slide01KeoIT({ onNext }: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#2D1B1B' }}
    >
      {/* Subtle texture gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(212,168,83,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,160,191,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-xl gap-10">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-16 h-px"
          style={{ background: '#D4A853', transformOrigin: 'left' }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          {KEOIT_MESSAGES.map((msg, i) =>
            msg === '' ? (
              <div key={i} className="h-3" />
            ) : (
              <motion.p
                key={i}
                variants={line}
                className="text-2xl sm:text-3xl leading-snug"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  color: '#D4A853',
                  fontStyle: i < 2 ? 'italic' : 'normal',
                  fontWeight: i < 2 ? 400 : 300,
                }}
              >
                {msg}
              </motion.p>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="w-16 h-px"
          style={{ background: '#D4A853', transformOrigin: 'right' }}
        />

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-widest uppercase border transition-colors"
          style={{
            borderColor: 'rgba(212,168,83,0.5)',
            color: '#D4A853',
          }}
        >
          Continuar
        </motion.button>
      </div>

      {/* Flower decoration */}
      <div className="absolute bottom-8 right-8 opacity-60 pointer-events-none">
        <FlowerSVG size={100} color="#7B3F5E" delay={1.5} />
      </div>
      <div className="absolute top-8 left-8 opacity-30 pointer-events-none">
        <FlowerSVG size={60} color="#D4A853" delay={1.8} />
      </div>
    </div>
  )
}
