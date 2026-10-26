/**
 * Tudo o que é texto sobre o Pedro mora aqui. Para mudar o tom, a foto ou um
 * link, edite este arquivo: os componentes só desenham o que está nele.
 *
 * Regra de escrita: quem lê pode não ser da área. Termo técnico só aparece
 * como etiqueta pequena, nunca como explicação.
 */

export const perfil = {
  nome: 'Pedro Miguel',
  handle: 'devaqn',
  cidade: 'Recife, PE',
  foto: '/pedro.webp',
  fotoAlt: 'Pedro Miguel, desenvolvedor de sistemas de Recife',

  email: 'pedromiguelaqn@gmail.com',
  telefone: '(81) 99819-1625',
  links: {
    whatsapp:
      'https://wa.me/5581998191625?text=Ol%C3%A1%2C%20Pedro!%20Vi%20seu%20portf%C3%B3lio%20e%20queria%20conversar%20sobre%20um%20projeto.',
    github: 'https://github.com/devaqn',
    linkedin: 'https://www.linkedin.com/in/pedro-miguel-5b66a72b5',
    instagram: 'https://www.instagram.com/pedromiguel.aqn/',
    curriculo: 'https://devaqncurriculo.netlify.app',
    codigoDoSite: 'https://github.com/devaqn/meuportifolio',
  },

  hero: {
    etiqueta: 'Recife, PE · desenvolvedor de sistemas',
    resumo:
      'Crio sistemas e robôs de WhatsApp para pequenos negócios: o que atende o cliente, marca horário, cobra e organiza o dia.',
  },

  /** Frase grande da seção "sobre", revelada palavra por palavra na rolagem. */
  frase:
    'O pequeno negócio brasileiro vive no WhatsApp e recebe por Pix. É nesse lugar que eu construo.',

  sobre: [
    'Sou o Pedro, de Recife. Faço a parte que o cliente não vê: o sistema por trás do aplicativo, do robô de WhatsApp e do painel que o dono do negócio usa. Quando o projeto pede inteligência artificial, coloco ela para responder e organizar os atendimentos.',
    'Trabalho muito com barbearia, restaurante, consultório e tabacaria. Pedido, horário marcado, cobrança e aviso chegam pelo WhatsApp, e o pagamento entra por Pix ou cartão. Já conectei Mercado Pago, Asaas, Stripe e o Open Finance, que lê o extrato do banco com a autorização do cliente.',
    'Estudo Análise e Desenvolvimento de Sistemas na UNIFBV e fiz o técnico na mesma área no SENAI. O que posso mostrar eu deixo aberto no GitHub, com testes automáticos. Os números mais abaixo foram contados lá, com a data.',
  ],

  fatos: [
    { rotulo: 'onde', valor: 'Recife, Pernambuco' },
    { rotulo: 'estudo', valor: 'ADS na UNIFBV (5º período)' },
    { rotulo: 'também', valor: 'Técnico em ADS no SENAI-PE (2024 a 2025)' },
    { rotulo: 'foco', valor: 'sistemas, robôs de WhatsApp e IA' },
    { rotulo: 'idiomas', valor: 'português; inglês para ler documentação' },
    { rotulo: 'no github', valor: 'desde out/2024' },
  ],

  faco: [
    {
      titulo: 'Robô de WhatsApp que atende, marca horário e cobra',
      texto: 'O cliente pede, agenda e paga na conversa que já está aberta no celular.',
      exemplo: { id: 'bookviazap', rotulo: 'BookViaZap' },
    },
    {
      titulo: 'Painel para o dono acompanhar o negócio',
      texto: 'Caixa, estoque, agenda e comandas num lugar só, no celular, e funciona até sem internet.',
      exemplo: { id: 'dom-severu', rotulo: "Dom Severu's" },
    },
    {
      titulo: 'Inteligência artificial que responde com o que a empresa sabe',
      texto:
        'A IA lê o material da própria empresa para responder o cliente, com proteção contra uso indevido e controle de quanto cada cliente gasta.',
      exemplo: { id: 'ai-sales-os', rotulo: 'AI Sales OS' },
    },
    {
      titulo: 'Colocar no ar e cuidar',
      texto: 'Coloco o sistema num servidor, acompanho se está tudo funcionando e recebo um aviso quando algo para.',
      exemplo: { id: 'bot-command-center', rotulo: 'Bot Command Center' },
    },
    {
      titulo: 'Demonstração sob medida',
      texto:
        'Antes de fechar negócio, o cliente vê o projeto pronto, com as fotos, as cores e os textos do próprio negócio.',
      exemplo: null,
    },
  ],

  trajetoria: [
    { quando: 'jun 2024', titulo: 'Entrei no SENAI-PE', texto: 'Técnico em Análise e Desenvolvimento de Sistemas, com base em C# e Java.' },
    { quando: 'out 2024', titulo: 'Abri o GitHub', texto: 'É onde guardo e mostro quase tudo que construo.' },
    { quando: 'dez 2025', titulo: 'Terminei o técnico', texto: 'O bacharelado em ADS na UNIFBV segue em andamento, hoje no 5º período.' },
    { quando: 'agora', titulo: 'Freelancer', texto: 'Sistemas com IA, robôs de WhatsApp, painéis e sites sob medida para negócios locais.' },
  ],
} as const

export type Perfil = typeof perfil
