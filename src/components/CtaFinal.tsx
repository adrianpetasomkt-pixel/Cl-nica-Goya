import { site } from '../data/site';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';
import { Revelar } from './ui/Revelar';

/**
 * Chamada final.
 *
 * É o único ponto da página onde os dois canais aparecem lado a lado com o
 * mesmo peso. Nas outras seções o CTA tem contexto — aqui ele É o contexto.
 *
 * Sem gatilho de escassez, sem contagem regressiva, sem "vagas limitadas".
 * Além de barato, isso é vedado em publicidade odontológica.
 */
export function CtaFinal() {
  return (
    <section
      className="sobre-escuro relative isolate overflow-hidden bg-noite py-secao text-osso"
      aria-labelledby="titulo-cta"
    >
      <img
        src="/arte/atmosfera-cta.jpg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={900}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noite/70" />

      <div className="container-conteudo">
        <Revelar>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="regua-clara mb-8" aria-hidden="true" />
            <h2 id="titulo-cta" className="text-h2 font-semibold text-osso">
              Agende sua avaliação na Rizzit
            </h2>
            <p className="mt-5 max-w-prosa text-lead text-osso/85">
              {site.endereco.logradouro} — {site.endereco.bairro}, {site.endereco.cidade}.
            </p>

            <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <AcaoWhatsApp variante="primario" rotulo="Agendar pelo WhatsApp" />
              <AcaoTelefone variante="secundario-escuro" />
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
