import { ReactComponent as StackOrganizerLogo } from '../../../assets/stack-organizer-logo.svg';
import { SearchBar } from '../../../components/SearchBar';
export const Home = () => {
  return (
    <main className="private-homepage">
      <StackOrganizerLogo className="private-homepage__logo" />
      <SearchBar hasButton={true} className="private-homepage__search" />
    </main>
  );
};
