import { site, ehPendencia } from '../data/site';
import { Pendente } from './ui/Pendente';

/*
 * ===========================================================================
 * ⚠️  BLOQUEIO DE PUBLICAÇÃO
 *
 * A publicidade de clínica odontológica no Brasil segue o Código de Ética
 * Odontológica e as resoluções do CFO. Para PESSOA JURÍDICA é OBRIGATÓRIO que
 * o material de divulgação exiba:
 *
 *   1. o nome e o número de inscrição da CLÍNICA no CRO-MT;
 *   2. o nome e o número de CRO do RESPONSÁVEL TÉCNICO.
 *
 * Nenhum dos dois foi informado (ver PENDENCIAS.md). Os espaços abaixo estão
 * reservados e marcados.
 *
 * >>> ESTE SITE NÃO PODE IR AO AR SEM ESSES DADOS PREENCHIDOS. <<<
 * ===========================================================================
 */
export function Footer() {
  const { legal, redes } = site;

  return (
    <footer className="sobre-escuro bg-verde py-14 text-areia">
      <div className="container-conteudo">
        <span className="regua mb-8 !w-full" aria-hidden="true" />

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-h3 font-bold text-areia">
              {site.identidade.nomeFantasia}
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.16em] text-areia/70">
              {site.identidade.nomeCompleto}
            </p>
            <p className="mt-4 text-sm text-areia/85">{site.identidade.categoria}</p>
          </div>

          <div>
            <h2 className="etiqueta mb-4 text-ocre-claro">Contato e endereço</h2>
            {/* Idêntico, caractere a caractere, ao PostalAddress do JSON-LD. */}
            <address className="not-italic text-base text-areia/90">
              {site.endereco.completo}
            </address>
            <p className="mt-4">
              <a
                href={site.contato.telefone.href}
                className="alvo-toque font-semibold text-areia underline underline-offset-4 transition-colors hover:text-ocre-claro"
              >
                {site.contato.telefone.exibicao}
              </a>
            </p>
          </div>

          <div>
            <h2 className="etiqueta mb-4 text-ocre-claro">Horário</h2>
            <p className="text-base text-areia/90">
              {site.horario.confirmado[0].dia}: abre às {site.horario.confirmado[0].abertura}
            </p>
            <Pendente escuro className="mt-4">
              {site.horario.pendenciaSemana}
            </Pendente>
          </div>
        </div>

        {/*
          Espaço reservado para os dados de exibição obrigatória.
          Ver o bloco de bloqueio de publicação no topo deste arquivo.
        */}
        <section
          aria-labelledby="titulo-registro"
          className="mt-12 border-t border-areia/25 pt-8"
        >
          <h2 id="titulo-registro" className="etiqueta mb-4 text-ocre-claro">
            Registro profissional — exibição obrigatória
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            <li>
              <span className="block text-sm text-areia/70">Inscrição da clínica no CRO-MT</span>
              {ehPendencia(legal.croClinica) ? (
                <Pendente escuro className="mt-2">
                  {legal.croClinica}
                </Pendente>
              ) : (
                <span className="mt-1 block text-base text-areia">{legal.croClinica}</span>
              )}
            </li>
            <li>
              <span className="block text-sm text-areia/70">Responsável técnico</span>
              {ehPendencia(legal.responsavelTecnico) ? (
                <Pendente escuro className="mt-2">
                  {legal.responsavelTecnico}
                </Pendente>
              ) : (
                <span className="mt-1 block text-base text-areia">{legal.responsavelTecnico}</span>
              )}
            </li>
            <li>
              <span className="block text-sm text-areia/70">CRO do responsável técnico</span>
              {ehPendencia(legal.croResponsavelTecnico) ? (
                <Pendente escuro className="mt-2">
                  {legal.croResponsavelTecnico}
                </Pendente>
              ) : (
                <span className="mt-1 block text-base text-areia">
                  {legal.croResponsavelTecnico}
                </span>
              )}
            </li>
          </ul>
        </section>

        <section aria-labelledby="titulo-empresa" className="mt-10 border-t border-areia/25 pt-8">
          <h2 id="titulo-empresa" className="etiqueta mb-4 text-ocre-claro">
            Dados da empresa e redes
          </h2>
          <ul className="grid gap-3 text-sm text-areia/85 md:grid-cols-2">
            <li>Razão social: <span className="font-mono">{legal.razaoSocial}</span></li>
            <li>CNPJ: <span className="font-mono">{legal.cnpj}</span></li>
            <li>Instagram: <span className="font-mono">{redes.instagram}</span></li>
            <li>Facebook: <span className="font-mono">{redes.facebook}</span></li>
          </ul>
        </section>

        <p className="mt-10 border-t border-areia/25 pt-6 text-sm text-areia/70">
          Este site é informativo e não substitui consulta, diagnóstico ou orientação
          profissional. O agendamento é feito por telefone.
        </p>
      </div>
    </footer>
  );
}
