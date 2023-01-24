import { HamburgerMenu } from './HamburgerMenu';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { OrganizeButton } from './Buttons/OrganizeButton';
import { LogoutButton } from './Buttons/LogoutButton';

export const HomepageHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__buttons">
          <li>
            <Link to="organize">
              <OrganizeButton onClick={() => navigate('organize')} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <LogoutButton onClick={logOutHandler} />
            </Link>
          </li>
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
};
