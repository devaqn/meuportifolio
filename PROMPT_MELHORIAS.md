# Prompt de Melhorias — Portfólio devaqn

> Cole este documento inteiro em uma IA de código (Claude, Lovable, etc.) para executar a reforma do portfólio. Ele contém o diagnóstico, as decisões já tomadas e os dados reais dos projetos a usar.

## Contexto do projeto

Stack atual: React + TypeScript + Vite + Tailwind + GSAP (ScrollTrigger/Flip), componentes shadcn/ui. Estrutura em `src/components/` (Hero, About, Projects, Services, Navbar, Footer). Deploy no Netlify (`portfoliodevaqn.netlify.app`).

Perfil real do dono (do GitHub): **Back-End Developer focused on APIs, automation and system integration**. Forte em Node.js, bots de WhatsApp (Baileys), automações, painéis internos, integrações com IA (Claude/GPT/Gemini), PostgreSQL, e infraestrutura Linux/PM2/VPS.

## Diagnóstico — o que está errado hoje

1. **Os projetos exibidos não são reais.** Em `src/components/Projects.tsx`, "Creative Minds Portfolio" e "Restaurant Branding" têm `link: '#'` (não levam a nada) e usam fotos de banco de imagens do Pinterest/Unsplash — não é trabalho do dono.
2. **Desalinhamento de posicionamento.** O Hero diz "Desenvolvedor Full-Stack & Criador de Experiências Digitais" e o About fala só de "interfaces modernas, responsivas e animações fluidas" — isso vende um perfil de front-end/design, mas o portfólio real (e o GitHub) mostra alguém forte em back-end, automação, IA e infraestrutura. Hoje o site não reflete o que ele realmente sabe fazer (o trabalho mais impressionante nem aparece).
3. **Categorias de filtro não combinam com o trabalho real.** "Design" e "Branding" não fazem sentido para um back-end developer; faltam categorias como "Automação", "Bots/IA", "Backend/APIs", "DevOps".
4. **Sem prova de complexidade técnica.** Nenhum projeto atual menciona arquitetura, stack, ou métricas (ex.: "72 testes", "multi-tenant", "RLS no Postgres"), que é exatamente o que recrutadores técnicos procuram.
5. **README do GitHub bilíngue duplicado** (texto em inglês e depois o mesmo em português, um embaixo do outro) — funcional, mas redundante; vale ter um toggle ou manter só PT-BR com badge de idioma.
6. **Falta link de contato profissional direto** (e-mail, LinkedIn) — só tem WhatsApp e GitHub.

## Projetos reais para substituir os fictícios

Levantamento feito em `github.com/devaqn?tab=repositories` (29 repositórios, maioria privados). Critério de seleção: complexidade técnica, alinhamento com o perfil de back-end/automação/IA, e o quanto cada um demonstra arquitetura real (não só CRUD básico). Os 6 abaixo são os mais fortes para portfólio, em ordem de impacto:

### 1. AI Sales OS (`vendas-por-whatsapp`) — projeto-bandeira
SaaS B2B multi-tenant: CRM + pipeline Kanban + inbox unificada + vendedor virtual de IA 24/7 via WhatsApp. Lead scoring em 4 dimensões, follow-up automático, RAG com pgvector, fallback multi-LLM (Claude/GPT-4o). Stack: Node.js/Express 5 + TypeScript, Python/FastAPI (AI Engine), Next.js 15, PostgreSQL 16 + pgvector, Redis, RabbitMQ, Terraform (AWS ECS Fargate). RBAC com 5 roles, 2FA, LGPD (DSR, anonimização), audit log, webhooks com HMAC.
**Por que destacar:** é o projeto mais ambicioso tecnicamente — mostra domínio de arquitetura de microsserviços, IA aplicada a negócio real, segurança e infraestrutura como código. Categoria: Backend / IA / SaaS.

### 2. AI Customer Support OS (`AIcustomer-support-OS`)
Plataforma de atendimento ao cliente com IA (concorrente conceitual de Zendesk/Intercom). RAG com citação de fontes, supervisor de IA em tempo real, quality score automático por conversa, billing com Stripe, WebSocket (Socket.io), 45+ tabelas no Prisma, testes E2E com Playwright, load testing com k6, scan de segurança OWASP ZAP.
**Por que destacar:** complementa o AI Sales OS mostrando outro domínio de produto SaaS completo, com foco forte em testes e segurança (k6, ZAP, Playwright) — prova maturidade de engenharia.

### 3. Bot Command Center (`painel-DEVOPS`)
Painel self-hosted para gerenciar bots Node.js via PM2: métricas de CPU/RAM/rede em tempo real, terminal SSH no navegador via WebSocket (com proteção contra injeção de comando), deploy via upload de `.zip`, scan de segurança OWASP ZAP integrado, alertas via WhatsApp quando um bot cai. RBAC com 3 perfis, rate limiting granular, auditoria completa.
**Por que destacar:** é uma ferramenta de DevOps construída do zero — raríssimo em portfólios júnior/pleno, mostra que ele não só programa bots, mas constrói a infraestrutura de operação deles.

### 4. Bot Financeiro WhatsApp (`IAfinanceira-whatsapp-VPS`)
Bot de controle financeiro pessoal via WhatsApp em produção: saldo, poupança, reserva de emergência, múltiplos cartões de crédito com parcelamento, relatórios com gráficos, metas de economia, exportação em PDF, sync opcional com PostgreSQL. Documentado com checklist de produção e correções de bugs reais.
**Por que destacar:** é o único com "Status de Produção" documentado e checklist de validação — mostra rigor de QA e cuidado com edge cases (parsing monetário, dupla cobrança, etc.), além de já estar rodando de verdade.

### 5. WhatsApp Lead System (`whatsapp_lead_system`)
Sistema de captação/atendimento de leads via WhatsApp com classificação automática por IA (intenção, sentimento, prioridade), API REST completa, MongoDB, arquitetura em camadas (routes/controllers/services/models), fallback entre OpenAI e Gemini.
**Por que destacar:** mostra Clean Architecture aplicada e domínio de API REST bem documentada — bom complemento "didático" ao lado dos projetos maiores.

### 6. R&M Náutica Solutions (`rmnaut`) — cliente real
E-commerce premium para empresa náutica real (Itajaí/SC, CNPJ ativo). Next.js 16 + TypeScript strict, Tailwind v4, Zustand, Prisma + PostgreSQL, NextAuth, checkout multi-step com Mercado Pago, upload de imagens via Cloudinary, cálculo de frete via Melhor Envio, e-mails transacionais via Resend.
**Por que destacar:** é o único com cliente real e identidade visual própria (paleta navy/gold documentada) — prova que ele entrega projetos de ponta a ponta para negócios reais, não só estudos pessoais.

### Menções honrosas (usar como "mais projetos" ou estudos de caso secundários)
- **BarberOS (`barbearia-simples`)** — app Flutter multi-tenant para barbearias com sistema de licenciamento por chave (SHA-256), Firebase por cliente, pagamento via Mercado Pago. Mostra mobile + modelo de licenciamento SaaS.
- **Automação Conta Azul (`automacao_contazull`)** — script Python/Selenium para acelerar cadastro de clientes em ERP real, com supervisão manual. Bom exemplo de automação aplicada a dor real de negócio (ainda que simples).
- **WhatsApp Routine Bot** — automação de lembretes com persistência de sessão Baileys, banco SQLite e máquina de estados; tecnicamente sólido, mas é de uso pessoal/íntimo — **sugestão: não expor o caso de uso original** (mensagens de "bom dia, amor"), e sim recontar como "Sistema de lembretes recorrentes e confirmação via WhatsApp com máquina de estados" caso seja incluído.

> ⚠️ Decisão do dono do portfólio: **os repositórios continuam privados — não tornar nenhum público.** Os cards de projeto devem funcionar como case study (descrição + stack + imagem), sem link para o código-fonte. Use link de demo ao vivo apenas quando ela for pública (ex.: `rmnaut`, se o site estiver no ar); nos demais, não coloque link de GitHub nenhum (nem `'#'` — remova o `<a href>` ou aponte para uma seção de detalhes/modal dentro do próprio site). Nunca exponha tokens, CNPJ de cliente sem autorização, ou dados do projeto `rmnaut` sem confirmar com o cliente se pode ser citado publicamente.
>
> Se o ambiente onde a IA de código está rodando tiver acesso ao GitHub do usuário (ex.: `gh` CLI autenticado, ou repositórios já clonados localmente), ela deve **ler os READMEs reais de todos os repositórios privados** antes de finalizar a escolha — a lista abaixo é uma curadoria já feita a partir dos READMEs, mas pode ser revisada/ampliada com leitura direta dos repositórios se houver acesso local (ex.: `gh repo view devaqn/<repo> --json description,readme` ou clonando e lendo `README.md`).

## Melhorias de conteúdo

- Reescrever o Hero para refletir o posicionamento real: trocar "Desenvolvedor Full-Stack & Criador de Experiências Digitais" por algo como "Back-End Developer — APIs, Automação e Sistemas com IA" (ajustar headline e subtítulo).
- Reescrever os 3 parágrafos do `About.tsx` trocando o foco em "interfaces e animações" por automação, integrações de IA, arquitetura de sistemas e experiência com infraestrutura Linux/VPS.
- Trocar as categorias de filtro em `Projects.tsx` de `web / design / branding` para algo como `backend / ia-automacao / saas / mobile / devops`.
- Para cada projeto real, escrever descrição curta (1–2 linhas) + lista de 3-4 tecnologias-chave, no padrão que já existe no componente (`title`, `categoryLabel`, `description`), em vez dos parágrafos genéricos atuais.
- Trocar as imagens atuais (que não têm relação com os projetos) por imagens placeholder coerentes com o tema de cada projeto (ex.: dashboard/CRM, chat/WhatsApp, painel DevOps, e-commerce náutico, app de barbearia) — pode usar banco de imagens livre (Unsplash/Pexels) ou buscar referência visual condizente, já que o dono vai substituir por prints reais depois. Marcar cada uma com comentário `// TODO: substituir por screenshot real` para facilitar a troca futura.
- Adicionar e-mail e LinkedIn (se houver) no Footer, ao lado do WhatsApp e GitHub.
- Unificar o README do GitHub: manter uma versão só (PT-BR) com badge `🌐 EN version below` ou usar `<details>` para a versão em inglês, evitando duplicação visual.

## Melhorias de animação e polimento visual

- Revisar todas as animações GSAP/ScrollTrigger existentes (Hero, About, Projects) e suavizar easings/durações que estiverem abruptas; manter consistência de timing entre seções.
- Adicionar micro-interações nos cards de projeto: hover com leve elevação/escala, transição de cor no título, e o ícone de seta (`ArrowUpRight`) já existente deve animar com easing consistente com o resto do site.
- Adicionar estado de loading/skeleton nas imagens de projeto (evitar "pulo" de layout enquanto a imagem carrega).
- Adicionar transição de entrada (fade/slide) na navbar ao rolar a página, se ainda não houver.
- Revisar a animação do Hero (`scaleX/scaleY` do clip-path em forma de "P") em telas muito largas ou muito estreitas — testar para não distorcer o logo.
- Considerar um indicador de scroll ("scroll down") no Hero para guiar o visitante, comum em portfólios de alto nível.
- Garantir que todas as animações respeitem `prefers-reduced-motion` (acessibilidade).

## Melhorias técnicas/SEO/infraestrutura

- Adicionar meta tags completas (`title`, `description`, Open Graph, Twitter Card, favicon próprio em vez do `favicon-v2.ico` genérico) em `index.html`.
- Adicionar dados estruturados (JSON-LD, schema `Person`/`ProfilePage`) para melhorar indexação no Google.
- Gerar `sitemap.xml` e validar `robots.txt` (já existe um `public/robots.txt` — revisar conteúdo).
- Verificar contraste e tamanho de fonte no Hero (`text-[12rem]` pode cortar em mobile — testar em telas pequenas).
- Adicionar `alt` descritivo em todas as imagens de projeto (acessibilidade).
- Rodar Lighthouse (Performance, Acessibilidade, SEO, Boas práticas) e corrigir os itens apontados antes do redeploy — meta: 90+ em todas as categorias.
- Lazy-loading e `srcset`/formatos modernos (WebP/AVIF) nas imagens de projeto fora da viewport inicial.
- Configurar cache-control / headers de performance no Netlify (`netlify.toml`) se ainda não existir.
- Revisar bundle size (`vite build` com análise de chunks) — separar dependências pesadas (GSAP plugins, ícones) se necessário.

## Tarefa para a IA de código

1. Se houver acesso ao GitHub do usuário no ambiente local (`gh` CLI autenticado, repositórios clonados, ou credenciais git configuradas), ler os READMEs reais dos repositórios privados de `devaqn` para confirmar/ampliar a curadoria de projetos abaixo. Caso não haja esse acesso, seguir a curadoria já feita neste documento.
2. Atualizar `src/components/Hero.tsx` e `src/components/About.tsx` com o novo posicionamento (back-end/automação/IA), mantendo e refinando as animações GSAP existentes (ver seção "Melhorias de animação").
3. Reescrever o array `projects` em `src/components/Projects.tsx` com os 6 projetos reais acima (título, categoria nova, descrição curta, stack). **Não usar link de GitHub para repositórios privados** (eles permanecem privados por decisão do dono) — remover o link ou apontar para a demo ao vivo apenas quando ela for pública.
4. Atualizar o array `categories` para refletir as novas categorias (`backend`, `ia-automacao`, `saas`, `mobile`, `devops`).
5. Adicionar imagens placeholder coerentes com o tema de cada projeto (banco de imagens livre), marcadas com `// TODO: substituir por screenshot real` para troca futura pelo dono.
6. Atualizar o Footer com e-mail/LinkedIn.
7. Aplicar as melhorias de animação, SEO e infraestrutura listadas acima.
8. Validar build (`npm run build`), rodar Lighthouse, e revisar visualmente em mobile e desktop antes de publicar.
