/**
 * Números que saem do meu git, não de memória. Foram medidos nos repositórios
 * públicos próprios (sem forks), lendo o ramo principal de cada um. Projetos
 * privados ficam de fora das contagens. Para atualizar, refaça a medição e
 * troque `medicao.data` junto com os valores.
 */

export const medicao = {
  data: '03/10/2026',
  data_iso: '2026-10-03',
  populacao: 64,
  repositorios: { total: 124, publicos: 66 },
  testes: { casos: 717, repos: 23 },
  ci: { repos: 15, verdes: 11 },
  docker: 9,
} as const

/** Quantos repositórios públicos usam cada tecnologia (dependência declarada), com uma explicação em palavras simples. */
export const stackNoGit = [
  { nome: 'TypeScript', repos: 27, oQueE: 'linguagem de programação' },
  { nome: 'Zod', repos: 23, oQueE: 'confere se os dados recebidos fazem sentido' },
  { nome: 'React', repos: 20, oQueE: 'monta as telas dos sites' },
  { nome: 'pino', repos: 20, oQueE: 'registra o que o sistema fez' },
  { nome: 'Tailwind', repos: 18, oQueE: 'estilo visual das telas' },
  { nome: 'Vitest', repos: 16, oQueE: 'roda os testes automáticos' },
  { nome: 'Express', repos: 14, oQueE: 'servidor web' },
  { nome: 'Prisma', repos: 13, oQueE: 'conversa com o banco de dados' },
  { nome: 'Baileys', repos: 13, oQueE: 'conecta o sistema ao WhatsApp' },
  { nome: 'Fastify', repos: 12, oQueE: 'servidor web, mais rápido' },
] as const

/** Fica fora da contagem o que só existe em projeto de código privado. */
export const stackPrivada =
  'inteligência artificial em Python, infraestrutura na nuvem da Amazon e o aplicativo de celular em Flutter'

export interface Atividade {
  nome: string
  linguagem: string | null
  quando: string
}

/** Usada quando a API do GitHub não responde (limite de requisições, offline). */
export const reservaAtividade: Atividade[] = [
  { nome: 'Curriculo', linguagem: 'HTML', quando: '2026-10-01' },
  { nome: 'sentinela-pentester', linguagem: 'TypeScript', quando: '2026-09-22' },
  { nome: 'jarvisplus', linguagem: 'Python', quando: '2026-09-20' },
  { nome: 'Etiqueta-facil', linguagem: 'TypeScript', quando: '2026-09-20' },
  { nome: 'AvaliaZap', linguagem: 'TypeScript', quando: '2026-09-20' },
  { nome: 'dart', linguagem: 'TypeScript', quando: '2026-09-02' },
  { nome: 'BookViaZap', linguagem: 'TypeScript', quando: '2026-08-12' },
]
