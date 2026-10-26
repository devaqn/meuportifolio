import type { Diagrama, NoDiagrama, Tipo } from '@/content/projetos'

const NW = 176
const NH = 58
const GX = 60
const GY = 28
const PAD = 14

const estilo: Record<Tipo, { traco: string; dash?: string; fundo: string }> = {
  app: { traco: 'hsl(var(--primary))', fundo: 'hsl(var(--card))' },
  dados: { traco: 'hsl(var(--foreground) / 0.55)', fundo: 'hsl(var(--card))' },
  fila: { traco: 'hsl(var(--primary))', dash: '4 3', fundo: 'hsl(var(--card))' },
  externo: { traco: 'hsl(var(--muted-foreground))', dash: '2 3', fundo: 'hsl(var(--background))' },
}

const nomeDoTipo: Record<Tipo, string> = {
  app: 'parte do sistema',
  dados: 'guarda dados',
  fila: 'tarefas em segundo plano',
  externo: 'serviço de fora',
}

const posicao = (n: NoDiagrama) => ({
  x: PAD + n.coluna * (NW + GX),
  y: PAD + n.linha * (NH + GY),
})

interface Props {
  diagrama: Diagrama
  titulo: string
}

/**
 * Diagrama de arquitetura em SVG, desenhado a partir de dados. No celular o SVG
 * ficaria pequeno demais para ler, então ali aparece uma lista com o mesmo
 * conteúdo; em telas grandes a lista continua no DOM só para leitores de tela.
 */
const ArchDiagram = ({ diagrama, titulo }: Props) => {
  const { colunas, linhas, nos, arestas, legenda } = diagrama
  const largura = PAD * 2 + colunas * NW + (colunas - 1) * GX
  const altura = PAD * 2 + linhas * NH + (linhas - 1) * GY
  const porId = new Map(nos.map((n) => [n.id, n]))
  const tipos = Array.from(new Set(nos.map((n) => n.tipo)))

  const caminho = (de: NoDiagrama, para: NoDiagrama) => {
    const a = posicao(de)
    const b = posicao(para)
    if (de.coluna === para.coluna) {
      const desce = para.linha > de.linha
      const x = a.x + NW / 2
      const y1 = desce ? a.y + NH : a.y
      const y2 = desce ? b.y : b.y + NH
      return `M ${x} ${y1} L ${x} ${y2}`
    }
    const adiante = para.coluna > de.coluna
    const x1 = adiante ? a.x + NW : a.x
    const x2 = adiante ? b.x : b.x + NW
    const y1 = a.y + NH / 2
    const y2 = b.y + NH / 2
    const dx = Math.max(24, Math.abs(x2 - x1) / 2)
    const sinal = adiante ? 1 : -1
    return `M ${x1} ${y1} C ${x1 + sinal * dx} ${y1}, ${x2 - sinal * dx} ${y2}, ${x2} ${y2}`
  }

  const porColuna = Array.from({ length: colunas }, (_, c) =>
    nos.filter((n) => n.coluna === c).sort((x, y) => x.linha - y.linha),
  )

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${largura} ${altura}`}
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label={`Diagrama de arquitetura de ${titulo}`}
      >
        <defs>
          <marker id="seta" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>

        {arestas.map((a) => {
          const de = porId.get(a.de)
          const para = porId.get(a.para)
          if (!de || !para) return null
          return (
            <path
              key={`${a.de}-${a.para}`}
              d={caminho(de, para)}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.7)"
              strokeWidth={1.25}
              markerEnd="url(#seta)"
            />
          )
        })}

        {nos.map((n) => {
          const { x, y } = posicao(n)
          const e = estilo[n.tipo]
          return (
            <g key={n.id}>
              <rect
                x={x}
                y={y}
                width={NW}
                height={NH}
                rx={6}
                fill={e.fundo}
                stroke={e.traco}
                strokeWidth={1.25}
                strokeDasharray={e.dash}
              />
              <text x={x + 12} y={y + 24} fill="hsl(var(--foreground))" fontSize={13.5} fontWeight={600}>
                {n.rotulo}
              </text>
              {n.nota ? (
                <text
                  x={x + 12}
                  y={y + 42}
                  fill="hsl(var(--muted-foreground))"
                  fontSize={10}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                >
                  {n.nota}
                </text>
              ) : null}
            </g>
          )
        })}
      </svg>

      {/* Mesma informação em lista: visível no celular, só para leitor de tela no desktop. */}
      <ol className="space-y-3 md:sr-only">
        {porColuna.map((grupo, i) => (
          <li key={i} className="border-l border-border pl-4">
            {grupo.map((n) => (
              <p key={n.id} className="py-1 text-sm">
                <span className="font-semibold text-foreground">{n.rotulo}</span>
                {n.nota ? <span className="font-mono text-xs text-muted-foreground"> · {n.nota}</span> : null}
              </p>
            ))}
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground">
        {tipos.map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <svg width="16" height="10" aria-hidden="true">
              <rect
                x="0.5"
                y="0.5"
                width="15"
                height="9"
                rx="2"
                fill="none"
                stroke={estilo[t].traco}
                strokeDasharray={estilo[t].dash}
              />
            </svg>
            {nomeDoTipo[t]}
          </span>
        ))}
        {legenda ? <span className="text-muted-foreground/80">{legenda}</span> : null}
      </figcaption>
    </figure>
  )
}

export default ArchDiagram
