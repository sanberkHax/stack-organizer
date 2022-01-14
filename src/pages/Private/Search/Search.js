import { useSelector } from 'react-redux';
import { Question } from './components/Question';
import { useSearchParams } from 'react-router-dom';
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const questions = useSelector((state) => state.search.searchResults);

  return (
    <main className="search-page">
      <h1 className="heading-primary">Search Results</h1>
      <h2 className="heading-secondary">for "{searchParams.get('q')}"</h2>
      <section>
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
      </section>
    </main>
  );
};
