import { Link, useLocation, useNavigate } from '@reach/router';
import './nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="nav">
      <Link to="/" className="nav__link">
        <p className="nav__item">Consulta de CNPJ</p>
      </Link>
      <div className="nav__buttons">
        {localStorage.getItem('TOKEN') ? (
          location.href === '/' ? (
            <button
              onClick={() => navigate('/details')}
              className="nav__button nav__button--signup"
            >
              Mais dados de CNPJ
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
              className="nav__button nav__button--login"
            >
              Sair
            </button>
          )
        ) : (
          <>
            <Link className="nav__link" to="/signup">
              <button className="nav__button nav__button--signup">
                Cadastro
              </button>
            </Link>
            <Link className="nav__link" to="/login">
              <button className="nav__button nav__button--login">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
