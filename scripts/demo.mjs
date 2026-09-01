#!/usr/bin/env node
/*
 * Gera um arquivo HTML único e autocontido com o site inteiro dentro:
 * CSS, JavaScript, fontes, favicon E TODAS AS IMAGENS embutidos. Abre com dois
 * toques, sem servidor e sem internet — serve para apresentar ao cliente antes
 * de existir domínio.
 *
 *   npm run demo   ->  demo/rizzit-DEMO.html
 *
 * ---------------------------------------------------------------------------
 * POR QUE AS IMAGENS PRECISAM ESTAR AQUI DENTRO
 *
 * Este script antes embutia só CSS, JS, fontes e favicon. As imagens
 * continuavam referenciadas como caminho absoluto (`/arte/...`, `/fotos/...`).
 *
 * Aberto por `file://` — que é como o cliente abre o arquivo no iPhone —, o
 * caminho `/arte/atmosfera-hero.jpg` resolve para a RAIZ DO SISTEMA DE
 * ARQUIVOS, não para a pasta do HTML. O arquivo não existe lá, e toda imagem
 * aparece quebrada. No desktop, com o projeto servido por HTTP, o mesmo
 * arquivo funcionava — por isso o defeito só aparecia no celular.
 *
 * A correção é embutir cada imagem como data URI. A trava no fim do script
 * garante que nenhuma referência externa sobreviva: se sobrar uma, o build
 * falha em vez de gerar um arquivo que só quebra na frente do cliente.
 * ---------------------------------------------------------------------------
 *
 * Roda depois do build de demonstração (vite.demo.config.ts), que empacota
 * tudo num bundle IIFE — módulo ES não executa a partir de file://.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const B = '.demo-build/';
let html = readFileSync(B + 'index.html', 'utf8');
let css = readFileSync(B + 'style.css', 'utf8');
let js = readFileSync(B + 'app.js', 'utf8');

const TIPOS = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

/** Lista recursivamente os arquivos de uma pasta do build. */
function listar(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    return statSync(caminho).isDirectory() ? listar(caminho) : [caminho];
  });
}

// Fontes -> data: URI, para o arquivo não depender de nada externo.
for (const arq of ['fonts/fraunces-latin-var.woff2', 'fonts/inter-latin-var.woff2']) {
  const b64 = readFileSync(B + arq).toString('base64');
  const antes = css.length;
  css = css.replaceAll(`/${arq}`, `data:font/woff2;base64,${b64}`);
  if (css.length === antes) throw new Error(`não encontrou a referência à fonte ${arq} no CSS`);
}

/*
 * Imagens -> data: URI.
 *
 * Varre as pastas de imagem do build e troca cada caminho absoluto pelo
 * conteúdo em base64, tanto no CSS quanto no bundle. A substituição é feita
 * no JS ANTES de ele entrar no HTML, porque é lá que moram os `src` dos
 * componentes React.
 */
const imagens = [...listar(B + 'arte'), ...listar(B + 'fotos')];
let embutidas = 0;
let bytes = 0;

for (const caminho of imagens) {
  const tipo = TIPOS[extname(caminho).toLowerCase()];
  if (!tipo) continue;

  const url = '/' + relative(B, caminho).split(/[\\/]/).join('/');
  // Só paga o custo do base64 se a imagem for de fato referenciada.
  if (!css.includes(url) && !js.includes(url)) continue;

  const dados = readFileSync(caminho);
  const uri = `data:${tipo};base64,${dados.toString('base64')}`;
  css = css.replaceAll(url, uri);
  js = js.replaceAll(url, uri);
  embutidas++;
  bytes += dados.length;
}

console.log(
  `${embutidas} imagem(ns) embutida(s) — ${(bytes / 1024).toFixed(0)} KB de origem` +
    (imagens.length > embutidas ? `, ${imagens.length - embutidas} não referenciada(s)` : ''),
);

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

/*
 * TRAVA. Se sobrou referência a arquivo externo, o "autocontido" é mentira e o
 * cliente vai abrir o arquivo no celular e ver um buraco. Falhar aqui é muito
 * mais barato do que descobrir na reunião.
 */
const proibidos = [
  'href="/style.css"',
  'src="/app.js"',
  '/fonts/',
  '/favicon.svg',
  '"/arte/',
  '"/fotos/',
  "'/arte/",
  "'/fotos/",
  'url(/arte/',
  'url(/fotos/',
];
for (const proibido of proibidos) {
  if (html.includes(proibido)) {
    throw new Error(
      `sobrou referência externa: ${proibido}\n` +
        'O arquivo não é autocontido e vai quebrar aberto por file://.',
    );
  }
}

mkdirSync('demo', { recursive: true });
const saida = 'demo/rizzit-DEMO.html';
writeFileSync(saida, html);

const kb = html.length / 1024;
console.log(`${saida} — ${kb.toFixed(0)} KB, sem dependência externa`);

/*
 * O arquivo trafega por WhatsApp e e-mail. Acima de ~8 MB começa a esbarrar em
 * limite de anexo e a demorar para abrir em 4G; o aviso existe para a gente
 * perceber isso antes do cliente.
 */
if (kb > 8 * 1024) {
  console.warn(
    `\n⚠ ${(kb / 1024).toFixed(1)} MB é grande para mandar por WhatsApp.\n` +
      '  Reduza a resolução dos originais em fotos-originais/ e rode npm run imagens.',
  );
}
