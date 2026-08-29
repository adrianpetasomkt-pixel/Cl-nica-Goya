import { site, ehPendencia } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Estrelas } from './ui/Estrelas';
import { Pendente } from './ui/Pendente';

/**
 * As três avaliações reais publicadas no Google, reproduzidas literalmente e
 * atribuídas à fonte. É PROIBIDO editar o texto, acrescentar outras ou gerar
 * depoimento nenhum.
 *
 * A nota agregada aparece aqui visualmente, com atribuição — e continua fora
 * do JSON-LD de propósito (ver comentário no index.html).
 */
export function Avaliacoes() {
  const perfil = site.endereco.perfilGoogle;

  return (
    <section id="avaliacoes" className="bg-white py-secao" aria-labelledby="titulo-avaliacoes">
      <div className="container-conteudo">
        <TituloSecao etiqueta={`Publicado no ${site.provaSocial.fonte}`} id="titulo-avaliacoes">
          O que os pacientes escreveram
        </TituloSecao>

        <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="font-display text-numeral font-bold leading-none text-verde">
            {site.provaSocial.nota}
          </span>
          <div>
            <Estrelas tamanho={24} />
            <p className="mt-1 text-base text-pedra">
              <span className="sr-only">Nota {site.provaSocial.nota} de 5. </span>
              {site.provaSocial.totalAvaliacoesTexto} avaliações no {site.provaSocial.fonte}
            </p>
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {site.avaliacoes.map((av) => (
            <li key={av.texto.slice(0, 30)} className="flex">
              <figure className="flex flex-col rounded border border-pedra/40 bg-areia p-6">
                <span className="regua mb-5 !w-8" aria-hidden="true" />
                <blockquote className="flex-1">
                  <p className="text-lead text-tinta">“{av.texto}”</p>
                </blockquote>
                <figcaption className="mt-5 text-sm text-pedra">
                  Avaliação publicada no {av.fonte}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-prosa">
          {ehPendencia(perfil) ? (
            <>
              <p className="text-base text-pedra">
                O link para o perfil da clínica no {site.provaSocial.fonte}, onde as{' '}
                {site.provaSocial.totalAvaliacoesTexto} avaliações podem ser lidas na íntegra,
                ainda não foi informado.
              </p>
              <Pendente className="mt-4">{perfil}</Pendente>
            </>
          ) : (
            <a
              href={perfil}
              rel="noopener nofollow"
              className="alvo-toque gap-2 font-semibold text-verde underline underline-offset-4 transition-colors hover:text-ocre"
            >
              Ler as {site.provaSocial.totalAvaliacoesTexto} avaliações no {site.provaSocial.fonte}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
