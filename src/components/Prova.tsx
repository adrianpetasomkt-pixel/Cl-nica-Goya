import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { Revelar } from './ui/Revelar';

/**
 * Prova social — a seção mais honesta e mais desconfortável deste site.
 *
 * ---------------------------------------------------------------------------
 * NÃO HÁ NOTA, NÃO HÁ CONTAGEM DE AVALIAÇÕES, NÃO HÁ DEPOIMENTO.
 *
 * O perfil da clínica no Google Business não pôde ser lido na pesquisa. Sem
 * ele, não existe nota, não existe volume de avaliações e não existe um único
 * depoimento verificável.
 *
 * Escrever "5,0 ★ · centenas de pacientes satisfeitos" aqui levaria dez
 * segundos e seria a mentira mais fácil de flagrar do site inteiro: qualquer
 * pessoa confere em cinco segundos no Google. O espaço fica reservado.
 *
 * Quando os prints do perfil chegarem, esta seção vira o ativo mais forte da
 * página — prova social verificável bate qualquer adjetivo que a gente
 * escrevesse aqui.
 * ---------------------------------------------------------------------------
 */
export function Prova() {
  return (
    <section
      id="prova"
      className="border-y border-linha bg-white/40 py-secao"
      aria-labelledby="titulo-prova"
    >
      <div className="container-conteudo">
        <Revelar>
          <div className="max-w-prosa">
            <TituloSecao etiqueta="Avaliações" id="titulo-prova">
              O que os pacientes dizem
            </TituloSecao>
            <p className="text-lead text-tinta">
              Esta seção recebe a nota do Google, a quantidade de avaliações e depoimentos reais
              de pacientes — com a origem verificável. Nenhum número foi estimado.
            </p>
          </div>
        </Revelar>

        <Revelar atraso={100}>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Pendente rotulo="Nota do Google — a levantar">
              {site.provaSocial.pendenciaNota}
            </Pendente>
            <Pendente rotulo="Depoimentos — a levantar">
              {site.provaSocial.pendenciaDepoimentos}
            </Pendente>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
