import { Button } from "../Button";

export const LogoutButton = ({ ...props }) => {
  return (
    <Button
      data-testid="logout-btn"
      className="logout-btn"
      text="Logout"
      icon="logout"
      {...props}
    />
  );
};
