import React from 'react';
import { ReactComponent as StackOverflowIcon } from '../assets/stack-overflow-icon.svg';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { Form, Formik, Field } from 'formik';
export const SearchBar = ({ hasButton, className }) => {
  return (
    <div className={className}>
      <Formik
        initialValues={{ searchBar: '' }}
        onSubmit={(values) => {
          console.log(values.searchBar);
        }}
      >
        <Form className="form">
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
    </div>
  );
};
