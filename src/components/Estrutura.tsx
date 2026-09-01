import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Foto } from './ui/Foto';
import { Revelar } from './ui/Revelar';

/**
 * Estrutura da clínica — a galeria.
 *
 * O layout é assimétrico de propósito: uma foto alta à esquerda e duas
 * empilhadas à direita. Grade de três quadrados iguais é a assinatura visual
 * do template de odontologia, e o briefing pediu o contrário disso.
 *
 * As três fotos estão pendentes. Cada espaço reservado diz qual foto vai ali e
 * por quê — é literalmente o roteiro do ensaio fotográfico que a clínica
 * precisa fazer.
 */
export function Estrutura() {
  const { fachada, consultorio, ambiente } = site.fotos;

  return (
    <section id="estrutura" className="bg-osso py-secao" aria-labelledby="titulo-estrutura">
      <div className="container-conteudo">
        <Revelar>
          <div className="max-w-prosa">
            <TituloSecao etiqueta="Estrutura" id="titulo-estrutura">
              O espaço na Rua das Dálias
            </TituloSecao>
            <p className="text-lead text-tinta">
              As fotos abaixo são o que sustenta a palavra “premium” do nome. São os três
              enquadramentos que a clínica precisa fotografar.
            </p>
          </div>
        </Revelar>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Revelar className="md:row-span-2">
            <Foto
              nome={fachada.nome}
              alt={fachada.alt}
              titulo={fachada.titulo}
              descricao={fachada.descricao}
              pendencia={fachada.pendencia}
              reserva={{ largura: 3, altura: 4 }}
              sizes="(min-width: 768px) 48vw, calc(100vw - 2.5rem)"
              className="h-full"
            />
          </Revelar>

          <Revelar atraso={100}>
            <Foto
              nome={consultorio.nome}
              alt={consultorio.alt}
              titulo={consultorio.titulo}
              descricao={consultorio.descricao}
              pendencia={consultorio.pendencia}
              reserva={{ largura: 16, altura: 10 }}
              sizes="(min-width: 768px) 48vw, calc(100vw - 2.5rem)"
            />
          </Revelar>

          <Revelar atraso={180}>
            <Foto
              nome={ambiente.nome}
              alt={ambiente.alt}
              titulo={ambiente.titulo}
              descricao={ambiente.descricao}
              pendencia={ambiente.pendencia}
              reserva={{ largura: 16, altura: 10 }}
              sizes="(min-width: 768px) 48vw, calc(100vw - 2.5rem)"
            />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
