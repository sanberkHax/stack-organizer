import { useState } from 'react';
import { ReactComponent as SettingsIcon } from '../assets/settings-icon.svg';
import { Dropdown } from './Dropdown';

export const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownHandler = () => {
    setIsOpen((prev) => !prev);
  };
  const containerStyle = isOpen ? 'settings-btn--open' : 'settings-btn';
  const iconStyle = isOpen ? 'settings-btn__icon--open' : 'settings-btn__icon';

  return (
    <div className="settings">
      <div className={containerStyle}>
        <SettingsIcon onClick={dropDownHandler} className={iconStyle} />
        {isOpen && <Dropdown />}
      </div>
    </div>
  );
};
