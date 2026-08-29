import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Foto } from './ui/Foto';

/**
 * Reescrita do texto institucional oficial da clínica, mantendo o sentido.
 * O ângulo "trabalhadores e empresários do centro que trazem a família" é real,
 * veio do próprio texto do cliente, e é o que diferencia esta clínica de
 * qualquer outra — por isso lidera a seção.
 */
export function Sobre() {
  return (
    <section
      id="sobre"
      className="sobre-escuro bg-verde py-secao text-areia"
      aria-labelledby="titulo-sobre"
    >
      <div className="container-conteudo grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <TituloSecao etiqueta="A clínica" id="titulo-sobre" escuro>
            No centro, no caminho de quem trabalha
          </TituloSecao>

          <div className="max-w-prosa space-y-5">
            {site.sobre.paragrafos.map((p) => (
              <p key={p.slice(0, 40)} className="text-lead text-areia/90">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:pt-28">
          <Foto
            nome={site.fotos.consultorio.nome}
            alt={site.fotos.consultorio.alt}
            pendencia={site.fotos.consultorio.pendencia}
            reserva={{ largura: 900, altura: 600 }}
            sizes="(min-width: 1024px) 34vw, calc(100vw - 2.5rem)"
            escuro
          />
        </div>
      </div>
    </section>
  );
}
