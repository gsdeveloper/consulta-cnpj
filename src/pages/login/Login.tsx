import { RouteComponentProps } from '@reach/router';
import { Sign } from 'components/sign';
import { useDocTitle } from 'custom-hooks/use-doc-title';

const Login = (_props: RouteComponentProps) => {
  useDocTitle('Consulta de CNPJ | Login');

  return <Sign type="login" />;
};

export default Login;
