'use client'

import { motion } from 'framer-motion'
import FlowerSVG from '../ui/FlowerSVG'

interface UserData {
  momName: string
  message: string
}

interface Props {
  userData: UserData
  onUpdate: (data: Partial<UserData>) => void
  onNext: () => void
}

export default function Slide03Personalize({ userData, onUpdate, onNext }: Props) {
  const isValid = userData.momName.trim().length > 0 && userData.message.trim().length > 0

  return (
    <div
      className="relative w-full h-full overflow-y-auto"
      style={{ background: '#FFF8F0' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 10% 90%, rgba(232,160,191,0.15) 0%, transparent 50%), radial-gradient(ellipse at 90% 10%, rgba(212,168,83,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 max-w-md mx-auto w-full gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2
            className="text-2xl sm:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#7B3F5E' }}
          >
            ¿A quién le dedicas
          </h2>
          <h2
            className="text-2xl sm:text-4xl font-bold italic"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#7B3F5E' }}
          >
            este mensaje?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium tracking-wide" style={{ color: '#7B3F5E' }}>
              Nombre de tu mamá
            </label>
            <input
              type="text"
              value={userData.momName}
              onChange={(e) => onUpdate({ momName: e.target.value })}
              maxLength={30}
              placeholder="Ej: Mamá, Rosa, Mamita..."
              className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-all border-2"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                borderColor: userData.momName.trim() ? '#7B3F5E' : 'rgba(123,63,94,0.2)',
                background: 'white',
                color: '#2D1B1B',
              }}
            />
            <span className="text-xs text-right" style={{ color: '#C0A0B0' }}>
              {userData.momName.length}/30
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium tracking-wide" style={{ color: '#7B3F5E' }}>
              Tu mensaje para ella
            </label>
            <textarea
              value={userData.message}
              onChange={(e) => onUpdate({ message: e.target.value })}
              maxLength={150}
              rows={3}
              placeholder="Escríbele algo desde el corazón..."
              className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-all border-2 resize-none"
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                borderColor: userData.message.trim() ? '#7B3F5E' : 'rgba(123,63,94,0.2)',
                background: 'white',
                color: '#2D1B1B',
              }}
            />
            <span className="text-xs text-right" style={{ color: '#C0A0B0' }}>
              {userData.message.length}/150
            </span>
          </div>

          <motion.button
            onClick={onNext}
            disabled={!isValid}
            whileHover={isValid ? { scale: 1.04 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
            className="w-full py-4 rounded-full font-medium text-base tracking-wide transition-all"
            style={{
              background: isValid
                ? 'linear-gradient(135deg, #7B3F5E 0%, #B07090 100%)'
                : 'rgba(123,63,94,0.2)',
              color: isValid ? 'white' : 'rgba(123,63,94,0.4)',
              boxShadow: isValid ? '0 8px 24px rgba(123,63,94,0.3)' : 'none',
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}
          >
            {isValid ? 'Crear mi tarjeta ✦' : 'Completa los campos para continuar'}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
        <FlowerSVG size={80} color="#E8A0BF" delay={0.5} />
      </div>
    </div>
  )
}
