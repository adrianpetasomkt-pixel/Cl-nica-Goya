/*
 * ---------------------------------------------------------------------------
 * FONTE ÚNICA DE CONTEÚDO — Clínica Goya
 *
 * Nenhum texto de conteúdo pode ser escrito dentro de componente. Tudo passa
 * por aqui. Quando o cliente enviar os dados que faltam, a atualização
 * acontece neste arquivo e em mais nenhum (exceto o JSON-LD e as metatags do
 * `index.html`, que precisam ser estáticos para funcionar sem JavaScript —
 * esses estão marcados lá com o mesmo padrão `{{PENDENTE: ...}}`).
 *
 * REGRA DE OURO: só entra aqui informação confirmada pelo cliente ou pelo
 * perfil público da clínica no Google Business. Nada de valor plausível,
 * exemplo ou "algo parecido que dá para ajustar depois". Este é um site de
 * saúde sujeito a fiscalização do CRO — dado inventado gera dano real.
 * O que falta vira `{{PENDENTE: ...}}` e entra em PENDENCIAS.md.
 * ---------------------------------------------------------------------------
 */

/** Marcador de dado ainda não confirmado pelo cliente. */
export type Pendencia = `{{PENDENTE: ${string}}}`;

/** Um valor que ou está confirmado, ou é um marcador de pendência. */
export type Talvez<T> = T | Pendencia;

/** Discrimina, em runtime, se um valor ainda é um marcador de pendência. */
export function ehPendencia(valor: unknown): valor is Pendencia {
  return typeof valor === 'string' && valor.startsWith('{{PENDENTE:');
}

export const site = {
  identidade: {
    nomeFantasia: 'Clínica Goya',
    nomeCompleto: 'Goya Odonto & Saúde',
    categoria: 'Clínica odontológica',
    logotipo:
      '{{PENDENTE: logotipo da clínica em SVG ou PNG de fundo transparente, e a identidade visual (cores e tipografia oficiais)}}' as Pendencia,
  },

  contato: {
    telefone: {
      exibicao: '(65) 3322-3264',
      href: 'tel:+556533223264',
    },
    /**
     * O telefone confirmado é FIXO. Não há número de WhatsApp confirmado.
     * Enquanto isto for uma pendência, o componente `AcaoWhatsApp` renderiza
     * um botão desabilitado com o marcador visível — nunca um link quebrado.
     */
    whatsapp:
      '{{PENDENTE: número de WhatsApp da clínica — o telefone confirmado (65) 3322-3264 é fixo}}' as Talvez<string>,
  },

  endereco: {
    logradouro: 'R. Cândido Mariano, 909',
    bairro: 'Centro Norte',
    cidade: 'Cuiabá',
    uf: 'MT',
    cep: '78043-415',
    /**
     * String canônica do endereço. É exatamente esta que aparece no rodapé e
     * cujos componentes montam o PostalAddress do JSON-LD no index.html.
     * Não editar sem editar o JSON-LD junto.
     */
    completo: 'R. Cândido Mariano, 909 — Centro Norte, Cuiabá — MT, CEP 78043-415',
    referencia: 'No coração de Cuiabá, a região central da cidade.',
    geo: {
      latitude:
        '{{PENDENTE: latitude da clínica, em graus decimais, para o JSON-LD e o mapa}}' as Talvez<string>,
      longitude:
        '{{PENDENTE: longitude da clínica, em graus decimais, para o JSON-LD e o mapa}}' as Talvez<string>,
    },
    perfilGoogle:
      '{{PENDENTE: URL do perfil da clínica no Google Business, para o link "ver avaliações no Google"}}' as Talvez<string>,
  },

  provaSocial: {
    nota: '5,0',
    totalAvaliacoes: 1352,
    totalAvaliacoesTexto: '1.352',
    fonte: 'Google',
  },

  horario: {
    /** Único dia confirmado pelo perfil do Google. */
    confirmado: [
      {
        dia: 'Segunda-feira',
        abertura: '07:00',
        fechamento:
          '{{PENDENTE: horário de fechamento da segunda-feira}}' as Talvez<string>,
      },
    ],
    pendenciaSemana:
      '{{PENDENTE: horário completo de funcionamento, de segunda a sábado, incluindo se há intervalo de almoço e se abre aos sábados}}' as Pendencia,
  },

  especialidades: {
    /**
     * O texto institucional oficial confirma que a clínica "atende a diversas
     * especialidades odontológicas" — mas NÃO diz quais. Enquanto a lista real
     * não chegar, este array fica vazio e a seção renderiza a pendência.
     * Não preencher com especialidades plausíveis.
     */
    lista: [] as { nome: string; descricao: string }[],
    pendencia:
      '{{PENDENTE: lista real das especialidades odontológicas atendidas na clínica — apenas as reconhecidas pelo CFO e efetivamente oferecidas}}' as Pendencia,
  },

  convenios: {
    /**
     * Confirmado: a clínica atende "por convênio e particular". Quais convênios,
     * não sabemos. Array vazio até o cliente enviar a lista.
     */
    lista: [] as { nome: string }[],
    pendencia:
      '{{PENDENTE: lista real dos convênios odontológicos aceitos pela clínica}}' as Pendencia,
  },

  sobre: {
    /**
     * Reescrita do texto institucional oficial da clínica, mantendo o sentido.
     * Os três fatos que dele se extraem — múltiplas especialidades, convênio e
     * particular, público de trabalhadores e empresários do centro com suas
     * famílias — são os únicos usados. Nada além disso.
     */
    paragrafos: [
      'A Goya Odonto & Saúde fica no coração de Cuiabá e recebe pacientes de toda a região. É um espaço voltado para a saúde e o bem-estar, com atendimento em diversas especialidades odontológicas, por convênio e particular.',
      'Boa parte de quem chega aqui trabalha no centro. São comerciantes, empresários e funcionários que resolvem o dente no intervalo do expediente, num endereço que já está no caminho. Quando o atendimento resolve, eles voltam trazendo a família — e é assim que a clínica cresceu.',
      'Os profissionais que atendem na Goya têm experiência relevante em suas áreas.',
    ],
  },

  /*
   * Fotos reais da clínica. O texto alternativo é conteúdo e mora aqui; os
   * caminhos e as dimensões são gerados por `npm run imagens` em
   * src/data/fotos.gerado.ts.
   *
   * `nome` casa com o arquivo em fotos-originais/ (sem extensão). Enquanto o
   * arquivo não existir, o componente <Foto> cai no espaço reservado sozinho.
   */
  fotos: {
    recepcao: {
      nome: 'recepcao',
      alt: 'Recepção da Clínica Goya: balcão claro ripado, o logotipo Goya Odonto & Saúde na parede e um arranjo de flores sobre o balcão.',
      pendencia:
        '{{PENDENTE: arquivo da foto da recepção em fotos-originais/recepcao.jpg, na maior resolução disponível}}' as Pendencia,
    },
    consultorio: {
      nome: 'consultorio',
      alt: 'Consultório da Clínica Goya: cadeira odontológica com equipo e bancada branca, ao lado de uma janela com plantas.',
      pendencia:
        '{{PENDENTE: arquivo da foto do consultório em fotos-originais/consultorio.jpg, na maior resolução disponível}}' as Pendencia,
    },
    equipe:
      '{{PENDENTE: foto da equipe da clínica, com autorização de uso de imagem dos profissionais}}' as Pendencia,
  },

  /**
   * Avaliações reais publicadas no Google, reproduzidas literalmente e
   * atribuídas à fonte. É PROIBIDO editar o texto ou acrescentar outras.
   */
  avaliacoes: [
    {
      texto: 'Clinica linda, ambiente ótimo, pessoas maravilhas, atendimento impecável',
      fonte: 'Google',
    },
    {
      texto:
        'Desde a entrada na recepção, tratamento clínico, conclusão, tudo de excelência!',
      fonte: 'Google',
    },
    {
      texto: 'Levo minha família aqui por confiar no profissionalismo da equipe.',
      fonte: 'Google',
    },
  ],

  /**
   * Só perguntas que podem ser respondidas com dado confirmado. Nenhuma
   * resposta clínica, nenhum diagnóstico, nenhuma orientação de tratamento.
   */
  faq: [
    {
      pergunta: 'Onde fica a Clínica Goya?',
      resposta:
        'Na R. Cândido Mariano, 909 — Centro Norte, Cuiabá — MT, CEP 78043-415. É no centro da cidade.',
      pendencia: null,
    },
    {
      pergunta: 'A clínica atende por convênio?',
      resposta:
        'Sim. O atendimento é por convênio e particular. A relação dos convênios aceitos é:',
      pendencia:
        '{{PENDENTE: lista real dos convênios odontológicos aceitos, para responder esta pergunta}}' as Talvez<null>,
    },
    {
      pergunta: 'Quais especialidades a clínica atende?',
      resposta: 'A clínica atende diversas especialidades odontológicas. A relação é:',
      pendencia:
        '{{PENDENTE: lista real das especialidades atendidas, para responder esta pergunta}}' as Talvez<null>,
    },
    {
      pergunta: 'Qual o horário de funcionamento?',
      resposta: 'Às segundas-feiras a clínica abre às 07:00. O horário completo da semana é:',
      pendencia:
        '{{PENDENTE: horário completo de funcionamento, de segunda a sábado}}' as Talvez<null>,
    },
    {
      pergunta: 'Como faço para marcar uma consulta?',
      resposta:
        'Pelo telefone (65) 3322-3264. O agendamento é feito por telefone ou WhatsApp — não há marcação pelo site.',
      pendencia: null,
    },
  ],

  /**
   * Dados de exibição obrigatória em material de divulgação de pessoa jurídica
   * da odontologia (Código de Ética Odontológica / resoluções do CFO).
   * O SITE NÃO PODE IR AO AR SEM ELES. Ver comentário no topo de App.tsx.
   */
  legal: {
    croClinica:
      '{{PENDENTE: número de inscrição da clínica no CRO-MT — obrigatório por norma do CFO para publicidade de pessoa jurídica}}' as Talvez<string>,
    responsavelTecnico:
      '{{PENDENTE: nome completo do responsável técnico da clínica — obrigatório por norma do CFO}}' as Talvez<string>,
    croResponsavelTecnico:
      '{{PENDENTE: número de CRO do responsável técnico — obrigatório por norma do CFO}}' as Talvez<string>,
    razaoSocial: '{{PENDENTE: razão social da empresa}}' as Talvez<string>,
    cnpj: '{{PENDENTE: CNPJ da empresa}}' as Talvez<string>,
  },

  redes: {
    instagram: '{{PENDENTE: URL do Instagram da clínica, se houver}}' as Talvez<string>,
    facebook: '{{PENDENTE: URL do Facebook da clínica, se houver}}' as Talvez<string>,
  },

  navegacao: [
    { rotulo: 'Especialidades', href: '#especialidades' },
    { rotulo: 'A clínica', href: '#sobre' },
    { rotulo: 'Convênios', href: '#convenios' },
    { rotulo: 'Avaliações', href: '#avaliacoes' },
    { rotulo: 'Onde fica', href: '#localizacao' },
    { rotulo: 'Dúvidas', href: '#faq' },
  ],
} as const;

export type Site = typeof site;
