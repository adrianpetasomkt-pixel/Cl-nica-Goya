/*
 * ---------------------------------------------------------------------------
 * FONTE ÚNICA DE CONTEÚDO — RIZZIT ODONTOLOGIA PREMIUM
 *
 * Nenhum texto de conteúdo pode ser escrito dentro de componente. Tudo passa
 * por aqui. Quando o cliente aprovar a demonstração e enviar os dados, a
 * atualização acontece neste arquivo e em mais nenhum (exceto o JSON-LD e as
 * metatags do `index.html`, que precisam ser estáticos para funcionar sem
 * JavaScript — esses estão marcados lá com o mesmo padrão).
 *
 * REGRA DE OURO: todo valor aqui é de um destes três tipos, e o tipo é
 * explícito no código:
 *
 *   CONFIRMADO  — valor direto. Verificado em fonte pública, com fonte anotada
 *                 no comentário. Ver rizzit/PESQUISA-RIZZIT.md.
 *   PRESUMIDO   — `presumir(valor, motivo)`. Usado na demonstração para ela
 *                 funcionar, mas NÃO verificado. Aparece marcado no relatório
 *                 `npm run pendencias` e precisa de confirmação antes do ar.
 *   PENDENTE    — `{{PENDENTE: ...}}`. Não temos, e o site não finge que tem.
 *                 A interface reserva o espaço e o mostra como espaço reservado.
 *
 * Nada de valor plausível, exemplo ou "algo parecido que dá para ajustar
 * depois". Este é um site de saúde sujeito à fiscalização do CRO — dado
 * inventado gera dano real, a pacientes e à clínica.
 * ---------------------------------------------------------------------------
 */

/** Marcador de dado que a clínica ainda não forneceu. */
export type Pendencia = `{{PENDENTE: ${string}}}`;

/** Dado usado na demonstração sem verificação — precisa de confirmação. */
export type Presuncao<T> = { readonly presumido: true; readonly valor: T; readonly motivo: string };

/** Um valor que ou está confirmado, ou é um marcador de pendência. */
export type Talvez<T> = T | Pendencia;

/** Discrimina, em runtime, se um valor ainda é um marcador de pendência. */
export function ehPendencia(valor: unknown): valor is Pendencia {
  return typeof valor === 'string' && valor.startsWith('{{PENDENTE:');
}

/** Discrimina, em runtime, um valor presumido para a demonstração. */
export function ehPresuncao<T>(valor: unknown): valor is Presuncao<T> {
  return typeof valor === 'object' && valor !== null && 'presumido' in valor;
}

/**
 * Marca um valor como usado-porém-não-verificado.
 *
 * Existe para que a demonstração possa ter um botão de WhatsApp que abre de
 * verdade sem que isso vire uma afirmação de que o número está confirmado. O
 * `motivo` é lido pelo relatório de pendências e pela faixa da demonstração.
 */
function presumir<T>(valor: T, motivo: string): Presuncao<T> {
  return { presumido: true, valor, motivo };
}

export const site = {
  /**
   * `true` só no build de demonstração (`npm run demo`). Liga a faixa de aviso
   * do topo e troca os espaços reservados do modo "andaime" (deliberadamente
   * feios, para produção) pelo modo "vitrine" (desenhados, para apresentar).
   * Ver src/components/ui/Placeholder.tsx.
   */
  modoDemo: __MODO_DEMO__,

  identidade: {
    // CONFIRMADO — Instagram @rizzitodonto, Facebook, registros de CNPJ.
    nomeFantasia: 'Rizzit',
    nomeCompleto: 'Rizzit Odontologia Premium',
    categoria: 'Clínica odontológica',
    // CONFIRMADO — registros de CNPJ (Serasa, Econodata, Casa dos Dados, cnpj.biz).
    razaoSocial: 'RIZZIT ODONTOLOGIA PREMIUM LTDA',
    cnpj: '41.500.681/0001-34',
    /** CONFIRMADO — data de abertura no registro: 08/04/2021. */
    desde: 2021,
    logotipo:
      '{{PENDENTE: logotipo da Rizzit em vetor (SVG/AI/PDF) ou PNG de fundo transparente, e as cores oficiais da marca em hexadecimal}}' as Pendencia,
  },

  contato: {
    telefone: {
      // CONFIRMADO — mesmo número em 5 diretórios independentes.
      exibicao: '(65) 98150-6894',
      href: 'tel:+5565981506894',
    },
    /**
     * PRESUMIDO. O número confirmado é um CELULAR, então o WhatsApp é
     * plausível — mas plausível não é confirmado, e ninguém da clínica
     * confirmou que este é o canal de agendamento. Fica ativo para a
     * demonstração funcionar no celular do cliente, e marcado como presunção
     * em `npm run pendencias`.
     */
    whatsapp: presumir(
      '5565981506894',
      'o número (65) 98150-6894 é celular e aparece como contato público da clínica, mas ninguém confirmou que ele atende WhatsApp nem que é o canal de agendamento',
    ),
  },

  endereco: {
    // CONFIRMADO — 5 fontes independentes concordam, incluindo quadra e lote.
    logradouro: 'Rua das Dálias, 582',
    complemento: 'Quadra 51, Lote 03',
    bairro: 'Jardim Cuiabá',
    cidade: 'Cuiabá',
    uf: 'MT',
    cep: '78043-152',
    /**
     * String canônica do endereço. É exatamente esta que aparece no rodapé e é
     * a base do PostalAddress do JSON-LD no index.html.
     * Não editar sem editar o JSON-LD junto.
     */
    completo: 'Rua das Dálias, 582 — Quadra 51, Lote 03, Jardim Cuiabá, Cuiabá — MT, CEP 78043-152',
    geo: {
      latitude:
        '{{PENDENTE: latitude da clínica em graus decimais, para o JSON-LD}}' as Talvez<string>,
      longitude:
        '{{PENDENTE: longitude da clínica em graus decimais, para o JSON-LD}}' as Talvez<string>,
    },
    perfilGoogle:
      '{{PENDENTE: link do perfil da clínica no Google Business, para o botão "como chegar" e para a nota de avaliações}}' as Talvez<string>,
  },

  /**
   * Fatos verificados que sustentam a primeira dobra.
   *
   * NÃO existe bloco de nota do Google nesta página, de propósito: a nota e a
   * quantidade de avaliações não foram obtidas na pesquisa. Inventar número de
   * avaliação é a fraude mais fácil de flagrar e a que mais destrói confiança.
   * O espaço está reservado na seção de prova, marcado.
   */
  fatos: [
    { valor: 'Jardim Cuiabá', rotulo: 'Cuiabá — MT' },
    { valor: 'Desde 2021', rotulo: 'Em atividade' },
    { valor: '@rizzitodonto', rotulo: 'No Instagram' },
  ],

  provaSocial: {
    pendenciaNota:
      '{{PENDENTE: nota média e quantidade de avaliações no perfil do Google Business — não foi possível obter na pesquisa}}' as Pendencia,
    pendenciaDepoimentos:
      '{{PENDENTE: 3 a 5 avaliações reais de pacientes que possam ser citadas, com a origem verificável (print do Google)}}' as Pendencia,
  },

  horario: {
    pendencia:
      '{{PENDENTE: horário de atendimento por dia da semana, incluindo se há intervalo e se abre aos sábados}}' as Pendencia,
  },

  tratamentos: {
    /**
     * VAZIO DE PROPÓSITO, E ISTO NÃO É UM ESQUECIMENTO.
     *
     * A pesquisa não confirmou UM ÚNICO tratamento oferecido pela clínica. O
     * único dado público é o CNAE genérico "atividade odontológica". Implante,
     * lente de contato, clareamento, ortodontia e harmonização são comuns no
     * setor — e é exatamente por isso que preenchê-los aqui seria inventar.
     *
     * Enquanto a lista real não chegar, a seção mostra o módulo vazio.
     */
    lista: [] as { nome: string; descricao: string }[],
    pendencia:
      '{{PENDENTE: lista dos tratamentos efetivamente oferecidos, com o nome que a clínica usa para cada um. Só entram os que a clínica confirmar}}' as Pendencia,
  },

  equipe: {
    /**
     * VAZIO DE PROPÓSITO. Nenhum profissional foi confirmado.
     *
     * Norma do CFO: profissional só pode ser divulgado com nome e número de
     * CRO. Sem CRO, não entra — nem como "Dra. Fulana" genérica, nem com foto
     * de banco de imagens.
     */
    lista: [] as { nome: string; cro: string; funcao: string }[],
    pendencia:
      '{{PENDENTE: nome completo, número de CRO (com UF) e função de cada profissional que a clínica quiser divulgar. Sem CRO o profissional não pode ser publicado}}' as Pendencia,
  },

  sobre: {
    /**
     * Só o que a pesquisa confirmou. São três fatos: é clínica odontológica,
     * fica no Jardim Cuiabá em Cuiabá, e está em atividade desde abril de 2021.
     * Mais do que isso é texto que a clínica precisa escrever ou aprovar.
     */
    paragrafos: [
      'A Rizzit Odontologia Premium é uma clínica odontológica em Cuiabá, no Jardim Cuiabá, na Rua das Dálias. Está em atividade desde abril de 2021.',
    ],
    pendencia:
      '{{PENDENTE: texto institucional da clínica — história, posicionamento, o que a diferencia e como ela quer ser descrita. Este é o texto que o proprietário precisa aprovar palavra por palavra}}' as Pendencia,
  },

  /*
   * Fotos reais da clínica. O texto alternativo é conteúdo e mora aqui; os
   * caminhos e as dimensões são gerados por `npm run imagens` em
   * src/data/fotos.gerado.ts.
   *
   * `nome` casa com o arquivo em fotos-originais/ (sem extensão). Enquanto o
   * arquivo não existir, o componente <Foto> cai no espaço reservado sozinho.
   *
   * NENHUMA foto da clínica foi obtida na pesquisa — o Instagram e o Google
   * Business estão bloqueados neste ambiente. Todos os espaços abaixo estão
   * reservados, nenhum tem imagem de banco fingindo ser a clínica.
   */
  fotos: {
    fachada: {
      nome: 'fachada',
      alt: 'Fachada da Rizzit Odontologia Premium na Rua das Dálias, no Jardim Cuiabá.',
      titulo: 'Fachada',
      descricao: 'A entrada na Rua das Dálias, de frente, com a identificação da clínica visível.',
      pendencia:
        '{{PENDENTE: foto da fachada em fotos-originais/fachada.jpg, na maior resolução disponível}}' as Pendencia,
    },
    recepcao: {
      nome: 'recepcao',
      alt: 'Recepção da Rizzit Odontologia Premium.',
      titulo: 'Recepção',
      descricao: 'O primeiro ambiente que o paciente vê. É a foto que mais pesa na primeira dobra.',
      pendencia:
        '{{PENDENTE: foto da recepção em fotos-originais/recepcao.jpg, na maior resolução disponível}}' as Pendencia,
    },
    consultorio: {
      nome: 'consultorio',
      alt: 'Consultório da Rizzit Odontologia Premium.',
      titulo: 'Consultório',
      descricao: 'Um consultório arrumado e vazio, com boa luz. Sem paciente e sem profissional.',
      pendencia:
        '{{PENDENTE: foto do consultório em fotos-originais/consultorio.jpg, na maior resolução disponível}}' as Pendencia,
    },
    ambiente: {
      nome: 'ambiente',
      alt: 'Ambiente interno da Rizzit Odontologia Premium.',
      titulo: 'Detalhe',
      descricao: 'Um detalhe do acabamento, da espera ou do corredor. É o que sustenta o "premium".',
      pendencia:
        '{{PENDENTE: foto de um detalhe do ambiente em fotos-originais/ambiente.jpg, na maior resolução disponível}}' as Pendencia,
    },
    equipe: {
      nome: 'equipe',
      alt: 'Equipe da Rizzit Odontologia Premium.',
      titulo: 'Equipe',
      descricao: 'Retrato da equipe. Exige autorização de uso de imagem por escrito de cada pessoa.',
      pendencia:
        '{{PENDENTE: foto da equipe em fotos-originais/equipe.jpg, com autorização de uso de imagem assinada por cada profissional}}' as Pendencia,
    },
  },

  /**
   * Perguntas que podem ser respondidas com dado confirmado. Nenhuma resposta
   * clínica, nenhum diagnóstico, nenhuma orientação de tratamento.
   */
  faq: [
    {
      pergunta: 'Onde fica a Rizzit?',
      resposta:
        'Na Rua das Dálias, 582 — Quadra 51, Lote 03, no Jardim Cuiabá, em Cuiabá (MT). O CEP é 78043-152.',
      pendencia: null,
    },
    {
      pergunta: 'Como faço para agendar?',
      resposta:
        'Pelo telefone (65) 98150-6894. O agendamento é feito por contato direto — não há marcação pelo site.',
      pendencia: null,
    },
    {
      pergunta: 'Desde quando a clínica funciona?',
      resposta: 'A Rizzit Odontologia Premium está em atividade desde abril de 2021.',
      pendencia: null,
    },
    {
      pergunta: 'Quais tratamentos a clínica oferece?',
      resposta: 'A relação dos tratamentos oferecidos é:',
      pendencia:
        '{{PENDENTE: lista dos tratamentos oferecidos, para responder esta pergunta}}' as Talvez<null>,
    },
    {
      pergunta: 'Qual o horário de atendimento?',
      resposta: 'O horário de atendimento da semana é:',
      pendencia:
        '{{PENDENTE: horário de atendimento por dia da semana, para responder esta pergunta}}' as Talvez<null>,
    },
  ],

  /**
   * Dados de exibição obrigatória em material de divulgação de pessoa jurídica
   * da odontologia (Código de Ética Odontológica / resoluções do CFO).
   * O SITE NÃO PODE IR AO AR SEM ELES. Ver o bloco no topo de App.tsx.
   */
  legal: {
    croClinica:
      '{{PENDENTE: número de inscrição da clínica no CRO-MT — exibição obrigatória por norma do CFO para pessoa jurídica}}' as Talvez<string>,
    responsavelTecnico:
      '{{PENDENTE: nome completo do responsável técnico da clínica — exibição obrigatória por norma do CFO}}' as Talvez<string>,
    croResponsavelTecnico:
      '{{PENDENTE: número de CRO do responsável técnico — exibição obrigatória por norma do CFO}}' as Talvez<string>,
  },

  redes: {
    // CONFIRMADO — perfil @rizzitodonto, ~2.383 seguidores.
    instagram: { usuario: '@rizzitodonto', url: 'https://www.instagram.com/rizzitodonto/' },
    facebook:
      '{{PENDENTE: link exato da página oficial no Facebook — a página existe, mas o endereço não pôde ser verificado nesta pesquisa}}' as Talvez<string>,
  },

  navegacao: [
    { rotulo: 'A clínica', href: '#sobre' },
    { rotulo: 'Tratamentos', href: '#tratamentos' },
    { rotulo: 'Estrutura', href: '#estrutura' },
    { rotulo: 'Equipe', href: '#equipe' },
    { rotulo: 'Onde fica', href: '#localizacao' },
    { rotulo: 'Dúvidas', href: '#faq' },
  ],
} as const;

export type Site = typeof site;
