import React from 'react';
import { ReactComponent as StackOverflowIcon } from '../assets/stack-overflow-icon.svg';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { Form, Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import { DualRing } from 'react-awesome-spinners';
export const SearchBar = ({ hasButton, className }) => {
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={className}>
      {loading ? (
        <DualRing size="60" color="#1C5274" />
      ) : (
        <Formik
          initialValues={{ searchBar: '' }}
          onSubmit={async (values) => {
            try {
              await dispatch(getSearchResults(values)).unwrap();
              navigate(`../search?=${values.searchBar}`, { replace: true });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Form className="form">
            {error && <p className="error">{error}</p>}
            <div className="search-bar">
              <StackOverflowIcon className="search-bar__icon--left" />
              <SearchIcon className="search-bar__icon--right" />
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
      )}
    </div>
  );
};
