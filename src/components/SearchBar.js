import * as yup from 'yup';
import { ReactComponent as StackOverflowIcon } from '../assets/stack-overflow-icon.svg';
import { SearchButton } from './Buttons/SearchButton';
import { Form, Formik, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { getSearchResults } from '../slices/searchSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = ({ hasButton, className }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Yup schema for validation
  const schema = yup.object().shape({
    searchBar: yup.string().required(`Please enter a keyword`),
  });

  // Get the search keyword from URL
  const keyword = searchParams.get('q');

  // Show search results on submit if the keyword is different
  const submitHandler = (values, { resetForm }) => {
    if (values.searchBar !== keyword) {
      dispatch(getSearchResults({ searchBar: values.searchBar, page: 1 }));
      navigate(`/search?q=${values.searchBar}&p=1`);
      resetForm();
    }
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
              {errors.searchBar ? (
                <p className="form__error">{errors.searchBar}</p>
              ) : undefined}
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
          );
        }}
      </Formik>
    </div>
  );
};
