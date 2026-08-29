import { site, ehPendencia } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';

/**
 * Só perguntas que dá para responder com dado confirmado — onde fica, como é o
 * atendimento, como agendar. Nenhuma resposta clínica, nenhuma orientação de
 * tratamento, nenhum diagnóstico: o site não pode sugerir conduta.
 *
 * Onde a resposta depende de dado que não temos, a pergunta continua na lista
 * com a parte que sabemos e um marcador de pendência no lugar do resto.
 *
 * Usa <details>/<summary> nativos: acessíveis por teclado e funcionam sem
 * nenhum JavaScript de acordeão.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-white py-secao" aria-labelledby="titulo-faq">
      <div className="container-conteudo">
        <div className="max-w-prosa">
        <TituloSecao etiqueta="Dúvidas frequentes" id="titulo-faq">
          Perguntas que a recepção mais ouve
        </TituloSecao>

          <ul className="border-t border-pedra/30">
          {site.faq.map((item) => (
            <li key={item.pergunta} className="border-b border-pedra/30">
              <details className="group">
                <summary className="alvo-toque w-full cursor-pointer list-none justify-between gap-4 py-5 text-left font-display text-h3 font-semibold text-verde marker:content-none">
                  <span>{item.pergunta}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ocre transition-transform group-open:rotate-45"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <div className="pb-6 pr-8">
                  <p className="text-base text-tinta">{item.resposta}</p>
                  {ehPendencia(item.pendencia) ? (
                    <Pendente className="mt-4">{item.pendencia}</Pendente>
                  ) : null}
                </div>
              </details>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
