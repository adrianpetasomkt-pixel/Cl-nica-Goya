import { useEffect, useState } from 'react';
import { site } from '../data/site';
import { AcaoTelefone } from './ui/Acoes';

/**
 * Header fixo.
 *
 * Regra do briefing: no mobile o telefone NÃO pode sumir dentro do menu
 * hambúrguer. Ele fica na barra, sempre visível, ao lado do botão de menu.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);

  // Escape fecha o menu — quem abriu com teclado precisa conseguir sair dele.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  return (
    <header className="sobre-escuro fixed inset-x-0 top-0 z-50 border-b border-verde bg-verde">
      <div className="container-conteudo flex items-center justify-between gap-4 py-3">
        {/* Logotipo — pendente. Espaço reservado e evidente, não um ícone de dente. */}
        <a
          href="#inicio"
          className="alvo-toque shrink-0 flex-col items-start justify-center gap-0 text-left"
        >
          <span className="font-display text-lg font-bold leading-none text-areia min-[400px]:text-xl">
            {site.identidade.nomeFantasia}
          </span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-areia/70 sm:block">
            {site.identidade.nomeCompleto}
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="alvo-toque whitespace-nowrap rounded px-3 text-sm font-medium text-areia transition-colors hover:text-ocre-claro"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Telefone sempre visível, em qualquer largura. */}
          {/*
            O telefone fica na barra em QUALQUER largura — nunca dentro do
            hambúrguer. Abaixo de 400px o número completo não cabe ao lado do
            botão de menu, então o rótulo visível encurta; o nome acessível do
            link continua sendo o número inteiro.
          */}
          <AcaoTelefone
            variante="primario"
            className="!px-3 text-sm sm:!px-5 sm:text-base"
            rotulo={
              <>
                <span className="min-[400px]:hidden">Ligar</span>
                <span className="hidden whitespace-nowrap min-[400px]:inline">
                  {site.contato.telefone.exibicao}
                </span>
              </>
            }
          />

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="alvo-toque w-toque rounded border-2 border-areia/50 text-areia lg:hidden"
          >
            <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {aberto ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Seções da página"
        hidden={!aberto}
        className="border-t border-areia/20 bg-verde lg:hidden"
      >
        <ul className="container-conteudo flex flex-col py-2">
          {site.navegacao.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setAberto(false)}
                className="alvo-toque w-full justify-start rounded px-1 text-base font-medium text-areia"
              >
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
