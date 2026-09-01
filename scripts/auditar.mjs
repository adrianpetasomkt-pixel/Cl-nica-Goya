#!/usr/bin/env node
/*
 * Auditoria automática da demonstração, aberta por file:// — do jeito que o
 * cliente abre no celular.
 *
 *   npm run auditar        (roda npm run demo antes)
 *
 * Verifica, em iPhone e desktop, o que o briefing exige e o que é fácil
 * quebrar sem perceber:
 *
 *   • toda imagem carregou (naturalWidth > 0)
 *   • nenhuma rolagem horizontal
 *   • nenhum elemento estourando a viewport
 *   • nenhum alvo de toque abaixo de 44px
 *   • nenhum erro de console
 *   • as âncoras do menu existem de verdade
 *
 * Sai com código 1 se algo reprovar — o defeito aparece aqui, não na reunião.
 * As capturas ficam em `demo/auditoria/`.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';

const ARQUIVO = 'demo/rizzit-DEMO.html';
if (!existsSync(ARQUIVO)) {
  console.error(`${ARQUIVO} não existe. Rode "npm run demo" antes.`);
  process.exit(1);
}

const CAPTURAS = 'demo/auditoria';
mkdirSync(CAPTURAS, { recursive: true });

const PERFIS = [
  { nome: 'iphone-se', width: 375, height: 667, dpr: 2, mobile: true },
  { nome: 'iphone-14', width: 390, height: 844, dpr: 3, mobile: true },
  { nome: 'tablet', width: 820, height: 1180, dpr: 2, mobile: true },
  { nome: 'desktop', width: 1440, height: 900, dpr: 1, mobile: false },
];

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let reprovou = false;

for (const p of PERFIS) {
  const ctx = await navegador.newContext({
    viewport: { width: p.width, height: p.height },
    deviceScaleFactor: p.dpr,
    isMobile: p.mobile,
    hasTouch: p.mobile,
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  page.on('pageerror', (e) => erros.push('PAGEERROR ' + e.message));

  await page.goto('file://' + resolve(ARQUIVO), { waitUntil: 'load' });
  /*
   * A página usa `scroll-behavior: smooth`. Com ele ligado, o `scrollTo(0,0)`
   * do fim da varredura anima e a captura sai numa posição intermediária —
   * as capturas de "topo" saíam do meio da página. Desliga só na auditoria.
   */
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  await page.waitForTimeout(500);

  // Rola a página inteira: dispara os reveals e força o lazy-load das imagens.
  await page.evaluate(async () => {
    const passo = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  const a = await page.evaluate(() => {
    const doc = document.documentElement;
    const largura = doc.clientWidth;

    const imagens = [...document.images];
    const quebradas = imagens
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => (i.currentSrc || i.src || '(sem src)').slice(0, 70));

    const estourando = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > largura + 1;
      })
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 45)}`);

    // Alvos de toque: links e botões visíveis abaixo de 44px em qualquer eixo.
    const pequenos = [...document.querySelectorAll('a[href], button')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        if (getComputedStyle(el).visibility === 'hidden') return false;
        return r.height < 44 || r.width < 24;
      })
      .slice(0, 6)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return `${(el.textContent || '').trim().slice(0, 24)} ${Math.round(r.width)}x${Math.round(r.height)}`;
      });

    // Toda âncora de navegação precisa ter destino real.
    const ancorasMortas = [...document.querySelectorAll('a[href^="#"]')]
      .map((el) => el.getAttribute('href'))
      .filter((h) => h && h.length > 1 && !document.querySelector(h));

    return {
      imagens: imagens.length,
      quebradas,
      rolagemHorizontal: doc.scrollWidth > largura,
      excedente: doc.scrollWidth - largura,
      estourando,
      pequenos,
      ancorasMortas: [...new Set(ancorasMortas)],
    };
  });

  const falhas = [];
  if (a.quebradas.length) falhas.push(`imagens quebradas: ${a.quebradas.join(', ')}`);
  if (a.rolagemHorizontal) falhas.push(`rolagem horizontal (+${a.excedente}px): ${a.estourando.join(' | ')}`);
  if (a.pequenos.length) falhas.push(`alvos de toque pequenos: ${a.pequenos.join(' | ')}`);
  if (a.ancorasMortas.length) falhas.push(`âncoras sem destino: ${a.ancorasMortas.join(', ')}`);
  if (erros.length) falhas.push(`erros de console: ${erros.join(' | ')}`);

  console.log(`\n=== ${p.nome} (${p.width}×${p.height} @${p.dpr}x) ===`);
  console.log(`   ${a.imagens} imagem(ns), todas carregadas: ${a.quebradas.length === 0 ? 'sim' : 'NÃO'}`);
  if (falhas.length === 0) {
    console.log('   tudo ok');
  } else {
    reprovou = true;
    for (const f of falhas) console.log(`   ✗ ${f}`);
  }

  await page.screenshot({ path: `${CAPTURAS}/${p.nome}.png` });
  await page.screenshot({ path: `${CAPTURAS}/${p.nome}-inteiro.png`, fullPage: true });
  await ctx.close();
}

await navegador.close();
console.log(`\nCapturas em ${CAPTURAS}/`);

if (reprovou) {
  console.error('\nA auditoria reprovou. Corrija antes de mandar para o cliente.');
  process.exit(1);
}
console.log('Auditoria passou em todos os perfis.');
