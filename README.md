# PEF USP — migração para Next.js + Strapi

## Estrutura

```
app/
  layout.js              → Header e Footer estáticos + <html>/<body>
  page.js                → home (migrar o index.html aqui)
  professores/
    page.js               → busca professores no Strapi (client-side)
components/
  Header.jsx              → client component (menu mobile com React state)
  Footer.jsx               → server component, 100% estático
  ProfessorCard.jsx        → card individual de professor
lib/
  strapi.js                → fetch + normalização da resposta do Strapi
styles/
  globals.css               → cole aqui o conteúdo de css/style.css
  professores.css            → cole aqui o conteúdo de css/professores.css
public/
  img/...                    → mova as imagens (logo, brasão, fotos de prof/)
```

## Passo a passo

1. `npx create-next-app@latest pef-usp --js --app --no-src-dir`
2. Copie os arquivos deste pacote para dentro do projeto criado (substituindo
   `app/layout.js`, `app/page.js` se já existirem).
3. Mova `./img/*` para `public/img/*` — no Next.js tudo que está em `public/`
   é servido a partir da raiz (`/img/logo.jpg`, `/img/prof/alfredo.jpg` etc.).
4. Cole o conteúdo de `css/style.css` em `styles/globals.css` e de
   `css/professores.css` em `styles/professores.css`.
5. Copie `.env.local.example` para `.env.local` e ajuste
   `NEXT_PUBLIC_STRAPI_URL` para a URL real do seu Strapi.
6. Rode `npm run dev`.

## Content-Type no Strapi (`professor`)

Crie um Collection Type chamado **Professor** com estes campos (ajuste os
nomes se preferir outros — só espelhe em `lib/strapi.js`):

| Campo      | Tipo                    |
|------------|-------------------------|
| nome       | Text                    |
| telefone   | Text                    |
| lattes     | Text (URL)               |
| site       | Text (URL, opcional)      |
| email      | Email                    |
| linkedin   | Text (URL, opcional)      |
| foto       | Media (imagem única)      |

Não esqueça de liberar permissão de leitura pública (`Settings → Roles →
Public → Professor → find/findOne`) em Content-Type Builder, senão o fetch
client-side vai receber 403.

## Sobre a versão do Strapi (v4 x v5)

Como não temos certeza da versão instalada, `lib/strapi.js` já trata os dois
formatos de resposta automaticamente:

- **v4**: `{ data: [{ id, attributes: { nome, foto: { data: { attributes: { url }}} } }] }`
- **v5**: `{ data: [{ id, nome, foto: { url } }] }`

Se quiser confirmar a versão, rode `GET /api/professores` direto no navegador
ou no Postman e veja se os campos vêm dentro de `attributes` (v4) ou soltos
no objeto (v5). Se algo não bater, é só ajustar `normalizeProfessor()` em
`lib/strapi.js` — é o único lugar que precisa mudar.

## Sobre o fetch client-side

A página `app/professores/page.js` é um Client Component (`"use client"`)
que busca os dados em `useEffect`, como pedido. Isso significa que:

- A lista de professores **não** aparece no HTML inicial (SEO mais fraco
  para essa página específica) — ela é preenchida depois que o JS carrega
  no navegador.
- Há estados de `loading` e `erro` tratados na própria página.

Se no futuro quiser SEO melhor nessa página, dá pra trocar para Server
Component (remover `"use client"`, tirar o `useEffect`/`useState` e chamar
`await fetchProfessores()` direto no corpo da função) sem precisar mexer em
`lib/strapi.js`.

## Home (`app/page.js`)

Migra o hero (slider), a seção de notícias e a seção de contato do
`index.html` original.

- `components/HeroSlider.jsx` é client component — reproduz a lógica que
  estava em `script.js` (autoplay a cada 5s, pausa no hover, setas do
  teclado, dots, botões prev/next), só que com `useState`/`useEffect` em vez
  de manipulação direta do DOM.
- `app/page.js` é Server Component — só monta o layout e importa o
  `HeroSlider`. As notícias estão num array `NOTICIAS` no topo do arquivo;
  troque por um fetch no Strapi depois, se quiser, seguindo o mesmo padrão
  de `lib/strapi.js`.
- O formulário de contato ficou estático (sem submit real), igual ao
  original — se quiser que ele envie de fato, precisa virar client
  component com `onSubmit`.

## Arquivos que faltam neste pacote

- `css/style.css` e `css/professores.css` (o conteúdo original não estava
  disponível para mim — os placeholders em `styles/` indicam onde colar).
- As imagens (`slide1.jpg` … `slide5.jpg`, `logo.jpg`, `brasao.png`, fotos de
  `prof/`) precisam ser movidas para `public/img/...` — não vieram neste
  pacote.
