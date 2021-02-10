import './app.scss';
import { Router } from '@reach/router';
import { Details } from 'pages/details';
import { Login } from 'pages/login';
import Main from 'pages/main/Main';
import { Signup } from 'pages/signup';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Signup path="/signup" />
      <Login path="/login" />
      <Details path="/details" />
      <Main default />
    </Router>
  </QueryClientProvider>
);
export default App;
