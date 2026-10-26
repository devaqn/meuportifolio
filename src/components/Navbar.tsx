import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { perfil } from '@/content/perfil'

const links = [
  { rotulo: 'sobre', id: 'sobre' },
  { rotulo: 'trabalhos', id: 'trabalho' },
  { rotulo: 'números', id: 'git' },
  { rotulo: 'como ajudo', id: 'faco' },
  { rotulo: 'contato', id: 'contato' },
]

const Navbar = () => {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState<string | null>(null)
  const progresso = useRef<HTMLDivElement>(null)

  // Marca no menu a seção que está na altura do meio da tela.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtivo(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observador.observe(el)
    })
    return () => observador.disconnect()
  }, [])

  // Fio fino no pé da barra que acompanha o quanto da página já foi lido.
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const total = document.documentElement.scrollHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, window.scrollY / total) : 0
      if (progresso.current) progresso.current.style.transform = `scaleX(${p})`
    }
    const aoRolar = () => {
      if (pendente) return
      pendente = true
      requestAnimationFrame(atualizar)
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight" aria-label={`${perfil.handle}, início`}>
          <img src="/favicon.svg" alt="" width={26} height={26} className="h-[26px] w-[26px]" />
          <span>
            {perfil.handle}
            <span className="text-primary">_</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 font-mono text-[13px] md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={ativo === l.id ? 'true' : undefined}
                className={`transition-colors hover:text-foreground ${ativo === l.id ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={perfil.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden border-b border-foreground/40 pb-0.5 text-[13px] font-medium transition-colors hover:border-primary hover:text-primary md:inline"
        >
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-movel"
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
        >
          {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {aberto ? (
        <div id="menu-movel" className="border-t border-border bg-background px-6 pb-5 pt-2 md:hidden">
          <ul className="font-mono text-base">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setAberto(false)}
                  className={`block border-b border-border/60 py-3 ${ativo === l.id ? 'text-primary' : 'text-foreground'}`}
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div ref={progresso} className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-primary" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
    </header>
  )
}

export default Navbar
