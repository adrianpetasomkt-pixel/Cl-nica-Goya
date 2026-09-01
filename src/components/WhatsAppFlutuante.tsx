import { useEffect, useState } from 'react';
import { site, ehPendencia } from '../data/site';
import { IconeWhatsApp } from './ui/Acoes';

/**
 * Botão flutuante de WhatsApp.
 *
 * Só aparece depois que o visitante passa do hero — no topo o CTA já está na
 * tela, e um botão flutuante sobreposto à primeira dobra é ruído.
 *
 * No celular fica acima da área de gesto do iOS (`safe-area-inset-bottom`),
 * senão a barra de início do iPhone come metade do alvo.
 */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const whatsapp = site.contato.whatsapp;

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.75);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  if (ehPendencia(whatsapp)) return null;

  /*
   * Na demonstração a faixa de aviso ocupa a base da tela. Sem esta folga o
   * botão flutuante cai em cima dela e, no celular, ainda por cima do
   * conteúdo da seção — os dois elementos disputando o mesmo canto.
   */
  const folgaFaixa = site.modoDemo ? '3.25rem' : '0rem';

  return (
    <a
      href={`https://wa.me/${whatsapp.valor}`}
      rel="noopener"
      target="_blank"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      style={{ bottom: `calc(1.25rem + ${folgaFaixa} + env(safe-area-inset-bottom, 0px))` }}
      className={`fixed right-5 z-40 inline-flex min-h-toque items-center gap-2 rounded-full bg-bronze px-4 py-3 font-semibold text-white shadow-lg shadow-noite/30 transition-all duration-300 hover:bg-tinta sm:px-5 sm:py-3.5 ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <IconeWhatsApp />
      <span className="text-sm">Agendar</span>
    </a>
  );
}
