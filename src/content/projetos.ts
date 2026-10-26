/**
 * Projetos do portfólio. Cada afirmação aqui foi conferida no código do
 * repositório (dependências, arquivos, testes). Quando algo não é verificável,
 * não entra. O texto é escrito para quem não é da área; o termo técnico fica
 * na nota pequena e nas etiquetas de tecnologia.
 */

export type Tipo = 'app' | 'dados' | 'fila' | 'externo'

export interface NoDiagrama {
  id: string
  rotulo: string
  nota?: string
  tipo: Tipo
  coluna: number
  linha: number
}

export interface ArestaDiagrama {
  de: string
  para: string
}

export interface Diagrama {
  colunas: number
  linhas: number
  nos: NoDiagrama[]
  arestas: ArestaDiagrama[]
  legenda?: string
}

export interface Numero {
  valor: string
  rotulo: string
}

export interface Projeto {
  id: string
  nome: string
  tipo: string
  linha: string
  codigo: 'privado' | 'publico'
  /** Nome do repositório em github.com/devaqn, quando é público. */
  repo?: string
  /** Só entra demo que é comprovadamente do Pedro. */
  demo?: string
  contexto?: string
  destaques?: string[]
  numeros?: Numero[]
  stack: string[]
  testes?: number
  diagrama?: Diagrama
}

export const casos: Projeto[] = [
  {
    id: 'ai-sales-os',
    nome: 'AI Sales OS',
    tipo: 'Sistema de vendas com IA',
    linha: 'Um vendedor virtual que responde clientes no WhatsApp e organiza os contatos da empresa.',
    codigo: 'privado',
    contexto:
      'Quem vende pelo WhatsApp perde cliente quando demora a responder. Este sistema junta cadastro de clientes, funil de vendas e uma caixa de mensagens única, e usa um vendedor virtual para responder, separar quem quer comprar e lembrar de voltar a falar.',
    destaques: [
      'Um motor de inteligência artificial com 8 funções: conversar como vendedor (percebendo o humor do cliente), dar uma nota para cada contato, lembrar o histórico de cada pessoa, avisar quando um cliente esfria, sugerir o próximo passo, ajudar a equipe, buscar respostas nos documentos da empresa e bloquear tentativas de enganar a IA.',
      'Funciona com Claude e GPT-4o, guarda respostas parecidas para não pagar duas vezes e mostra quanto cada empresa gastou.',
      'Cada empresa enxerga só os próprios dados, com 5 níveis de permissão e confirmação em dois passos no login.',
      'Tem um módulo para a LGPD: pedidos do titular dos dados e exportação das informações dele.',
      'A infraestrutura na nuvem da Amazon (AWS) está descrita em código, para subir sempre do mesmo jeito.',
    ],
    numeros: [
      { valor: '74', rotulo: 'testes automáticos' },
      { valor: '8', rotulo: 'funções de IA' },
      { valor: '5', rotulo: 'níveis de permissão' },
    ],
    stack: ['Next.js', 'Express', 'TypeScript', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'RabbitMQ', 'Terraform', 'Docker'],
    diagrama: {
      colunas: 4,
      linhas: 3,
      nos: [
        { id: 'zap', rotulo: 'WhatsApp', nota: 'canal do cliente', tipo: 'externo', coluna: 0, linha: 0 },
        { id: 'web', rotulo: 'Painel', nota: 'o que a equipe vê', tipo: 'app', coluna: 0, linha: 2 },
        { id: 'api', rotulo: 'Servidor', nota: 'regras, login, permissões', tipo: 'app', coluna: 1, linha: 1 },
        { id: 'fila', rotulo: 'Fila de tarefas', nota: 'RabbitMQ', tipo: 'fila', coluna: 2, linha: 0 },
        { id: 'ia', rotulo: 'Motor de IA', nota: 'Python, 8 funções', tipo: 'app', coluna: 2, linha: 1 },
        { id: 'pg', rotulo: 'Banco de dados', nota: 'uma empresa por vez', tipo: 'dados', coluna: 3, linha: 1 },
        { id: 'redis', rotulo: 'Memória rápida', nota: 'Redis', tipo: 'dados', coluna: 3, linha: 2 },
        { id: 'llm', rotulo: 'Modelos de IA', nota: 'Claude e GPT-4o', tipo: 'externo', coluna: 3, linha: 0 },
      ],
      arestas: [
        { de: 'zap', para: 'api' },
        { de: 'web', para: 'api' },
        { de: 'api', para: 'fila' },
        { de: 'fila', para: 'ia' },
        { de: 'api', para: 'pg' },
        { de: 'ia', para: 'pg' },
        { de: 'ia', para: 'llm' },
        { de: 'api', para: 'redis' },
      ],
      legenda: 'Na nuvem da Amazon, montada por código: servidores, banco de dados e fila.',
    },
  },
  {
    id: 'ai-customer-support-os',
    nome: 'AI Customer Support OS',
    tipo: 'Atendimento ao cliente com IA',
    linha: 'Uma central de atendimento em que a IA registra de onde tirou cada resposta.',
    codigo: 'privado',
    contexto:
      'As conversas chegam em tempo real, a IA responde com base nos materiais da empresa e um supervisor automático avisa quando uma conversa está indo mal.',
    destaques: [
      'Tudo num só projeto organizado em partes: o servidor, o site e dois pacotes que as duas partes compartilham.',
      'Cada resposta da IA guarda quais documentos foram usados, para dar para conferir depois.',
      'Os dados de cada empresa ficam separados no banco, e um teste garante que uma empresa nunca vê a outra.',
      'As conversas aparecem ao vivo na tela, as tarefas pesadas rodam em segundo plano e a cobrança é feita pelo Stripe.',
      'O projeto inclui testes que simulam uma pessoa usando o sistema, um teste de carga e uma checagem de segurança.',
    ],
    numeros: [
      { valor: '72', rotulo: 'testes automáticos' },
      { valor: '7', rotulo: 'roteiros de uso simulados' },
    ],
    stack: ['Next.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.io', 'Stripe', 'Playwright', 'k6'],
    diagrama: {
      colunas: 4,
      linhas: 2,
      nos: [
        { id: 'web', rotulo: 'Site', nota: 'caixa de entrada ao vivo', tipo: 'app', coluna: 0, linha: 0 },
        { id: 'api', rotulo: 'Servidor', nota: 'regras e login', tipo: 'app', coluna: 1, linha: 0 },
        { id: 'ia', rotulo: 'Inteligência artificial', nota: 'pacote ai-client', tipo: 'app', coluna: 1, linha: 1 },
        { id: 'ws', rotulo: 'Tempo real', nota: 'Socket.io', tipo: 'app', coluna: 2, linha: 0 },
        { id: 'fila', rotulo: 'Tarefas em 2º plano', nota: 'BullMQ e Redis', tipo: 'fila', coluna: 2, linha: 1 },
        { id: 'pg', rotulo: 'Banco de dados', nota: 'uma empresa por vez', tipo: 'dados', coluna: 3, linha: 0 },
        { id: 'stripe', rotulo: 'Cobrança', nota: 'Stripe', tipo: 'externo', coluna: 3, linha: 1 },
      ],
      arestas: [
        { de: 'web', para: 'api' },
        { de: 'api', para: 'ws' },
        { de: 'api', para: 'fila' },
        { de: 'api', para: 'pg' },
        { de: 'fila', para: 'stripe' },
        { de: 'api', para: 'ia' },
      ],
      legenda: 'Os testes de carga e de segurança fazem parte do projeto e rodam a cada mudança.',
    },
  },
  {
    id: 'bot-command-center',
    nome: 'Bot Command Center',
    tipo: 'Painel de controle',
    linha: 'Um painel para ver como estão os robôs, colocar novos no ar e saber quando um para.',
    codigo: 'privado',
    contexto:
      'Robôs de WhatsApp rodam num servidor e, sem painel, só dá para acompanhar por linha de comando. Este painel mostra tudo na tela e avisa no WhatsApp quando um robô cai.',
    destaques: [
      'Gráficos ao vivo do uso do processador, da memória e da rede.',
      'Um terminal dentro do navegador, só com os comandos que cada perfil pode usar.',
      'Para atualizar um robô, basta enviar um arquivo ZIP.',
      'Aviso por WhatsApp quando um robô para de funcionar.',
      'Três perfis de acesso (só ver, operar e administrar) e um histórico de tudo que foi feito.',
      'A tela é feita com HTML e JavaScript simples, o que a deixa rápida e leve.',
    ],
    numeros: [{ valor: '3', rotulo: 'perfis de acesso' }],
    stack: ['Node.js', 'Express', 'WebSocket', 'PM2', 'SQLite', 'xterm.js', 'Chart.js', 'Baileys'],
    diagrama: {
      colunas: 3,
      linhas: 3,
      nos: [
        { id: 'ui', rotulo: 'Navegador', nota: 'a tela do painel', tipo: 'app', coluna: 0, linha: 1 },
        { id: 'api', rotulo: 'Servidor', nota: 'permissões e histórico', tipo: 'app', coluna: 1, linha: 1 },
        { id: 'pm2', rotulo: 'Robôs', nota: 'controlados pelo PM2', tipo: 'app', coluna: 2, linha: 0 },
        { id: 'sys', rotulo: 'Medidores', nota: 'processador, memória, rede', tipo: 'app', coluna: 2, linha: 1 },
        { id: 'db', rotulo: 'Banco de dados', nota: 'usuários e histórico', tipo: 'dados', coluna: 1, linha: 2 },
        { id: 'zap', rotulo: 'WhatsApp', nota: 'aviso de robô parado', tipo: 'externo', coluna: 2, linha: 2 },
      ],
      arestas: [
        { de: 'ui', para: 'api' },
        { de: 'api', para: 'pm2' },
        { de: 'api', para: 'sys' },
        { de: 'api', para: 'db' },
        { de: 'api', para: 'zap' },
      ],
    },
  },
  {
    id: 'dom-severu',
    nome: "Dom Severu's Barbearia",
    tipo: 'Aplicativo de celular',
    linha: 'App para barbearias: comandas, caixa, estoque e agenda, com sincronização e uso sem internet.',
    codigo: 'privado',
    contexto: 'Comanda, caixa, estoque e agenda de uma barbearia, no celular do dono e dos barbeiros.',
    destaques: [
      'Feito em Flutter, com os dados sincronizados na nuvem do Firebase, ao vivo.',
      'Continua funcionando sem internet, guardando tudo no próprio celular.',
      'O estoque calcula o custo médio dos produtos, e o sistema calcula a comissão de cada barbeiro.',
      'A agenda impede dois clientes no mesmo horário, inclusive quando dois pedidos chegam juntos.',
      'A mensalidade é cobrada pelo Mercado Pago.',
      'Os relatórios saem em PDF, CSV e Excel.',
    ],
    numeros: [{ valor: '170+', rotulo: 'testes automáticos' }],
    stack: ['Flutter', 'Dart', 'Firestore', 'Firebase Auth', 'SQLite', 'Cloud Functions', 'Mercado Pago'],
    diagrama: {
      colunas: 3,
      linhas: 2,
      nos: [
        { id: 'app', rotulo: 'Aplicativo', nota: 'dono e barbeiros', tipo: 'app', coluna: 0, linha: 0 },
        { id: 'sqlite', rotulo: 'Banco no celular', nota: 'para usar sem internet', tipo: 'dados', coluna: 0, linha: 1 },
        { id: 'fs', rotulo: 'Dados na nuvem', nota: 'Firestore, ao vivo', tipo: 'dados', coluna: 1, linha: 0 },
        { id: 'auth', rotulo: 'Login', nota: 'Firebase Auth', tipo: 'app', coluna: 1, linha: 1 },
        { id: 'cf', rotulo: 'Rotina de cobrança', nota: 'Cloud Functions', tipo: 'app', coluna: 2, linha: 0 },
        { id: 'mp', rotulo: 'Mercado Pago', nota: 'assinatura mensal', tipo: 'externo', coluna: 2, linha: 1 },
      ],
      arestas: [
        { de: 'app', para: 'fs' },
        { de: 'app', para: 'sqlite' },
        { de: 'app', para: 'auth' },
        { de: 'fs', para: 'cf' },
        { de: 'cf', para: 'mp' },
      ],
    },
  },
]

export const publicos: Projeto[] = [
  {
    id: 'granazap',
    nome: 'GranaZap',
    tipo: 'WhatsApp e IA',
    linha: 'Assistente financeiro no WhatsApp: lê o extrato do banco (com autorização), classifica cada gasto com IA e responde sobre saldo e gastos.',
    codigo: 'publico',
    repo: 'Granazap',
    testes: 26,
    stack: ['TypeScript', 'Fastify', 'Baileys', 'Prisma', 'Claude'],
  },
  {
    id: 'etiqueta-facil',
    nome: 'Etiqueta Fácil',
    tipo: 'Ferramenta na web',
    linha: 'Gera etiquetas em PDF com código de barras ou QR Code, sem precisar de cadastro.',
    codigo: 'publico',
    repo: 'Etiqueta-facil',
    demo: 'https://etiquetafacil.netlify.app',
    testes: 21,
    stack: ['TypeScript', 'Fastify', 'PDFKit', 'QR Code'],
  },
  {
    id: 'mesazap',
    nome: 'MesaZap',
    tipo: 'Restaurante',
    linha: 'Cardápio em QR Code na mesa: o pedido vai direto para o WhatsApp da cozinha.',
    codigo: 'publico',
    repo: 'MesaZap',
    testes: 33,
    stack: ['TypeScript', 'Fastify', 'Baileys', 'Prisma'],
  },
  {
    id: 'lojapix',
    nome: 'LojaPix',
    tipo: 'Loja virtual',
    linha: 'Loja virtual de delivery feita à mão: catálogo, carrinho e pagamento por Pix.',
    codigo: 'publico',
    repo: 'LojaPix',
    testes: 38,
    stack: ['TypeScript', 'React', 'Fastify', 'Prisma'],
  },
  {
    id: 'bookviazap',
    nome: 'BookViaZap',
    tipo: 'Agendamento',
    linha: 'Agendamento para colocar no site: a confirmação chega no WhatsApp do cliente e do negócio.',
    codigo: 'publico',
    repo: 'BookViaZap',
    testes: 24,
    stack: ['TypeScript', 'Next.js', 'Fastify', 'Baileys'],
  },
  {
    id: 'botops',
    nome: 'BotOps',
    tipo: 'Monitoramento',
    linha: 'Acompanha os robôs de WhatsApp de vários clientes e avisa quando algum para.',
    codigo: 'publico',
    repo: 'BotOps',
    testes: 23,
    stack: ['TypeScript', 'Next.js', 'Fastify', 'Prisma'],
  },
  {
    id: 'br-utils-api',
    nome: 'BR-Utils-API',
    tipo: 'Ferramenta para programadores',
    linha: 'Valida CPF, CNPJ e CEP e gera Pix Copia e Cola, de graça e sem chave de acesso.',
    codigo: 'publico',
    repo: 'BR-Utils-API',
    testes: 26,
    stack: ['TypeScript', 'Fastify', 'Zod'],
  },
  {
    id: 'vps-deploy-kit',
    nome: 'VPS-Deploy-Kit',
    tipo: 'Ferramenta para programadores',
    linha: 'Coloca um robô Node.js num servidor do zero, com endereço seguro (HTTPS), usando um comando só.',
    codigo: 'publico',
    repo: 'VPS-Deploy-Kit',
    testes: 15,
    stack: ['TypeScript', 'PM2', 'Nginx'],
  },
  {
    id: 'bot-financeiro',
    nome: 'Bot Financeiro',
    tipo: 'WhatsApp',
    linha: 'Controle financeiro pessoal no WhatsApp: saldo, cartões, parcelas, metas e relatórios com gráfico.',
    codigo: 'publico',
    repo: 'IAfinanceira-whatsapp-VPS',
    stack: ['Node.js', 'Baileys', 'PostgreSQL', 'PDFKit'],
  },
  {
    id: 'jarvis',
    nome: 'J.A.R.V.I.S.',
    tipo: 'Assistente de voz',
    linha: 'Assistente de voz para Windows: abre apps e sites quando você chama pelo nome ou bate duas palmas, com um painel na web.',
    codigo: 'publico',
    repo: 'jarvisplus',
    stack: ['Python', 'Next.js', 'edge-tts', 'PyAudio'],
  },
  {
    id: 'rmnaut',
    nome: 'R&M Náutica',
    tipo: 'Loja virtual',
    linha: 'Loja virtual de peças e acessórios náuticos: catálogo, carrinho que não se perde e finalização do pedido.',
    codigo: 'publico',
    repo: 'rmnaut',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Zustand'],
  },
]

export const todos: Projeto[] = [...casos, ...publicos]

export const achar = (id: string) => todos.find((p) => p.id === id)
