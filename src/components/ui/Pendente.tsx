/**
 * Bloco de dado ainda não confirmado pelo cliente.
 *
 * É deliberadamente feio: fundo tramado, borda tracejada e etiqueta em caixa
 * alta. Ele é um andaime e precisa parecer um andaime — ninguém pode publicar
 * o site achando que isto é conteúdo final. Ver DESIGN.md, seção 7.
 *
 * Tem duas versões porque a página tem superfícies claras e escuras, e um
 * marcador ilegível é um marcador que não cumpre a função: `escuro` inverte
 * texto, borda e trama para uso sobre `verde` ou `tinta`.
 */
type Props = {
  children: string;
  id?: string;
  className?: string;
  escuro?: boolean;
};

const TRAMA_CLARA =
  'bg-[repeating-linear-gradient(135deg,transparent,transparent_7px,rgba(99,94,84,0.09)_7px,rgba(99,94,84,0.09)_14px)]';
const TRAMA_ESCURA =
  'bg-[repeating-linear-gradient(135deg,transparent,transparent_7px,rgba(246,241,231,0.14)_7px,rgba(246,241,231,0.14)_14px)]';

export function Pendente({ children, id, className = '', escuro = false }: Props) {
  return (
    <div
      id={id}
      role="note"
      className={`rounded border-2 border-dashed p-4 ${
        escuro ? `border-areia/60 ${TRAMA_ESCURA}` : `border-pedra ${TRAMA_CLARA}`
      } ${className}`}
    >
      <span className={`etiqueta mb-1 block ${escuro ? 'text-ocre-claro' : 'text-pedra'}`}>
        A confirmar com a clínica
      </span>
      <span
        className={`block break-words font-mono text-sm ${escuro ? 'text-areia' : 'text-tinta'}`}
      >
        {children}
      </span>
    </div>
  );
}
