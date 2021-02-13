import { render, screen } from '@testing-library/react';
import App from 'App';
import { ReactElement } from 'react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';

const renderWithRouter = (
  ui: ReactElement,
  { route = '/', history = createHistory(createMemorySource(route)) }
) => ({
  ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
  history,
});

test('if links work correctly', () => {
  renderWithRouter(<App />, { route: '/' });
  expect(screen.getByRole('link', { name: 'Cadastro' })).toHaveAttribute(
    'href',
    '/signup'
  );
  expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
    'href',
    '/login'
  );
  expect(
    screen.getByRole('link', { name: 'Consulta de CNPJ' })
  ).toHaveAttribute('href', '/');
});
