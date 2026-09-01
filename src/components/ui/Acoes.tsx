import type { ReactNode } from 'react';
import { site, ehPendencia } from '../../data/site';

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
  texto:
    'alvo-toque gap-2 font-semibold text-bronze underline underline-offset-4 transition-colors hover:text-tinta',
};

/**
 * CTA de ligação. O telefone é dado confirmado por cinco fontes, então este é
 * sempre um link `tel:` real — abre o discador no celular.
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
      /* Nome acessível que contém as duas variantes de rótulo usadas no
         header ("Ligar" e o número completo). WCAG 2.5.3. */
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
 * O número é uma PRESUNÇÃO, não um dado confirmado: o telefone público da
 * clínica é celular, o que torna o WhatsApp plausível, mas ninguém confirmou
 * que ele atende por lá. O link fica ativo — a demonstração precisa funcionar
 * no celular do cliente — e a presunção está registrada em `site.ts` e sai no
 * relatório `npm run pendencias`.
 *
 * Se algum dia o número virar `{{PENDENTE}}`, este componente degrada sozinho
 * para um botão desabilitado, em vez de gerar um link quebrado silencioso.
 */
export function AcaoWhatsApp({
  variante = 'secundario',
  rotulo,
  className = '',
}: {
  variante?: Variante;
  rotulo?: ReactNode;
  className?: string;
}) {
  const whatsapp = site.contato.whatsapp;

  if (ehPendencia(whatsapp)) {
    return (
      <button
        type="button"
        aria-disabled="true"
        className={`${CLASSES[variante]} cursor-not-allowed opacity-60 ${className}`}
      >
        <IconeWhatsApp />
        <span>{rotulo ?? 'Falar no WhatsApp'}</span>
        <span className="sr-only">— indisponível, número ainda não informado</span>
      </button>
    );
  }

  return (
    <a
      href={`https://wa.me/${whatsapp.valor}`}
      className={`${CLASSES[variante]} ${className}`}
      rel="noopener"
      target="_blank"
    >
      <IconeWhatsApp />
      <span>{rotulo ?? 'Falar no WhatsApp'}</span>
    </a>
  );
}

export { IconeWhatsApp };
