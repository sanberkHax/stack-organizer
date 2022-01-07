import { Auth } from '../Auth';
import { render, screen } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('<Auth />', () => {
  beforeEach(() => {
    render(<Auth />);
  });

  it('switches between log in and sign up sections when clicked on log in or sign up buttons', () => {
    // log in section
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    userEvent.click(signUpButton);
    expect(
      screen.queryByText(/don't have an account?/i)
    ).not.toBeInTheDocument();

    // sign up section
    const logInButton = screen.getByRole('button', { name: /log in/i });
    userEvent.click(logInButton);
    expect(
      screen.queryByText(/already have an account?/i)
    ).not.toBeInTheDocument();
  });
});
