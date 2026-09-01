# Pendências — Rizzit Odontologia Premium

Lista do que falta para o site sair da demonstração e ir ao ar.
Gerada a partir de `npm run pendencias` — rode o comando para os números de
linha atuais.

**Estado:** 32 pendências + 1 presunção em uso.

---

## 0. Bloqueio de publicação (norma do CFO)

O site **não pode ir ao ar** sem estes três. Publicidade de clínica
odontológica (pessoa jurídica) exige exibição do registro:

| Dado | Onde entra |
|---|---|
| Inscrição da clínica no CRO-MT | `site.legal.croClinica` |
| Nome do responsável técnico | `site.legal.responsavelTecnico` |
| CRO do responsável técnico | `site.legal.croResponsavelTecnico` |

A **demonstração** pode ser apresentada sem eles: ela não está no ar e não é
material de divulgação ao público.

---

## 1. P0 — sem isto o site é uma página de contato

### Tratamentos
`site.tratamentos.lista` está **vazio**, e isso é decisão, não esquecimento.
A pesquisa não confirmou um único tratamento oferecido pela Rizzit. Implante,
lente, clareamento e ortodontia são o chute óbvio — e por isso mesmo não
entraram.

Precisamos da lista real, com o nome que a clínica usa para cada um.

### Equipe
`site.equipe.lista` está **vazio**. Nome completo, função e CRO (com UF) de
cada profissional. **Quem não tiver CRO informado não pode ser publicado** —
é norma, não preferência.

### Horário de atendimento
Por dia da semana, incluindo intervalo e sábado.

### WhatsApp
Ver a seção 4 (presunção em uso).

---

## 2. P1 — decide se fica premium ou genérico

### Logotipo e identidade
`site.identidade.logotipo`. Vetor (SVG/AI/PDF) ou PNG com fundo transparente,
mais as cores oficiais em hexadecimal.

Enquanto não chega, a marca é tipográfica (Fraunces) e a paleta é a proposta
de `tailwind.config.js`. Trocar a paleta é editar só aquele bloco.

### Fotos
Nenhuma foto da clínica foi obtida — Instagram e Google Business estão
bloqueados no ambiente da pesquisa. Cinco espaços estão reservados:

| Arquivo esperado | O que precisa mostrar |
|---|---|
| `fotos-originais/fachada.jpg` | A entrada na Rua das Dálias, de frente, com identificação visível |
| `fotos-originais/recepcao.jpg` | O primeiro ambiente que o paciente vê |
| `fotos-originais/consultorio.jpg` | Consultório arrumado e **vazio** — sem paciente, sem profissional |
| `fotos-originais/ambiente.jpg` | Um detalhe de acabamento, espera ou corredor |
| `fotos-originais/equipe.jpg` | Retrato da equipe — **exige autorização de uso de imagem por escrito** |

Mínimo de 1200px de largura. Depois: `npm run imagens && npm run build`.

---

## 3. P2 — reforça conversão

- **Nota e quantidade de avaliações no Google** (`site.provaSocial`). Hoje a
  seção de prova social está inteiramente reservada. Quando chegar, vira o
  ativo mais forte da página.
- **3 a 5 depoimentos reais**, com origem verificável (print do Google).
- **Link do perfil no Google Business** — para o botão "como chegar".
- **Coordenadas** (latitude/longitude) para o JSON-LD.
- **Link exato da página no Facebook** — a página existe, o endereço não foi
  verificado.
- **Texto institucional** (`site.sobre.pendencia`). O parágrafo atual tem só
  os três fatos confirmados. O texto de verdade o proprietário escreve ou
  aprova.
- **Domínio contratado** — necessário para `canonical`, `og:url`, `og:image`,
  `sitemap.xml` e `robots.txt`.

---

## 4. Presunção em uso — atenção

Diferente das pendências, uma presunção **não aparece como espaço reservado**.
Ela parece conteúdo pronto, e é por isso que merece uma seção própria.

| Valor em uso | Por que não é confiável |
|---|---|
| WhatsApp `5565981506894` | O telefone público da clínica é celular, o que torna o WhatsApp plausível. Ninguém confirmou que ele atende WhatsApp nem que é o canal de agendamento. |

Está marcado em `src/data/site.ts` via `presumir()` e sai em
`npm run pendencias`. A faixa da demonstração declara isso ao cliente.

**Confirmar antes de publicar.** Se o número não for o canal de agendamento,
todo CTA principal do site aponta para o lugar errado.

---

## 5. O que NÃO é pendência — dados confirmados

Não precisa perguntar ao cliente. Verificado em fonte pública, com fonte
anotada em `rizzit/PESQUISA-RIZZIT.md`:

- Razão social, CNPJ e data de abertura (08/04/2021)
- Endereço completo, com quadra, lote e CEP — 5 fontes independentes
- Telefone (65) 98150-6894 — 5 fontes
- Instagram @rizzitodonto

---

## 6. Como verificar

```bash
npm run pendencias   # o que falta, com arquivo e linha
npm run contraste    # a paleta contra a WCAG 2.1 AA
npm run auditar      # a demonstração em 4 telas: imagens, toque, rolagem
npm run demo         # regera demo/rizzit-DEMO.html
```
