# Site institucional — Clínica Goya (Goya Odonto & Saúde)

Landing page única da Clínica Goya, clínica odontológica no centro de Cuiabá-MT.
Destino dos cliques vindos do perfil da clínica no Google Business.

O único trabalho desta página é converter o visitante em contato — ligação ou
WhatsApp. Tudo que não serve a isso ficou de fora.

> ## ⚠️ Este site ainda não pode ser publicado
>
> Faltam o registro da clínica no CRO-MT e o nome e CRO do responsável
> técnico. A publicidade de clínica odontológica de pessoa jurídica é regida
> pelo Código de Ética Odontológica e pelas resoluções do CFO, que obrigam a
> exibição desses dados em todo material de divulgação.
>
> Ver **[PENDENCIAS.md](./PENDENCIAS.md)**, bloco 1.

---

## Rodar

Requer Node 18 ou superior.

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
```

## Build e verificação

```bash
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o dist/ localmente, em http://localhost:4173
npm run typecheck  # só o TypeScript
npm run pendencias # lista todo {{PENDENTE: ...}} com arquivo e linha
npm run demo       # gera demo/clinica-goya-DEMO.html
```

### Arquivo de demonstração

`npm run demo` gera **`demo/clinica-goya-DEMO.html`**: o site inteiro num
arquivo só, com CSS, JavaScript, as duas fontes e o favicon embutidos. Abre com
dois cliques, sem servidor e sem internet — serve para mandar ao cliente ver e
navegar enquanto não existe domínio.

O único ponto que não funciona ali é o mapa, que precisa buscar o embed do
Google. Todo o resto é real: menu, FAQ, âncoras, foco de teclado, telefone.

O arquivo é gerado, não versionado. Regere depois de cada mudança.

O `build` roda `tsc -b` antes do Vite: erro de tipo quebra o build, não passa batido.

## Publicar

Site estático, sem backend. O `dist/` é o que vai ao ar.

**Vercel**

```bash
npm i -g vercel
vercel            # a primeira vez pergunta o projeto; aceitar os padrões
vercel --prod
```

Vercel detecta o Vite sozinho. Se pedir configuração manual: build `npm run build`,
diretório de saída `dist`.

**Netlify**

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

Ou conectar o repositório pelo painel, com build `npm run build` e publish `dist`.

Como é página única sem router, **não é preciso** configurar redirect de SPA.

### Antes do primeiro deploy

1. Preencher os bloqueadores do bloco 1 do [PENDENCIAS.md](./PENDENCIAS.md).
2. Definir o domínio e, em `index.html`, `public/robots.txt` e `public/sitemap.xml`, descomentar as linhas de `canonical`, `Sitemap` e `<loc>` com a URL real.
3. Substituir `geo` e `openingHoursSpecification` no JSON-LD do `index.html` por coordenadas e horários reais.
4. Rodar `npm run pendencias` e conferir o que sobrou.

---

## Como mexer no conteúdo

**Todo o texto vive em [`src/data/site.ts`](./src/data/site.ts).** Nenhum
conteúdo é escrito dentro de componente. Quando o cliente mandar os dados que
faltam, a atualização acontece nesse arquivo e em mais nenhum — com uma exceção
necessária: o SEO estático (title, description, Open Graph, JSON-LD) fica no
`index.html`, porque precisa existir sem JavaScript, e o React renderiza no
cliente.

As listas de especialidades e convênios estão **vazias de propósito**. Os
componentes tratam os dois estados: com lista, montam o grid; sem lista, mostram
o que se sabe, exibem o marcador de pendência e oferecem o telefone. Basta
preencher o array para a seção virar grid, sem tocar em componente.

O mesmo vale para o WhatsApp: preencher `contato.whatsapp` transforma os três
CTAs (hero, fechamento e botão flutuante) em links `wa.me` reais.

### 🚫 A regra que não se quebra

**Nunca escreva no site informação que não tenha vindo do cliente.** É um site
de saúde, de um cliente real, sujeito a fiscalização do CRO — dado inventado
gera dano real. Não preencha com exemplo, valor plausível ou "algo parecido que
dá para ajustar depois". O que falta vira `{{PENDENTE: ...}}` e entra no
`PENDENCIAS.md`.

Em particular, **não invente**: especialidades, convênios, nomes/fotos/CRO de
profissionais, horários, ano de fundação, número de pacientes, prêmios,
certificações, preços ou depoimentos. As únicas avaliações permitidas são as
três reais do Google já transcritas.

E **não inclua**: imagens de antes e depois, promessa de resultado, preços ou
promoções, gatilho de escassez, conteúdo que sugira diagnóstico, ou o termo
"especialista" ligado a área não reconhecida pelo CFO. As restrições completas
estão no bloco de comentário no topo de [`src/App.tsx`](./src/App.tsx).

---

## Estrutura

```
index.html                 SEO estático: title, description, OG, Twitter, JSON-LD
src/
  App.tsx                  ordem das seções + as regras de conformidade, em comentário
  data/site.ts             TODO o conteúdo textual e de contato, tipado
  index.css                tokens em CSS, @font-face, foco de teclado, utilidades
  components/              um arquivo por seção da página
    ui/                    primitivas: Pendente, Placeholder, Acoes, Estrelas, TituloSecao
public/
  fonts/                   Fraunces e Inter, subset latino, auto-hospedadas
  robots.txt  sitemap.xml  favicon.svg
scripts/pendencias.mjs     inventário dos marcadores
DESIGN.md                  sistema de tokens e por que cada escolha
PENDENCIAS.md              as 34 pendências, com arquivo, linha e a pergunta a fazer
```

## Stack e o porquê

**Vite + React + TypeScript + Tailwind.** Página única com âncoras, sem router,
sem backend, sem formulário. Todos os CTAs são `tel:` e `wa.me`.

O site precisa carregar rápido em 4G, ser barato de hospedar e não ter
superfície de manutenção. Formulário de contato exigiria backend, tratamento de
dado pessoal de paciente sob a LGPD e alguém checando a caixa de entrada — nada
disso existe hoje.

Sem biblioteca de UI pronta e sem biblioteca de animação: os componentes são
próprios e o CSS é Tailwind com tokens em `tailwind.config.js`.

### Decisões de performance

- **Fontes auto-hospedadas** (`public/fonts/`), variáveis, subset latino, `font-display: swap`. Sem requisição a terceiro bloqueando a primeira pintura.
- **Mapa sob demanda.** O iframe do Google Maps só é criado quando o visitante clica em "Ver no mapa" — em 4G ele derrubaria o LCP, e não é o que o visitante veio ver.
- **Sem imagem no caminho crítico.** Os placeholders são CSS. `aspect-ratio` reserva a caixa, o que mantém o CLS em zero quando as fotos reais entrarem.

## Medições

Lighthouse mobile, sobre o `dist/` servido por `npm run preview`:

| | Meta | Medido |
|---|---|---|
| Performance | ≥ 90 | **99** |
| Acessibilidade | ≥ 95 | **100** |
| Boas práticas | — | **100** |
| SEO | 100 | **100** |
| CLS | — | **0** |

Verificado também: sem rolagem horizontal de 320px a 1440px; travessia por
teclado passando pelos 19 elementos focáveis com anel de foco visível em todos;
alvos de toque ≥ 44×44px; contraste de texto AA ou melhor em toda a paleta
(as razões medidas estão no [DESIGN.md](./DESIGN.md)).
