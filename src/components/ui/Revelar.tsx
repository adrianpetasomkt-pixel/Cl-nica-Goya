import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Reveal on scroll.
 *
 * Um `IntersectionObserver` só, compartilhado por instância, sem biblioteca.
 * O elemento sobe 18px e aparece — uma vez, e nunca mais: animação que
 * reaparece a cada rolagem cansa e denuncia "demonstração cheia de efeitos",
 * que é justamente o que o briefing proíbe.
 *
 * A classe `js-reveal` no <html> é ligada em main.tsx. Enquanto ela não
 * existir, o CSS não esconde nada — se o JavaScript falhar, a página aparece
 * inteira em vez de ficar em branco.
 */
export function Revelar({
  children,
  atraso = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  /** Escalonamento em ms, para itens de uma mesma grade entrarem em cascata. */
  atraso?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo || visivel) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      // Dispara um pouco antes de entrar na tela: no celular, esperar o
      // elemento aparecer para só então animar chega tarde demais.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observador.observe(alvo);
    return () => observador.disconnect();
  }, [visivel]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visivel ? 'visivel' : ''} ${className}`}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
