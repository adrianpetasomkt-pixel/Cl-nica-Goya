#!/usr/bin/env node
/*
 * Pipeline de fotos: pega os originais em fotos-originais/ e gera as versões
 * responsivas que o site usa, mais a imagem de compartilhamento.
 *
 *   npm run imagens
 *
 * Entrada:  fotos-originais/<nome>.(jpg|jpeg|png|webp)
 * Saída:    public/fotos/<nome>-<largura>.webp  e  .jpg
 *           public/fotos/og.jpg  (1200x630, a partir de FOTO_OG)
 *           src/data/fotos.gerado.ts  (manifesto tipado que os componentes leem)
 *
 * O manifesto é gerado, não editado à mão: rodar este script é o único passo
 * necessário para as fotos entrarem no site. O texto alternativo NÃO vem daqui
 * — ele é conteúdo e vive em src/data/site.ts.
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, parse } from 'node:path';

const ENTRADA = 'fotos-originais';
const SAIDA = 'public/fotos';
const MANIFESTO = 'src/data/fotos.gerado.ts';
const LARGURAS = [480, 768, 1200, 1600];
/** Foto usada na imagem de compartilhamento (Open Graph / WhatsApp). */
const FOTO_OG = 'recepcao';

/*
 * Correção tonal conservadora. As fotos vieram do perfil do Google Business,
 * claras e um pouco lavadas. `normalise` recupera a faixa tonal, `modulate`
 * devolve um pouco de saturação e `sharpen` compensa a perda do
 * redimensionamento. Nada agressivo: o objetivo é a foto parecer ela mesma num
 * dia bom, não uma foto tratada.
 *
 * Isto NÃO inventa detalhe. Se o original for pequeno ou desfocado, o
 * resultado continua pequeno ou desfocado — a régua está no arquivo de origem.
 */
const tratar = (img) =>
  img
    .normalise({ lower: 1, upper: 99 })
    .modulate({ saturation: 1.06, brightness: 0.99 })
    .sharpen({ sigma: 0.7, m1: 0.4, m2: 0.9 });

if (!existsSync(ENTRADA)) {
  console.error(`Pasta ${ENTRADA}/ não existe. Crie-a e coloque as fotos originais lá.`);
  process.exit(1);
}

const originais = readdirSync(ENTRADA).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

if (originais.length === 0) {
  console.log(`Nenhuma foto em ${ENTRADA}/. O site segue com os espaços reservados.`);
  writeFileSync(MANIFESTO, manifesto({}));
  process.exit(0);
}

rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(SAIDA, { recursive: true });

const gerado = {};

for (const arquivo of originais) {
  const nome = parse(arquivo).name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const origem = join(ENTRADA, arquivo);
  const meta = await sharp(origem).metadata();
  const larguraMax = meta.width ?? 0;

  /*
   * Nunca ampliar: upscale não cria detalhe, só borra e engorda o arquivo.
   * A largura nativa do original entra sempre na lista — sem isso, um original
   * de 680px só geraria a variante de 480px e jogaria fora resolução que existe.
   */
  const alvos = [...new Set([...LARGURAS.filter((l) => l < larguraMax), larguraMax])]
    .filter((l) => l > 0)
    .sort((a, b) => a - b);

  const webp = [];
  const jpeg = [];
  for (const largura of alvos) {
    const base = tratar(sharp(origem).resize({ width: largura, withoutEnlargement: true }));
    const cw = `${SAIDA}/${nome}-${largura}.webp`;
    const cj = `${SAIDA}/${nome}-${largura}.jpg`;
    await base.clone().webp({ quality: 82, effort: 6 }).toFile(cw);
    await base.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(cj);
    webp.push({ largura, caminho: `/fotos/${nome}-${largura}.webp` });
    jpeg.push({ largura, caminho: `/fotos/${nome}-${largura}.jpg` });
  }

  const maior = alvos[alvos.length - 1];
  const proporcao = (meta.height ?? 1) / (meta.width ?? 1);
  gerado[nome] = {
    largura: maior,
    altura: Math.round(maior * proporcao),
    webp,
    jpeg,
    fallback: `/fotos/${nome}-${maior}.jpg`,
  };

  const aviso = larguraMax < 1200 ? `  ⚠ original tem só ${larguraMax}px de largura` : '';
  console.log(`✔ ${nome}: ${alvos.join(', ')}px (original ${larguraMax}×${meta.height})${aviso}`);
}

/*
 * Imagem de compartilhamento, na proporção 1,91:1 que WhatsApp e redes usam.
 * O ideal é 1200x630, mas isso exige um original com pelo menos 1200px de
 * largura — ampliar entregaria uma prévia borrada. Sem essa resolução, cai
 * para 600x315, que é o mínimo aceito, e avisa.
 */
if (gerado[FOTO_OG]) {
  const origem = join(ENTRADA, originais.find((f) => parse(f).name.toLowerCase().replace(/[^a-z0-9-]/g, '-') === FOTO_OG));
  const larguraOrigem = (await sharp(origem).metadata()).width ?? 0;
  const [ogL, ogA] = larguraOrigem >= 1200 ? [1200, 630] : [600, 315];
  await tratar(sharp(origem).resize(ogL, ogA, { fit: 'cover', position: 'centre', withoutEnlargement: false }))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${SAIDA}/og.jpg`);
  gerado.__og = { caminho: '/fotos/og.jpg', largura: ogL, altura: ogA };
  console.log(`✔ og.jpg (${ogL}×${ogA}) a partir de ${FOTO_OG}`);
  if (ogL < 1200) {
    console.log(`  ⚠ "${FOTO_OG}" tem ${larguraOrigem}px de largura; para o og.jpg ideal de 1200×630, mande o original com 1200px ou mais.`);
  }
} else {
  console.log(`ℹ sem imagem de compartilhamento: nenhuma foto chamada "${FOTO_OG}" em ${ENTRADA}/`);
}

writeFileSync(MANIFESTO, manifesto(gerado));
console.log(`\n${MANIFESTO} atualizado. Rode "npm run build".`);

function manifesto(dados) {
  const { __og, ...fotos } = dados;
  return `/*
 * ARQUIVO GERADO por scripts/imagens.mjs — não editar à mão.
 * Rode "npm run imagens" depois de mexer em fotos-originais/.
 *
 * Só dimensões e caminhos moram aqui. O texto alternativo é conteúdo e fica
 * em src/data/site.ts.
 */

export type FotoGerada = {
  largura: number;
  altura: number;
  webp: { largura: number; caminho: string }[];
  jpeg: { largura: number; caminho: string }[];
  fallback: string;
};

export const fotosGeradas: Record<string, FotoGerada | undefined> = ${JSON.stringify(fotos, null, 2)};

/** Imagem de compartilhamento, quando já foi gerada. */
export const imagemCompartilhamento: { caminho: string; largura: number; altura: number } | null =
  ${__og ? JSON.stringify(__og, null, 2) : 'null'};
`;
}
