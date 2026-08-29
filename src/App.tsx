/*
 * ===========================================================================
 * CLÍNICA GOYA — REGRAS QUE VALEM PARA QUEM EDITAR ESTE SITE DEPOIS
 *
 * Este é o site de uma clínica odontológica real, sujeita ao Código de Ética
 * Odontológica e às resoluções do CFO. As restrições abaixo não são
 * preferência de estilo: são norma, e descumpri-las expõe a clínica.
 *
 * NÃO INCLUA, EM NENHUMA HIPÓTESE:
 *
 *   • Imagens de "antes e depois" — vedadas a pessoa jurídica.
 *   • Qualquer promessa ou garantia de resultado de tratamento.
 *   • Preços, promoções, descontos, contagem regressiva ou gatilho de escassez.
 *   • Conteúdo que sugira diagnóstico ou orientação clínica pelo site.
 *   • O termo "especialista" ligado a área não reconhecida pelo CFO.
 *   • Superlativo não verificável ("a melhor de Cuiabá", "referência em").
 *     O argumento desta página é a nota 5,0 com 1.352 avaliações no Google,
 *     que é verificável e mais forte que qualquer adjetivo.
 *
 * E NUNCA INVENTE DADO. Especialidade, convênio, nome de profissional, CRO,
 * horário, ano de fundação, número de pacientes, prêmio ou certificação só
 * entram no site depois de confirmados pela clínica. O que falta vira
 * `{{PENDENTE: ...}}` em src/data/site.ts e é listado em PENDENCIAS.md.
 *
 * ⚠️  O SITE NÃO PODE SER PUBLICADO enquanto o CRO da clínica e o nome e CRO
 *     do responsável técnico não estiverem preenchidos. Ver Footer.tsx.
 * ===========================================================================
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FaixaConfianca } from './components/FaixaConfianca';
import { Especialidades } from './components/Especialidades';
import { Sobre } from './components/Sobre';
import { Convenios } from './components/Convenios';
import { Avaliacoes } from './components/Avaliacoes';
import { Localizacao } from './components/Localizacao';
import { Faq } from './components/Faq';
import { CtaFinal } from './components/CtaFinal';
import { Footer } from './components/Footer';
import { WhatsAppFlutuante } from './components/WhatsAppFlutuante';

export default function App() {
  return (
    <>
      <a href="#conteudo" className="link-pulo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <FaixaConfianca />
        <Especialidades />
        <Sobre />
        <Convenios />
        <Avaliacoes />
        <Localizacao />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFlutuante />
    </>
  );
}
