import { useState } from 'react';
import { site, ehPresuncao } from '../data/site';

/**
 * Faixa de demonstração — só aparece no build `npm run demo`.
 *
 * Existe para que ninguém, em nenhum momento da apresentação, confunda esta
 * página com o site publicado.
 *
 * É uma LINHA SÓ, fechada por padrão. A versão anterior era um parágrafo
 * fixo que, num iPhone, comia um terço da primeira dobra — justamente a parte
 * que a demonstração existe para mostrar. O aviso precisa estar sempre
 * visível; o detalhe do aviso, não.
 *
 * Fica no fim do DOM (e não no topo) porque é `fixed`: a posição no documento
 * não muda onde ela aparece, e assim ela não entra antes do conteúdo na ordem
 * de leitura de um leitor de tela.
 */
export function FaixaDemo() {
  const [aberta, setAberta] = useState(false);

  if (!site.modoDemo) return null;

  const whatsapp = site.contato.whatsapp;
  const presumido = ehPresuncao(whatsapp) ? whatsapp.motivo : null;

  return (
    <aside
      aria-label="Aviso sobre esta demonstração"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className="sobre-escuro fixed inset-x-0 bottom-0 z-[45] border-t border-champanhe/25 bg-noite/95 backdrop-blur"
    >
      <div className="container-conteudo">
        <button
          type="button"
          onClick={() => setAberta((v) => !v)}
          aria-expanded={aberta}
          aria-controls="detalhe-demo"
          className="flex min-h-[2.75rem] w-full items-center justify-between gap-3 py-2 text-left"
        >
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="etiqueta shrink-0 text-champanhe">Demonstração</span>
            <span className="truncate text-[0.72rem] text-osso/60">
              proposta visual · nada inventado
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-champanhe transition-transform duration-200 ${
              aberta ? 'rotate-180' : ''
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <div id="detalhe-demo" hidden={!aberta} className="pb-3">
          <p className="text-[0.72rem] leading-relaxed text-osso/70">
            Proposta visual para a {site.identidade.nomeCompleto}. Endereço, telefone e Instagram
            são dados públicos verificados. Onde há marcação, o conteúdo ainda vem da clínica —
            nada foi inventado.
          </p>
          {presumido ? (
            <p className="mt-2 text-[0.72rem] leading-relaxed text-osso/50">
              O botão de WhatsApp usa o telefone público da clínica: {presumido}.
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
