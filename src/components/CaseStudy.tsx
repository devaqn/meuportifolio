import { ArrowUpRight, Lock } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import ArchDiagram from '@/components/ArchDiagram'
import type { Projeto } from '@/content/projetos'
import { perfil } from '@/content/perfil'

interface Props {
  projeto: Projeto | null
  indice: number
  aoFechar: () => void
}

const Chip = ({ children }: { children: string }) => (
  <span className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{children}</span>
)

const Rotulo = ({ id, children }: { id: string; children: string }) => (
  <h3 id={id} className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
    {children}
  </h3>
)

/** Estudo de caso: o que o projeto é, como é por dentro e o que o código tem de verdade. */
const CaseStudy = ({ projeto, indice, aoFechar }: Props) => (
  <Dialog open={projeto !== null} onOpenChange={(aberto) => !aberto && aoFechar()}>
    <DialogContent className="max-h-[92vh] max-w-4xl gap-0 overflow-y-auto rounded-md border-border bg-background p-0 sm:rounded-md">
      {projeto ? (
        <div className="p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-primary">{String(indice + 1).padStart(2, '0')}</span> · {projeto.tipo}
          </p>
          <DialogTitle className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">{projeto.nome}</DialogTitle>
          <DialogDescription className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {projeto.contexto}
          </DialogDescription>

          {projeto.numeros ? (
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
              {projeto.numeros.map((n) => (
                <div key={n.rotulo}>
                  <dt className="text-4xl font-bold tracking-tight text-primary">{n.valor}</dt>
                  <dd className="mt-1 font-mono text-xs text-muted-foreground">{n.rotulo}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {projeto.diagrama ? (
            <section className="mt-10" aria-labelledby="titulo-arq">
              <Rotulo id="titulo-arq">Como é por dentro</Rotulo>
              <div className="rounded-md border border-border bg-card/40 p-4 md:p-6">
                <ArchDiagram diagrama={projeto.diagrama} titulo={projeto.nome} />
              </div>
            </section>
          ) : null}

          {projeto.destaques ? (
            <section className="mt-10" aria-labelledby="titulo-dentro">
              <Rotulo id="titulo-dentro">O que tem nele</Rotulo>
              <ul className="space-y-3">
                {projeto.destaques.map((d) => (
                  <li key={d} className="relative pl-5 leading-relaxed text-foreground/85">
                    <span className="absolute left-0 top-[0.65em] h-1.5 w-1.5 bg-primary" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-10">
            <Rotulo id="titulo-tec">Tecnologias usadas</Rotulo>
            <div className="flex flex-wrap gap-1.5">
              {projeto.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" aria-hidden="true" />
              {projeto.codigo === 'privado' ? 'O código é privado. Posso mostrar numa conversa.' : 'Código público no GitHub.'}
            </p>
            <a
              href={perfil.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              Conversar sobre este projeto
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </footer>
        </div>
      ) : null}
    </DialogContent>
  </Dialog>
)

export default CaseStudy
