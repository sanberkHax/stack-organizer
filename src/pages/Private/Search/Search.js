import { Question } from './components/Question';
export const Search = () => {
  return (
    <main className="search-page">
      <h1 className="heading-primary">Search Results</h1>
      <h2 className="heading-secondary">for "keyword"</h2>
      <section className="search-page__results">
        <Question />
        <Question />
        <Question />
      </section>
    </main>
  );
};
