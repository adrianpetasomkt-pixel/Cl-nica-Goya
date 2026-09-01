/** @type {import('tailwindcss').Config} */

/*
 * ---------------------------------------------------------------------------
 * TOKENS DE DESIGN — RIZZIT ODONTOLOGIA PREMIUM (ver DESIGN.md)
 *
 * A identidade visual oficial da clínica NÃO foi enviada. Esta paleta é uma
 * PROPOSTA de direção de arte, construída para a demonstração. Para trocá-la
 * quando o logo e as cores reais chegarem, edite só este bloco — nenhum
 * componente tem cor hardcoded.
 *
 * Direção: evitar o azul odontológico genérico. A referência é hotelaria e
 * joalheria — superfície escura profunda, um metal quente como único acento e
 * um off-white de papel. Sofisticado e clínico, não "consultório".
 *
 * Todos os pares em uso foram medidos (scripts/contraste.mjs). Os números
 * abaixo são reais, não estimativa.
 * ---------------------------------------------------------------------------
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tinta: '#14181B',      // texto principal      — 15,98:1 sobre osso
        noite: '#0E1417',      // superfície escura    — 16,62:1 com osso
        petroleo: '#123038',   // institucional escuro — 12,48:1 com osso
        bronze: '#8A5E2A',     // ação/CTA e acento    —  5,06:1 sobre osso, 5,65:1 com texto branco
        champanhe: '#E0B87C',  // acento sobre escuro  — 10,00:1 sobre noite, 7,52:1 sobre petroleo
        osso: '#F5F2EC',       // fundo da página
        pedra: '#6B675F',      // texto de apoio       —  5,04:1 sobre osso
        linha: '#E2DCD0',      // filete DECORATIVO apenas (nunca borda funcional)
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        texto: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        micro: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        sm: ['0.9375rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.05rem, 2.2vw, 1.3rem)', { lineHeight: '1.55' }],
        h3: ['1.25rem', { lineHeight: '1.35' }],
        h2: ['clamp(1.75rem, 4vw, 2.75rem)', { lineHeight: '1.15' }],
        numeral: ['clamp(3rem, 9vw, 5rem)', { lineHeight: '0.95' }],
        display: ['clamp(2.6rem, 7vw, 4.5rem)', { lineHeight: '1.02' }],
        // Assinatura tipográfica da marca no hero e no rodapé.
        marca: ['clamp(2.9rem, 12vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        DEFAULT: '3px',
        sm: '2px',
      },
      maxWidth: {
        conteudo: '1180px',
        prosa: '64ch',
      },
      spacing: {
        secao: 'clamp(4.5rem, 10vw, 8rem)',
        toque: '44px', // alvo minimo de toque
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      keyframes: {
        surgir: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        surgir: 'surgir 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
