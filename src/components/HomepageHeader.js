import { LogoutBtn } from './LogoutBtn';
import { OrganizeBtn } from './OrganizeBtn';
import { HamburgerMenu } from './HamburgerMenu';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice';
import { Link } from 'react-router-dom';
export const HomepageHeader = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <header className="header">
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
