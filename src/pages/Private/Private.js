import React from 'react';
import { ReactComponent as StackOrganizerLogo } from '../../assets/stack-organizer-logo.svg';
import { SearchBar } from '../../components/SearchBar';
import { Header } from '../../components/Header';
export const Private = () => {
  return (
    <div className="private-homepage">
      <Header page="home"></Header>
      <main className="private-homepage__main">
        <StackOrganizerLogo className="private-homepage__logo" />
        <SearchBar hasButton={true} className="private-homepage__search" />
      </main>
    </div>
  );
};
