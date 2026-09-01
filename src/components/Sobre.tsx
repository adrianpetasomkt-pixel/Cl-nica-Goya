import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { Foto } from './ui/Foto';
import { Revelar } from './ui/Revelar';

/**
 * A clínica.
 *
 * O texto tem um parágrafo só, e é curto. Não é preguiça de redação: são os
 * três únicos fatos que a pesquisa confirmou sobre a Rizzit — é clínica
 * odontológica, fica no Jardim Cuiabá, opera desde abril de 2021.
 *
 * O texto institucional de verdade é o proprietário quem escreve ou aprova.
 * Preencher isso com "atendimento humanizado e tecnologia de ponta" custaria
 * cinco minutos e valeria zero: é o parágrafo que está em metade dos sites de
 * clínica do país, e o dono percebe.
 */
export function Sobre() {
  return (
    <section id="sobre" className="bg-osso py-secao" aria-labelledby="titulo-sobre">
      <div className="container-conteudo grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Revelar>
          <TituloSecao etiqueta="A clínica" id="titulo-sobre">
            No Jardim Cuiabá, desde {site.identidade.desde}
          </TituloSecao>

          {site.sobre.paragrafos.map((p) => (
            <p key={p} className="max-w-prosa text-lead text-tinta">
              {p}
            </p>
          ))}

          <Pendente className="mt-8" rotulo="Texto institucional — a escrever com a clínica">
            {site.sobre.pendencia}
          </Pendente>
        </Revelar>

        <Revelar atraso={120}>
          <Foto
            nome={site.fotos.recepcao.nome}
            alt={site.fotos.recepcao.alt}
            titulo={site.fotos.recepcao.titulo}
            descricao={site.fotos.recepcao.descricao}
            pendencia={site.fotos.recepcao.pendencia}
            reserva={{ largura: 4, altura: 3 }}
            sizes="(min-width: 1024px) 52vw, calc(100vw - 2.5rem)"
          />
        </Revelar>
      </div>
    </section>
  );
}
