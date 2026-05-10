'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import AudioToggle from './ui/AudioToggle'
import SlideProgress from './ui/SlideProgress'
import Slide00Intro from './slides/Slide00Intro'
import Slide01KeoIT from './slides/Slide01KeoIT'
import Slide02Poem from './slides/Slide02Poem'
import Slide03Personalize from './slides/Slide03Personalize'
import Slide04Card from './slides/Slide04Card'
import Slide05Share from './slides/Slide05Share'
import { TOTAL_SLIDES } from '@/lib/slides'

interface UserData {
  momName: string
  message: string
}

interface State {
  currentSlide: number
  isTransitioning: boolean
  userData: UserData
  audioEnabled: boolean
  audioAvailable: boolean
  isDeepLink: boolean
}

type Action =
  | { type: 'NEXT' }
  | { type: 'GOTO'; slide: number }
  | { type: 'SET_USER_DATA'; payload: Partial<UserData> }
  | { type: 'SET_DEEP_LINK' }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'SET_AUDIO_UNAVAILABLE' }
  | { type: 'TRANSITION_DONE' }
  | { type: 'RESET' }

const PERSONALIZE_SLIDE = 3

const initialState: State = {
  currentSlide: 0,
  isTransitioning: false,
  userData: { momName: '', message: '' },
  audioEnabled: false,
  audioAvailable: true,
  isDeepLink: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT': {
      if (state.isTransitioning || state.currentSlide >= TOTAL_SLIDES - 1) return state
      // Si viene de deep link, saltarse el slide de personalización
      const nextSlide =
        state.isDeepLink && state.currentSlide === PERSONALIZE_SLIDE - 1
          ? PERSONALIZE_SLIDE + 1
          : state.currentSlide + 1
      return { ...state, currentSlide: nextSlide, isTransitioning: true }
    }
    case 'GOTO':
      if (state.isTransitioning) return state
      return { ...state, currentSlide: action.slide, isTransitioning: true }
    case 'SET_USER_DATA':
      return { ...state, userData: { ...state.userData, ...action.payload } }
    case 'SET_DEEP_LINK':
      return { ...state, isDeepLink: true }
    case 'TOGGLE_AUDIO':
      if (!state.audioAvailable) return state
      return { ...state, audioEnabled: !state.audioEnabled }
    case 'SET_AUDIO_UNAVAILABLE':
      return { ...state, audioEnabled: false, audioAvailable: false }
    case 'TRANSITION_DONE':
      return { ...state, isTransitioning: false }
    case 'RESET':
      return {
        ...initialState,
        audioEnabled: state.audioEnabled,
        audioAvailable: state.audioAvailable,
      }
    default:
      return state
  }
}

const DARK_SLIDES = [1]

const slideVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

export default function SlideShow() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const para = searchParams.get('para')
    const mensaje = searchParams.get('mensaje')
    if (para && mensaje) {
      dispatch({ type: 'SET_USER_DATA', payload: { momName: para, message: mensaje } })
      dispatch({ type: 'SET_DEEP_LINK' })
    }
  }, [searchParams])

  useEffect(() => {
    const audio = new Audio('/audio/background.mp3')
    audio.loop = true
    audio.volume = 0

    audio.addEventListener('error', () => {
      dispatch({ type: 'SET_AUDIO_UNAVAILABLE' })
    })

    audioRef.current = audio
    return () => { audio.pause() }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !state.audioAvailable) return

    if (state.audioEnabled) {
      audio.play().catch(() => dispatch({ type: 'SET_AUDIO_UNAVAILABLE' }))
      const fade = setInterval(() => {
        const next = Math.min(audio.volume + 0.05, 0.4)
        audio.volume = next
        if (next >= 0.4) clearInterval(fade)
      }, 50)
      return () => clearInterval(fade)
    } else {
      const fade = setInterval(() => {
        const next = Math.max(audio.volume - 0.05, 0)
        audio.volume = next
        if (next <= 0) { clearInterval(fade); audio.pause() }
      }, 50)
      return () => clearInterval(fade)
    }
  }, [state.audioEnabled, state.audioAvailable])

  const goNext = useCallback(() => dispatch({ type: 'NEXT' }), [])
  const goTo = useCallback((slide: number) => dispatch({ type: 'GOTO', slide }), [])
  const setUserData = useCallback(
    (data: Partial<UserData>) => dispatch({ type: 'SET_USER_DATA', payload: data }),
    []
  )
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const toggleAudio = useCallback(() => dispatch({ type: 'TOGGLE_AUDIO' }), [])

  const isDark = DARK_SLIDES.includes(state.currentSlide)

  const slides = [
    <Slide00Intro key={0} onNext={goNext} momName={state.isDeepLink ? state.userData.momName : undefined} />,
    <Slide01KeoIT key={1} onNext={goNext} />,
    <Slide02Poem key={2} onNext={goNext} />,
    <Slide03Personalize key={3} userData={state.userData} onUpdate={setUserData} onNext={goNext} />,
    <Slide04Card key={4} userData={state.userData} onNext={goNext} />,
    <Slide05Share key={5} userData={state.userData} onReset={reset} onBack={() => goTo(4)} />,
  ]

  return (
    <div className="relative w-full h-full overflow-hidden">
      {state.audioAvailable && (
        <AudioToggle enabled={state.audioEnabled} onToggle={toggleAudio} dark={isDark} />
      )}
      <SlideProgress current={state.currentSlide} total={TOTAL_SLIDES} dark={isDark} />

      <AnimatePresence mode="wait" onExitComplete={() => dispatch({ type: 'TRANSITION_DONE' })}>
        <motion.div
          key={state.currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[state.currentSlide]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
