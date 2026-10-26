import { describe, expect, it } from 'vitest'
import { casos, publicos, todos, achar } from '@/content/projetos'
import { medicao, stackNoGit } from '@/content/git'
import { perfil } from '@/content/perfil'
import { haQuantoTempo } from '@/hooks/useAtividade'

describe('projetos', () => {
  it('não repete id', () => {
    const ids = todos.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('todo caso de código privado tem contexto, destaques e diagrama', () => {
    for (const c of casos) {
      expect(c.codigo, c.nome).toBe('privado')
      expect(c.contexto?.length, c.nome).toBeGreaterThan(40)
      expect(c.destaques?.length, c.nome).toBeGreaterThan(2)
      expect(c.diagrama, c.nome).toBeDefined()
    }
  })

  it('todo projeto público aponta para um repositório', () => {
    for (const p of publicos) {
      expect(p.codigo, p.nome).toBe('publico')
      expect(p.repo, p.nome).toBeTruthy()
    }
  })

  it('só liga demo com endereço https', () => {
    for (const p of todos) if (p.demo) expect(p.demo.startsWith('https://')).toBe(true)
  })

  it('as arestas do diagrama só ligam nós que existem e cabem na grade', () => {
    for (const c of casos) {
      const d = c.diagrama!
      const ids = new Set(d.nos.map((n) => n.id))
      for (const a of d.arestas) {
        expect(ids.has(a.de), `${c.nome}: ${a.de}`).toBe(true)
        expect(ids.has(a.para), `${c.nome}: ${a.para}`).toBe(true)
      }
      for (const n of d.nos) {
        expect(n.coluna).toBeLessThan(d.colunas)
        expect(n.linha).toBeLessThan(d.linhas)
      }
      const posicoes = d.nos.map((n) => `${n.coluna}:${n.linha}`)
      expect(new Set(posicoes).size, `${c.nome}: dois nós na mesma posição`).toBe(posicoes.length)
    }
  })

  it('os exemplos de "como posso ajudar" existem', () => {
    for (const f of perfil.faco) if (f.exemplo) expect(achar(f.exemplo.id), f.titulo).toBeDefined()
  })
})

describe('números medidos', () => {
  it('são coerentes entre si', () => {
    expect(medicao.ci.verdes).toBeLessThanOrEqual(medicao.ci.repos)
    expect(medicao.repositorios.publicos).toBeLessThanOrEqual(medicao.repositorios.total)
    expect(medicao.testes.repos).toBeLessThanOrEqual(medicao.populacao)
  })

  it('a lista de tecnologias está em ordem decrescente', () => {
    const contagens = stackNoGit.map((s) => s.repos)
    expect([...contagens].sort((a, b) => b - a)).toEqual(contagens)
  })

  it('a data da medição bate com a versão ISO', () => {
    const [d, m, a] = medicao.data.split('/')
    expect(`${a}-${m}-${d}`).toBe(medicao.data_iso)
  })
})

describe('haQuantoTempo', () => {
  const agora = new Date('2026-10-12T15:00:00')
  it('diz hoje, dias e meses em português', () => {
    expect(haQuantoTempo('2026-10-12', agora)).toBe('hoje')
    expect(haQuantoTempo('2026-10-09', agora)).toBe('há 3 dias')
    expect(haQuantoTempo('2026-07-12', agora)).toBe('há 3 meses')
  })
})

describe('texto para quem não é da área', () => {
  const jargao = /\b(RAG|RLS|multi-?tenant|TOTP|SDR|Terraform|CI\/CD)\b/
  const textos = [
    ...perfil.sobre,
    perfil.hero.resumo,
    perfil.frase,
    ...perfil.faco.flatMap((f) => [f.titulo, f.texto]),
    ...todos.flatMap((p) => [p.linha, p.contexto ?? '', ...(p.destaques ?? [])]),
  ]
  it('não usa sigla técnica solta nas frases', () => {
    for (const t of textos) expect(t, t).not.toMatch(jargao)
  })
  it('não usa travessão como conector', () => {
    for (const t of textos) expect(t, t).not.toMatch(/[—–]/)
  })
})
