import React from 'react';
import stackOverflowIcon from '../assets/stack-overflow-icon.svg';
import { Field } from 'formik';
export const SearchBar = () => {
  return (
    <div role="search" className="form__group">
      <img
        src={stackOverflowIcon}
        alt="stack-overflow-icon"
        className="search-bar__icon"
      />
      <Field
        type="search"
        name="searchBar"
        className="form__input search-bar__input"
        placeholder="Search with Stack Overflow"
      />
    </div>
  );
};
