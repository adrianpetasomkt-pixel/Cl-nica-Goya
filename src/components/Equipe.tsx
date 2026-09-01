import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { ModuloVazio } from './ui/ModuloVazio';
import { Foto } from './ui/Foto';
import { Revelar } from './ui/Revelar';

/**
 * Equipe.
 *
 * Nenhum profissional é apresentado, e a regra por trás disso é dura:
 *
 *   Norma do CFO — profissional de odontologia só pode ser divulgado com nome
 *   e número de CRO. Sem CRO, não publica.
 *
 * Some-se a isso que a pesquisa não confirmou nenhum profissional atuando na
 * clínica. Colocar "Dra. Fulana — Ortodontista" com foto de banco de imagens
 * seria, ao mesmo tempo, invenção de dado e infração de norma.
 */
export function Equipe() {
  const temEquipe = site.equipe.lista.length > 0;

  return (
    <section id="equipe" className="bg-osso pb-secao" aria-labelledby="titulo-equipe">
      <div className="container-conteudo">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-16">
          <Revelar>
            <TituloSecao etiqueta="Equipe" id="titulo-equipe">
              Quem atende
            </TituloSecao>

            <p className="max-w-prosa text-lead text-tinta">
              Cada profissional entra aqui com nome, função e número de CRO. A exibição do CRO
              não é escolha de design: é exigência do Conselho Federal de Odontologia para
              divulgação de profissional.
            </p>

            <div className="mt-10">
              {temEquipe ? (
                <ul className="grid gap-5 sm:grid-cols-2">
                  {site.equipe.lista.map((p) => (
                    <li key={p.nome} className="rounded border border-linha bg-white/50 p-6">
                      <h3 className="text-h3 font-semibold text-petroleo">{p.nome}</h3>
                      <p className="mt-1 text-sm text-pedra">{p.funcao}</p>
                      <p className="mt-3 font-mono text-sm text-bronze">{p.cro}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <ModuloVazio
                  vagas={4}
                  colunas={2}
                  pendencia={site.equipe.pendencia}
                  chamada="Nome completo, função e CRO com UF de cada profissional. Quem não tiver CRO informado não pode ser publicado."
                />
              )}
            </div>
          </Revelar>

          <Revelar atraso={120}>
            <Foto
              nome={site.fotos.equipe.nome}
              alt={site.fotos.equipe.alt}
              titulo={site.fotos.equipe.titulo}
              descricao={site.fotos.equipe.descricao}
              pendencia={site.fotos.equipe.pendencia}
              reserva={{ largura: 4, altura: 5 }}
              sizes="(min-width: 1024px) 34vw, calc(100vw - 2.5rem)"
            />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
