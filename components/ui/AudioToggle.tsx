'use client'

import { motion } from 'framer-motion'

interface AudioToggleProps {
  enabled: boolean
  onToggle: () => void
  dark?: boolean
}

export default function AudioToggle({ enabled, onToggle, dark = false }: AudioToggleProps) {
  const color = dark ? '#D4A853' : '#7B3F5E'

  return (
    <motion.button
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
        dark
          ? 'border-[#D4A853]/40 bg-[#2D1B1B]/60 hover:bg-[#2D1B1B]/80'
          : 'border-[#7B3F5E]/30 bg-white/60 hover:bg-white/80'
      } backdrop-blur-sm`}
      style={{ color }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={enabled ? 'Silenciar música' : 'Activar música'}
    >
      {enabled ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 5L6 9H2v6h4l5 4V5z"
            fill="currentColor"
          />
          <path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 5L6 9H2v6h4l5 4V5z"
            fill="currentColor"
          />
          <line
            x1="23"
            y1="9"
            x2="17"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="17"
            y1="9"
            x2="23"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.button>
  )
}
