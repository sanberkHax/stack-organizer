import { Link } from 'react-router-dom';

export const Dropdown = () => {
  return (
    <div className="settings__dropdown">
      <Link to="/" className="dropdown__item">
        Log Out
      </Link>
    </div>
  );
};
