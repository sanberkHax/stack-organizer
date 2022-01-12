import { useState } from 'react';
import { ReactComponent as StackOrganizerIcon } from '../assets/stack-organizer-icon.svg';
import { ReactComponent as StackOrganizerLogo } from '../assets/stack-organizer-logo.svg';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { ReactComponent as BackButton } from '../assets/back-button.svg';
import { SearchBar } from './SearchBar';
import { LogoutBtn } from './LogoutBtn';
import { OrganizeBtn } from './OrganizeBtn';
import { HamburgerMenu } from './HamburgerMenu';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice';
import { Link } from 'react-router-dom';
export const Header = () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  const logOutHandler = () => {
    dispatch(logOut());
  };

  // Show search bar when clicked on search icon
  const searchBarHandler = () => {
    setShowSearch(true);
  };

  // Close search bar when clicked on back button
  const backHandler = () => {
    setShowSearch(false);
  };

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
        <Link to="/">
          <StackOrganizerIcon className="header__icon" />
        </Link>
        <Link to="/">
          <StackOrganizerLogo className="header__logo" />
        </Link>
      </div>
      <SearchBar className="header__search" />
      <SearchIcon onClick={searchBarHandler} className="header__search-btn" />
      <nav className="header__nav">
        <ul className="header__buttons">
          <li>
            <Link to="organize">
              <OrganizeBtn />
            </Link>
          </li>
          <li>
            <Link to="/">
              <LogoutBtn onClick={logOutHandler} />
            </Link>
          </li>
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
};
