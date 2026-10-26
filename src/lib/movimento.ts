import type gsap from 'gsap'

/**
 * As animações respeitam "reduzir movimento" do sistema. Para ver a versão
 * animada num computador com essa opção ligada, abra o site com ?movimento=total.
 */
export const CONDICOES = {
  anima: '(prefers-reduced-motion: no-preference)',
  reduz: '(prefers-reduced-motion: reduce)',
}

export const movimentoForcado = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('movimento') === 'total'

export const deveAnimar = (ctx: gsap.Context) => Boolean(ctx.conditions?.anima) || movimentoForcado()
