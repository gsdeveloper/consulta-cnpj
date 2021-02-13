import { RouteComponentProps } from '@reach/router';
import { Sign } from 'components/sign';
import useDocTitle from 'custom-hooks/use-doc-title/useDocTitle';
const Signup = (_props: RouteComponentProps) => {
  useDocTitle('Consulta de CNPJ | Registrar-se');
  return <Sign type="signup" />;
};

export default Signup;
