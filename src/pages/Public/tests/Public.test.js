import { Public } from '../Public';
import { render, screen } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
describe('<Public />', () => {
  beforeEach(() => {
    render(<Public />);
  });

  it('renders welcome section', () => {
    const logo = screen.getByAltText(/stack organizer logo/i);
    expect(logo).toBeInTheDocument();
  });
  it('renders log in section at first glance', () => {
    const heading = screen.getByRole('heading', { name: /log in/i });
    expect(heading).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /sign up/i })
    ).not.toBeInTheDocument();
  });
  it('switches between log in and sign up sections when clicked on log in or create an account buttons', () => {
    // log in section
    const createAccountButton = screen.getByText(/create an account/i);
    expect(createAccountButton).toBeInTheDocument();
    userEvent.click(createAccountButton);
    expect(screen.queryByText(/create an account/i)).not.toBeInTheDocument();

    // sign up section
    const logInButton = screen.getByText(/log in/i);
    expect(logInButton).toBeInTheDocument();
    userEvent.click(logInButton);
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });
});
