import { LogoutBtn } from './LogoutBtn';
import { OrganizeBtn } from './OrganizeBtn';
import { HamburgerMenu } from './HamburgerMenu';
export const HomepageHeader = () => {
  return (
    <header className="header">
      <div className="header__buttons">
        <OrganizeBtn />
        <LogoutBtn />
      </div>
      <HamburgerMenu />
    </header>
  );
};
