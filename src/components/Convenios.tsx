import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { AcaoTelefone } from './ui/Acoes';

/**
 * Confirmado: a clínica atende "por convênio e particular". QUAIS convênios,
 * não sabemos — e nome de convênio é exatamente o tipo de dado que não se
 * chuta. Estrutura pronta para lista ou logos; hoje, pendência explícita.
 */
export function Convenios() {
  const { lista, pendencia } = site.convenios;

  return (
    <section id="convenios" className="bg-areia py-secao" aria-labelledby="titulo-convenios">
      <div className="container-conteudo">
        <TituloSecao etiqueta="Formas de atendimento" id="titulo-convenios">
          Convênio e particular
        </TituloSecao>

        {lista.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {lista.map((c) => (
              <li
                key={c.nome}
                className="flex min-h-[5rem] items-center justify-center rounded border border-pedra/40 bg-white p-4 text-center font-semibold text-verde"
              >
                {c.nome}
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-prosa">
            <p className="text-lead text-tinta">
              O atendimento na Goya é feito por convênio e também particular. A lista dos
              convênios aceitos ainda não foi publicada nesta página.
            </p>
            <Pendente className="mt-6">{pendencia}</Pendente>
            <p className="mt-6 text-base text-pedra">
              Para saber se o seu convênio é atendido, ligue para a clínica.
            </p>
            <div className="mt-5">
              <AcaoTelefone variante="secundario" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
