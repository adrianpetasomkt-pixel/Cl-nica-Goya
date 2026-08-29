import { useState } from 'react';
import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { AcaoTelefone } from './ui/Acoes';

const CONSULTA_MAPA = encodeURIComponent(site.endereco.completo);

/**
 * Endereço, mapa e horário.
 *
 * O mapa é carregado sob demanda, por clique. Um iframe do Google Maps traz
 * centenas de KB e um terceiro para dentro da primeira renderização — em 4G
 * isso derruba o LCP, e o mapa não é o que o visitante veio ver.
 */
export function Localizacao() {
  const [mapaCarregado, setMapaCarregado] = useState(false);

  return (
    <section id="localizacao" className="bg-areia py-secao" aria-labelledby="titulo-localizacao">
      <div className="container-conteudo grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <TituloSecao etiqueta="Onde fica" id="titulo-localizacao">
            {site.endereco.bairro}, {site.endereco.cidade}
          </TituloSecao>

          <address className="not-italic">
            <p className="text-lead font-semibold text-tinta">{site.endereco.logradouro}</p>
            <p className="mt-1 text-lead text-tinta">
              {site.endereco.bairro}, {site.endereco.cidade} — {site.endereco.uf}
            </p>
            <p className="mt-1 text-base text-pedra">CEP {site.endereco.cep}</p>
            <p className="mt-4 text-base text-pedra">{site.endereco.referencia}</p>

            <div className="mt-7">
              <AcaoTelefone variante="primario" />
            </div>
          </address>

          <div className="mt-10">
            <h3 className="text-h3 font-semibold text-verde">Horário de funcionamento</h3>
            <dl className="mt-4 border-t border-pedra/30">
              {site.horario.confirmado.map((dia) => (
                <div
                  key={dia.dia}
                  className="flex flex-wrap justify-between gap-2 border-b border-pedra/30 py-3"
                >
                  <dt className="font-semibold text-tinta">{dia.dia}</dt>
                  <dd className="text-pedra">
                    Abre às <strong className="font-semibold text-tinta">{dia.abertura}</strong>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-base text-pedra">
              Só a abertura da segunda-feira está confirmada. O restante da semana ainda não foi
              informado — por isso não aparece aqui.
            </p>
            <Pendente className="mt-4">{site.horario.pendenciaSemana}</Pendente>
          </div>
        </div>

        <div>
          <div
            className="overflow-hidden rounded border border-pedra/40 bg-white"
            style={{ aspectRatio: '4 / 3' }}
          >
            {mapaCarregado ? (
              <iframe
                title={`Mapa com a localização da ${site.identidade.nomeFantasia} em ${site.endereco.completo}`}
                src={`https://www.google.com/maps?q=${CONSULTA_MAPA}&output=embed`}
                width="800"
                height="600"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapaCarregado(true)}
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white p-6 text-center transition-colors hover:bg-areia"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" className="text-ocre">
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-display text-h3 font-semibold text-verde">
                  Ver no mapa
                </span>
                <span className="max-w-[32ch] text-sm text-pedra">
                  O mapa é do Google e só carrega quando você clica, para a página abrir rápido no
                  celular.
                </span>
              </button>
            )}
          </div>

          <p className="mt-4 text-sm text-pedra">
            As coordenadas exatas da clínica ainda não foram informadas; o mapa localiza pelo
            endereço.
          </p>
          <Pendente className="mt-4">{site.endereco.geo.latitude}</Pendente>
          <Pendente className="mt-3">{site.endereco.geo.longitude}</Pendente>
        </div>
      </div>
    </section>
  );
}
