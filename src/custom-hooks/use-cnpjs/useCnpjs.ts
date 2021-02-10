import axios from 'axios';
import { useQuery } from 'react-query';

const getCnpjs = async () => {
  const { data } = await axios.get('http://127.0.0.1:7360/cnpj/get-all');
  return data;
};

const useCnpjs = () => {
  return useQuery<string[], Error>('cnpjs', getCnpjs);
};

export default useCnpjs;
