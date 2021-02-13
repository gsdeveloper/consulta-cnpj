import errorIllustration from 'assets/error.svg';
import './error.scss';

const Error = () => (
  <div className="error">
    <img className="error__img" alt="illustration" src={errorIllustration} />
    <div className="error__info">
      <h4 className="error__title">Erro</h4>
      <p className="error__paragraph">Descrição do erro</p>
    </div>
  </div>
);

export default Error;
