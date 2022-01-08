import App from './App';
import { render, screen, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
describe('<App />', () => {
  beforeAll(async () => {
    await axios.delete(
      'http://localhost:9099/emulator/v1/projects/stack-organizer/accounts'
    );
  });
  beforeEach(() => {
    render(<App />);
  });
  it('succesfully creates test user and redirects to private homepage', async () => {
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(/logout-btn/i));
  });
  it('succesfully logs in test user and redirects to private homepage', async () => {
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const logInButton = screen.getByRole('button', { name: /log in/i });
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(logInButton);
    await waitFor(() => {
      expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(/logout-btn/i));
  });
  it('succesfully logs in as guest and redirects to private homepage', async () => {
    const logInButton = screen.getByRole('button', {
      name: /continue as guest/i,
    });
    userEvent.click(logInButton);
    await waitFor(() => {
      expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(/logout-btn/i));
  });
  it(`shows an error when user doesn't exist`, async () => {
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const logInButton = screen.getByRole('button', { name: /log in/i });
    userEvent.type(emailInput, 'invalid@invalid.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(logInButton);
    await waitFor(() => {
      expect(screen.getByText(/user-not-found/i)).toBeInTheDocument();
    });
  });
});
