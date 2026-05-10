'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface UserData {
  momName: string
  message: string
}

interface Props {
  userData: UserData
  onNext: () => void
}

export default function Slide04Card({ userData, onNext }: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFF8F0 0%, #FFE4EC 60%, #FFF0E8 100%)',
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 w-full max-w-sm overflow-y-auto py-8" style={{ maxHeight: '100dvh' }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm tracking-widest uppercase"
          style={{ color: '#B07090' }}
        >
          Tu tarjeta está lista
        </motion.p>

        {/* La tarjeta */}
        <motion.div
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
          className="w-full rounded-3xl overflow-hidden"
        >
          <div
            className="relative w-full p-7 flex flex-col gap-5 rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, #FFF8F0 0%, #FFE8F0 100%)',
              boxShadow: '0 20px 60px rgba(123,63,94,0.2), 0 4px 16px rgba(212,168,83,0.15)',
              border: '1.5px solid rgba(212,168,83,0.3)',
            }}
          >
            {/* Corner flowers (SVG inline) */}
            <svg
              className="absolute top-4 left-4 opacity-30"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <ellipse
                  key={i}
                  cx={20 + Math.cos((a * Math.PI) / 180) * 9}
                  cy={20 + Math.sin((a * Math.PI) / 180) * 9}
                  rx="6"
                  ry="4"
                  fill="#E8A0BF"
                  style={{ transform: `rotate(${a}deg)`, transformOrigin: `${20 + Math.cos((a * Math.PI) / 180) * 9}px ${20 + Math.sin((a * Math.PI) / 180) * 9}px` }}
                />
              ))}
              <circle cx="20" cy="20" r="4" fill="#D4A853" />
            </svg>
            <svg
              className="absolute bottom-4 right-4 opacity-30"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <ellipse
                  key={i}
                  cx={20 + Math.cos((a * Math.PI) / 180) * 9}
                  cy={20 + Math.sin((a * Math.PI) / 180) * 9}
                  rx="6"
                  ry="4"
                  fill="#D4A853"
                  style={{ transform: `rotate(${a}deg)`, transformOrigin: `${20 + Math.cos((a * Math.PI) / 180) * 9}px ${20 + Math.sin((a * Math.PI) / 180) * 9}px` }}
                />
              ))}
              <circle cx="20" cy="20" r="4" fill="#E8A0BF" />
            </svg>

            {/* Logo */}
            <div className="flex justify-end">
              <Image
                src="/images/logo-white.jpg"
                alt="KeoIT"
                width={44}
                height={44}
                className="rounded-lg"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Divider */}
            <div
              className="w-12 h-px mx-auto"
              style={{ background: 'linear-gradient(90deg, transparent, #D4A853, transparent)' }}
            />

            {/* To */}
            <div className="text-center">
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#B07090' }}>
                Para
              </p>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold break-words"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  color: '#7B3F5E',
                }}
              >
                {userData.momName}
              </motion.h2>
            </div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center text-base leading-relaxed italic"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: '#5C2D44',
              }}
            >
              &ldquo;{userData.message}&rdquo;
            </motion.p>

            {/* Divider */}
            <div
              className="w-12 h-px mx-auto"
              style={{ background: 'linear-gradient(90deg, transparent, #D4A853, transparent)' }}
            />

            {/* Footer */}
            <p
              className="text-center text-xs italic"
              style={{ color: '#C0A0B0' }}
            >
              Con amor, el Día de la Madre ✦
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 rounded-full text-white font-medium text-base tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #7B3F5E 0%, #B07090 100%)',
            boxShadow: '0 8px 24px rgba(123,63,94,0.3)',
          }}
        >
          Compartir esta tarjeta →
        </motion.button>
      </div>
    </div>
  )
}
