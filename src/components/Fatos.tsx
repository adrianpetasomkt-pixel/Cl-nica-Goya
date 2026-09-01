import { site } from '../data/site';
import { Revelar } from './ui/Revelar';

/**
 * Faixa de fatos verificados, logo abaixo do hero.
 *
 * ---------------------------------------------------------------------------
 * ESTA SEÇÃO É O OPOSTO DE UMA FAIXA DE MÉTRICAS INVENTADAS.
 *
 * O padrão do mercado aqui é "+5.000 pacientes atendidos · 15 anos de
 * experiência · 98% de satisfação" — números que ninguém audita e que, num
 * site de saúde, são exatamente o tipo de coisa que o CRO autua.
 *
 * Os três itens abaixo são os únicos fatos que a pesquisa confirmou em fonte
 * pública: bairro e cidade, ano de abertura no registro, e o perfil do
 * Instagram. Nenhum deles impressiona. Todos são verdade.
 *
 * A nota do Google entraria aqui e seria o item mais forte da página — mas o
 * perfil não pôde ser lido na pesquisa, então ela não existe neste site.
 * ---------------------------------------------------------------------------
 */
export function Fatos() {
  return (
    <section aria-label="A clínica em números verificados" className="border-b border-linha bg-osso">
      <div className="container-conteudo">
        <ul className="grid grid-cols-1 divide-y divide-linha sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {site.fatos.map((fato, i) => (
            <Revelar as="li" key={fato.valor} atraso={i * 90}>
              <div className="px-0 py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-h3 font-semibold text-petroleo">{fato.valor}</p>
                <p className="etiqueta mt-2 text-pedra">{fato.rotulo}</p>
              </div>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
