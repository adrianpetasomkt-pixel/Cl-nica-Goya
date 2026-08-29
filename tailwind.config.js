/** @type {import('tailwindcss').Config} */

/*
 * ---------------------------------------------------------------------------
 * TOKENS DE DESIGN — fonte única da paleta (ver DESIGN.md)
 *
 * A identidade visual da clínica ainda não foi enviada (ver PENDENCIAS.md).
 * A paleta abaixo é PROPOSTA. Para trocá-la quando a marca chegar, edite
 * apenas este bloco: nenhum componente tem cor hardcoded.
 * ---------------------------------------------------------------------------
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tinta: '#16211C',        // texto principal        — 14,71:1 sobre areia
        verde: '#1D5647',        // institucional          —  7,54:1 sobre areia
        ocre: '#A8460F',         // ação / CTA / foco      —  5,92:1 com texto branco
        'ocre-claro': '#F5B889', // ocre sobre fundo escuro—  4,89:1 sobre verde, 9,54:1 sobre tinta
        areia: '#F6F1E7',        // fundo da pagina        —  7,54:1 sobre verde
        pedra: '#635E54',        // texto de apoio, bordas —  5,72:1 sobre areia
        linha: '#DED5C4',        // filete DECORATIVO apenas (1,29:1 — nunca borda funcional)
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
        display: ['clamp(2.5rem, 6vw, 3.75rem)', { lineHeight: '1.05' }],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
      },
      maxWidth: {
        conteudo: '1120px',
        prosa: '68ch',
      },
      spacing: {
        secao: 'clamp(4rem, 9vw, 7rem)',
        toque: '44px', // alvo minimo de toque
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
};
