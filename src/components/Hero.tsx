import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { perfil } from '@/content/perfil'
import { CONDICOES, deveAnimar } from '@/lib/movimento'

gsap.registerPlugin(ScrollTrigger)

const ROXO = '#7c3aed'
const FUNDO = '#0a0a0d'

/**
 * A abertura é um "P" que cresce até virar a página. O P é um clip-path
 * escalado pelo GSAP: começa pequeno e violeta e termina maior que a tela,
 * quando a cor de dentro já virou a do fundo e o conteúdo aparece.
 */
const Hero = () => {
  const secao = useRef<HTMLElement>(null)
  const recorte = useRef<HTMLDivElement>(null)
  const conteudo = useRef<HTMLDivElement>(null)
  const letra = useRef<SVGPathElement>(null)
  const dica = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!secao.current || !recorte.current || !conteudo.current || !letra.current) return

    const mm = gsap.matchMedia()

    mm.add(CONDICOES, (ctx) => {
      if (!deveAnimar(ctx)) {
        gsap.set(recorte.current, { backgroundColor: FUNDO })
        gsap.set(letra.current, { scaleX: 60, scaleY: 60, transformOrigin: '50% 50%' })
        gsap.set(conteudo.current, { autoAlpha: 1, y: 0 })
        return
      }

      let proporcao = window.innerWidth / window.innerHeight

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: secao.current,
          start: 'top top',
          end: '+=170%',
          pin: true,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo(
        letra.current,
        { scaleX: 0.15, scaleY: () => 0.15 * proporcao, transformOrigin: '50% 50%' },
        { scaleX: 60, scaleY: () => 60 * proporcao, transformOrigin: '50% 50%', duration: 1, ease: 'power2.inOut' },
      )
        .to(recorte.current, { backgroundColor: FUNDO, duration: 0.35, ease: 'none' }, 0.45)
        .fromTo(
          conteudo.current,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '>-0.05',
        )
        .to({}, { duration: 0.15 })

      const aoRedimensionar = () => {
        proporcao = window.innerWidth / window.innerHeight
      }
      window.addEventListener('resize', aoRedimensionar, { passive: true })

      if (dica.current) {
        gsap.to(dica.current, { y: 6, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut' })
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        window.removeEventListener('resize', aoRedimensionar)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      <svg width="0" height="0" className="pointer-events-none absolute left-0 top-0" aria-hidden="true">
        <clipPath id="recorte-p" clipPathUnits="objectBoundingBox">
          <path
            ref={letra}
            d="M 0.23,0.10 L 0.23,0.90 L 0.43,0.90 L 0.43,0.58 L 0.59,0.58 Q 0.72,0.58 0.79,0.51 Q 0.86,0.44 0.86,0.34 Q 0.86,0.24 0.79,0.17 Q 0.72,0.10 0.59,0.10 Z M 0.43,0.25 L 0.59,0.25 Q 0.66,0.25 0.69,0.28 Q 0.72,0.31 0.72,0.34 Q 0.72,0.37 0.69,0.40 Q 0.66,0.43 0.59,0.43 L 0.43,0.43 Z"
          />
        </clipPath>
      </svg>

      <section ref={secao} className="relative z-[1] flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden">
        <div
          ref={recorte}
          className="relative flex h-full w-full items-center will-change-transform"
          style={{ clipPath: 'url(#recorte-p)', backgroundColor: ROXO }}
        >
          <div ref={conteudo} className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-x-8 gap-y-8 px-6 opacity-0">
            <div className="col-span-12 md:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                {perfil.hero.etiqueta}
              </p>
              <h1 className="mt-5 text-[clamp(3.4rem,12.5vw,10.5rem)] font-bold leading-[0.86] tracking-tighter text-foreground">
                Pedro
                <br />
                Miguel
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75 md:text-xl">{perfil.hero.resumo}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#trabalho"
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary"
                >
                  Ver o que construí
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={perfil.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  Falar no WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className="col-span-5 row-start-1 m-0 md:col-span-4 md:row-start-auto md:flex md:flex-col md:items-end">
              <img
                src={perfil.foto}
                alt={perfil.fotoAlt}
                width={640}
                height={800}
                className="aspect-[4/5] w-full max-w-[150px] rounded-sm border border-border object-cover md:max-w-[300px]"
              />
              <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">github.com/{perfil.handle}</figcaption>
            </figure>
          </div>
        </div>

        <div ref={dica} className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-muted-foreground/60" aria-hidden="true">
          <ArrowDown className="h-4 w-4" />
        </div>
      </section>
    </>
  )
}

export default Hero
