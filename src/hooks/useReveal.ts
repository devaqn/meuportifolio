import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONDICOES, deveAnimar } from '@/lib/movimento'

gsap.registerPlugin(ScrollTrigger)

/**
 * Faz cada filho marcado com `data-reveal` entrar com um fade curto quando
 * chega à tela. Com "reduzir movimento" ligado, nada é escondido nem animado.
 */
export function useReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return

    const mm = gsap.matchMedia()
    mm.add(CONDICOES, (ctx) => {
      if (!deveAnimar(ctx)) return
      raiz.querySelectorAll<HTMLElement>('[data-reveal]').forEach((alvo) => {
        gsap.fromTo(
          alvo,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: alvo, start: 'top 90%', once: true },
          },
        )
      })
    })

    return () => mm.revert()
  }, [ref])
}
