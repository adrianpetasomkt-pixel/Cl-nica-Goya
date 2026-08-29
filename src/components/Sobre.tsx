import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Placeholder } from './ui/Placeholder';

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

        <div className="lg:pt-24">
          <Placeholder
            descricao="equipe ou ambiente interno da clínica, foto real"
            marcador={site.sobre.foto}
            width={600}
            height={700}
            escuro
          />
        </div>
      </div>
    </section>
  );
}
