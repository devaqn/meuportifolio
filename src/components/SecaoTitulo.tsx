import type { ReactNode } from 'react'

interface Props {
  num: string
  nome: string
  titulo: string
  children?: ReactNode
}

/** Cabeçalho de seção: número e nome em mono, título grande alinhado à esquerda. */
const SecaoTitulo = ({ num, nome, titulo, children }: Props) => (
  <header className="mb-12 md:mb-16" data-reveal>
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span className="text-primary">{num}</span> / {nome}
    </p>
    <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.04] tracking-tight md:text-6xl">
      {titulo}
    </h2>
    {children ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div> : null}
  </header>
)

export default SecaoTitulo
