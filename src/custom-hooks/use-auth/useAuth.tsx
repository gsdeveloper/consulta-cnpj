import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from 'utils/types';

const postAuth = async ({ email, password, req }: User) => {
  try {
    const { data } = await axios.post(`http://127.0.0.1:7360/${req}`, {
      email,
      password,
    });
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

const useAuth = ({ email, password, req }: User, options: any) =>
  useQuery<string, Error>(
    [`${req}`, { email, password }],
    () => postAuth({ email, password, req }),
    { ...options, retry: false }
  );

export default useAuth;
