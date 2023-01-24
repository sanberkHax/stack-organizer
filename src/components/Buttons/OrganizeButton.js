import { Button } from '../Button';

export const OrganizeButton = ({ ...props }) => {
  return (
    <Button
      data-testid="organize-btn"
      className="organize-btn"
      text="Organize"
      icon="organize"
      {...props}
    />
  );
};
