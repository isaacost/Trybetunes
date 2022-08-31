import React from 'react';
import Header from '../components/Header';

const MIN_LENGTH = 2;

class Search extends React.Component {
  state = {
    artist: '',
  };

  getArtist = (event) => {
    const { value } = event.target;
    this.setState({
      artist: value,
    });
  };

  activateBtn = () => {
    const { artist } = this.state;
    return artist.length < MIN_LENGTH;
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search-artist-input"
            value={ artist }
            onChange={ this.getArtist }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ this.activateBtn() }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
