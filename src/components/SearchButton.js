import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
export const SearchButton = () => {
  return (
    <button type="submit">
      <SearchIcon className="search-bar__icon--right" />
    </button>
  );
};
