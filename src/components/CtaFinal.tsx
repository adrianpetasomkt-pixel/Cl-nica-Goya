import { site } from '../data/site';
import { AcaoTelefone, AcaoWhatsApp } from './ui/Acoes';

/**
 * Fechamento: os dois caminhos de contato, repetidos. Não existe formulário —
 * ele exigiria backend, tratamento de dado pessoal de paciente sob a LGPD e
 * alguém checando a caixa de entrada. Ligação e WhatsApp resolvem melhor.
 */
export function CtaFinal() {
  return (
    <section className="sobre-escuro bg-tinta py-secao text-areia" aria-labelledby="titulo-cta">
      <div className="container-conteudo max-w-prosa text-center">
        <span className="regua mx-auto mb-6" aria-hidden="true" />
        <h2 id="titulo-cta" className="text-h2 font-semibold text-areia">
          Fale com a {site.identidade.nomeFantasia}
        </h2>
        <p className="mx-auto mt-5 text-lead text-areia/85">
          O agendamento é por telefone. Ligue e a recepção confirma o convênio, a especialidade e o
          horário disponível.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <AcaoTelefone variante="primario" />
          <AcaoWhatsApp variante="secundario-escuro" escuro className="items-center" />
        </div>

        <p className="mt-8 text-sm text-areia/70">
          {site.endereco.completo}
        </p>
      </div>
    </section>
  );
}
