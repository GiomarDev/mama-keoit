import { Suspense } from 'react'
import SlideShow from '@/components/SlideShow'

export default function Home() {
  return (
    <Suspense>
      <SlideShow />
    </Suspense>
  )
}
