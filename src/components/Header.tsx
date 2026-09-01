import { useEffect, useState } from 'react';
import { site } from '../data/site';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';

/**
 * Header fixo.
 *
 * Duas decisões que valem para o celular:
 *
 * 1. O telefone NUNCA entra no menu hambúrguer. Fica na barra, sempre visível,
 *    em qualquer largura. Enterrar o contato dentro de dois toques é o erro
 *    mais caro que um site de clínica comete.
 * 2. O fundo começa transparente sobre o hero escuro e só ganha cor depois de
 *    rolar. Sem isso, uma barra sólida corta a primeira dobra em duas.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

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
    <header
      className={`sobre-escuro fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        rolou || aberto ? 'border-b border-osso/10 bg-noite/95 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-conteudo flex items-center justify-between gap-4 py-3">
        <a
          href="#inicio"
          className="alvo-toque shrink-0 flex-col items-start justify-center gap-0 text-left"
        >
          {/*
            Logotipo pendente. Até ele chegar, a marca é tipográfica: o nome em
            Fraunces com o tracking aberto. É uma solução de design, não um
            espaço vazio — e não é um ícone de dente genérico.
          */}
          <span className="font-display text-xl font-bold leading-none tracking-tight text-osso">
            {site.identidade.nomeFantasia}
          </span>
          <span className="mt-0.5 hidden text-[0.62rem] uppercase tracking-[0.3em] text-champanhe sm:block">
            Odontologia Premium
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="alvo-toque whitespace-nowrap rounded px-3 text-sm font-medium text-osso/85 transition-colors hover:text-champanhe"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/*
            Abaixo de 400px o número completo não cabe ao lado do botão de
            menu, então o rótulo visível encurta para "Ligar". O nome acessível
            do link continua sendo o número inteiro.
          */}
          <AcaoTelefone
            variante="primario"
            className="!px-4 !py-2.5 text-sm sm:!px-6"
            rotulo={
              <>
                <span className="min-[420px]:hidden">Ligar</span>
                <span className="hidden whitespace-nowrap min-[420px]:inline">
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
            className="alvo-toque w-toque rounded border border-osso/35 text-osso transition-colors hover:border-osso lg:hidden"
          >
            <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {aberto ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/*
        Menu mobile. Fecha ao escolher um item — deixar o painel aberto sobre a
        seção recém-ancorada é o defeito clássico de menu de template.
      */}
      <nav
        id="menu-mobile"
        aria-label="Seções da página"
        hidden={!aberto}
        className="border-t border-osso/10 bg-noite lg:hidden"
      >
        <ul className="container-conteudo flex flex-col py-3">
          {site.navegacao.map((item) => (
            <li key={item.href} className="border-b border-osso/10 last:border-0">
              <a
                href={item.href}
                onClick={() => setAberto(false)}
                className="alvo-toque w-full justify-between rounded px-1 py-1 text-base font-medium text-osso"
              >
                {item.rotulo}
                <span aria-hidden="true" className="text-champanhe">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="container-conteudo pb-5">
          <AcaoWhatsApp variante="secundario-escuro" className="w-full" />
        </div>
      </nav>
    </header>
  );
}
