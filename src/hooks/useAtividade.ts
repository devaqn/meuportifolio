import { useEffect, useState } from 'react'
import { perfil } from '@/content/perfil'
import { reservaAtividade, type Atividade } from '@/content/git'

const CHAVE = 'devaqn:atividade:v1'
const VALIDADE_MS = 10 * 60 * 1000

interface Estado {
  itens: Atividade[]
  aoVivo: boolean
}

interface RepoApi {
  name: string
  fork: boolean
  archived: boolean
  language: string | null
  pushed_at: string
}

/** Fora o repositório do perfil (que recebe commit automático) e os demos feitos para clientes. */
const interessa = (r: RepoApi) =>
  !r.fork && !r.archived && r.name.toLowerCase() !== perfil.handle && !/demo/i.test(r.name)

const lerCache = (): Estado | null => {
  try {
    const bruto = sessionStorage.getItem(CHAVE)
    if (!bruto) return null
    const { em, itens } = JSON.parse(bruto) as { em: number; itens: Atividade[] }
    return Date.now() - em < VALIDADE_MS ? { itens, aoVivo: true } : null
  } catch {
    return null
  }
}

/**
 * Últimos repositórios públicos mexidos, direto da API do GitHub. Se a API
 * falhar (limite de requisições, sem rede), mostra o retrato guardado em
 * `reservaAtividade`, e a interface avisa qual dos dois está na tela.
 */
export function useAtividade(): Estado {
  const [estado, setEstado] = useState<Estado>(() => lerCache() ?? { itens: reservaAtividade, aoVivo: false })

  useEffect(() => {
    if (lerCache()) return
    const ctl = new AbortController()

    fetch(`https://api.github.com/users/${perfil.handle}/repos?sort=pushed&per_page=30&type=owner`, {
      signal: ctl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? (r.json() as Promise<RepoApi[]>) : Promise.reject(new Error(String(r.status)))))
      .then((repos) => {
        const itens = repos
          .filter(interessa)
          .slice(0, 7)
          .map((r) => ({ nome: r.name, linguagem: r.language, quando: r.pushed_at.slice(0, 10) }))
        if (itens.length === 0) return
        setEstado({ itens, aoVivo: true })
        try {
          sessionStorage.setItem(CHAVE, JSON.stringify({ em: Date.now(), itens }))
        } catch {
          /* sessionStorage pode estar bloqueado; sem cache segue funcionando */
        }
      })
      .catch(() => {
        /* mantém a reserva */
      })

    return () => ctl.abort()
  }, [])

  return estado
}

const formatador = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

/** "hoje", "há 3 dias", "há 2 meses". Recebe a data no formato AAAA-MM-DD. */
export function haQuantoTempo(iso: string, agora = new Date()): string {
  const dias = Math.floor((agora.getTime() - new Date(`${iso}T12:00:00`).getTime()) / 86_400_000)
  if (dias < 1) return formatador.format(0, 'day')
  if (dias < 45) return formatador.format(-dias, 'day')
  return formatador.format(-Math.round(dias / 30), 'month')
}
