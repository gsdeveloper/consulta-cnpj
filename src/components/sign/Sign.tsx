import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useNavigate } from '@reach/router';
import './sign.scss';
import 'components/blue-button/blue-button.scss';
import { useEffect, useState } from 'react';
import useAuth from 'custom-hooks/use-auth/useAuth';

const Sign = ({ type }: { type: 'login' | 'signup' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sign, setSign] = useState(false);
  const [status, setStatus] = useState({ error: false, message: '' });
  const { data, error, status: authStatus } = useAuth(
    {
      email,
      password,
      req: type,
    },
    { enabled: sign }
  );

  const { data: loginData } = useAuth(
    {
      email,
      password,
      req: 'login',
    },
    { enabled: type === 'signup' && sign }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (authStatus === 'success' && sign) ||
      (authStatus === 'error' && sign)
    ) {
      if (authStatus === 'success') {
        setStatus({
          error: false,
          message: `${type === 'signup' ? 'Registrado' : 'Logado'} com sucesso`,
        });
      }
      if (authStatus === 'error') {
        if (error?.message === 'NotFound') {
          setStatus({ error: true, message: 'Usuário não encontrado' });
        }
        if (error?.message === 'Usuário já está cadastrado') {
          setStatus({ error: true, message: error.message });
        }
      }
      setSign(false);
    }
  }, [sign, authStatus, loginData]);

  useEffect(() => {
    if (data && type === 'login') {
      localStorage.setItem('TOKEN', data);
      navigate('/details');
    }
    if (loginData && type === 'signup') {
      localStorage.setItem('TOKEN', loginData);
      navigate('/details');
    }
  }, [data, loginData]);

  return (
    <div className="sign">
      <div className="sign__presentation">
        <div className="sign__content">
          <Link to="/">
            <p className="sign__consult">Consulta de CNPJ</p>
          </Link>

          <p className="sign__info">
            Faça consulta de informações com CNPJ de forma fácil e rápida. Tenha
            acesso livre a detalhes como endereço, telefone, atual situação,
            capital social e atividade principal da empresa em questão de
            segundos.
          </p>
        </div>
      </div>
      <div className="sign__sign">
        <div className="sign__content">
          <div className="sign__info-wrap">
            <p className="sign__consult sign__consult--mobile">
              Consulta de CNPJ
            </p>
            <div className="sign__page-info">
              <p className="sign__area">
                Área de {type === 'signup' ? 'cadastro' : 'login'}
              </p>
              <p className="sign__personal">Informações pessoais</p>
            </div>
          </div>
          <div className="sign__wrapper">
            <h6 className="sign__title">
              {type === 'signup' ? 'Cadastro' : 'Login'}
            </h6>
            <p className="sign__paragraph">
              Estar {type === 'signup' ? 'cadastrado' : 'logado'} é necessário
              para consultar mais detalhes dos dados de CNPJs
            </p>
            <TextField
              label="Email"
              className="sign__email"
              fullWidth
              inputProps={{ 'data-testid': 'email' }}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              variant="outlined"
            />
            <TextField
              label="Senha"
              inputProps={{ 'data-testid': 'password' }}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              className="sign__password"
              fullWidth
              variant="outlined"
            />
            <button
              data-testid="sign-button"
              type="submit"
              onClick={() => {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!regexEmail.test(email)) {
                  setStatus({ error: true, message: 'Email inválido' });
                } else if (password.length < 3) {
                  setStatus({
                    error: true,
                    message: 'A senha precisa ter pelo menos três caracteres',
                  });
                } else {
                  setStatus({ error: false, message: '' });
                  setSign(true);
                }
              }}
              className="blue-button blue-button--sign"
            >
              {type === 'signup' ? 'Registrar-se' : 'Login'}
              {authStatus === 'loading' && (
                <CircularProgress
                  data-testid="circular"
                  className="sign__circular"
                  color="inherit"
                  size={15}
                />
              )}
            </button>

            <p
              data-testid="feedback"
              className={`sign__feedback ${
                status.error
                  ? 'sign__feedback--error'
                  : 'sign__feedback--success'
              }`}
            >
              {status.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
