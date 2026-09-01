#!/usr/bin/env node
/*
 * Gera as ARTES CONCEITUAIS do site.
 *
 *   npm run arte   ->  public/arte/*.jpg
 *
 * ---------------------------------------------------------------------------
 * O QUE ISTO É, E O QUE ISTO NÃO É
 *
 * São campos de cor abstratos, gerados por código: gradientes, luz e grão.
 * Servem de atmosfera atrás de texto — hero e CTA final.
 *
 * NÃO são fotos da clínica. NÃO são fotos de banco de imagens. NÃO retratam
 * ambiente, equipamento, profissional ou paciente, e não insinuam nenhum dos
 * quatro. É design gráfico, e é a única categoria de imagem que pode entrar
 * num site de clínica sem que ninguém tenha fotografado a clínica.
 *
 * Quando as fotos reais chegarem, elas NÃO substituem estas artes — as duas
 * coisas convivem. As fotos entram nos espaços reservados (ver <Foto>), a
 * atmosfera continua sendo atmosfera.
 * ---------------------------------------------------------------------------
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SAIDA = 'public/arte';
mkdirSync(SAIDA, { recursive: true });

const NOITE = '#0E1417';
const PETROLEO = '#123038';
const BRONZE = '#8A5E2A';

/**
 * Grão. Sem ele o gradiente vira aquela "bola de luz" de template — e no
 * celular, em tela OLED, gradiente liso em tom escuro mostra banding. O ruído
 * quebra as duas coisas de uma vez.
 */
async function grao(largura, altura, intensidade) {
  const pixels = Buffer.allocUnsafe(largura * altura);
  for (let i = 0; i < pixels.length; i++) pixels[i] = Math.random() * 255;
  return sharp(pixels, { raw: { width: largura, height: altura, channels: 1 } })
    .png()
    .toBuffer()
    .then((buf) =>
      sharp(buf).ensureAlpha(intensidade).png().toBuffer(),
    );
}

/**
 * Um campo de luz: dois focos suaves sobre a base escura, mais uma insinuação
 * de bronze. As posições são fixas (não aleatórias) para o resultado ser
 * reproduzível — arte gerada precisa sair igual em todo build.
 */
function svgAtmosfera(largura, altura, focos) {
  const paradas = focos
    .map(
      (f, i) => `
    <radialGradient id="g${i}" cx="${f.x}" cy="${f.y}" r="${f.r}">
      <stop offset="0%" stop-color="${f.cor}" stop-opacity="${f.opacidade}" />
      <stop offset="100%" stop-color="${f.cor}" stop-opacity="0" />
    </radialGradient>`,
    )
    .join('');

  const camadas = focos
    .map((_, i) => `<rect width="${largura}" height="${altura}" fill="url(#g${i})" />`)
    .join('');

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${PETROLEO}" />
      <stop offset="55%" stop-color="${NOITE}" />
      <stop offset="100%" stop-color="${NOITE}" />
    </linearGradient>${paradas}
  </defs>
  <rect width="${largura}" height="${altura}" fill="url(#base)" />
  ${camadas}
</svg>`);
}

async function gerar(nome, largura, altura, focos) {
  const base = sharp(svgAtmosfera(largura, altura, focos));
  const ruido = await grao(largura, altura, 0.09);

  await base
    .composite([{ input: ruido, blend: 'overlay' }])
    // `blur` mínimo costura o ruído ao gradiente sem lavar a imagem. Acima de
    // ~0.5 o grão some e o banding do gradiente volta a aparecer.
    .blur(0.3)
    .jpeg({ quality: 90, mozjpeg: true, progressive: true })
    .toFile(`${SAIDA}/${nome}.jpg`);

  console.log(`✔ ${SAIDA}/${nome}.jpg  ${largura}×${altura}`);
}

/*
 * Hero. A luz entra pela direita e desce — deixa a esquerda escura, que é
 * exatamente onde o texto do hero fica. A composição serve à tipografia, não
 * o contrário.
 *
 * A proporção é larga (16:9) de propósito. Numa arte mais alta, o
 * `object-cover` do hero corta topo e base em tela de desktop e joga fora
 * justamente o foco de luz — foi o que aconteceu na primeira versão, que
 * chegava chapada na tela.
 *
 * Os focos ficam entre 0,35 e 0,6 da altura pelo mesmo motivo: essa é a faixa
 * que sobrevive ao corte tanto em desktop quanto em celular.
 */
await gerar('atmosfera-hero', 1920, 1080, [
  { x: '0.74', y: '0.38', r: '0.66', cor: '#3E8095', opacidade: 0.78 },
  { x: '0.9', y: '0.62', r: '0.45', cor: BRONZE, opacidade: 0.34 },
  { x: '0.55', y: '0.2', r: '0.4', cor: '#265868', opacidade: 0.4 },
]);

/*
 * CTA final. Luz mais central e mais quente: a seção é curta, o texto é
 * centralizado e o bronze puxa o olho para o botão.
 */
await gerar('atmosfera-cta', 1920, 900, [
  { x: '0.5', y: '0.42', r: '0.62', cor: '#2F6474', opacidade: 0.62 },
  { x: '0.5', y: '0.96', r: '0.5', cor: BRONZE, opacidade: 0.3 },
]);

console.log('\nArtes conceituais geradas. São gráficos, não fotos da clínica.');
