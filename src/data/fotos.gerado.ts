/*
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

export const fotosGeradas: Record<string, FotoGerada | undefined> = {};

/** Imagem de compartilhamento, quando já foi gerada. */
export const imagemCompartilhamento: { caminho: string; largura: number; altura: number } | null =
  null;
