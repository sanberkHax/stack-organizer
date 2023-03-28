import * as yup from 'yup';
import { ReactComponent as StackOverflowIcon } from '../assets/stack-overflow-icon.svg';
import { SearchButton } from './Buttons/SearchButton';
import { Form, Formik, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { getSearchResults } from '../slices/searchSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { SettingsButton } from './Buttons/SettingsButton';
import { Dropdown } from './Dropdown';

export const SearchBar = ({ hasButton, className }) => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [searchOption, setSearchOption] = useState('Direct Search');

  const [dropdown, setDropdown] = useState(false);

  // Yup schema for validation
  const schema = yup.object().shape({
    searchBar: yup.string().required(`Please enter a keyword`),
  });

  // Get the search keyword from URL
  const keyword = searchParams.get('q');

  const dropdownItems = ['Direct Search', 'URL Search'];

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  // Show search results on submit if the keyword is different
  const submitHandler = (values, { resetForm }) => {
    if (values.searchBar !== keyword) {
      if (searchOption === 'Direct Search') {
        dispatch(getSearchResults({ searchBar: values.searchBar, page: 1 }));

        navigate(`/search?q=${values.searchBar}&p=1`);
      } else {
        const parts = values.searchBar.split('/');

        const questionsIndex = parts.indexOf('questions');

        const questionId = parts[questionsIndex + 1];

        navigate(`/questions/${questionId}`);
      }
      resetForm();
    }
  };

  const dropdownHandler = (e) => {
    setDropdown(false);
    setSearchOption(e.target.textContent);
  };

  return (
    <div className={className}>
      <Formik
        validationSchema={schema}
        initialValues={{ searchBar: '' }}
        validateOnBlur={false}
        onSubmit={submitHandler}
      >
        {({ errors }) => {
          return (
            <Form className="form">
              {/* {errors.searchBar ? (
                <p className="form__error">{errors.searchBar}</p>
              ) : undefined} */}
              <div className={`search-bar`}>
                <StackOverflowIcon className="search-bar__icon--left" />
                {!hasButton && (
                  <div className="search-bar__right">
                    <SettingsButton onClick={toggleDropdown} />
                    <SearchButton />
                    {dropdown && (
                      <Dropdown
                        className="search-bar__dropdown"
                        items={dropdownItems}
                        onClick={dropdownHandler}
                      />
                    )}
                  </div>
                )}
                <Field
                  type="search"
                  name="searchBar"
                  className={`form__input search-bar__input ${
                    errors.searchBar && 'search-bar--error'
                  }`}
                  placeholder={
                    searchOption === 'Direct Search'
                      ? 'Search in Stack Overflow'
                      : 'Paste Stack Overflow URL'
                  }
                />
              </div>
              {hasButton && (
                <div className="search-options">
                  <button
                    className={`search-options__button ${
                      searchOption === 'Direct Search' &&
                      'search-options__button--active'
                    }`}
                    onClick={() => setSearchOption('Direct Search')}
                    type="button"
                  >
                    Direct Search
                  </button>
                  <button
                    className={`search-options__button ${
                      searchOption === 'url' && 'search-options__button--active'
                    }`}
                    onClick={() => setSearchOption('url')}
                    type="button"
                  >
                    URL Search
                  </button>
                </div>
              )}
              {hasButton && (
                <button className="btn btn--search" type="submit">
                  Search
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
