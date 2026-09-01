/// <reference types="vite/client" />

/**
 * `true` apenas no build de demonstração (`npm run demo`).
 *
 * Injetado por `define` nos dois configs do Vite. Serve para a página saber
 * que está sendo apresentada a um cliente e não publicada: liga a faixa de
 * aviso e troca os espaços reservados do modo "andaime" pelo modo "vitrine".
 */
declare const __MODO_DEMO__: boolean;
