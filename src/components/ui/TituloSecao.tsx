import type { ReactNode } from 'react';

/**
 * Título de seção com a régua ocre — o elemento de assinatura da página.
 * Ver DESIGN.md, seção 5.
 */
type Props = {
  etiqueta?: string;
  children: ReactNode;
  id?: string;
  escuro?: boolean;
};

export function TituloSecao({ etiqueta, children, id, escuro = false }: Props) {
  return (
    <header className="mb-10">
      <span className="regua mb-5" aria-hidden="true" />
      {etiqueta ? (
        <p className={`etiqueta mb-3 ${escuro ? 'text-ocre-claro' : 'text-ocre'}`}>
          {etiqueta}
        </p>
      ) : null}
      <h2 id={id} className={`text-h2 font-semibold ${escuro ? 'text-areia' : 'text-verde'}`}>
        {children}
      </h2>
    </header>
  );
}
