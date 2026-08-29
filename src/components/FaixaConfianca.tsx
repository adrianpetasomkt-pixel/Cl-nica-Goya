import { site } from '../data/site';

/**
 * Quatro itens curtos e verdadeiros. Cada um sai direto dos dados confirmados
 * — nada aqui é adjetivo ou promessa.
 */
const ITENS = [
  {
    destaque: `${site.provaSocial.nota} no ${site.provaSocial.fonte}`,
    apoio: `${site.provaSocial.totalAvaliacoesTexto} avaliações publicadas`,
  },
  {
    destaque: 'Convênio e particular',
    apoio: 'As duas formas de atendimento',
  },
  {
    destaque: 'Centro de Cuiabá',
    apoio: site.endereco.logradouro,
  },
  {
    destaque: 'Diversas especialidades',
    apoio: 'Atendimento odontológico em várias áreas',
  },
];

export function FaixaConfianca() {
  return (
    <section aria-label="Resumo da clínica" className="border-y border-pedra/30 bg-white">
      <ul className="container-conteudo grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {ITENS.map((item) => (
          <li
            key={item.destaque}
            className="border-b border-pedra/20 py-6 last:border-b-0 sm:border-b sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <p className="font-display text-h3 font-semibold text-verde">{item.destaque}</p>
            <p className="mt-1 text-sm text-pedra">{item.apoio}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
