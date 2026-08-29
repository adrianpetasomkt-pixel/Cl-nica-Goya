#!/usr/bin/env node
/*
 * Varre o projeto e lista todo marcador {{PENDENTE: ...}} com arquivo e linha.
 *
 * Serve para duas coisas: manter o PENDENCIAS.md honesto (número de linha
 * envelhece rápido) e servir de trava — enquanto a saída não for vazia, o
 * site tem dado por confirmar.
 *
 *   npm run pendencias
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const RAIZ = process.cwd();
const IGNORAR = new Set(['node_modules', 'dist', '.git', 'scripts']);
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

for (const p of reais) console.log(`${p.arquivo}:${p.linha}  ${p.texto}`);
console.log(`\n${reais.length} pendências reais.`);
if (referencias.length) {
  console.log(`${referencias.length} citações do padrão em comentário/tipo (não são pendências):`);
  for (const r of referencias) console.log(`  ${r.arquivo}:${r.linha}`);
}
process.exitCode = 0;
