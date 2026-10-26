import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import SecaoTitulo from '@/components/SecaoTitulo'
import { medicao, stackNoGit, stackPrivada } from '@/content/git'
import { perfil } from '@/content/perfil'
import { haQuantoTempo, useAtividade } from '@/hooks/useAtividade'
import { useReveal } from '@/hooks/useReveal'
import { CONDICOES, deveAnimar } from '@/lib/movimento'

gsap.registerPlugin(ScrollTrigger)

const numeros = [
  { valor: medicao.repositorios.total, titulo: 'projetos guardados', nota: `${medicao.repositorios.publicos} abertos ao público, o resto é privado` },
  { valor: medicao.testes.casos, titulo: 'testes automáticos', nota: `pequenos roteiros que conferem se o sistema ainda funciona, em ${medicao.testes.repos} projetos públicos` },
  { valor: medicao.ci.repos, titulo: 'conferidos sozinhos', nota: `a cada mudança, o GitHub roda os testes sem ninguém pedir. ${medicao.ci.verdes} passaram na última vez` },
  { valor: medicao.docker, titulo: 'prontos para rodar em qualquer lugar', nota: 'empacotados com Docker, para funcionar igual em qualquer computador' },
]

const maior = Math.max(...stackNoGit.map((s) => s.repos))

const Evidence = () => {
  const raiz = useRef<HTMLElement>(null)
  const barras = useRef<HTMLUListElement>(null)
  const { itens, aoVivo } = useAtividade()
  useReveal(raiz)

  useEffect(() => {
    if (!barras.current) return
    const mm = gsap.matchMedia()
    mm.add(CONDICOES, (ctx) => {
      if (!deveAnimar(ctx)) return
      gsap.fromTo(
        barras.current!.querySelectorAll('[data-barra]'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          transformOrigin: 'left center',
          scrollTrigger: { trigger: barras.current, start: 'top 85%', once: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={raiz} id="git" className="relative px-6 py-16 md:py-36">
      <div className="mx-auto max-w-6xl md:px-6">
        <SecaoTitulo num="03" nome="números" titulo="Os números saem do meu GitHub">
          O GitHub é onde programadores guardam seus projetos. Contei em {medicao.data}, nos {medicao.populacao} projetos públicos que são meus, sem cópias de outras pessoas. O que é privado não entra na conta.
        </SecaoTitulo>

        <ul className="grid grid-cols-2 border-y border-border md:grid-cols-4" data-reveal>
          {numeros.map((n, i) => (
            <li key={n.titulo} className={`px-1 py-8 md:px-6 ${i > 0 ? 'md:border-l md:border-border' : ''} ${i % 2 === 1 ? 'border-l border-border md:border-l' : ''}`}>
              <p className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">{n.valor}</p>
              <p className="mt-3 font-semibold">{n.titulo}</p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">{n.nota}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7" data-reveal>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Ferramentas que mais uso, e em quantos projetos aparecem
            </h3>
            <ul ref={barras} className="space-y-4">
              {stackNoGit.map((s) => (
                <li key={s.nome} className="grid grid-cols-[1fr_2rem] items-center gap-x-4 gap-y-1.5 md:grid-cols-[13rem_1fr_2rem]">
                  <span className="font-mono text-sm text-foreground">
                    {s.nome}
                    <span className="block font-sans text-xs text-muted-foreground">{s.oQueE}</span>
                  </span>
                  <span className="col-span-2 row-start-2 h-1.5 rounded-full bg-muted md:col-span-1 md:row-start-auto">
                    <span data-barra className="block h-full rounded-full bg-primary" style={{ width: `${(s.repos / maior) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono text-sm text-muted-foreground">{s.repos}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Ficam de fora desta conta, porque o código é privado: {stackPrivada}.
            </p>
          </div>

          <div className="md:col-span-5" data-reveal>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Projetos que mexi por último</h3>
            <ul className="divide-y divide-border border-y border-border">
              {itens.map((r) => (
                <li key={r.nome}>
                  <a
                    href={`https://github.com/${perfil.handle}/${r.nome}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary"
                  >
                    <span className="truncate font-medium">{r.nome}</span>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {r.linguagem ? `${r.linguagem} · ` : ''}
                      {haQuantoTempo(r.quando)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              {aoVivo ? 'lista ao vivo, direto do GitHub' : `lista de ${medicao.data}: o GitHub não respondeu agora`}
            </p>
            <a
              href={perfil.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              Abrir o GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Evidence
