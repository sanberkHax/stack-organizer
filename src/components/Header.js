import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { HamburgerMenu } from "./HamburgerMenu";
import { useDispatch } from "react-redux";
import { logOut } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { BackButton } from "./Buttons/BackButton";
import { LogoutButton } from "./Buttons/LogoutButton";
import { OrganizeButton } from "./Buttons/OrganizeButton";
import { Icon } from "./Icon";

export const Header = () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/");
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
        <BackButton onClick={backHandler} />
        <SearchBar className="header__search--full" />
      </header>
    );
  }
  return (
    <header className="header">
      <div className="logo-ctn">
        <Link to="/">
          <Icon name="stackOrganizerIcon" className="header__icon" />
        </Link>
        <Link to="/">
          <Icon name="stackOrganizerLogo" className="header__logo" />
        </Link>
      </div>
      <SearchBar className="header__search" />
      <Icon
        name="search"
        onClick={searchBarHandler}
        className="header__search-btn"
      />
      <nav className="header__nav">
        <ul className="header__buttons">
          <li>
            <OrganizeButton onClick={() => navigate("organize")} />
          </li>
          <li>
            <LogoutButton onClick={logOutHandler} />
          </li>
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
};
