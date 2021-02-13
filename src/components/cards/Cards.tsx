import Skeleton from '@material-ui/lab/Skeleton';
import { Error } from 'components/error';
import { ReactNode, useCallback } from 'react';
import { Cnpj, Data } from 'utils/types';
import './cards.scss';

const SkeletonField = () => (
  <div className="cards__field">
    <Skeleton width="31%" variant="rect" />
    <Skeleton style={{ marginTop: 10 }} variant="rect" />
  </div>
);

const CardField = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="cards__field">
    <h6 className="cards__title">{title}</h6>
    <p data-testid="cnpj" className="cards__paragraph">
      {children === '' ? 'Não informado' : children}
    </p>
  </div>
);

const Cards = ({
  data,
  isLoading,
  type,
  isError,
}: {
  isError: boolean;
  data: Data;
  isLoading: boolean;
  type: 'main' | 'details';
}) => {
  const chooseCard = useCallback(() => {
    if (type === 'main') {
      return data?.map((el, dataIndex) => (
        <div key={dataIndex} data-testid="card" className="cards">
          {Object.keys(el).map((key, i) => (
            <div key={i} className="cards__field">
              <h6 className="cards__title">{key}</h6>
              <p data-testid={key} className="cards__paragraph">
                {data[dataIndex][key as keyof Cnpj] || 'Não informado'}
              </p>
            </div>
          ))}
        </div>
      ));
    }
    return data?.map((el, i) => (
      <div key={i} data-testid="card" className="cards">
        <CardField title="Atividade principal">
          {el.atividade_principal[0].text}
        </CardField>
        <CardField title="Código da atividade principal">
          {el.atividade_principal[0].code}
        </CardField>
        <CardField title="Situação da data">{el.data_situacao}</CardField>
        <CardField title="Complemento">{el.complemento}</CardField>
        <CardField title="Nome">{el.nome}</CardField>
        <CardField title="UF">{el.uf}</CardField>
        <CardField title="Atividade secundária">
          {el.atividades_secundarias[0].text}
        </CardField>
        <CardField title="Código da atividade secundária">
          {el.atividade_principal[0].code}
        </CardField>

        {el.qsa.map((el) => (
          <CardField title={el.qual}>{el.nome}</CardField>
        ))}

        <CardField title="Situação">{el.situacao}</CardField>
        <CardField title="Bairro">{el.bairro}</CardField>
        <CardField title="Logradouro">{el.logradouro}</CardField>
        <CardField title="Número">{el.numero}</CardField>
        <CardField title="Cep">{el.cep}</CardField>
        <CardField title="Município">{el.municipio}</CardField>
        <CardField title="Abertura">{el.abertura}</CardField>
        <CardField title="Natureza jurídica">{el.natureza_juridica}</CardField>
        <CardField title="Fantasisa">{el.fantasia}</CardField>
        <CardField title="Cnpj">{el.cnpj}</CardField>
        <CardField title="Tipo">{el.tipo}</CardField>
        <CardField title="Email">{el.email}</CardField>
        <CardField title="Telefone">{el.telefone}</CardField>
        <CardField title="Motivo situação">{el.motivo_situacao}</CardField>
        <CardField title="Situação especial ">{el.situacao_especial}</CardField>
        <CardField title="Capital social">{el.capital_social}</CardField>
      </div>
    ));
  }, [type, data]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return (
      <div className="cards">
        {[...Array(3)].map((_el, i) => (
          <SkeletonField key={i} />
        ))}
      </div>
    );
  }

  return <>{chooseCard()}</>;
};
export default Cards;
