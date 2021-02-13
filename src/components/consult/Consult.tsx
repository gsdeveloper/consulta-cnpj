import { useCnpj } from 'custom-hooks/use-cnpj';
import { useCnpjs } from 'custom-hooks/use-cnpjs';
import { useState, useCallback, useEffect } from 'react';
import { DataDetailsCnpj } from 'utils/types';
import { Cards } from 'components/cards';
import { Nav } from 'components/nav';
import { InputField } from 'components/input-field';
import 'components/blue-button/blue-button.scss';

const Consult = ({ type }: { type: 'main' | 'details' }) => {
  const { data: cnpjs } = useCnpjs();
  const [value, setValue] = useState('');
  const [dataList, setDataList] = useState<DataDetailsCnpj>([]);
  const [consult, setConsult] = useState(false);
  const [pastCnpjs, setPastCnpjs] = useState(['']);
  const setCnpj = useCallback((cnpj: string) => {
    setValue(cnpj);
  }, []);

  const { data, isLoading, isError } = useCnpj(
    { cnpj: value, type },
    {
      enabled:
        consult && pastCnpjs.some((item) => item === value) && type === 'main',
    }
  );

  const {
    data: dataDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useCnpj(
    { cnpj: value, type },
    {
      enabled:
        consult &&
        pastCnpjs.some((item) => item === value) &&
        type === 'details',
    }
  );

  useEffect(() => {
    if (type === 'main') {
      setDataList((prevState) => (data ? [...prevState, data] : prevState));
    } else {
      setDataList((prevState) =>
        dataDetails ? [...prevState, dataDetails] : prevState
      );
    }
    setConsult(false);
  }, [data, dataDetails]);

  return (
    <div data-testid={type} className="consult">
      <Nav />
      <div className="consult__content">
        <h1 className="consult__title">Consulta de CNPJ</h1>
        <InputField
          setCnpj={setCnpj}
          cnpjs={cnpjs}
          cnpj={value}
          label="CNPJ"
          className="consult__input"
        />
        <button
          onClick={() => {
            setConsult(true);
            setPastCnpjs((prevState) =>
              !prevState.includes(value) ? [...prevState, value] : prevState
            );
          }}
          className="blue-button blue-button--consult"
        >
          Consultar
        </button>
        <div className="consult__list">
          <Cards
            type={type}
            isError={isError || isErrorDetails}
            isLoading={type === 'main' ? isLoading : isLoadingDetails}
            data={dataList}
          />
        </div>
      </div>
    </div>
  );
};

export default Consult;
