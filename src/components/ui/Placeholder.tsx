import { site } from '../../data/site';

/*
 * ---------------------------------------------------------------------------
 * ESPAÇO RESERVADO PARA IMAGEM QUE AINDA NÃO TEMOS
 *
 * Nenhuma foto da Rizzit foi obtida na pesquisa. A regra que vale aqui é
 * simples e não tem exceção: NUNCA colocar foto de banco de imagens de
 * dentista sorrindo ou de consultório genérico no lugar. Uma foto dessas passa
 * a mensagem de que a clínica é intercambiável com qualquer outra — que é
 * exatamente o contrário do que um site premium precisa dizer.
 *
 * Existem DOIS modos, e a diferença entre eles é o público:
 *
 *   andaime  (produção)      — deliberadamente feio: trama, borda tracejada e
 *                              o marcador técnico à mostra. É um andaime e
 *                              precisa parecer um andaime, para que ninguém
 *                              publique o site achando que aquilo é conteúdo.
 *
 *   vitrine  (demonstração)  — desenhado. O cliente precisa enxergar a
 *                              composição da página e entender qual foto vai
 *                              ali. Continua dizendo com todas as letras que é
 *                              espaço reservado — não engana ninguém —, mas
 *                              não estraga a apresentação.
 *
 * O modo vem de `site.modoDemo`, definido no build. Ver src/vite-env.d.ts.
 * ---------------------------------------------------------------------------
 */
type Props = {
  /** Descreve a foto que deve entrar aqui. Vira o rótulo acessível. */
  descricao: string;
  /** Título curto, mostrado no modo vitrine. Ex.: "Recepção". */
  titulo?: string | undefined;
  marcador: string;
  /** Reservam a caixa e evitam layout shift quando a foto real entrar. */
  width: number;
  height: number;
  className?: string;
  /** Para uso sobre superfície escura. */
  escuro?: boolean;
};

export function Placeholder({
  descricao,
  titulo,
  marcador,
  width,
  height,
  className = '',
  escuro = false,
}: Props) {
  const rotuloAcessivel = `Espaço reservado para foto: ${descricao}. A clínica ainda não forneceu esta imagem.`;

  if (!site.modoDemo) {
    return (
      <div
        role="img"
        aria-label={rotuloAcessivel}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`flex w-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-6 text-center ${
          escuro ? 'trama-escura border-osso/60' : 'trama-clara border-pedra'
        } ${className}`}
      >
        <span className={`etiqueta ${escuro ? 'text-champanhe' : 'text-pedra'}`}>Foto pendente</span>
        <span
          className={`max-w-prosa break-words font-mono text-sm ${escuro ? 'text-osso' : 'text-tinta'}`}
        >
          {marcador}
        </span>
        <span className={`text-sm ${escuro ? 'text-osso/80' : 'text-pedra'}`}>
          {descricao} — {width}×{height}px
        </span>
      </div>
    );
  }

  /*
   * Modo vitrine. O canto com o filete de bronze é o mesmo elemento de
   * assinatura do resto da página, então o espaço reservado não parece um
   * corpo estranho na composição — parece parte do desenho.
   */
  return (
    <div
      role="img"
      aria-label={rotuloAcessivel}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`group relative flex w-full flex-col items-center justify-center overflow-hidden rounded p-6 text-center ${
        escuro
          ? 'bg-gradient-to-br from-petroleo to-noite'
          : 'border border-linha bg-gradient-to-br from-osso to-linha/60'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-bronze/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-bronze/70"
      />

      <span className={`regua mb-5 ${escuro ? '!bg-champanhe' : ''}`} aria-hidden="true" />

      {titulo ? (
        <span
          className={`font-display text-h3 font-semibold ${escuro ? 'text-osso' : 'text-petroleo'}`}
        >
          {titulo}
        </span>
      ) : null}

      <span
        className={`mt-2 max-w-[38ch] text-sm ${escuro ? 'text-osso/75' : 'text-pedra'}`}
      >
        {descricao}
      </span>

      {/*
        No celular o rótulo completo, com o tracking aberto da etiqueta, quebra
        em duas linhas e briga com o botão flutuante. Encurta abaixo de 640px:
        "Espaço reservado" já diz o necessário; o resto é reforço.
      */}
      <span className={`etiqueta mt-6 ${escuro ? 'text-champanhe/85' : 'text-bronze'}`}>
        Espaço reservado
        <span className="hidden sm:inline"> · foto real da clínica</span>
      </span>
    </div>
  );
}
