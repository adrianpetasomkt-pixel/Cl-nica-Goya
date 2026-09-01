#!/usr/bin/env node
/*
 * Verifica os contrastes da paleta (tailwind.config.js) contra a WCAG 2.1.
 *
 *   npm run contraste
 *
 * Existe porque "parece legível" não é critério. Cada par abaixo é um uso real
 * na página; se algum reprovar, o build de confiança do site cai junto.
 * Sai com código 1 se qualquer par reprovar, para poder entrar em CI.
 */
const hex = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const linear = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const luminancia = (h) => {
  const [r, g, b] = hex(h).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const razao = (a, b) => {
  const l1 = luminancia(a);
  const l2 = luminancia(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const P = {
  tinta: '#14181B',
  noite: '#0E1417',
  petroleo: '#123038',
  bronze: '#8A5E2A',
  champanhe: '#E0B87C',
  osso: '#F5F2EC',
  pedra: '#6B675F',
  branco: '#FFFFFF',
};

/** [frente, fundo, mínimo exigido, onde é usado] */
const PARES = [
  ['tinta', 'osso', 7, 'corpo de texto sobre o fundo da página'],
  ['petroleo', 'osso', 4.5, 'títulos de seção'],
  ['bronze', 'osso', 4.5, 'etiquetas e acento sobre fundo claro'],
  ['branco', 'bronze', 4.5, 'texto do botão primário'],
  ['pedra', 'osso', 4.5, 'texto de apoio'],
  ['champanhe', 'noite', 4.5, 'acento sobre a superfície escura'],
  ['champanhe', 'petroleo', 4.5, 'acento sobre o institucional escuro'],
  ['osso', 'noite', 7, 'texto sobre a superfície escura'],
  ['osso', 'petroleo', 7, 'texto sobre o institucional escuro'],
  ['champanhe', 'noite', 3, 'contorno de foco sobre escuro'],
];

let falhou = false;
for (const [frente, fundo, minimo, onde] of PARES) {
  const r = razao(P[frente], P[fundo]);
  const ok = r >= minimo;
  if (!ok) falhou = true;
  console.log(
    `${ok ? '  ok  ' : ' FALHA'} ${frente.padEnd(10)} sobre ${fundo.padEnd(10)} ` +
      `${r.toFixed(2).padStart(5)}:1  (mínimo ${minimo})  — ${onde}`,
  );
}

if (falhou) {
  console.error('\nAlgum par reprovou. Ajuste a paleta em tailwind.config.js.');
  process.exit(1);
}
console.log('\nTodos os pares em uso passam na WCAG 2.1 AA.');
