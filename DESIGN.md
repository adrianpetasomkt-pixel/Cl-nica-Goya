# Sistema de design — Clínica Goya

> Plano feito **antes** do código, conforme a seção 8 do briefing. Todas as cores
> vivem em `tailwind.config.js` (`theme.extend.colors`). Trocar a paleta quando a
> clínica enviar a identidade visual é editar **um** bloco, não varrer componentes.
>
> **Status: proposta a validar.** Não temos a identidade visual da clínica
> (ver `PENDENCIAS.md`).

---

## 1. O que este design precisa resolver

O visitante chega com dor de dente, com um convênio na mão, ou procurando dentista
para a família, e decide em menos de 30 segundos. O design existe para que ele
encontre, nessa ordem: **a prova de que a clínica é confiável** (5,0 com 1.352
avaliações), **a confirmação de que atende o caso dele** (convênio e particular,
diversas especialidades), e **o botão de falar agora**.

Restrições que vêm do negócio, não do gosto:

| Fato do briefing | Consequência de design |
|---|---|
| Clínica de **centro urbano**, público que sai do trabalho no almoço | Sobriedade. Nada de linguagem de spa ou de luxo. |
| É **saúde**, não estética | Legibilidade acima de sofisticação. Sem vitrine. |
| Diferencial é **confiança que passa de geração** | Calor humano. Paleta quente, não fria. |
| **Cuiabá**: luz forte, calor, tela no sol | Contraste alto e tipografia grande, não fiapos de 14px cinza-claro. |
| Decisão em 30s, tráfego vindo do Google Business em 4G | Hierarquia brutal. Um assunto por dobra. |

---

## 2. Revisão contra o template padrão

O briefing pede explicitamente para **não** entregar o template de clínica
odontológica. Revisei cada escolha perguntando "eu faria isso para qualquer
clínica?". As que falharam foram trocadas:

| Escolha default (descartada) | O que ficou | Por quê |
|---|---|---|
| Azul-celeste / ciano "clínico" | **Verde-mata profundo** `#1D5647` | O azul-celeste é o uniforme do setor: comunica categoria, não identidade. O verde profundo é institucional e sério sem ser frio, e sustenta texto branco com 8,49:1. |
| Gradiente suave azul→branco no hero | **Campo chapado + régua ocre** | Gradiente é decoração que custa banda e não responde a nenhuma das três perguntas do visitante. |
| Branco puro `#FFF` como fundo | **Areia** `#F6F1E7` | Branco puro em tela sob sol de Cuiabá estoura. O off-white quente reduz o glare e puxa o "calor humano" pedido. |
| Accent azul ou verde-menta no CTA | **Ocre queimado** `#A8460F` | O CTA precisa ser a única coisa daquela cor na tela. Ocre é a cor da terra do cerrado, contrasta com o verde por temperatura (não por luminosidade) e passa AA em branco (5,92:1). |
| Ícone de dente vetorial | **Numeral tipográfico** (o `5,0`) | O ativo da clínica é o número, não um dente de clip-art. Ele é o ornamento. |
| Foto de stock sorrindo | **Placeholder sólido rotulado** | Proibido pelo briefing e destrói a credibilidade que 1.352 comentários construíram. |
| Sans-serif geométrica em tudo | **Serifa com peso no display** | Uma clínica que atende três gerações da mesma família não fala em Poppins. A serifa carrega idade e permanência; a sans carrega a leitura. |

---

## 3. Cores

Seis tokens nomeados. Todos os pares de texto abaixo foram **medidos**
(fórmula WCAG 2.1 de luminância relativa), não estimados.

| Token | Hex | Papel |
|---|---|---|
| `tinta` | `#16211C` | Texto principal. Preto com fundo verde — casa com a paleta, não briga. |
| `verde` | `#1D5647` | Cor institucional. Superfícies escuras, faixa de confiança, rodapé, títulos. |
| `ocre` | `#A8460F` | **Ação.** Só CTA, régua de assinatura e foco de teclado. Nada mais. |
| `ocre-claro` | `#F5B889` | Variante do ocre para uso **sobre superfície escura** (`verde` ou `tinta`). Bem mais claro que o `ocre`: sobre `verde`, o ocre puro dá 2,83:1 e reprova. |
| `areia` | `#F6F1E7` | Fundo da página e texto sobre superfícies escuras. |
| `pedra` | `#635E54` | Texto secundário e bordas funcionais. |
| `linha` | `#DED5C4` | Filete **decorativo** apenas (1,29:1 — nunca para borda que carrega informação). |

### Contrastes medidos

| Combinação | Razão | Nível |
|---|---|---|
| `tinta` sobre `areia` | 14,71:1 | AAA |
| `verde` sobre `areia` | 7,54:1 | AAA |
| `pedra` sobre `areia` | 5,72:1 | AA |
| `ocre` sobre `areia` | 5,26:1 | AA |
| `areia` sobre `verde` | 7,54:1 | AAA |
| `areia` sobre `tinta` | 14,71:1 | AAA |
| branco sobre `ocre` (botão) | 5,92:1 | AA |
| `ocre-claro` sobre `verde` | 4,89:1 | AA |
| `ocre-claro` sobre `tinta` | 9,54:1 | AAA |

**Regras duras que saem daí:**

1. `linha` é decorativa. Borda que delimita um componente de verdade usa `pedra` (5,72:1, acima do mínimo 3:1 de contraste não-textual).
2. Foco de teclado: `ocre` sobre fundo claro (5,26:1). Sobre `verde` ou `tinta`, o ocre cai para 2,83:1 e **reprova** — ali o anel de foco é `areia` (7,54:1). São duas utilidades separadas (`:focus-visible` e `.sobre-escuro :focus-visible`), não uma cor só.
3. Pela mesma razão existem `ocre` e `ocre-claro`: é a mesma função — acento quente — em duas superfícies. Usar um no lugar do outro reprova o contraste. Toda superfície escura marca isso no código com a classe `.sobre-escuro` ou com a prop `escuro`.
4. Nenhum hex aparece dentro de componente, nem em `fill`/`stroke` de SVG: os ícones herdam `currentColor` e a cor vem do contexto. Trocar a paleta é editar `tailwind.config.js`.
5. Nenhuma informação é comunicada só por cor.

---

## 4. Tipografia

Duas famílias, papéis separados, ambas com `font-display: swap` e subset latino.

| Papel | Família | Uso |
|---|---|---|
| **Display** | `Fraunces` (variável, opsz 9–144, peso 600–700) | `h1`, `h2`, o numeral `5,0`, números da faixa de confiança. Serifa de contraste alto, com "idade" — é o que dá permanência e diferencia do template do setor. |
| **Texto** | `Inter` (variável, peso 400–700) | Corpo, navegação, botões, rodapé, FAQ. Altura-x grande, ótima em 4G e em tela sob sol forte. |

Fallbacks reais em ambos os casos (`Georgia, serif` e `system-ui, sans-serif`),
para que a página fique legível antes de a fonte chegar — e não só "não quebre".

**As duas são auto-hospedadas** (`public/fonts/`, 115 KB somados), em arquivo
variável e subset latino. O link do Google Fonts foi descartado: é uma
requisição de terceiro que bloqueia a renderização e abre uma conexão nova
antes da primeira pintura — o custo exato que não se paga em 4G.

### Escala (fluida, `clamp`, base 16px)

| Nome | Tamanho | Uso |
|---|---|---|
| `display` | `clamp(2.5rem, 7vw, 4.5rem)` | `h1` do hero |
| `numeral` | `clamp(3rem, 9vw, 5rem)` | o `5,0` |
| `h2` | `clamp(1.75rem, 4vw, 2.75rem)` | títulos de seção |
| `h3` | `1.25rem` | cards, perguntas do FAQ |
| `lead` | `clamp(1.05rem, 2.2vw, 1.3rem)` | subtítulo do hero |
| `base` | `1rem` / 1.65 | corpo |
| `sm` | `0.9375rem` | apoio |
| `micro` | `0.8125rem`, `tracking-wider`, caixa alta | etiquetas e o rótulo de pendência |

Corpo nunca abaixo de 16px no mobile — é uma clínica cujo público inclui gente
de 60 anos lendo no celular.

---

## 5. Elemento de assinatura

> **A régua ocre.** Um filete de 4px em `ocre`, com 56px de largura, abre cada
> seção logo acima do título, e reaparece em largura total sob o hero e sobre o
> rodapé — a marca de uma ficha de prontuário preenchida à mão. É o único
> ornamento da página, custa zero requisição, e dá ritmo à rolagem sem
> nenhuma animação.

Ele resolve um problema real: numa one-page longa, sem esse marcador o visitante
perde a noção de onde uma seção termina e outra começa — especialmente rolando
rápido no celular, que é exatamente o que esse público faz.

---

## 6. Espaço, forma e movimento

- **Grid:** contêiner máximo de 1120px, respiro lateral de 20px no mobile e 40px no desktop. Testado de 320px a 1440px.
- **Ritmo vertical:** múltiplos de 8px. Seções com `clamp(4rem, 9vw, 7rem)` de respiro.
- **Cantos:** 4px. Quase reto. Cantos muito arredondados leem como app de consumo; esta é uma clínica de centro.
- **Sombra:** nenhuma sombra difusa. Profundidade vem de superfície (`areia` vs `verde`) e de bordas de 1px. Sombra custa pintura e não comunica nada aqui.
- **Alvos de toque:** mínimo 44×44px em tudo que é clicável, sem exceção.
- **Movimento:** só transição de cor/borda em `hover` e `focus`, ≤150ms. Nenhuma animação de entrada, nenhum parallax, nenhuma biblioteca. Tudo dentro de `@media (prefers-reduced-motion: reduce)` cai para `0.01ms`.

---

## 7. Como a pendência aparece

Dado que falta não pode virar espaço em branco silencioso nem texto plausível.
Existe um componente único (`<Pendente>`) com tratamento visual próprio:
fundo `areia` tramado, borda tracejada em `pedra`, etiqueta "A CONFIRMAR" em
caixa alta e o marcador literal `{{PENDENTE: ...}}` visível.

É deliberadamente feio. Ele é um andaime, precisa parecer um andaime, e ninguém
pode publicar o site achando que aquilo é conteúdo final.
