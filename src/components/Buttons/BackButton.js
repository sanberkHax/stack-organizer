import { Button } from "../Button";

export const BackButton = ({ ariaLabel, icon, className, ...props }) => {
  if (ariaLabel) {
    return (
      <Button
        aria-label={ariaLabel}
        className={className ? className : "back-btn"}
        icon="back"
        {...props}
      />
    );
  }
  return <Button className="back-btn" icon="back" {...props} />;
};
