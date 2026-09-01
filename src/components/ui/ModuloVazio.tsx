import { site } from '../../data/site';
import { Pendente } from './Pendente';

/**
 * Seção cujo conteúdo real ainda não existe — tratamentos e equipe.
 *
 * Na produção mostra só o marcador de pendência, cru. Na demonstração desenha
 * a GRADE VAZIA: o cliente enxerga quantos itens cabem, o tamanho de cada um e
 * onde a informação dele vai entrar. Isso responde a pergunta que ele
 * realmente tem — "como fica com as minhas coisas aqui dentro?" — sem que a
 * gente precise inventar as coisas dele.
 *
 * Os cartões fantasma NÃO têm texto de exemplo. Nome de tratamento inventado
 * numa demonstração vira, três reuniões depois, nome de tratamento no ar.
 */
type Props = {
  /** Quantos espaços desenhar. Só sugere a composição, não promete a quantidade. */
  vagas: number;
  pendencia: string;
  /** O que o cliente precisa mandar, em uma linha. */
  chamada: string;
  escuro?: boolean;
  /** Grade de 2 colunas (equipe) ou 3 (tratamentos). */
  colunas?: 2 | 3;
};

export function ModuloVazio({
  vagas,
  pendencia,
  chamada,
  escuro = false,
  colunas = 3,
}: Props) {
  if (!site.modoDemo) {
    return <Pendente escuro={escuro}>{pendencia}</Pendente>;
  }

  return (
    <div>
      <ul
        className={`grid gap-4 sm:gap-5 ${
          colunas === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {Array.from({ length: vagas }, (_, i) => (
          <li
            key={i}
            aria-hidden="true"
            className={`relative flex min-h-[9.5rem] flex-col justify-between rounded p-6 ${
              escuro
                ? 'border border-osso/15 bg-osso/[0.04]'
                : 'border border-linha bg-white/50'
            }`}
          >
            <span
              className={`font-display text-h3 font-semibold tabular-nums ${
                escuro ? 'text-osso/25' : 'text-petroleo/20'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex flex-col gap-2">
              <span
                className={`block h-2 w-2/3 rounded-sm ${escuro ? 'bg-osso/15' : 'bg-petroleo/10'}`}
              />
              <span
                className={`block h-2 w-full rounded-sm ${escuro ? 'bg-osso/10' : 'bg-petroleo/[0.07]'}`}
              />
              <span
                className={`block h-2 w-5/12 rounded-sm ${escuro ? 'bg-osso/10' : 'bg-petroleo/[0.07]'}`}
              />
            </span>
          </li>
        ))}
      </ul>

      <p
        className={`mt-6 text-sm ${escuro ? 'text-osso/70' : 'text-pedra'}`}
      >
        {chamada}
      </p>
    </div>
  );
}
