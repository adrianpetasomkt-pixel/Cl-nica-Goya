# Pendências — site da Clínica Goya

Tudo que o site precisa e que **não** está confirmado. Nenhum destes campos foi
preenchido com valor plausível, exemplo ou aproximação: onde falta dado, existe
um marcador `{{PENDENTE: ...}}` visível na página e no código.

**35 pendências**, agrupadas abaixo em quatro blocos. Os dois primeiros são
bloqueadores — o site não deve ir ao ar sem eles.

Para regerar esta lista com os números de linha atualizados:

```bash
npm run pendencias
```

*(O script separa as pendências reais das 5 citações do padrão que aparecem em
comentários e na definição de tipo — `index.html:13`, `src/App.tsx:23`,
`src/data/site.ts:9`, `:15` e `:20`. Essas são documentação, não pendência.)*

---

## 🔴 Bloco 1 — Bloqueadores legais

**Sem estes campos o site não pode ser publicado.** A publicidade de clínica
odontológica de pessoa jurídica é regida pelo Código de Ética Odontológica e
pelas resoluções do CFO, que obrigam a exibir o registro da clínica no CRO e o
nome e CRO do responsável técnico em todo material de divulgação.

| # | Onde está | O que perguntar ao cliente |
|---|---|---|
| 1 | `src/data/site.ts:223` | Qual é o número de inscrição da Clínica Goya no CRO-MT? (Aparece no alvará e na documentação da pessoa jurídica.) |
| 2 | `src/data/site.ts:225` | Qual o nome completo do responsável técnico da clínica, exatamente como registrado no CRO? |
| 3 | `src/data/site.ts:227` | Qual o número de CRO do responsável técnico, com a UF? |

**Impacto:** rodapé (`src/components/Footer.tsx`, seção "Registro profissional").
O arquivo tem um bloco de comentário no topo sinalizando o bloqueio.

---

## 🟠 Bloco 2 — Conteúdo que o visitante veio buscar

Sem estes, a página existe mas não responde às perguntas que fazem alguém
ligar. São as três seções que hoje mostram um marcador no lugar do conteúdo.

| # | Onde está | O que perguntar ao cliente |
|---|---|---|
| 4 | `src/data/site.ts:106` | Quais especialidades odontológicas a clínica efetivamente atende? Listar só as reconhecidas pelo CFO e que têm profissional atuando hoje. |
| 5 | `src/data/site.ts:176` | *(mesma pergunta, usada na resposta do FAQ "Quais especialidades a clínica atende?")* |
| 6 | `src/data/site.ts:116` | Quais convênios odontológicos são aceitos? Enviar a lista com o nome exato de cada operadora. |
| 7 | `src/data/site.ts:170` | *(mesma pergunta, usada na resposta do FAQ "A clínica atende por convênio?")* |
| 8 | `src/data/site.ts:50` | Existe um WhatsApp de atendimento? Qual o número com DDD? O telefone confirmado, (65) 3322-3264, é fixo e não recebe mensagem. |
| 9 | `src/data/site.ts:94` | Qual o horário de funcionamento de segunda a sábado? Há intervalo de almoço? Abre aos sábados? Só a abertura da segunda às 07:00 está confirmada. |
| 10 | `src/data/site.ts:182` | *(mesmo horário, usado na resposta do FAQ "Qual o horário de funcionamento?")* |
| 11 | `src/data/site.ts:90` | A que horas a clínica fecha às segundas-feiras? |

**Impacto:** seções Especialidades, Convênios, Localização e horário, FAQ, o
botão flutuante de WhatsApp e todos os CTAs de WhatsApp.

> **Nota sobre o WhatsApp:** enquanto o número não chegar, os três CTAs de
> WhatsApp são botões `aria-disabled` com o marcador visível ao lado — nunca um
> link `wa.me` quebrado. Preenchendo `contato.whatsapp` em `src/data/site.ts`,
> os três viram links reais automaticamente, sem tocar em componente nenhum.

---

## 🟡 Bloco 3 — Publicação e SEO

Precisam estar resolvidos no momento de publicar, não antes.

| # | Onde está | O que perguntar ao cliente |
|---|---|---|
| 12 | `index.html:30` | Qual o domínio contratado do site? (Para a tag `canonical`.) |
| 13 | `index.html:46` | *(mesmo domínio — `og:url`)* |
| 14 | `index.html:98` | *(mesmo domínio — `url` do JSON-LD)* |
| 15 | `public/sitemap.xml:8` | *(mesmo domínio — `<loc>` do sitemap)* |
| 16 | `public/robots.txt:7` | *(mesmo domínio — diretiva `Sitemap`)* |
| 17 | `index.html:110` | Qual a latitude exata da clínica, em graus decimais? |
| 18 | `index.html:111` | Qual a longitude exata da clínica, em graus decimais? |
| 19 | `src/data/site.ts:68` | *(mesma latitude — usada no texto da seção Localização)* |
| 20 | `src/data/site.ts:70` | *(mesma longitude)* |
| 21 | `index.html:118` | *(horário de fechamento da segunda — `openingHoursSpecification` do JSON-LD)* |
| 22 | `index.html:122` | Quais dias da semana, de terça a sábado, a clínica funciona? |
| 23 | `index.html:123` | Qual o horário de abertura desses dias? |
| 24 | `index.html:124` | Qual o horário de fechamento desses dias? |
| 25 | `src/data/site.ts:73` | Qual o link do perfil da clínica no Google Business? (Para o botão "ler as 1.352 avaliações".) |

### Duas decisões que valem explicar

**`canonical`, `sitemap` e `robots.txt` estão desativados, não quebrados.** Uma
tag `canonical` ou uma diretiva `Sitemap` apontando para um valor inválido é
pior do que a ausência dela — o Google pode desconsiderar a página ou o arquivo
inteiro. Nos três casos a linha está comentada, com o marcador de pendência ao
lado e a instrução de descomentar. É trocar o domínio e remover o `#`.

**`geo` e `openingHoursSpecification` estão no JSON-LD com marcador dentro.** O
JSON continua válido e parseável (verificado), mas esses campos carregam texto
no lugar de coordenada e de horário. **Precisam de valor real antes de
publicar**, senão o rich result é recusado pelo Google.

---

## ⚪ Bloco 4 — Identidade visual, fotos e dados cadastrais

O site funciona sem eles; fica melhor com eles.

| # | Onde está | O que perguntar ao cliente |
|---|---|---|
| 26 | `src/data/site.ts:36` | Existe logotipo da clínica? Enviar em SVG ou PNG com fundo transparente. Existe manual de marca, ou ao menos as cores e as fontes oficiais? |
| 27 | `src/data/site.ts:146` | **Arquivo** da foto da recepção, na maior resolução que existir. Salvar em `fotos-originais/recepcao.jpg`. |
| 28 | `src/data/site.ts:152` | **Arquivo** da foto do consultório, na maior resolução que existir. Salvar em `fotos-originais/consultorio.jpg`. |
| 29 | `src/data/site.ts:155` | Existe foto da equipe? Exige autorização de uso de imagem por escrito dos profissionais que aparecerem. |
| 30 | `index.html:59` | *(só o domínio — a imagem de compartilhamento em si já é gerada por `npm run imagens`)* |
| 31 | `index.html:75` | *(mesmo — `twitter:image`)* |
| 32 | `src/data/site.ts:228` | Qual a razão social da empresa? |
| 33 | `src/data/site.ts:229` | Qual o CNPJ? |
| 34 | `src/data/site.ts:233` | A clínica tem Instagram? Qual o link? |
| 35 | `src/data/site.ts:234` | A clínica tem Facebook? Qual o link? |

### Sobre as fotos

As duas fotos — recepção e consultório — **já estão identificadas e com o lugar
delas reservado no site**, com texto alternativo escrito. Falta só o arquivo.

Assim que os arquivos estiverem em `fotos-originais/`, um comando fecha tudo:

```bash
npm run imagens && npm run build
```

O script gera as versões responsivas em WebP e JPEG, aplica correção tonal
conservadora, monta a imagem de compartilhamento e atualiza o manifesto. Os
espaços reservados somem sozinhos. Detalhes em `fotos-originais/LEIA-ME.md`.

**Resolução importa.** As fotos do perfil do Google Business vêm por volta de
680px de largura — dá para usar, mas fica mole em tela grande, e a imagem de
compartilhamento sai em 600×315 em vez dos 1200×630 ideais. Se existirem os
arquivos originais da câmera ou do celular, use esses. O script nunca amplia:
ampliar não cria detalhe, só borra.

**Nada de banco de imagens.** Foto genérica de dentista sorrindo comunica "site
genérico" e enfraquece exatamente a credibilidade que as 1.352 avaliações
construíram.

**Sobre a paleta:** as cores e fontes em `tailwind.config.js` e `DESIGN.md` são
uma **proposta**, feita sem a identidade visual da clínica. Estão centralizadas
em tokens: trocar a paleta é editar um bloco, não varrer componentes.

---

## O que NÃO é pendência

Estes vieram do perfil público da clínica no Google Business e do texto
institucional que ela mesma publicou. São a única fonte de verdade do site:

- Nome fantasia **Clínica Goya**, nome completo **Goya Odonto & Saúde**
- Categoria: clínica odontológica
- Endereço: R. Cândido Mariano, 909 — Centro Norte, Cuiabá — MT, CEP 78043-415
- Telefone: (65) 3322-3264
- Nota **5,0** com **1.352** avaliações no Google
- Abre às **07:00** na segunda-feira
- Atende **diversas especialidades odontológicas**, por **convênio e particular**
- Público de trabalhadores e empresários do centro, que levam a família
- As **três avaliações** reproduzidas na seção Avaliações, literais e atribuídas ao Google

## O que foi deliberadamente deixado de fora

Não são pendências — são decisões, e reabri-las precisa de conversa:

- **`aggregateRating` no JSON-LD.** A nota é do perfil do Google, não coletada por este site. Marcá-la como própria contraria as diretrizes de rich results e pode custar a exibição do resultado.
- **Formulário de contato.** Exigiria backend, tratamento de dado pessoal de paciente sob a LGPD e alguém checando a caixa de entrada. Telefone e WhatsApp convertem mais para clínica local.
- **Analytics, pixel e cookie banner.** Envolvem dado pessoal e não foram solicitados.
- **Imagens de antes e depois, preços, promoções e promessa de resultado.** Vedados pelas normas do CFO. Ver o bloco de comentário no topo de `src/App.tsx`.
