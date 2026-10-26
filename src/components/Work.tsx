import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import SecaoTitulo from '@/components/SecaoTitulo'
import CaseStudy from '@/components/CaseStudy'
import { casos, publicos } from '@/content/projetos'
import { perfil } from '@/content/perfil'
import { useReveal } from '@/hooks/useReveal'

const repoUrl = (repo: string) => `https://github.com/${perfil.handle}/${repo}`

const Work = () => {
  const raiz = useRef<HTMLElement>(null)
  const [aberto, setAberto] = useState<string | null>(null)
  useReveal(raiz)

  // O hash #caso-<id> abre o estudo de caso, para dar para mandar o link de um projeto.
  useEffect(() => {
    const ler = () => {
      const m = window.location.hash.match(/^#caso-(.+)$/)
      setAberto(m && casos.some((c) => c.id === m[1]) ? m[1] : null)
    }
    ler()
    window.addEventListener('hashchange', ler)
    return () => window.removeEventListener('hashchange', ler)
  }, [])

  const abrir = useCallback((id: string) => {
    window.history.replaceState(null, '', `#caso-${id}`)
    setAberto(id)
  }, [])

  const fechar = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setAberto(null)
  }, [])

  const atual = casos.find((c) => c.id === aberto) ?? null

  return (
    <section ref={raiz} id="trabalho" className="relative px-6 py-16 md:py-36">
      <div className="mx-auto max-w-6xl md:px-6">
        <SecaoTitulo num="02" nome="trabalhos" titulo="O que construí">
          Os quatro primeiros têm código privado, então mostro como são por dentro, sem abrir o código. Clique em um para ver. O resto está no GitHub, aberto para qualquer pessoa.
        </SecaoTitulo>

        <ul className="border-b border-border" data-reveal>
          {casos.map((p, i) => (
            <li key={p.id} className="border-t border-border">
              <button
                type="button"
                onClick={() => abrir(p.id)}
                className="group -mx-3 grid w-[calc(100%+1.5rem)] grid-cols-12 items-baseline gap-x-6 gap-y-3 px-3 py-7 text-left transition-colors hover:bg-card/70 md:py-9"
                aria-haspopup="dialog"
              >
                <span className="col-span-2 font-mono text-sm text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-4xl">{p.nome}</h3>
                  <p className="mt-2 text-pretty text-muted-foreground md:text-lg">{p.linha}</p>
                </div>
                <div className="col-span-10 col-start-3 flex flex-wrap gap-1.5 md:col-span-4 md:col-start-auto">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="col-span-1 hidden justify-self-end text-muted-foreground transition-all group-hover:rotate-90 group-hover:text-primary md:block">
                  <Plus className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Abrir o projeto</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <h3 className="mb-6 mt-24 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground" data-reveal>
          <span className="text-primary">código aberto no GitHub</span> · {publicos.length} projetos
        </h3>

        <ul className="divide-y divide-border border-y border-border" data-reveal>
          {publicos.map((p) => (
            <li key={p.id} className="grid gap-x-6 gap-y-2 py-5 md:grid-cols-12 md:items-baseline">
              <div className="md:col-span-3">
                <a
                  href={repoUrl(p.repo!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xl font-semibold transition-colors hover:text-primary"
                >
                  {p.nome}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{p.tipo}</p>
              </div>
              <p className="text-pretty text-muted-foreground md:col-span-5">{p.linha}</p>
              <div className="flex flex-wrap gap-1.5 md:col-span-2">
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground md:col-span-2 md:justify-end">
                {p.testes ? <span title="testes automáticos">{p.testes} testes</span> : null}
                {p.demo ? (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    demo
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <CaseStudy projeto={atual} indice={atual ? casos.indexOf(atual) : 0} aoFechar={fechar} />
    </section>
  )
}

export default Work
