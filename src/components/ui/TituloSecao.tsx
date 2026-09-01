import type { ReactNode } from 'react';

/**
 * Título de seção com o filete de bronze — o elemento de assinatura da página.
 * Ver DESIGN.md.
 */
type Props = {
  etiqueta?: string;
  children: ReactNode;
  id?: string;
  escuro?: boolean;
  /** Centraliza o bloco. Usado no CTA final. */
  centro?: boolean;
};

export function TituloSecao({ etiqueta, children, id, escuro = false, centro = false }: Props) {
  return (
    <header className={`mb-10 ${centro ? 'flex flex-col items-center text-center' : ''}`}>
      <span className={escuro ? 'regua-clara mb-6' : 'regua mb-6'} aria-hidden="true" />
      {etiqueta ? (
        <p className={`etiqueta mb-4 ${escuro ? 'text-champanhe' : 'text-bronze'}`}>{etiqueta}</p>
      ) : null}
      <h2
        id={id}
        className={`text-h2 font-semibold ${escuro ? 'text-osso' : 'text-petroleo'}`}
      >
        {children}
      </h2>
    </header>
  );
}
