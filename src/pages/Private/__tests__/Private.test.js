import { Private } from '../Private';
import { render, screen } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('<Private />', () => {
  beforeEach(() => {
    render(<Private />);
  });

  it('shows search results for entered keyword after clicking on search button', async () => {
    const searchBar = screen.getByPlaceholderText(/search in stack overflow/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchBar, 'react');
    expect(searchBar.value).toBe('react');
    userEvent.click(searchButton);
    expect(await screen.findByText(/react/i)).toBeInTheDocument();
  });

  it('shows an error if the search input is empty on submit', async () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await userEvent.click(searchButton);

    expect(
      await screen.findByPlaceholderText(/search in stack overflow/i)
    ).toHaveClass('search-bar--error');
  });
});
