import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { ModuloVazio } from './ui/ModuloVazio';
import { Revelar } from './ui/Revelar';

/**
 * Tratamentos.
 *
 * A lista está VAZIA e isso é uma decisão, não uma falha.
 *
 * A pesquisa não confirmou um único tratamento oferecido pela Rizzit — o único
 * dado público é o CNAE "atividade odontológica". Implante, lente de contato,
 * clareamento e ortodontia são o que qualquer um chutaria, e é por isso mesmo
 * que não entram: chute vira promessa de serviço, e promessa de serviço numa
 * clínica é problema de consumidor e de CRO.
 *
 * A grade vazia mostra a composição ao cliente sem inventar o conteúdo dela.
 */
export function Tratamentos() {
  const temLista = site.tratamentos.lista.length > 0;

  return (
    <section
      id="tratamentos"
      className="sobre-escuro bg-petroleo py-secao text-osso"
      aria-labelledby="titulo-tratamentos"
    >
      <div className="container-conteudo">
        <Revelar>
          <TituloSecao etiqueta="Tratamentos" id="titulo-tratamentos" escuro>
            O que a clínica oferece
          </TituloSecao>
        </Revelar>

        <Revelar atraso={100}>
          {temLista ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {site.tratamentos.lista.map((t) => (
                <li key={t.nome} className="rounded border border-osso/15 bg-osso/[0.04] p-6">
                  <h3 className="text-h3 font-semibold text-osso">{t.nome}</h3>
                  <p className="mt-2 text-sm text-osso/75">{t.descricao}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ModuloVazio
              vagas={6}
              escuro
              pendencia={site.tratamentos.pendencia}
              chamada="Cada espaço recebe um tratamento que a clínica confirmar, com o nome que ela usa. Nenhum tratamento foi presumido aqui."
            />
          )}
        </Revelar>
      </div>
    </section>
  );
}
