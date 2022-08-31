import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search" />
      </div>
    );
  }
}

export default Search;
