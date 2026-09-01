# Rizzit Odontologia Premium — site

Site institucional da Rizzit Odontologia Premium (Jardim Cuiabá, Cuiabá — MT),
com um gerador de **demonstração autocontida** para apresentar ao cliente antes
de existir domínio.

Estado atual: **demonstração pronta para apresentação.** O site ainda não pode
ser publicado — falta conteúdo da clínica e os dados de registro exigidos pelo
CFO. Ver `PENDENCIAS.md`.

---

## Comandos

```bash
npm install

npm run dev          # desenvolvimento
npm run build        # build de produção (modo "andaime")
npm run demo         # gera demo/rizzit-DEMO.html — arquivo único, autocontido
npm run auditar      # gera a demo e a audita em 4 telas
npm run pendencias   # lista o que ainda não é dado confirmado
npm run contraste    # verifica a paleta contra a WCAG 2.1 AA
npm run typecheck    # TypeScript estrito
npm run arte         # regera as artes conceituais de fundo
npm run imagens      # processa fotos-originais/ -> public/fotos/
```

---

## A demonstração

`npm run demo` produz **um único arquivo HTML** com tudo dentro: CSS,
JavaScript, as duas fontes, o favicon e todas as imagens em data URI. Abre com
dois toques, sem servidor e sem internet.

> **Por que as imagens precisam estar embutidas**
>
> Aberto por `file://` — que é como o cliente abre no celular — um caminho
> como `/arte/atmosfera-hero.jpg` resolve para a **raiz do sistema de
> arquivos**, não para a pasta do HTML. Toda imagem aparece quebrada. Servido
> por HTTP no desktop o mesmo arquivo funciona, e é por isso que o defeito só
> aparecia no iPhone.
>
> `scripts/demo.mjs` embute cada imagem e tem uma trava no fim: se sobrar
> qualquer referência externa, o build falha em vez de gerar um arquivo que só
> quebra na frente do cliente.

Um detalhe relacionado: no modo demonstração o componente `<Foto>` emite um
`src` único em vez de `srcset`. Data URI em base64 contém vírgula, e `srcset`
é uma lista separada por vírgula — as duas coisas juntas produzem um srcset
ilegível e a imagem não aparece.

### Modo demonstração vs. produção

A flag `__MODO_DEMO__` (definida nos configs do Vite) muda dois
comportamentos:

| | `npm run build` | `npm run demo` |
|---|---|---|
| Espaços reservados | modo **andaime** — feios de propósito | modo **vitrine** — desenhados |
| Faixa de aviso | ausente | presente, no rodapé da tela |

Os dois dizem que o conteúdo é reservado. A diferença é de acabamento, nunca
de honestidade. Ver `DESIGN.md`, seção 6.

---

## Regra de ouro do conteúdo

Todo valor em `src/data/site.ts` é de um destes três tipos, e o tipo é
explícito no código:

- **CONFIRMADO** — verificado em fonte pública, com a fonte anotada no
  comentário. Ver `rizzit/PESQUISA-RIZZIT.md`.
- **PRESUMIDO** — `presumir(valor, motivo)`. Usado na demonstração para ela
  funcionar, mas **não verificado**. Sai em `npm run pendencias`.
- **PENDENTE** — `{{PENDENTE: ...}}`. Não temos, e o site não finge que tem.

Nada de valor plausível ou "algo parecido que dá para ajustar depois". Este é
um site de saúde sujeito à fiscalização do CRO — dado inventado gera dano real,
a pacientes e à clínica.

Hoje **nenhum tratamento, profissional, horário ou avaliação foi confirmado**,
e por isso nenhum aparece no site. Não é omissão: é a única postura defensável.

---

## Bloqueio de publicação

Publicidade de clínica odontológica (pessoa jurídica) exige, por norma do CFO,
a exibição de:

1. nome e inscrição da **clínica** no CRO-MT;
2. nome e CRO do **responsável técnico**.

Nenhum dos dois foi obtido. **O site não pode ir ao ar sem eles.** A
demonstração pode ser apresentada: não está no ar e não é material de
divulgação ao público.

---

## Estrutura

```
src/
  data/site.ts            fonte única de conteúdo — só se edita aqui
  data/fotos.gerado.ts    GERADO por npm run imagens
  components/
    ui/                   primitivas: Foto, Placeholder, Pendente,
                          ModuloVazio, Revelar, TituloSecao, Acoes
    *.tsx                 seções da página
scripts/
  arte.mjs                artes conceituais de fundo (gráficos, não fotos)
  imagens.mjs             fotos originais -> versões responsivas
  demo.mjs                arquivo único autocontido
  auditar.mjs             auditoria em 4 telas via file://
  contraste.mjs           WCAG 2.1 AA
  pendencias.mjs          o que falta
fotos-originais/          onde as fotos da clínica devem ser colocadas
rizzit/PESQUISA-RIZZIT.md pesquisa que originou o conteúdo, com fontes
```

## Histórico

Este repositório começou como o site da Clínica Goya. O projeto da Rizzit
reaproveita a mesma arquitetura; o código da Goya continua no histórico do git
(commit `26b0088`).
