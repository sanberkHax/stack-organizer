import { Button } from '../Button';

export const NextButton = ({ ariaLabel, icon, className, ...props }) => {
  if (ariaLabel) {
    return (
      <Button
        aria-label={ariaLabel}
        className={className ? className : 'next-btn'}
        icon="next"
        {...props}
      />
    );
  }
  return <Button className="next-btn" icon="next" {...props} />;
};
