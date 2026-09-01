#!/usr/bin/env node
/*
 * Varre o projeto e lista tudo que ainda não é dado confirmado:
 *
 *   PENDÊNCIAS  — marcadores {{PENDENTE: ...}}, com arquivo e linha.
 *   PRESUNÇÕES  — chamadas a `presumir(...)` em src/data/site.ts: valores que
 *                 a demonstração usa mas que ninguém confirmou. São mais
 *                 perigosos que as pendências, porque não aparecem na tela
 *                 como espaço reservado — parecem conteúdo pronto.
 *
 * Serve para manter o PENDENCIAS.md honesto (número de linha envelhece
 * rápido) e como trava antes de publicar.
 *
 *   npm run pendencias
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const RAIZ = process.cwd();
const IGNORAR = new Set(['node_modules', 'dist', '.git', 'scripts', '.demo-build', 'demo', 'fotos-originais']);
const EXTENSOES = /\.(html|tsx?|css|xml|txt|json)$/;

/** Ocorrências que são citação do padrão em comentário ou tipo, não pendência real. */
const REFERENCIA = /^\{\{PENDENTE: (\.\.\.|\$\{string\})\}?\}?$/;

function* arquivos(dir) {
  for (const nome of readdirSync(dir)) {
    if (IGNORAR.has(nome)) continue;
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) yield* arquivos(caminho);
    else if (EXTENSOES.test(nome)) yield caminho;
  }
}

const reais = [];
const referencias = [];

for (const caminho of arquivos(RAIZ)) {
  const linhas = readFileSync(caminho, 'utf8').split('\n');
  linhas.forEach((linha, i) => {
    for (const achado of linha.matchAll(/\{\{PENDENTE:[^}]*\}\}/g)) {
      const registro = { arquivo: relative(RAIZ, caminho), linha: i + 1, texto: achado[0] };
      (REFERENCIA.test(achado[0]) ? referencias : reais).push(registro);
    }
  });
}

/*
 * Presunções. Casa `presumir(` e captura o motivo — a string do segundo
 * argumento, que é onde está escrito por que o valor não é confiável.
 */
const presuncoes = [];
{
  const caminho = 'src/data/site.ts';
  const texto = readFileSync(caminho, 'utf8');
  for (const achado of texto.matchAll(/presumir\(\s*\n?\s*'([^']*)',\s*\n?\s*'([\s\S]*?)',?\s*\n?\s*\)/g)) {
    presuncoes.push({ valor: achado[1], motivo: achado[2].replace(/\s+/g, ' ').trim() });
  }
}

for (const p of reais) console.log(`${p.arquivo}:${p.linha}  ${p.texto}`);
console.log(`\n${reais.length} pendências reais.`);

if (presuncoes.length) {
  console.log(`\n${presuncoes.length} presunção(ões) EM USO na página — confirmar antes de publicar:`);
  for (const p of presuncoes) console.log(`  "${p.valor}" — ${p.motivo}`);
}

if (referencias.length) {
  console.log(`\n${referencias.length} citações do padrão em comentário/tipo (não são pendências):`);
  for (const r of referencias) console.log(`  ${r.arquivo}:${r.linha}`);
}
process.exitCode = 0;
