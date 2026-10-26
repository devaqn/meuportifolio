import type gsap from 'gsap'

/**
 * As animações de rolagem (a abertura em "P" e as entradas das seções) tocam sempre: quem as
 * controla é a própria pessoa, rolando a página. Só o movimento que roda sozinho (a seta
 * piscando) obedece a "reduzir movimento" do sistema. Para ver a página parada, abra o site com
 * ?movimento=reduzido.
 */
export const CONDICOES = {
  anima: '(prefers-reduced-motion: no-preference)',
  reduz: '(prefers-reduced-motion: reduce)',
}

export const movimentoReduzidoPedido = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('movimento') === 'reduzido'

export const deveAnimar = (_ctx?: gsap.Context) => !movimentoReduzidoPedido()

/** Movimento que roda sem a pessoa fazer nada: respeita a configuração do sistema. */
export const podeMoverSozinho = (ctx: gsap.Context) => Boolean(ctx.conditions?.anima) && !movimentoReduzidoPedido()
