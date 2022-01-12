import { SignUpForm } from '../components/SignUpForm';
import { render, screen, waitFor } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('<SignUpForm />', () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    render(<SignUpForm onSubmit={handleSubmit} />);
  });
  it('renders and submits a basic Formik form', async () => {
    userEvent.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
    userEvent.type(screen.getByLabelText(/password/i), 'test');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'test',
      })
    );
  });
  it('displays error messages for invalid or empty email input', async () => {
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    userEvent.type(emailInput, 'test');
    userEvent.click(signUpButton);

    expect(
      await screen.findByText(/Please enter a valid E-Mail/i)
    ).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.click(signUpButton);

    expect(await screen.findByText(/e-mail is required/i)).toBeInTheDocument();
  });
  it('displays error message for empty password input', async () => {
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    userEvent.click(signUpButton);

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
