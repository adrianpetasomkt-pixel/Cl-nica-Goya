import { site, ehPendencia } from '../data/site';

/**
 * Botão flutuante de WhatsApp, presente em toda a rolagem.
 *
 * O número ainda não foi informado (o telefone confirmado é fixo). Enquanto
 * for pendência, o botão fica visivelmente marcado como indisponível, com
 * `aria-disabled` e rótulo explícito — nunca um link que não leva a lugar
 * nenhum. Basta preencher `contato.whatsapp` em src/data/site.ts para ele
 * virar um link real.
 */
export function WhatsAppFlutuante() {
  const numero = site.contato.whatsapp;
  const pendente = ehPendencia(numero);

  const icone = (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm5.1 14.1c-.24.67-1.4 1.28-1.94 1.32-.5.04-.98.22-3.3-.69-2.78-1.1-4.53-3.94-4.67-4.13-.13-.19-1.1-1.47-1.1-2.8 0-1.33.7-1.98.94-2.25a1 1 0 0 1 .72-.34h.52c.17 0 .39-.06.6.46l.83 2c.07.14.11.3.02.48l-.3.46-.44.48c-.14.14-.29.3-.12.58.16.28.73 1.2 1.56 1.95 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07l.87-1c.2-.24.37-.18.62-.09l1.77.84c.26.12.43.19.5.29.06.1.06.58-.18 1.24Z"
        fill="currentColor"
      />
    </svg>
  );

  if (pendente) {
    return (
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        <span className="etiqueta rounded border border-pedra bg-areia px-2 py-1 text-pedra shadow-none">
          WhatsApp a confirmar
        </span>
        <button
          type="button"
          aria-disabled="true"
          aria-label="Falar no WhatsApp — indisponível: o número de WhatsApp da clínica ainda não foi informado. Use o telefone (65) 3322-3264."
          className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full border-2 border-dashed border-pedra bg-areia text-pedra"
        >
          {icone}
        </button>
      </div>
    );
  }

  return (
    <a
      href={`https://wa.me/${numero.replace(/\D/g, '')}`}
      rel="noopener"
      aria-label={`Falar com a ${site.identidade.nomeFantasia} no WhatsApp`}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-verde text-areia transition-colors hover:bg-ocre"
    >
      {icone}
    </a>
  );
}
