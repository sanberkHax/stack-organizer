import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { DualRing } from 'react-awesome-spinners';

import { Question } from './components/Question';
import { getSearchResults } from '../../../slices/searchSlice';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const questions = useSelector((state) => state.search.searchResults);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  const dispatch = useDispatch();

  // Get the search keyword from URL
  const keyword = searchParams.get('q');

  useEffect(() => {
    dispatch(getSearchResults({ searchBar: keyword }));
  }, [dispatch, keyword]);

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
      {error ? (
        <p className="heading-secondary">{error}</p>
      ) : (
        <h2 className="heading-secondary">for "{keyword}"</h2>
      )}
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
