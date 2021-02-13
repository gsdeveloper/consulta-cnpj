import { Redirect, RouteComponentProps } from '@reach/router';
import { Consult } from 'components/consult';
import { useDocTitle } from 'custom-hooks/use-doc-title';
import './details.scss';

const Details = (_props: RouteComponentProps) => {
  useDocTitle('Consulta de CNPJ com mais dados');

  return localStorage.getItem('TOKEN') ? (
    <Consult type="details" />
  ) : (
    <Redirect from="/details" to="/signup" noThrow />
  );
};

export default Details;
