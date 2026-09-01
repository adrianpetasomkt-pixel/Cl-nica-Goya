# Fotos originais — Rizzit Odontologia Premium

Coloque aqui os arquivos **originais** das fotos da clínica, na maior resolução
que existir. Depois rode:

```bash
npm run imagens && npm run demo
```

O script gera as versões responsivas em `public/fotos/`, a imagem de
compartilhamento e o manifesto `src/data/fotos.gerado.ts`. Nenhum desses é
editado à mão — são gerados.

## Nenhuma foto foi obtida na pesquisa

O Instagram e o Google Business da clínica estão bloqueados no ambiente onde a
pesquisa rodou. **Todas as fotos do site estão pendentes**, e nenhuma foi
substituída por banco de imagens — os espaços estão reservados e evidentes.

## Nomes esperados

O nome do arquivo (sem extensão) liga a foto ao lugar dela no site:

| Arquivo | Onde aparece | O que precisa mostrar |
|---|---|---|
| `fachada.jpg` | Estrutura (foto alta, à esquerda) | A entrada na Rua das Dálias, de frente, com a identificação visível |
| `recepcao.jpg` | A clínica + imagem de compartilhamento | O primeiro ambiente que o paciente vê |
| `consultorio.jpg` | Estrutura | Consultório arrumado e **vazio**, com boa luz |
| `ambiente.jpg` | Estrutura | Um detalhe do acabamento, da espera ou do corredor |
| `equipe.jpg` | Equipe | Retrato da equipe |

Para mudar esse mapeamento, edite `fotos` em `src/data/site.ts` — inclusive o
texto alternativo, que é conteúdo e mora lá.

## Resolução

- **Mínimo aceitável:** 1200px de largura.
- Abaixo disso o script avisa, gera o que dá e **não amplia** — ampliar não
  cria detalhe, só borra e engorda o arquivo.
- Foto do perfil do Google costuma vir por volta de 680px. Se existirem os
  arquivos originais da câmera ou do celular, use esses.

## Enquadramento

Uma foto boa aqui vale mais que qualquer ajuste de design. Três coisas
resolvem a maior parte:

- **Luz natural**, de dia, sem flash direto.
- **Horizontal e vertical** do mesmo ambiente, quando der — a galeria usa as
  duas proporções.
- **Ambiente arrumado e vazio.** Sem paciente, sem material sobre a bancada.

## Antes de subir qualquer foto

Foto com paciente ou com profissional identificável exige **autorização de uso
de imagem por escrito**. Isso vale especialmente para `equipe.jpg`. Ambiente
vazio não tem essa restrição.

Imagem de "antes e depois" é **vedada** a pessoa jurídica pelo Código de Ética
Odontológica — não envie, não será publicada.
