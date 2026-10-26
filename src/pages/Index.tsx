import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Work from '@/components/Work'
import Evidence from '@/components/Evidence'
import Offer from '@/components/Offer'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const Index = () => (
  <>
    <a
      href="#sobre"
      className="sr-only fixed left-4 top-4 z-[70] rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background focus:not-sr-only"
    >
      Pular para o conteúdo
    </a>
    <Navbar />
    <main>
      <div id="inicio">
        <Hero />
      </div>
      <About />
      <Work />
      <Evidence />
      <Offer />
      <Contact />
    </main>
    <Footer />
  </>
)

export default Index
