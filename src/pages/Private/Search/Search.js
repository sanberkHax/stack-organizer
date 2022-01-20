import { useSelector, useDispatch } from 'react-redux';
import { Question } from './components/Question';
import { useSearchParams } from 'react-router-dom';
import { DualRing } from 'react-awesome-spinners';
import { getSearchResults } from '../../../slices/searchSlice';
import { useEffect } from 'react';
export const Search = () => {
  const [searchParams] = useSearchParams();
  const questions = useSelector((state) => state.search.searchResults);
  const loading = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();

  // Get the search keyword from URL
  const keyword = searchParams.get('q');

  // Fetch search results when search results are empty
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(getSearchResults({ searchBar: keyword }));
    }
  }, [dispatch, keyword, questions]);

  const resultsContent = questions.map((question) => (
    <Question
      key={question.question_id}
      title={question.title}
      owner={question.owner.display_name}
      answerCount={question.answer_count}
      voteCount={question.score}
      body={question.body}
      tags={question.tags}
      date={question.creation_date}
      id={question.question_id}
    />
  ));

  return (
    <main className="search-page">
      <h1 className="heading-primary">Search Results</h1>
      <h2 className="heading-secondary">for "{keyword}"</h2>
      <section>
        {loading ? (
          <DualRing size="60" color="#1C5274" />
        ) : (
          <ul className="search-page__results">{resultsContent}</ul>
        )}
      </section>
    </main>
  );
};
