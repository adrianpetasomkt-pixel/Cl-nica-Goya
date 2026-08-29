/**
 * Cinco estrelas cheias representando a nota 5,0 do perfil no Google.
 * Puramente visual: `aria-hidden`, porque a nota já é dita em texto ao lado.
 */
export function Estrelas({
  tamanho = 20,
  className = 'text-ocre',
}: {
  tamanho?: number;
  /** A cor vem do contexto: `text-ocre` em fundo claro, `text-ocre-claro` em fundo escuro. */
  className?: string;
}) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
          <path
            d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5l1.1-6.47-4.69-4.58 6.5-.95L12 2.6Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}
