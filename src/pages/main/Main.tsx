import { Link, RouteComponentProps } from '@reach/router';
import { InputField } from 'components/input-field';
import { Cards } from 'components/cards';
import './main.scss';
import { useCnpjs } from 'custom-hooks/use-cnpjs';
import { useCnpj } from 'custom-hooks/use-cnpj';
import { useCallback, useEffect, useState } from 'react';
import { Data } from 'types';
import 'components/blue-button/blue-button.scss';

const Main = (_props: RouteComponentProps) => {
  const { data: cnpjs } = useCnpjs();
  const [value, setValue] = useState('');
  const [dataList, setDataList] = useState<Data>([]);
  const [consult, setConsult] = useState(false);
  const setCnpj = useCallback((cnpj: string) => {
    setValue(cnpj);
  }, []);

  const { data, isLoading } = useCnpj(value, { enabled: consult });

  useEffect(() => {
    if (consult) {
      setDataList((prevState) => (data ? [...prevState, data] : prevState));
      setConsult(false);
    }
  }, [data, consult]);

  return (
    <div className="main">
      <nav className="main__nav">
        <p className="main__item">Consulta de CNPJ</p>
        <div className="main__buttons">
          <button className="main__nav-button main__nav-button--signup">
            <Link className="main__link" to="/signup">
              Cadastro
            </Link>
          </button>
          <button className="main__nav-button main__nav-button--login">
            <Link className="main__link" to="/login">
              Login
            </Link>
          </button>
        </div>
      </nav>
      <div className="main__content">
        <h1 className="main__title">Consulta de CNPJ</h1>
        <InputField
          setCnpj={setCnpj}
          cnpjs={cnpjs}
          cnpj={value}
          placeholder="CNPJ"
          className="main__input"
        />
        <button
          onClick={() => setConsult(true)}
          className="blue-button blue-button--main"
        >
          Consultar
        </button>
        <div className="main__list">
          <Cards isLoading={isLoading} data={dataList} />
        </div>
      </div>
    </div>
  );
};

export default Main;
