import { LogInForm } from "../components/LogInForm";
import { render, screen, waitFor } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

describe("<LogInForm />", () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    render(<LogInForm onSubmit={handleSubmit} />);
  });
  it("renders and submits a basic Formik form", async () => {
    const emailInput = screen.getByRole("textbox", { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const logInButton = screen.getByRole("button", { name: /log in/i });

    userEvent.type(emailInput, "test@test.com");
    userEvent.type(passwordInput, "test");
    userEvent.click(logInButton);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "test",
      })
    );
  });
  it("displays error messages for invalid or empty email input", async () => {
    const emailInput = screen.getByRole("textbox", { name: /e-mail/i });
    const logInButton = screen.getByRole("button", { name: /log in/i });

    userEvent.type(emailInput, "test");
    userEvent.click(logInButton);

    expect(
      await screen.findByText(/Please enter a valid E-Mail/i)
    ).toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.click(logInButton);

    expect(await screen.findByText(/e-mail is required/i)).toBeInTheDocument();
  });
  it("displays error message for empty password input", async () => {
    const logInButton = screen.getByRole("button", { name: /log in/i });

    userEvent.click(logInButton);

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
