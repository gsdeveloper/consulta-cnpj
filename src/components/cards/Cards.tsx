import Skeleton from '@material-ui/lab/Skeleton';
import { Data } from 'types';
import './cards.scss';

const SkeletonField = () => (
  <div className="card__field">
    <Skeleton width="31%" variant="rect" />
    <Skeleton style={{ marginTop: 10 }} variant="rect" />
  </div>
);

const Cards = ({ data, isLoading }: { data: Data; isLoading: boolean }) => (
  <>
    {!isLoading ? (
      data?.map(({ cnpj, nome, fantasia }, i) => (
        <div key={i} data-testid="card" className="card">
          <div className="card__field">
            <h6 className="card__title">CNPJ</h6>
            <p data-testid="cnpj" className="card__paragraph">
              {cnpj}
            </p>
          </div>
          <div className="card__field">
            <h6 className="card__title">Nome</h6>
            <p data-testid="nome" className="card__paragraph">
              {nome}
            </p>
          </div>
          <div className="card__field">
            <h6 className="card__title">Nome fantasia</h6>
            <p data-testid="fantasia" className="card__paragraph">
              {fantasia || 'Não informado'}
            </p>
          </div>
        </div>
      ))
    ) : (
      <div className="card">
        {[...Array(3)].map((_el, i) => (
          <SkeletonField key={i} />
        ))}
      </div>
    )}
  </>
);
export default Cards;
