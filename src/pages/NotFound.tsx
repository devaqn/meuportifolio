import { perfil } from '@/content/perfil'

const NotFound = () => (
  <main className="flex min-h-screen items-center px-6">
    <div className="mx-auto w-full max-w-6xl">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">404</span> / página não encontrada
      </p>
      <h1 className="mt-4 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">Essa página não existe.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">O endereço pode ter mudado ou ter um erro de digitação.</p>
      <a
        href="/"
        className="mt-10 inline-flex rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary"
      >
        Voltar para {perfil.handle}
      </a>
    </div>
  </main>
)

export default NotFound
