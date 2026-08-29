#!/usr/bin/env node
/*
 * Gera um arquivo HTML único e autocontido com o site inteiro dentro:
 * CSS, JavaScript, as duas fontes e o favicon embutidos. Abre com dois
 * cliques, sem servidor e sem internet — serve para mandar ao cliente ver e
 * navegar antes de existir domínio.
 *
 *   npm run demo   ->  demo/clinica-goya-DEMO.html
 *
 * Roda depois do build de demonstração (vite.demo.config.ts), que empacota
 * tudo em um bundle IIFE — módulo ES não executa a partir de file://.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const B = '.demo-build/';
let html = readFileSync(B + 'index.html', 'utf8');
let css = readFileSync(B + 'style.css', 'utf8');
const js = readFileSync(B + 'app.js', 'utf8');

// Fontes -> data: URI, para o arquivo não depender de nada externo.
for (const arq of ['fonts/fraunces-latin-var.woff2', 'fonts/inter-latin-var.woff2']) {
  const b64 = readFileSync(B + arq).toString('base64');
  const antes = css.length;
  css = css.replaceAll(`/${arq}`, `data:font/woff2;base64,${b64}`);
  if (css.length === antes) throw new Error(`não encontrou a referência à fonte ${arq} no CSS`);
}

// Os preloads apontavam para arquivos soltos que não existem mais.
html = html.replace(/\s*<link\s+rel="preload"[\s\S]*?>/g, '');

/*
 * Substituição por FUNÇÃO, sempre: com replacement em string, o `replace`
 * interpreta `$&`, `$\`` e `$'` que aparecem dentro do bundle e corrompe a
 * saída silenciosamente.
 */
html = html.replace(
  /\s*<link rel="stylesheet"[^>]*href="\/style\.css"[^>]*>/,
  () => `\n    <style>\n${css.replaceAll('</style', '<\\/style')}\n    </style>`,
);

/*
 * O bundle original é `type="module"`, portanto adiado. Como script clássico
 * ele rodaria durante o parse do <head>, antes de #root existir — então sai do
 * <head> e entra no fim do <body>.
 */
html = html.replace(/\s*<script[^>]*src="\/app\.js"[^>]*><\/script>/, '');
html = html.replace(
  '</body>',
  () => `  <script>\n${js.replaceAll('</script', '<\\/script')}\n    </script>\n  </body>`,
);

const favicon = readFileSync('public/favicon.svg').toString('base64');
html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${favicon}"`);

// Trava: se sobrou referência a arquivo externo, o "autocontido" é mentira.
for (const proibido of ['href="/style.css"', 'src="/app.js"', '/fonts/', '/favicon.svg']) {
  if (html.includes(proibido)) throw new Error(`sobrou referência externa: ${proibido}`);
}

mkdirSync('demo', { recursive: true });
const saida = 'demo/clinica-goya-DEMO.html';
writeFileSync(saida, html);
console.log(`${saida} — ${(html.length / 1024).toFixed(0)} KB, sem dependência externa`);
