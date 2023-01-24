import { Button } from '../Button';

export const SaveAsButton = ({ ...props }) => {
  return (
    <Button className="save-btn" icon="document" text="Save As" {...props} />
  );
};
