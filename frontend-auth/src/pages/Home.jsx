import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

/**
 * Landing page do S.I.T.U — layout claro (white), mesma identidade das telas de auth.
 */
export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
