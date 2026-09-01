import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build normal do site. `__MODO_DEMO__` fica falso: sem faixa de aviso e com
// os espaços reservados no modo "andaime", que é o certo para produção.
export default defineConfig({
  plugins: [react()],
  define: { __MODO_DEMO__: 'false' },
});
