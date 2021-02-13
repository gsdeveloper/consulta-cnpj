import axios from 'axios';
import { useQuery } from 'react-query';
import { DetailsCnpj } from 'utils/types';

type CnpjOptions = {
  cnpj: string;
  type: 'main' | 'details';
};

const getCnpj = async ({ cnpj, type }: CnpjOptions) => {
  const token = localStorage.getItem('TOKEN');
  if (type === 'details') {
    axios.defaults.headers['x-api-key'] = token;
  }
  const { data } = await axios.get(
    `http://127.0.0.1:7360/cnpj/${
      type === 'main' ? 'get/' + cnpj : 'get/' + cnpj + '/detail'
    }`
  );
  return data;
};

const useCnpj = ({ cnpj, type }: CnpjOptions, options?: any) =>
  useQuery<DetailsCnpj, Error>(['cnpj', cnpj], () => getCnpj({ cnpj, type }), {
    ...options,
  });

export default useCnpj;
