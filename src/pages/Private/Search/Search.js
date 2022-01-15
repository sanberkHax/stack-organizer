import { useSelector } from 'react-redux';
import { Question } from './components/Question';
import { useSearchParams } from 'react-router-dom';
import { DualRing } from 'react-awesome-spinners';
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const questions = useSelector((state) => state.search.searchResults);
  const loading = useSelector((state) => state.search.loading);

  return (
    <main className="search-page">
      <h1 className="heading-primary">Search Results</h1>
      <h2 className="heading-secondary">for "{searchParams.get('q')}"</h2>
      <section>
        {loading ? (
          <DualRing size="60" color="#1C5274" />
        ) : (
          <ul className="search-page__results">
            {questions.map((question) => (
              <Question
                key={question.question_id}
                title={question.title}
                owner={question.owner.display_name}
                answerCount={question.answer_count}
                voteCount={question.score}
                body={question.body}
                tags={question.tags}
                creation={question.creation_date}
                id={question.question_id}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};
