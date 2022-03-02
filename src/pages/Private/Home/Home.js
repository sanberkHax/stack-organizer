import { ReactComponent as StackOrganizerLogo } from '../../../assets/stack-organizer-logo.svg';
import { SearchBar } from '../../../components/SearchBar';

export const Home = () => {
  return (
    <main className="private-homepage">
      <section className="private-homepage__logo-ctn">
        <StackOrganizerLogo className="private-homepage__logo" />
        <SearchBar hasButton={true} className="private-homepage__search" />
      </section>
      <section className="private-homepage__help">
        <h1 className="heading-primary">How to Use</h1>
        <ul>
          <li>Search your question through Stack Overflow</li>
          <li>Go the details page of the question you searched for</li>
          <li>
            Either save an answer that is helpful, or save the question itself
            by clicking "Save As" at the bottom
          </li>
          <li>Select a project and folder to save it to</li>
          <li>
            Enter a file name and write any additional note you want to add
          </li>
          <li>Hit save and manage your saved file in Organize page!</li>
        </ul>
      </section>
    </main>
  );
};
