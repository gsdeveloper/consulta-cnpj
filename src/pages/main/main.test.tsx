import { render, screen } from '@testing-library/react';
import App from 'App';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (
  ui: ReactElement,
  { route = '/', history = createHistory(createMemorySource(route)) }
) => ({
  ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
  history,
});

test('if input works correctly', () => {
  renderWithRouter(<App />, { route: '/' });
  const input = screen.getByRole('textbox', { name: 'CNPJ' });
  const openButton = screen.getByRole('button', { name: 'Open' });
  userEvent.click(openButton);
  userEvent.click(screen.getByText('teste'));
  expect(input).toHaveValue('teste');
  userEvent.click(screen.getByRole('button', { name: 'Clear' }));
  expect(input).toHaveValue('');
});
