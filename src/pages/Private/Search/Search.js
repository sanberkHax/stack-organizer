import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { DualRing } from "react-awesome-spinners";
import { Question } from "./components/Question";
import { getSearchResults } from "../../../slices/searchSlice";
import { BackButton } from "../../../components/Buttons/BackButton";
import { NextButton } from "../../../components/Buttons/NextButton";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const questions = useSelector((state) => state.search.searchResults.items);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  const hasMore = useSelector((state) => state.search.searchResults.has_more);
  const page = useSelector((state) => state.search.searchResults.page);

  const dispatch = useDispatch();

  // Get the search keyword from URL
  const keyword = searchParams.get("q");
  const pageParam = searchParams.get("p");

  useEffect(() => {
    dispatch(getSearchResults({ searchBar: keyword, page: pageParam }));
  }, [dispatch, keyword, pageParam]);

  const resultsContent = questions?.map((question) => (
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

  const nextPageHandler = () => {
    setSearchParams({ q: keyword, p: page + 1 });
  };
  const prevPageHandler = () => {
    setSearchParams({ q: keyword, p: page - 1 });
  };
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
          <ul className="search-page__results">
            {
              <>
                {resultsContent}
                <div className="pagination-container">
                  <BackButton disabled={page === 1} onClick={prevPageHandler} />
                  <h2 className="pagination-container__text">{page}</h2>
                  <NextButton disabled={!hasMore} onClick={nextPageHandler} />
                </div>
              </>
            }
          </ul>
        )}
      </section>
    </main>
  );
};
