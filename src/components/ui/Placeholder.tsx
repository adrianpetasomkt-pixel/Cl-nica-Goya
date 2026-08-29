/**
 * Espaço reservado para imagem que ainda não temos.
 *
 * Nunca usar foto de banco de imagens genérica de dentista sorrindo: o
 * briefing proíbe, e ela destruiria a credibilidade que as 1.352 avaliações
 * construíram. O espaço fica reservado e evidente.
 *
 * `width`/`height` são obrigatórios para reservar a caixa e não gerar layout
 * shift quando a foto real entrar.
 */
type Props = {
  /** Descreve a foto que deve entrar aqui. Vira o rótulo acessível. */
  descricao: string;
  marcador: string;
  width: number;
  height: number;
  className?: string;
  /** Para uso sobre superfície escura (`verde` ou `tinta`). */
  escuro?: boolean;
};

const TRAMA_CLARA =
  'border-pedra bg-[repeating-linear-gradient(135deg,transparent,transparent_9px,rgba(99,94,84,0.10)_9px,rgba(99,94,84,0.10)_18px)]';
const TRAMA_ESCURA =
  'border-areia/60 bg-[repeating-linear-gradient(135deg,transparent,transparent_9px,rgba(246,241,231,0.14)_9px,rgba(246,241,231,0.14)_18px)]';

export function Placeholder({
  descricao,
  marcador,
  width,
  height,
  className = '',
  escuro = false,
}: Props) {
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto: ${descricao}. Imagem ainda não fornecida pela clínica.`}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-6 text-center ${
        escuro ? TRAMA_ESCURA : TRAMA_CLARA
      } ${className}`}
    >
      <span className={`etiqueta ${escuro ? 'text-ocre-claro' : 'text-pedra'}`}>Foto pendente</span>
      <span
        className={`max-w-prosa break-words font-mono text-sm ${escuro ? 'text-areia' : 'text-tinta'}`}
      >
        {marcador}
      </span>
      <span className={`text-sm ${escuro ? 'text-areia/80' : 'text-pedra'}`}>
        {descricao} — {width}×{height}px
      </span>
    </div>
  );
}
