import { Button } from '../Button';

export const SettingsButton = ({ ariaLabel, ...props }) => {
  if (ariaLabel) {
    return (
      <Button
        aria-label={ariaLabel}
        className="settings-btn"
        icon="settings"
        type="button"
        {...props}
      />
    );
  }

  return (
    <Button type="button" icon="settings" className="settings-btn" {...props} />
  );
};
