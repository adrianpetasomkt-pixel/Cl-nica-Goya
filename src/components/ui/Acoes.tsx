import { useId } from 'react';
import type { ReactNode } from 'react';
import { site, ehPendencia } from '../../data/site';
import { Pendente } from './Pendente';

/** Ícone de telefone. Decorativo — o rótulo textual carrega o significado. */
function IconeTelefone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconeWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm5.1 14.1c-.24.67-1.4 1.28-1.94 1.32-.5.04-.98.22-3.3-.69-2.78-1.1-4.53-3.94-4.67-4.13-.13-.19-1.1-1.47-1.1-2.8 0-1.33.7-1.98.94-2.25a1 1 0 0 1 .72-.34h.52c.17 0 .39-.06.6.46l.83 2c.07.14.11.3.02.48l-.3.46-.44.48c-.14.14-.29.3-.12.58.16.28.73 1.2 1.56 1.95 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07l.87-1c.2-.24.37-.18.62-.09l1.77.84c.26.12.43.19.5.29.06.1.06.58-.18 1.24Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Variante = 'primario' | 'secundario' | 'secundario-escuro' | 'texto';

const CLASSES: Record<Variante, string> = {
  primario: 'btn-primario',
  secundario: 'btn-secundario',
  'secundario-escuro': 'btn-secundario-escuro',
  texto: 'alvo-toque gap-2 font-semibold text-verde underline underline-offset-4 hover:text-ocre transition-colors',
};

/**
 * CTA de ligação. O telefone é dado confirmado, então este é sempre um link
 * `tel:` real — abre o discador no celular.
 */
export function AcaoTelefone({
  variante = 'primario',
  rotulo,
  className = '',
}: {
  variante?: Variante;
  /** Rótulo visível. O nome acessível do link é sempre o número completo. */
  rotulo?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={site.contato.telefone.href}
      /* Nome acessível idêntico ao rótulo visível padrão, e que contém as
         duas variantes usadas no header ("Ligar" e o número). WCAG 2.5.3. */
      aria-label={`Ligar ${site.contato.telefone.exibicao}`}
      className={`${CLASSES[variante]} ${className}`}
    >
      <IconeTelefone />
      <span>{rotulo ?? `Ligar ${site.contato.telefone.exibicao}`}</span>
    </a>
  );
}

/**
 * CTA de WhatsApp.
 *
 * O número de WhatsApp NÃO está confirmado — o telefone que temos é fixo.
 * Enquanto for pendência, este componente renderiza um botão desabilitado com
 * o marcador visível ao lado, nunca um link quebrado silencioso. Quando o
 * número chegar em `src/data/site.ts`, ele vira um link `wa.me` sozinho, sem
 * mudar nenhum componente.
 */
export function AcaoWhatsApp({
  variante = 'secundario',
  rotulo,
  className = '',
  escuro = false,
}: {
  variante?: Variante;
  rotulo?: ReactNode;
  className?: string;
  /** Para uso sobre superfície escura — o marcador precisa continuar legível. */
  escuro?: boolean;
}) {
  const idNota = useId();
  const numero = site.contato.whatsapp;

  if (!ehPendencia(numero)) {
    return (
      <a
        href={`https://wa.me/${numero.replace(/\D/g, '')}`}
        className={`${CLASSES[variante]} ${className}`}
        rel="noopener"
      >
        <IconeWhatsApp />
        <span>{rotulo ?? 'Falar no WhatsApp'}</span>
      </a>
    );
  }

  return (
    <div className={`flex w-fit max-w-full flex-col items-start gap-3 ${className}`}>
      <button
        type="button"
        aria-disabled="true"
        aria-describedby={idNota}
        className={`${CLASSES[variante]} cursor-not-allowed opacity-60`}
      >
        <IconeWhatsApp />
        <span>{rotulo ?? 'Falar no WhatsApp'}</span>
        <span className="sr-only">— indisponível, número ainda não informado</span>
      </button>
      <Pendente id={idNota} escuro={escuro} className="max-w-prosa">
        {numero}
      </Pendente>
    </div>
  );
}
