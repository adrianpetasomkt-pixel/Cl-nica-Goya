import { site, ehPendencia } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { Revelar } from './ui/Revelar';

/**
 * Dúvidas.
 *
 * `<details>`/`<summary>` nativos: acessíveis de fábrica, funcionam sem
 * JavaScript e custam zero. Uma sanfona feita à mão aqui só adicionaria bug de
 * teclado.
 *
 * Nenhuma resposta clínica. As três primeiras perguntas têm resposta porque o
 * dado está confirmado; as duas últimas mostram a pendência em vez de uma
 * resposta plausível.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-osso py-secao" aria-labelledby="titulo-faq">
      <div className="container-conteudo max-w-3xl">
        <Revelar>
          <TituloSecao etiqueta="Dúvidas" id="titulo-faq">
            Perguntas frequentes
          </TituloSecao>
        </Revelar>

        <Revelar atraso={100}>
          <div className="border-t border-linha">
            {site.faq.map((item) => (
              <details key={item.pergunta} className="group border-b border-linha">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-h3 font-semibold text-petroleo marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-bronze transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6">
                  <p className="max-w-prosa text-base text-tinta">{item.resposta}</p>
                  {ehPendencia(item.pendencia) ? (
                    <Pendente className="mt-4">{item.pendencia}</Pendente>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
