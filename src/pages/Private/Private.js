import React from 'react';
import stackOrganizerLogo from '../../assets/homepage-logo.svg';
import { SearchBar } from '../../components/SearchBar';
import { Formik, Form } from 'formik';

export const Private = () => {
  return (
    <div className="private-homepage">
      <main className="private-homepage__main">
        <img
          src={stackOrganizerLogo}
          alt=""
          className="private-homepage__logo"
        />
        <Formik
          initialValues={{ searchBar: '' }}
          onSubmit={(values) => {
            console.log(values.searchBar);
          }}
        >
          <Form className="form">
            <SearchBar />
            <button className="btn btn--search" type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </main>
    </div>
  );
};
