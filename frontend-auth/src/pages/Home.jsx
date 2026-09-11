import { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import { MUNICIPIOS } from '@/data/municipios'

/**
 * Home urbdash — reprodução fiel do material do designer (dobra única).
 */
export default function Home() {
  const [cityId, setCityId] = useState(MUNICIPIOS[0].id)
  const municipio = MUNICIPIOS.find((m) => m.id === cityId) ?? MUNICIPIOS[0]

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Hero municipio={municipio} municipios={MUNICIPIOS} onSelect={setCityId} />
      </main>
    </div>
  )
}
