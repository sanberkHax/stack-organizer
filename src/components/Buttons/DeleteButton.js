import { Button } from "../Button";

export const DeleteButton = ({ ariaLabel, ...props }) => {
  if (ariaLabel) {
    return <Button aria-label={ariaLabel} icon="delete" {...props} />;
  }
  return <Button icon="delete" {...props} />;
};
