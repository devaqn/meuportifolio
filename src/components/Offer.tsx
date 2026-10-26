import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import SecaoTitulo from '@/components/SecaoTitulo'
import { achar } from '@/content/projetos'
import { perfil } from '@/content/perfil'
import { useReveal } from '@/hooks/useReveal'

/** Cada serviço aponta para um projeto que prova: estudo de caso se o código é privado, repositório se é público. */
const exemplo = (id: string, rotulo: string) => {
  const projeto = achar(id)
  if (!projeto) return null
  const externo = projeto.codigo === 'publico'
  const href = externo ? `https://github.com/${perfil.handle}/${projeto.repo}` : `#caso-${projeto.id}`
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-1.5 border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
    >
      Ver {rotulo}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

const Offer = () => {
  const raiz = useRef<HTMLElement>(null)
  useReveal(raiz)

  return (
    <section ref={raiz} id="faco" className="relative px-6 py-16 md:py-36">
      <div className="mx-auto max-w-6xl md:px-6">
        <SecaoTitulo num="04" nome="como posso ajudar" titulo="Como posso ajudar o seu negócio" />

        <ol className="border-b border-border" data-reveal>
          {perfil.faco.map((item, i) => (
            <li key={item.titulo} className="grid gap-x-6 gap-y-3 border-t border-border py-7 md:grid-cols-12 md:items-baseline md:py-9">
              <span className="font-mono text-sm text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-2xl font-semibold leading-snug tracking-tight md:col-span-5 md:text-3xl">{item.titulo}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground md:col-span-4">{item.texto}</p>
              <div className="md:col-span-2 md:text-right">{item.exemplo ? exemplo(item.exemplo.id, item.exemplo.rotulo) : null}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Offer
