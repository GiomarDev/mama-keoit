'use client'

import { motion } from 'framer-motion'
import PetalParticles from '../ui/PetalParticles'
import Image from 'next/image'

interface Props {
  onNext: () => void
  momName?: string
}

export default function Slide00Intro({ onNext, momName }: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #FFF8F0 0%, #FFE4EC 50%, #FFF0E8 100%)',
      }}
    >
      <PetalParticles count={25} />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'backOut' }}
        >
          <Image
            src="/images/logo-white.jpg"
            alt="KeoIT"
            width={80}
            height={80}
            priority
            className="rounded-2xl"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <h1
            className="text-5xl sm:text-6xl font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              color: '#7B3F5E',
            }}
          >
            Feliz Día<br />de la Madre
          </h1>

          {momName ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl italic"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: '#7B3F5E',
              }}
            >
              Para <strong>{momName}</strong> 🌸
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg italic"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: '#B07090',
              }}
            >
              Desde KeoIT, con amor
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full text-white font-medium text-base tracking-wide shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7B3F5E 0%, #B07090 100%)',
              boxShadow: '0 8px 24px rgba(123,63,94,0.35)',
            }}
          >
            Comenzar experiencia →
          </motion.button>
          <p className="text-xs mt-1" style={{ color: '#C08090' }}>
            {momName ? 'Alguien especial preparó esto para ti' : 'Una experiencia para celebrar a tu mamá'}
          </p>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 opacity-20 pointer-events-none"
        style={{ width: 160, height: 160 }}
      >
        <svg viewBox="0 0 160 160" fill="none">
          <circle cx="0" cy="160" r="120" fill="#E8A0BF" />
        </svg>
      </div>
      <div
        className="absolute top-0 right-0 opacity-20 pointer-events-none"
        style={{ width: 120, height: 120 }}
      >
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="120" cy="0" r="90" fill="#D4A853" />
        </svg>
      </div>
    </div>
  )
}
