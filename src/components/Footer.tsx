import { perfil } from '@/content/perfil'

const Footer = () => (
  <footer className="border-t border-border px-6 py-8">
    <div className="mx-auto flex max-w-6xl flex-col justify-between md:px-6 gap-3 font-mono text-xs text-muted-foreground md:flex-row">
      <p>
        © {new Date().getFullYear()} {perfil.nome} · {perfil.cidade}
      </p>
      <p>
        <a
          href={perfil.links.codigoDoSite}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Código deste site no GitHub
        </a>
        {' · '}React, Vite e GSAP
      </p>
    </div>
  </footer>
)

export default Footer
