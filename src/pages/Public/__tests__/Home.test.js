import { Home } from "../components/Home";
import { render, screen } from "../../../utils/test-utils";

describe("<Home />", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders welcome section", () => {
    const logo = screen.getByAltText(/stack organizer logo/i);
    expect(logo).toBeInTheDocument();
  });
  it("renders log in section at first glance", () => {
    const heading = screen.getByRole("heading", { name: /log in/i });
    expect(heading).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /sign up/i })
    ).not.toBeInTheDocument();
  });
});
