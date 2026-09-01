import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/*
 * A classe `js-reveal` liga o estado inicial das animações de entrada.
 *
 * É posta aqui, e não no HTML, de propósito: se o bundle falhar em carregar,
 * a classe nunca entra, o CSS não esconde nada e a página aparece inteira. O
 * caminho contrário — esconder por padrão e revelar com JS — transforma
 * qualquer erro de script numa página em branco.
 */
if (typeof IntersectionObserver !== 'undefined') {
  document.documentElement.classList.add('js-reveal');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
