import React from 'react';
import { ReactComponent as StackOverflowIcon } from '../assets/stack-overflow-icon.svg';
import { SearchButton } from './SearchButton';
import { Form, Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../slices/searchSlice';
import { useNavigate } from 'react-router-dom';
export const SearchBar = ({ hasButton, className }) => {
  const error = useSelector((state) => state.search.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <Formik
        initialValues={{ searchBar: '' }}
        onSubmit={(values) => {
          dispatch(getSearchResults(values));
          navigate(`/search?q=${values.searchBar}`, { replace: true });
        }}
      >
        <Form className="form">
          {error && <p className="error">{error}</p>}
          <div className="search-bar">
            <StackOverflowIcon className="search-bar__icon--left" />
            {!hasButton && <SearchButton />}
            <Field
              type="search"
              name="searchBar"
              className="form__input search-bar__input"
              placeholder="Search with Stack Overflow"
            />
          </div>
          {hasButton && (
            <button className="btn btn--search" type="submit">
              Search
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};
