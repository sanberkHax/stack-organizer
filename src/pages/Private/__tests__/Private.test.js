import { Private } from '../Private';
import { render, screen, waitFor } from '../../../utils/test-utils';
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

  it('shows search results for URL search option', async () => {
    const searchBar = screen.getByPlaceholderText(/search in stack overflow/i);

    const URLSearchButton = screen.getByRole('button', { name: 'URL Search' });

    userEvent.click(URLSearchButton);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    userEvent.type(
      searchBar,
      'https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array'
    );
    userEvent.click(searchButton);

    waitFor(() => {
      expect(
        screen.findByText(
          /Why is processing a sorted array faster than processing an unsorted array?/i
        )
      ).toBeInTheDocument();
    });
  });
  it('shows error message for wrong URL search', async () => {
    const searchBar = screen.getByPlaceholderText(/search in stack overflow/i);

    const URLSearchButton = screen.getByRole('button', { name: 'URL Search' });

    userEvent.click(URLSearchButton);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    userEvent.type(searchBar, '111111111');
    userEvent.click(searchButton);

    waitFor(() => {
      expect(screen.findByText(/Question not found/i)).toBeInTheDocument();
    });
  });
});
