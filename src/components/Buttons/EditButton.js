import { Button } from '../Button';

export const EditButton = ({ ariaLabel, ...props }) => {
  if (ariaLabel) {
    return <Button aria-label={ariaLabel} icon="edit" {...props} />;
  }

  return <Button icon="edit" {...props} />;
};
