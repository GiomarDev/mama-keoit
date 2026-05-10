'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import CardDownloadable from '../ui/CardDownloadable'

interface UserData {
  momName: string
  message: string
}

interface Props {
  userData: UserData
  onReset: () => void
  onBack: () => void
}

type Feedback = 'download' | 'whatsapp' | 'copy' | null

function buildShareUrl(userData: UserData): string {
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  const params = new URLSearchParams({
    para: userData.momName,
    mensaje: userData.message,
  })
  return `${base}?${params.toString()}`
}

export default function Slide05Share({ userData, onReset, onBack }: Props) {
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const showFeedback = (type: Feedback) => {
    setFeedback(type)
    setTimeout(() => setFeedback(null), 2500)
  }

  const handleDownload = useCallback(async () => {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const el = document.getElementById('card-to-download')
      if (!el) return
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = `feliz-dia-mama-${userData.momName.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      showFeedback('download')
    } catch {
      // silent fail
    } finally {
      setIsDownloading(false)
    }
  }, [isDownloading, userData.momName])

  const handleWhatsApp = useCallback(() => {
    const shareUrl = buildShareUrl(userData)
    const text = encodeURIComponent(
      `🌸 ¡Feliz Día de la Madre, ${userData.momName}! 🌸\n\n"${userData.message}"\n\nVive la experiencia: ${shareUrl}\n\nCon amor ✦ KeoIT`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
    showFeedback('whatsapp')
  }, [userData])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(userData))
      showFeedback('copy')
    } catch {
      // silent fail
    }
  }, [userData])

  const actions = [
    {
      id: 'download' as const,
      label: 'Descargar PNG',
      description: 'Guarda la tarjeta como imagen',
      onClick: handleDownload,
      loading: isDownloading,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'whatsapp' as const,
      label: 'Enviar por WhatsApp',
      description: 'Comparte el enlace con tu mensaje',
      onClick: handleWhatsApp,
      loading: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.141 1.535 5.879L.057 23.273a.5.5 0 0 0 .67.67l5.394-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.528-5.214-1.44l-.374-.22-3.2.876.876-3.199-.22-.374A9.966 9.966 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
    },
    {
      id: 'copy' as const,
      label: 'Copiar enlace personalizado',
      description: 'URL directa a la tarjeta de tu mamá',
      onClick: handleCopy,
      loading: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  const feedbackMessages: Record<NonNullable<Feedback>, string> = {
    download: '¡Imagen guardada! 🌸',
    whatsapp: '¡Abriendo WhatsApp! 💚',
    copy: '¡Enlace copiado! 🔗',
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFF8F0 0%, #FFE4EC 60%, #FFF0E8 100%)',
      }}
    >
      {/* Tarjeta oculta fuera de viewport — solo para html2canvas */}
      <CardDownloadable userData={userData} />
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full gap-7">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/logo-white.jpg"
            alt="KeoIT"
            width={72}
            height={72}
            className="rounded-xl"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-1"
        >
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#7B3F5E' }}
          >
            Comparte el amor
          </h2>
          <p className="text-sm" style={{ color: '#B07090' }}>
            Hazle llegar esta tarjeta a {userData.momName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full flex flex-col gap-3"
        >
          {actions.map((action, i) => (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              disabled={action.loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all"
              style={{
                background: 'white',
                border: '1.5px solid rgba(123,63,94,0.15)',
                boxShadow: '0 4px 16px rgba(123,63,94,0.08)',
                color: '#7B3F5E',
                opacity: action.loading ? 0.7 : 1,
              }}
            >
              <span className="shrink-0">{action.icon}</span>
              <div>
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#B07090' }}>
                  {action.loading ? 'Procesando...' : action.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-white text-sm font-medium shadow-lg"
              style={{ background: '#7B3F5E' }}
            >
              {feedbackMessages[feedback]}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center gap-3 mt-1"
        >
          <button
            onClick={onReset}
            className="text-sm italic underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: '#B07090', fontFamily: 'var(--font-playfair), serif' }}
          >
            Vivir la experiencia otra vez
          </button>
          <p className="text-xs" style={{ color: '#D0B0C0' }}>
            Automatizamos el futuro, con el amor del presente.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
