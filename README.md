# Portfólio do Pedro Miguel

Meu portfólio, no ar em [portfoliodevaqn.netlify.app](https://portfoliodevaqn.netlify.app). É uma página única em React com animações de rolagem feitas com GSAP.

A ideia do site é que qualquer pessoa entenda o que eu faço, mesmo sem ser da área. Por isso os textos usam palavras comuns, cada projeto tem uma janela que explica como ele é por dentro, e os números da seção "números" saem do meu GitHub, com a data da medição.

## Rodar

```bash
npm install
npm run dev        # http://localhost:8080
npm test           # testes dos dados e da formatação
npm run build      # gera a pasta dist
```

As animações de rolagem tocam sempre, porque quem manda nelas é a pessoa rolando a página. Só o movimento que roda sozinho (a seta piscando) obedece a "reduzir movimento" do sistema. Para ver a página parada, abra `http://localhost:8080/?movimento=reduzido`.

## Onde mexer

O texto e os dados ficam em `src/content/`, separados do visual. Os componentes só desenham o que está lá.

| Arquivo | O que tem |
|---|---|
| `perfil.ts` | Frase de abertura, textos do "sobre", fatos, trajetória, "como posso ajudar" e os links de contato |
| `projetos.ts` | Os quatro projetos de código privado (com o diagrama de cada um) e os projetos públicos |
| `git.ts` | Os números medidos no GitHub, a data da medição e a lista de reserva dos últimos projetos |

A imagem que aparece quando o link é compartilhado é `public/og.png` (1200 por 630). Não há foto na página.

## Regras que o projeto segue

Só entra no site o que dá para conferir. Cada afirmação de `projetos.ts` vem do código do repositório, e só entra demo no ar que é comprovadamente minha. Quando um número muda, troque o valor e a data em `git.ts`.

Os testes em `src/content/content.test.ts` garantem que os dados estão coerentes e que o texto não usa sigla técnica solta nem travessão. Se o teste de linguagem falhar, a frase provavelmente ficou difícil para quem não é da área.

## Estrutura

```
src/
  components/   seções da página (Hero, About, Work, Evidence, Offer, Contact)
  content/      textos e dados
  hooks/        entrada na rolagem e atividade recente do GitHub
  lib/          controle de movimento
```

A lista "projetos que mexi por último" vem direto da API pública do GitHub e guarda o resultado por 10 minutos na sessão. Se a API não responder, aparece a lista de reserva de `git.ts`, e a página avisa qual das duas está na tela.
