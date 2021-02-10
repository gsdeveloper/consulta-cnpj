import axios from 'axios';
import { useQuery } from 'react-query';
import { Cnpj } from 'types';

const getCnpj = async (cnpj: string) => {
  const { data } = await axios.get(`http://127.0.0.1:7360/cnpj/get/${cnpj}`);
  return data;
};

const useCnpj = (cnpj: string, options?: any) =>
  useQuery<Cnpj, Error>(['cnpj', cnpj], () => getCnpj(cnpj), {
    ...options,
  });

export default useCnpj;
