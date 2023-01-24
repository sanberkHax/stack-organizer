import { Button } from '../Button';

export const AddButton = ({ ariaLabel, ...props }) => {
  if (ariaLabel) {
    return (
      <Button
        aria-label={ariaLabel}
        className="file-container__btn"
        icon="add"
        {...props}
      />
    );
  }
  return <Button className="file-container__btn" icon="add" {...props} />;
};
