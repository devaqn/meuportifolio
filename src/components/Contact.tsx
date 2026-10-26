import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import SecaoTitulo from '@/components/SecaoTitulo'
import { perfil } from '@/content/perfil'
import { useReveal } from '@/hooks/useReveal'

const outros = [
  { rotulo: 'LinkedIn', href: perfil.links.linkedin },
  { rotulo: 'GitHub', href: perfil.links.github },
  { rotulo: 'Instagram', href: perfil.links.instagram },
  { rotulo: 'Currículo', href: perfil.links.curriculo },
]

const Contact = () => {
  const raiz = useRef<HTMLElement>(null)
  const [copiado, setCopiado] = useState(false)
  useReveal(raiz)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.email)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2200)
    } catch {
      window.location.href = `mailto:${perfil.email}`
    }
  }

  return (
    <section ref={raiz} id="contato" className="relative px-6 pb-14 pt-16 md:pt-36">
      <div className="mx-auto max-w-6xl md:px-6">
        <SecaoTitulo num="05" nome="contato" titulo="Fala comigo">
          Se você tem um negócio que vive no WhatsApp, ou precisa de um sistema, me manda uma mensagem.
        </SecaoTitulo>

        <ul className="border-b border-border" data-reveal>
          <li className="border-t border-border">
            <a
              href={perfil.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-7 transition-colors hover:text-primary md:py-9"
            >
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">whatsapp</span>
                <span className="mt-2 block text-3xl font-semibold tracking-tight md:text-6xl">{perfil.telefone}</span>
              </span>
              <ArrowUpRight className="h-7 w-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" aria-hidden="true" />
            </a>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-t border-border py-7 md:flex-nowrap md:py-9">
            <a href={`mailto:${perfil.email}`} className="min-w-0 basis-full transition-colors hover:text-primary md:basis-auto">
              <span className="block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">e-mail</span>
              <span className="mt-2 block text-[1.3rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">{perfil.email}</span>
            </a>
            <button
              type="button"
              onClick={copiar}
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-live="polite"
            >
              {copiado ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copiado ? 'copiado' : 'copiar'}
            </button>
          </li>
        </ul>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm" data-reveal>
          {outros.map((o) => (
            <li key={o.rotulo}>
              <a
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {o.rotulo}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contact
