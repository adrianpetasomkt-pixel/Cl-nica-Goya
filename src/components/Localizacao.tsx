import { useState } from 'react';
import { site } from '../data/site';
import { TituloSecao } from './ui/TituloSecao';
import { Pendente } from './ui/Pendente';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';
import { Revelar } from './ui/Revelar';

const CONSULTA_MAPA = encodeURIComponent(site.endereco.completo);

/**
 * Endereço, mapa e horário.
 *
 * O mapa carrega sob demanda, por clique. Um iframe do Google Maps traz
 * centenas de KB e um terceiro para dentro da primeira renderização — em 4G
 * isso derruba o carregamento, e o mapa não é o que o visitante veio ver.
 *
 * O endereço aqui é o dado mais sólido do site inteiro: cinco fontes
 * independentes concordam, incluindo quadra e lote.
 */
export function Localizacao() {
  const [mapaCarregado, setMapaCarregado] = useState(false);
  const { endereco } = site;

  return (
    <section id="localizacao" className="bg-osso py-secao" aria-labelledby="titulo-localizacao">
      <div className="container-conteudo grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Revelar>
          <TituloSecao etiqueta="Onde fica" id="titulo-localizacao">
            {endereco.bairro}, {endereco.cidade}
          </TituloSecao>

          <address className="not-italic">
            <p className="text-lead font-semibold text-tinta">{endereco.logradouro}</p>
            <p className="mt-1 text-base text-pedra">{endereco.complemento}</p>
            <p className="mt-3 text-lead text-tinta">
              {endereco.bairro}, {endereco.cidade} — {endereco.uf}
            </p>
            <p className="mt-1 text-base text-pedra">CEP {endereco.cep}</p>
          </address>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <AcaoWhatsApp variante="primario" rotulo="Agendar avaliação" />
            <AcaoTelefone variante="secundario" />
          </div>

          <div className="mt-12">
            <h3 className="text-h3 font-semibold text-petroleo">Horário de atendimento</h3>
            <Pendente className="mt-4" rotulo="Horário — a confirmar com a clínica">
              {site.horario.pendencia}
            </Pendente>
          </div>
        </Revelar>

        <Revelar atraso={120}>
          <div
            className="overflow-hidden rounded border border-linha bg-white"
            style={{ aspectRatio: '4 / 3' }}
          >
            {mapaCarregado ? (
              <iframe
                title={`Mapa com a localização da ${site.identidade.nomeCompleto} em ${endereco.completo}`}
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
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-osso to-linha/60 p-6 text-center transition-colors hover:from-linha/40"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="text-bronze">
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-display text-h3 font-semibold text-petroleo">
                  Ver no mapa
                </span>
                <span className="max-w-[34ch] text-sm text-pedra">
                  O mapa é do Google e só carrega quando você toca, para a página abrir rápido no
                  celular.
                </span>
              </button>
            )}
          </div>

          <p className="mt-4 text-sm text-pedra">
            O mapa localiza pelo endereço. As coordenadas exatas ainda não foram informadas pela
            clínica.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
