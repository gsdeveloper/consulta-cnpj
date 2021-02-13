
const detailsCnpj = {
  atividade_principal: [
    {
      text:
        'Comércio varejista de cosméticos, produtos de perfumaria e de higiene pessoal',
      code: '47.72-5-00',
    },
  ],
  data_situacao: '15/02/2005',
  complemento: 'B',
  nome: 'MYRRA - COMERCIO DE PERFUMES & COSMETICOS LTDA',
  uf: 'PA',
  atividades_secundarias: [
    {
      text:
        'Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente',
      code: '82.99-7-99',
    },
  ],
  qsa: [
    {
      qual: '49-Sócio-Administrador',
      nome: 'AURICELIA MARIA PAULO DE FARIAS DO VALE',
    },
    {
      qual: '49-Sócio-Administrador',
      nome: 'WILSON BORGES DO VALE JUNIOR',
    },
  ],
  situacao: 'ATIVA',
  bairro: 'BOM REMEDIO',
  logradouro: 'TR JOAO PESSOA',
  numero: '1708',
  cep: '68.180-630',
  municipio: 'ITAITUBA',
  abertura: '15/02/2005',
  natureza_juridica: '206-2 - Sociedade Empresária Limitada',
  fantasia: 'O BOTICARIO PRODUTOS NATURAIS',
  cnpj: '07.215.389/0001-31',
  tipo: 'MATRIZ',
  email: '',
  telefone: '',
  motivo_situacao: '',
  situacao_especial: '',
  capital_social: '30000.00',
};
export type DetailsCnpj = typeof detailsCnpj;
export type DataDetailsCnpj = typeof detailsCnpj[];


export type Cnpj = {
  nome: string;
  cnpj: string;
  fantasia: string;
};

export type Data = typeof detailsCnpj[];

export type User = {
  email: string;
  password: string;
  req: 'login' | 'signup';
};
