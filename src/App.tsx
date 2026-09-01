/*
 * ===========================================================================
 * RIZZIT ODONTOLOGIA PREMIUM — REGRAS PARA QUEM EDITAR ESTE SITE DEPOIS
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
 *   • Nome ou foto de profissional sem o número de CRO junto.
 *
 * E NUNCA INVENTE DADO. Tratamento, nome de profissional, CRO, horário,
 * número de pacientes, prêmio, certificação, equipamento ou nota de avaliação
 * só entram depois de confirmados pela clínica. O que falta vira
 * `{{PENDENTE: ...}}` em src/data/site.ts e é listado em PENDENCIAS.md.
 *
 * ⚠️  O SITE NÃO PODE SER PUBLICADO enquanto o CRO da clínica e o nome e CRO
 *     do responsável técnico não estiverem preenchidos. Ver Footer.tsx.
 *
 * A DEMONSTRAÇÃO (`npm run demo`) pode ser apresentada como está: ela não
 * está no ar, não é material de divulgação, e carrega a faixa de aviso.
 * ===========================================================================
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Fatos } from './components/Fatos';
import { Sobre } from './components/Sobre';
import { Tratamentos } from './components/Tratamentos';
import { Estrutura } from './components/Estrutura';
import { Equipe } from './components/Equipe';
import { Prova } from './components/Prova';
import { Localizacao } from './components/Localizacao';
import { Faq } from './components/Faq';
import { CtaFinal } from './components/CtaFinal';
import { Footer } from './components/Footer';
import { WhatsAppFlutuante } from './components/WhatsAppFlutuante';
import { FaixaDemo } from './components/FaixaDemo';

/*
 * A ordem das seções é a jornada de conversão, e cada passo tem uma função:
 *
 *   Hero        quem é, onde fica, o que fazer agora
 *   Fatos       os três fatos verificáveis, para ancorar a confiança cedo
 *   Sobre       contexto da clínica
 *   Tratamentos o que o visitante veio procurar
 *   Estrutura   a prova visual do "premium" do nome
 *   Equipe      quem vai atender (com CRO)
 *   Prova       o que outros pacientes dizem
 *   Localização o obstáculo prático: dá para chegar?
 *   FAQ         as últimas objeções
 *   CTA final   a decisão
 */
export default function App() {
  return (
    <>
      <a href="#conteudo" className="link-pulo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Fatos />
        <Sobre />
        <Tratamentos />
        <Estrutura />
        <Equipe />
        <Prova />
        <Localizacao />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFlutuante />
      <FaixaDemo />
    </>
  );
}
