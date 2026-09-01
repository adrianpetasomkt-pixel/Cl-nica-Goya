# Direção de arte — Rizzit Odontologia Premium

O que foi decidido, e por quê. Serve para as próximas alterações não
desmancharem a coerência do conjunto.

---

## 1. O problema de partida

A clínica tem "Premium" no próprio nome. É uma declaração de posicionamento
explícita — e hoje não há nada, do lado digital, que a sustente: não existe
site, o Instagram tem ~2,4 mil seguidores e ~39 posts, e não há prova pública
organizada.

Some-se a isso a restrição que definiu o projeto inteiro: **a pesquisa não
confirmou nenhum tratamento, nenhum profissional, nenhum horário, nenhuma
avaliação e nenhuma foto.** O que existe é nome, endereço, telefone, CNPJ,
data de abertura e Instagram.

Um site premium normalmente se apoia em fotografia e em prova social. Aqui não
havia nem uma nem outra. A direção de arte precisou ser construída sobre o que
sobrou: **tipografia, cor e espaço.**

---

## 2. Paleta

Definida em `tailwind.config.js`, num bloco só. Nenhum componente tem cor
hardcoded — trocar a marca é editar aquele bloco.

| Token | Hex | Papel |
|---|---|---|
| `noite` | `#0E1417` | Superfície escura — hero, CTA final, rodapé |
| `petroleo` | `#123038` | Institucional escuro — títulos, seção de tratamentos |
| `osso` | `#F5F2EC` | Fundo da página |
| `tinta` | `#14181B` | Texto principal |
| `bronze` | `#8A5E2A` | Ação e acento sobre fundo claro |
| `champanhe` | `#E0B87C` | Acento sobre fundo escuro |
| `pedra` | `#6B675F` | Texto de apoio |
| `linha` | `#E2DCD0` | Filete decorativo — **nunca** borda funcional |

**A decisão central foi não usar azul.** Azul-ciano é a cor por default da
odontologia no Brasil; qualquer clínica com ele parece qualquer outra. A
referência aqui é hotelaria e joalheria: superfície escura profunda, um metal
quente como único acento, e um off-white de papel.

O bronze é o único acento. Um segundo acento faria a página parecer decorada.

### Contraste

Todos os pares em uso foram medidos, não estimados: `npm run contraste`.
Roda a fórmula da WCAG 2.1 e sai com código 1 se algum reprovar.

O `bronze` foi escurecido de `#9A6B33` para `#8A5E2A` justamente por causa
disso: no tom original ele dava 4,15:1 sobre o fundo claro e reprovava no
mínimo de 4,5:1.

---

## 3. Tipografia

- **Fraunces** (serifada variável) — nome da marca, títulos, números.
- **Inter** (sem serifa variável) — texto corrido e interface.

As duas são auto-hospedadas em subset latino. Nenhuma requisição a terceiro
antes da primeira pintura: o link do Google Fonts custa uma conexão nova e
bloqueia a renderização, o que em 4G é caro.

O corpo `marca` (`clamp(2.9rem, 12vw, 7rem)`) existe para uma coisa só: o nome
"Rizzit" no hero e no rodapé. **Sem logotipo, a marca é a tipografia** — por
isso o nome aparece grande, com o "Odontologia Premium" numa linha própria em
caixa alta e tracking largo, em champanhe.

Um ícone de dente genérico teria sido a saída fácil e a errada.

---

## 4. Elemento de assinatura — o filete de bronze

Um traço de 1px por 64px, em bronze (ou champanhe sobre escuro), acima de cada
título de seção e dentro de cada espaço reservado.

É o único ornamento da página. Custa zero requisição, aparece em todo lugar e
é o que costura hero, seções e espaços reservados num conjunto só.

Está em `.regua` / `.regua-clara`, em `src/index.css`.

---

## 5. Imagens

### Arte conceitual gerada (`scripts/arte.mjs`)

Duas imagens: fundo do hero e fundo do CTA final. São campos de cor abstratos
— gradiente, luz e grão — gerados por código.

**Não são fotos da clínica. Não são banco de imagens.** Não retratam ambiente,
equipamento, profissional ou paciente, e não insinuam nenhum dos quatro. É
design gráfico, e é a única categoria de imagem que pode entrar num site de
clínica sem que ninguém tenha fotografado a clínica.

Duas decisões técnicas com motivo:

- **Grão a 9%.** Sem ele, o gradiente escuro vira "bola de luz" de template e,
  em tela OLED, mostra banding.
- **Proporção 16:9.** Na primeira versão a arte era 1800×1400; o `object-cover`
  do hero cortava topo e base no desktop e jogava fora justamente o foco de
  luz — a seção chegava chapada. Os focos ficam entre 0,2 e 0,62 da altura,
  faixa que sobrevive ao corte em celular e em desktop.

### Fotos reais

Nenhuma existe ainda. `<Foto>` cai sozinho no espaço reservado quando o
arquivo não está em `public/fotos/`. Ver `fotos-originais/LEIA-ME.md`.

---

## 6. Espaços reservados — dois modos

Este é o mecanismo mais importante do projeto, porque é ele que permite
apresentar um site bonito sem inventar conteúdo.

`Placeholder`, `Pendente` e `ModuloVazio` têm **dois modos**, escolhidos por
`site.modoDemo` (injetado no build — ver `src/vite-env.d.ts`):

### `andaime` — build de produção (`npm run build`)

Deliberadamente feio: trama diagonal, borda tracejada, marcador técnico
à mostra. É um andaime e precisa parecer um andaime, para que ninguém publique
o site achando que aquilo é conteúdo final.

### `vitrine` — build de demonstração (`npm run demo`)

Desenhado. Cantos em filete de bronze, título da foto em Fraunces, descrição
do enquadramento, e o rótulo "Espaço reservado". O cliente precisa enxergar a
composição da página e entender o que vai ali.

**Continua dizendo com todas as letras que é espaço reservado.** A diferença
entre os dois modos é de acabamento, nunca de honestidade.

O `ModuloVazio` vai além e desenha a grade vazia — seis cartões numerados em
tratamentos, quatro em equipe. Isso responde a pergunta que o cliente
realmente tem ("como fica com as minhas coisas aqui dentro?") sem que a gente
precise inventar as coisas dele. Os cartões **não têm texto de exemplo**: nome
de tratamento inventado numa demonstração vira, três reuniões depois, nome de
tratamento no ar.

---

## 7. Movimento

- **Reveal on scroll** (`Revelar`): sobe 18px e aparece, uma vez só, via
  `IntersectionObserver`. Animação que reaparece a cada rolagem cansa e
  denuncia "demonstração cheia de efeitos".
- **Botões**: `translate-y` de 1px no `:active`. Imperceptível
  conscientemente, sentido no dedo.
- **Header**: transparente sobre o hero, ganha fundo depois de 24px de
  rolagem. Uma barra sólida no topo cortaria a primeira dobra em duas.

A classe `js-reveal` é posta pelo JavaScript, não no HTML. Se o bundle falhar,
o CSS não esconde nada e a página aparece inteira — o caminho contrário
transforma qualquer erro de script numa página em branco.

Tudo respeita `prefers-reduced-motion`.

---

## 8. Mobile

Não é desktop reduzido. Decisões tomadas para o celular primeiro:

- **O telefone nunca entra no hambúrguer.** Fica na barra em qualquer largura.
  Abaixo de 420px o rótulo encurta para "Ligar", mas o nome acessível do link
  continua sendo o número inteiro.
- **Alvo de toque mínimo de 44px** em tudo que é clicável, verificado
  automaticamente por `npm run auditar`.
- **`overflow-x: hidden`** no body e verificação de rolagem horizontal na
  auditoria. Um elemento estourando a viewport já quebra a apresentação.
- **`env(safe-area-inset-bottom)`** no botão flutuante e na faixa de
  demonstração, senão a barra de início do iPhone come metade do alvo.
- **Folga inferior no rodapé** calculada a partir dos elementos fixos — sem
  ela, o botão flutuante tapa o último parágrafo.
- **Mapa sob demanda**, por toque. O iframe do Google traz centenas de KB e um
  terceiro para dentro da primeira renderização.

---

## 9. Verificação

Nada aqui é "parece bom":

```bash
npm run contraste   # paleta contra WCAG 2.1 AA
npm run auditar     # demonstração em 4 telas, aberta por file://
npm run typecheck   # TypeScript estrito
npm run pendencias  # o que ainda não é dado confirmado
```

A auditoria abre o arquivo por `file://` — do jeito exato que o cliente abre
no celular — e reprova se houver imagem quebrada, rolagem horizontal, alvo de
toque pequeno, âncora sem destino ou erro de console.
