import { site } from '../data/site';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';

/**
 * Primeira dobra.
 *
 * A regra que definiu esta seção: ela responde quem é, onde fica e o que fazer
 * agora — e NADA além disso. A tentação num site de clínica é encher a
 * primeira dobra de superlativo; aqui não há nenhum, porque não há nenhum
 * verificado. O que sustenta a dobra é a tipografia e o endereço real.
 *
 * A headline é o endereço da clínica. "Seu sorriso merece o melhor" serve para
 * qualquer clínica do Brasil; "Rua das Dálias" só serve para esta.
 *
 * O fundo é arte gerada (scripts/arte.mjs), não foto — ver o cabeçalho de lá.
 * A composição da arte deixa o canto superior esquerdo escuro, que é onde o
 * texto fica.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="sobre-escuro relative isolate flex min-h-[max(34rem,88svh)] items-end overflow-hidden bg-noite"
      aria-labelledby="titulo-principal"
    >
      {/*
        Arte de fundo. `aria-hidden` e alt vazio: é atmosfera, não informação —
        um leitor de tela anunciando "gradiente escuro" só atrapalha.
      */}
      <img
        src="/arte/atmosfera-hero.jpg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/*
        Véu escuro, em duas camadas.

        A HORIZONTAL protege o texto: opaca à esquerda, onde a copy fica, e
        aberta à direita, para a luz da arte aparecer. As paradas não são
        arbitrárias — a coluna de texto termina por volta de 53% da viewport
        em tela larga, então o véu só começa a clarear depois disso.

        A VERTICAL costura o hero com a faixa clara de fatos logo abaixo,
        evitando o corte seco entre as duas seções.

        Sem a camada horizontal, o subtítulo cai abaixo de 4,5:1 sobre a parte
        clara da arte; com ela opaca demais (como estava), a arte some e o
        hero fica chapado.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#0E1417_0%,rgba(14,20,23,0.93)_46%,rgba(14,20,23,0.62)_72%,rgba(14,20,23,0.34)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-noite to-transparent"
      />

      <div className="container-conteudo w-full pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="max-w-4xl animate-surgir">
          <p className="etiqueta mb-6 text-champanhe">
            {site.endereco.bairro} · {site.endereco.cidade} — {site.endereco.uf}
          </p>

          {/*
            O nome em corpo de marca. Duas linhas no celular, uma no desktop —
            e o "Odontologia Premium" desce para uma linha própria, menor, para
            o nome não virar um bloco de texto.
          */}
          <h1 id="titulo-principal" className="font-display text-marca font-bold text-osso">
            Rizzit
          </h1>
          <p className="mt-3 text-lg font-semibold uppercase tracking-[0.32em] text-champanhe sm:text-xl">
            Odontologia Premium
          </p>

          <span className="regua-clara mb-7 mt-9 !w-24" aria-hidden="true" />

          <p className="max-w-prosa text-lead text-osso/90">
            Clínica odontológica na {site.endereco.logradouro}, no{' '}
            {site.endereco.bairro}, em {site.endereco.cidade}. Em atividade desde{' '}
            {site.identidade.desde}.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <AcaoWhatsApp variante="primario" rotulo="Agendar avaliação" />
            <a href="#sobre" className="btn-secundario-escuro">
              Conhecer a clínica
            </a>
          </div>

          {/*
            O telefone inline mantém os 44px de altura de alvo: no celular ele
            é um link discado de verdade, e um alvo de 24px erra o toque.
          */}
          <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-osso/70">
            <span>Ou ligue para</span>
            <AcaoTelefone
              variante="texto"
              className="!text-osso hover:!text-champanhe"
              rotulo={site.contato.telefone.exibicao}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
