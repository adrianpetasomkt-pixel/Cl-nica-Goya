# Fotos originais

Coloque aqui os arquivos **originais** das fotos da clínica, na maior resolução
que existir. Depois rode:

```bash
npm run imagens && npm run build
```

O script gera as versões responsivas em `public/fotos/`, a imagem de
compartilhamento e o manifesto `src/data/fotos.gerado.ts`. Não edite nenhum
desses — eles são gerados.

## Nomes esperados

O nome do arquivo (sem extensão) é o que liga a foto ao lugar dela no site:

| Arquivo | Onde aparece |
|---|---|
| `recepcao.jpg` | Hero (primeira dobra) e imagem de compartilhamento |
| `consultorio.jpg` | Seção "A clínica" |

Para mudar esse mapeamento, edite `fotos` em `src/data/site.ts` — inclusive o
texto alternativo de cada foto, que é conteúdo e mora lá.

## Resolução

- **Mínimo aceitável:** 1200px de largura.
- Abaixo disso o script avisa, gera o que dá e **não amplia** — ampliar não cria
  detalhe, só borra e engorda o arquivo.
- A imagem de compartilhamento só sai nos 1200×630 ideais se o original de
  `recepcao` tiver 1200px ou mais; senão cai para 600×315.

As fotos do perfil do Google Business vêm reduzidas (por volta de 680px). Se
existirem os arquivos originais da câmera ou do celular, use esses.

## Antes de subir qualquer foto

Foto com paciente ou com profissional identificável exige **autorização de uso
de imagem** por escrito. Ambiente vazio não tem essa restrição.
