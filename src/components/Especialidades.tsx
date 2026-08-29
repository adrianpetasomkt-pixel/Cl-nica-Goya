import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { AcaoTelefone } from './ui/Acoes';

/**
 * O texto institucional confirma que a clínica atende "diversas especialidades
 * odontológicas", mas não diz quais. Enquanto a lista real não chegar, a seção
 * NÃO fica vazia nem inventa cards: ela explica o que se sabe, mostra a
 * pendência e oferece o caminho de contato.
 */
export function Especialidades() {
  const { lista, pendencia } = site.especialidades;

  return (
    <section id="especialidades" className="bg-areia py-secao" aria-labelledby="titulo-especialidades">
      <div className="container-conteudo">
        <TituloSecao etiqueta="O que a clínica atende" id="titulo-especialidades">
          Diversas especialidades odontológicas
        </TituloSecao>

        {lista.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((esp) => (
              <li key={esp.nome} className="rounded border border-pedra/40 bg-white p-6">
                <span className="regua mb-4 !w-8" aria-hidden="true" />
                <h3 className="text-h3 font-semibold text-verde">{esp.nome}</h3>
                <p className="mt-2 text-sm text-pedra">{esp.descricao}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-prosa">
            <p className="text-lead text-tinta">
              A clínica atende em diversas áreas da odontologia, por convênio e particular. A
              relação completa das especialidades ainda não foi publicada nesta página.
            </p>
            <Pendente className="mt-6">{pendencia}</Pendente>
            <p className="mt-6 text-base text-pedra">
              Enquanto isso, confirme por telefone se a clínica atende o seu caso.
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
