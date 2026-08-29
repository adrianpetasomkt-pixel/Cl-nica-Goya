import { fotosGeradas } from '../../data/fotos.gerado';
import { Placeholder } from './Placeholder';

/**
 * Foto real da clínica.
 *
 * Enquanto o arquivo não existir em public/fotos/ (ou seja, enquanto
 * `npm run imagens` não tiver rodado sobre um original), cai automaticamente
 * no espaço reservado — a página nunca quebra nem mostra imagem faltando.
 *
 * Serve WebP com JPEG de reserva, em várias larguras. `width`/`height` vêm do
 * manifesto e reservam a caixa, então a entrada da foto não empurra o layout
 * (CLS zero).
 */
type Props = {
  /** Nome do arquivo em fotos-originais/, sem extensão. Ex.: "recepcao". */
  nome: string;
  alt: string;
  /** Marcador exibido enquanto a foto não chegou. */
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
        descricao={alt}
        marcador={pendencia}
        width={reserva.largura}
        height={reserva.altura}
        className={className}
        escuro={escuro}
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
        className={`h-auto w-full rounded border border-pedra/40 object-cover ${className}`}
      />
    </picture>
  );
}
