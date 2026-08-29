import { site } from '../data/site';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';
import { Estrelas } from './ui/Estrelas';
import { Foto } from './ui/Foto';

/**
 * A tese da página: quem somos, a prova de que dá para confiar, e como falar
 * agora. O 5,0 com 1.352 avaliações pertence a esta dobra — é o ativo mais
 * forte da clínica e o argumento mais verificável que existe aqui.
 */
export function Hero() {
  return (
    <section id="inicio" className="bg-areia pt-28 md:pt-32" aria-labelledby="titulo-principal">
      <div className="container-conteudo grid gap-12 pb-secao pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
        <div>
          <span className="regua mb-6" aria-hidden="true" />
          <p className="etiqueta mb-4 text-ocre">
            {site.identidade.categoria} · {site.endereco.bairro}, {site.endereco.cidade}
          </p>

          <h1 id="titulo-principal" className="text-display font-bold text-verde">
            Dentista no Centro de Cuiabá, para você e para a sua família
          </h1>

          <p className="mt-6 max-w-prosa text-lead text-tinta">
            A {site.identidade.nomeCompleto} atende por convênio e particular, em diversas
            especialidades odontológicas, na {site.endereco.logradouro}. O agendamento é por
            telefone.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-start">
            <AcaoTelefone variante="primario" />
            <AcaoWhatsApp variante="secundario" />
          </div>

          <p className="mt-7 text-sm text-pedra">
            Às segundas-feiras a clínica abre às{' '}
            <strong className="font-semibold text-tinta">
              {site.horario.confirmado[0].abertura}
            </strong>
            .
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/*
            Bloco de prova social. A nota é do Google e está atribuída ao
            Google — não é uma avaliação coletada por este site, por isso não
            existe `aggregateRating` no JSON-LD. Ver comentário no index.html.
          */}
          <div className="sobre-escuro rounded border border-verde bg-verde p-7 text-areia md:p-9">
            <p className="etiqueta mb-4 text-ocre-claro">Avaliações no {site.provaSocial.fonte}</p>
            <div className="flex items-end gap-4">
              <span className="font-display text-numeral font-bold text-areia">
                {site.provaSocial.nota}
              </span>
              <div className="mb-2">
                <Estrelas tamanho={22} className="text-ocre-claro" />
                <p className="mt-1 text-sm text-areia/85">
                  <span className="sr-only">Nota {site.provaSocial.nota} de 5. </span>
                  {site.provaSocial.totalAvaliacoesTexto} avaliações
                </p>
              </div>
            </div>
            <p className="mt-5 border-t border-areia/25 pt-5 text-sm text-areia/85">
              Nota e volume de avaliações publicados no perfil da clínica no{' '}
              {site.provaSocial.fonte}.
            </p>
          </div>

          <Foto
            nome={site.fotos.recepcao.nome}
            alt={site.fotos.recepcao.alt}
            pendencia={site.fotos.recepcao.pendencia}
            reserva={{ largura: 800, altura: 600 }}
            sizes="(min-width: 1024px) 40vw, calc(100vw - 2.5rem)"
            prioritaria
          />
        </div>
      </div>
    </section>
  );
}
