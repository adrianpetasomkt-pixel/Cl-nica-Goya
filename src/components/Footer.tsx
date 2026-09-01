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
 * Nenhum dos dois foi obtido na pesquisa. Os espaços abaixo estão reservados.
 *
 * >>> ESTE SITE NÃO PODE IR AO AR SEM ESSES DADOS PREENCHIDOS. <<<
 *
 * Isso vale para a publicação. A demonstração pode ser apresentada como está,
 * porque ela não está no ar e não é material de divulgação ao público.
 * ===========================================================================
 */
export function Footer() {
  const { legal, redes, identidade, endereco, contato } = site;

  return (
    /*
      A folga inferior existe porque dois elementos flutuam sobre a página: o
      botão de agendar e, na demonstração, a faixa de aviso. Sem ela, os dois
      tapam justamente o último parágrafo do rodapé — o aviso de que o site é
      informativo.
    */
    <footer
      className="sobre-escuro bg-noite pt-16 text-osso"
      style={{
        paddingBottom: `calc(${site.modoDemo ? '7.5rem' : '5.5rem'} + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      <div className="container-conteudo">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-bold leading-none text-osso">
              {identidade.nomeFantasia}
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-champanhe">
              Odontologia Premium
            </p>
            <p className="mt-5 text-sm text-osso/70">{identidade.categoria} em {endereco.cidade}, {endereco.uf}.</p>
          </div>

          <div>
            <h2 className="etiqueta mb-4 text-champanhe">Contato e endereço</h2>
            {/* Idêntico, caractere a caractere, ao PostalAddress do JSON-LD. */}
            <address className="not-italic text-base text-osso/85">{endereco.completo}</address>
            <p className="mt-4">
              <a
                href={contato.telefone.href}
                className="alvo-toque font-semibold text-osso underline underline-offset-4 transition-colors hover:text-champanhe"
              >
                {contato.telefone.exibicao}
              </a>
            </p>
          </div>

          <div>
            <h2 className="etiqueta mb-4 text-champanhe">Redes</h2>
            <p>
              <a
                href={redes.instagram.url}
                rel="noopener"
                target="_blank"
                className="alvo-toque font-semibold text-osso underline underline-offset-4 transition-colors hover:text-champanhe"
              >
                {redes.instagram.usuario}
              </a>
            </p>
            <Pendente escuro className="mt-4" rotulo="Facebook — link a confirmar">
              {redes.facebook as string}
            </Pendente>
          </div>
        </div>

        {/*
          Espaço reservado para os dados de exibição obrigatória.
          Ver o bloco de bloqueio de publicação no topo deste arquivo.
        */}
        <section aria-labelledby="titulo-registro" className="mt-14 border-t border-osso/15 pt-8">
          <h2 id="titulo-registro" className="etiqueta mb-5 text-champanhe">
            Registro profissional — exibição obrigatória antes de publicar
          </h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {(
              [
                ['Inscrição da clínica no CRO-MT', legal.croClinica],
                ['Responsável técnico', legal.responsavelTecnico],
                ['CRO do responsável técnico', legal.croResponsavelTecnico],
              ] as const
            ).map(([rotulo, valor]) => (
              <li key={rotulo}>
                <span className="block text-sm text-osso/60">{rotulo}</span>
                {ehPendencia(valor) ? (
                  <Pendente escuro className="mt-2" rotulo="Obrigatório pelo CFO">
                    {valor}
                  </Pendente>
                ) : (
                  <span className="mt-1 block text-base text-osso">{valor}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-empresa" className="mt-10 border-t border-osso/15 pt-8">
          <h2 id="titulo-empresa" className="etiqueta mb-4 text-champanhe">
            Dados da empresa
          </h2>
          <ul className="grid gap-2 text-sm text-osso/75 md:grid-cols-2">
            <li>
              Razão social: <span className="font-mono">{identidade.razaoSocial}</span>
            </li>
            <li>
              CNPJ: <span className="font-mono">{identidade.cnpj}</span>
            </li>
          </ul>
        </section>

        <p className="mt-10 border-t border-osso/15 pt-6 text-sm text-osso/60">
          Este site é informativo e não substitui consulta, diagnóstico ou orientação
          profissional. O agendamento é feito por contato direto com a clínica.
        </p>
      </div>
    </footer>
  );
}
