import { site } from '../../data/site';

/*
 * Bloco de dado que a clínica ainda não forneceu.
 *
 * Como o Placeholder, tem dois modos:
 *
 *   andaime  (produção)     — feio de propósito. Ninguém publica sem ver.
 *   vitrine  (demonstração) — discreto, ao lado do conteúdo, sem roubar a cena
 *                             do que está pronto. Continua dizendo que é
 *                             pendência: some o jargão, não some o aviso.
 *
 * As duas polaridades (claro/escuro) existem porque a página tem superfícies
 * claras e escuras, e um marcador ilegível é um marcador que não cumpre a
 * função.
 */
type Props = {
  children: string;
  id?: string;
  className?: string;
  escuro?: boolean;
  /** Rótulo do modo vitrine. O padrão serve para quase tudo. */
  rotulo?: string;
};

export function Pendente({
  children,
  id,
  className = '',
  escuro = false,
  rotulo = 'A preencher com os dados oficiais',
}: Props) {
  if (!site.modoDemo) {
    return (
      <div
        id={id}
        role="note"
        className={`rounded border-2 border-dashed p-4 ${
          escuro ? 'trama-escura border-osso/60' : 'trama-clara border-pedra'
        } ${className}`}
      >
        <span className={`etiqueta mb-1 block ${escuro ? 'text-champanhe' : 'text-pedra'}`}>
          A confirmar com a clínica
        </span>
        <span
          className={`block break-words font-mono text-sm ${escuro ? 'text-osso' : 'text-tinta'}`}
        >
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      id={id}
      role="note"
      className={`rounded border-l-2 py-2 pl-4 ${
        escuro ? 'border-champanhe/60' : 'border-bronze/60'
      } ${className}`}
    >
      <span className={`etiqueta block ${escuro ? 'text-champanhe/85' : 'text-bronze'}`}>
        {rotulo}
      </span>
      <span className={`mt-1 block text-sm ${escuro ? 'text-osso/70' : 'text-pedra'}`}>
        {children.replace(/^\{\{PENDENTE:\s*/, '').replace(/\}\}$/, '')}
      </span>
    </div>
  );
}
