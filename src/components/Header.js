import React from 'react';
import { ReactComponent as StackOrganizerIcon } from '../assets/stack-organizer-icon.svg';
import { ReactComponent as StackOrganizerLogo } from '../assets/stack-organizer-logo.svg';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { ReactComponent as BackButton } from '../assets/back-button.svg';

import { SearchBar } from './SearchBar';
import { SettingsButton } from './SettingsButton';
import { useState } from 'react/cjs/react.development';
export const Header = ({ page }) => {
  const [showSearch, setShowSearch] = useState(false);

  // Show search bar when clicked on search icon
  const searchBarHandler = () => {
    setShowSearch(true);
  };

  // Close search bar when clicked on back button
  const backHandler = () => {
    setShowSearch(false);
  };

  if (page === 'home') {
    return (
      <header className="header">
        <SettingsButton />
      </header>
    );
  }
  if (showSearch) {
    return (
      <header className="header">
        <BackButton onClick={backHandler} className="back-btn" />
        <SearchBar className="header__search--full" />
      </header>
    );
  }
  return (
    <header className="header">
      <div className="logo-ctn">
        <StackOrganizerIcon className="header__icon" />
        <StackOrganizerLogo className="header__logo" />
      </div>
      <SearchBar className="header__search" />
      <SearchIcon onClick={searchBarHandler} className="header__search-btn" />
      <SettingsButton />
    </header>
  );
};
