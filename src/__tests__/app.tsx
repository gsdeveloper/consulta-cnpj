import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import useCnpjs from 'custom-hooks/use-cnpjs/useCnpjs';
import { render, screen } from '@testing-library/react';
import App from 'App';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('if fetching data (cnpjs) work correctly', async () => {
  const { result, waitForValueToChange } = renderHook(() => useCnpjs(), {
    wrapper,
  });

  // check if fetching data works
  expect(result.current.isSuccess).toBe(false);
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current.isSuccess).toBe(true);

  // check if data elements have a length of 14 (CNPJ number)
  expect(result.current.data?.every((v) => v.length === 14)).toBe(true);
});

const cnpj = '07440107000108';
test('if autocomplete and clear button works correctly', async () => {
  render(<App />);
  const input = screen.getByRole('textbox', { name: 'CNPJ' });
  expect(input).toHaveValue('');

  userEvent.click(screen.getByRole('button', { name: 'Open' }));

  await screen.findByText(cnpj);

  userEvent.click(screen.getByText(cnpj));

  expect(input).toHaveValue(cnpj);

  userEvent.click(screen.getByRole('button', { name: 'Clear' }));

  expect(input).toHaveValue('');
});

test('if cnpj shows card correctly', async () => {
  render(<App />);
  const input = screen.getByRole('textbox', { name: 'CNPJ' });
  // type cnpj in input and expect to have a card with the respectives values
  userEvent.type(input, cnpj);
  userEvent.click(screen.getByRole('button', { name: 'Consultar' }));
  await screen.findByTestId('card');
  expect(screen.getByTestId('cnpj')).toHaveTextContent('07.440.107/0001-08');
  expect(screen.getByTestId('nome')).toHaveTextContent(
    'BH COMERCIO DE TINTAS E MATERIAIS PARA CONSTRUCOES LTDA'
  );
  expect(screen.getByTestId('fantasia')).toHaveTextContent('BH TINTAS');
});
