import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { perfil } from '@/content/perfil'
import { useReveal } from '@/hooks/useReveal'
import { CONDICOES, deveAnimar } from '@/lib/movimento'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const raiz = useRef<HTMLElement>(null)
  const frase = useRef<HTMLHeadingElement>(null)
  useReveal(raiz)

  // A frase acende palavra por palavra enquanto a pessoa rola.
  useEffect(() => {
    if (!frase.current) return
    const mm = gsap.matchMedia()
    mm.add(CONDICOES, (ctx) => {
      if (!deveAnimar(ctx)) return
      const palavras = frase.current!.querySelectorAll('span[data-palavra]')
      gsap.fromTo(
        palavras,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: frase.current, start: 'top 82%', end: 'bottom 48%', scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={raiz} id="sobre" className="relative px-6 py-20 md:py-40">
      <div className="mx-auto max-w-6xl md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground" data-reveal>
          <span className="text-primary">01</span> / sobre
        </p>

        <h2 ref={frase} className="mt-6 max-w-4xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
          {perfil.frase.split(' ').map((palavra, i) => (
            <span key={i} data-palavra className="inline-block pr-[0.28em]">
              {palavra}
            </span>
          ))}
        </h2>

        <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 md:col-span-7" data-reveal>
            {perfil.sobre.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>

          <div className="md:col-span-5" data-reveal>
            <dl className="divide-y divide-border border-y border-border font-mono text-sm">
              {perfil.fatos.map((f) => (
                <div key={f.rotulo} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
                  <dt className="text-muted-foreground">{f.rotulo}</dt>
                  <dd className="text-foreground">{f.valor}</dd>
                </div>
              ))}
            </dl>

            <ol className="mt-10 space-y-6 border-l border-border pl-6">
              {perfil.trajetoria.map((t) => (
                <li key={t.quando} className="relative">
                  <span className="absolute -left-[1.85rem] top-1.5 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t.quando}</p>
                  <p className="mt-1 font-semibold">{t.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
