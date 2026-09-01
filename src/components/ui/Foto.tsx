import { fotosGeradas } from '../../data/fotos.gerado';
import { site } from '../../data/site';
import { Placeholder } from './Placeholder';

/**
 * Foto real da clínica.
 *
 * Enquanto o arquivo não existir em public/fotos/ (ou seja, enquanto
 * `npm run imagens` não tiver rodado sobre um original em fotos-originais/),
 * cai automaticamente no espaço reservado — a página nunca quebra nem mostra
 * imagem faltando. Hoje TODAS as fotos da Rizzit estão nesse estado.
 *
 * Serve WebP com JPEG de reserva, em várias larguras. `width`/`height` vêm do
 * manifesto e reservam a caixa, então a entrada da foto não empurra o layout.
 */
type Props = {
  /** Nome do arquivo em fotos-originais/, sem extensão. Ex.: "recepcao". */
  nome: string;
  alt: string;
  /** Título curto mostrado no espaço reservado. Ex.: "Recepção". */
  titulo?: string;
  /** Descrição da foto que deve entrar, mostrada no espaço reservado. */
  descricao?: string;
  /** Marcador técnico, exibido no modo de produção. */
  pendencia: string;
  /** Largura que a foto ocupa em cada faixa, para o navegador escolher o arquivo. */
  sizes: string;
  /** Foto da primeira dobra: carrega imediatamente, sem lazy. */
  prioritaria?: boolean;
  /** Proporção do espaço reservado enquanto não há foto. */
  reserva: { largura: number; altura: number };
  className?: string;
  escuro?: boolean;
};

export function Foto({
  nome,
  alt,
  titulo,
  descricao,
  pendencia,
  sizes,
  prioritaria = false,
  reserva,
  className = '',
  escuro = false,
}: Props) {
  const foto = fotosGeradas[nome];

  if (!foto) {
    return (
      <Placeholder
        descricao={descricao ?? alt}
        titulo={titulo}
        marcador={pendencia}
        width={reserva.largura}
        height={reserva.altura}
        className={className}
        escuro={escuro}
      />
    );
  }

  /*
   * MODO DEMONSTRAÇÃO — imagem única, sem srcset.
   *
   * O arquivo de demonstração embute cada imagem como data URI, e data URI em
   * base64 contém VÍRGULA. `srcset` é uma lista separada por vírgula: as duas
   * coisas juntas produzem um srcset ilegível e a imagem simplesmente não
   * aparece — que foi exatamente o defeito relatado no iPhone.
   *
   * Então, na demonstração, uma variante só, em `src` puro. Escolhemos a mais
   * próxima de 1200px: resolução suficiente para tela retina sem inflar o
   * base64 (que já cresce ~33% sobre o binário).
   */
  if (site.modoDemo) {
    const candidatas = foto.webp.length > 0 ? foto.webp : foto.jpeg;
    const escolhida = candidatas.reduce((melhor, v) =>
      Math.abs(v.largura - 1200) < Math.abs(melhor.largura - 1200) ? v : melhor,
    );
    return (
      <img
        src={escolhida.caminho}
        width={foto.largura}
        height={foto.altura}
        alt={alt}
        loading={prioritaria ? 'eager' : 'lazy'}
        decoding={prioritaria ? 'sync' : 'async'}
        className={`h-full w-full rounded object-cover ${className}`}
      />
    );
  }

  const srcset = (lista: { largura: number; caminho: string }[]) =>
    lista.map((v) => `${v.caminho} ${v.largura}w`).join(', ');

  return (
    <picture>
      <source type="image/webp" srcSet={srcset(foto.webp)} sizes={sizes} />
      <img
        src={foto.fallback}
        srcSet={srcset(foto.jpeg)}
        sizes={sizes}
        width={foto.largura}
        height={foto.altura}
        alt={alt}
        loading={prioritaria ? 'eager' : 'lazy'}
        decoding={prioritaria ? 'sync' : 'async'}
        className={`h-full w-full rounded object-cover ${className}`}
      />
    </picture>
  );
}
