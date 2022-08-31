import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const MIN_LENGTH = 2;

class Search extends React.Component {
  state = {
    artist: '',
    loading: false,
    resposta: [],
    artistaPesquisado: '',
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

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const resposta = await searchAlbumsAPIs(artist);
    this.setState({
      loading: false,
      artistaPesquisado: artist,
      resposta,
    });
    this.setState({
      artist: '',
    });
  };

  render() {
    const { artist, loading, resposta, artistaPesquisado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? (<Loading />)
            : (
              <div>
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
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
                {artistaPesquisado && (
                  <p>{ `Resultado de álbuns de: ${artistaPesquisado}`}</p>
                )}
                {
                  resposta[0]
                    ? resposta.map((album) => (
                      <div key={ album.collectionId }>
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <h2>{album.collectionName}</h2>
                        <p>{album.artistName}</p>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          Álbum
                        </Link>
                      </div>
                    ))
                    : (artistaPesquisado)
                    && (<p>Nenhum álbum foi encontrado</p>)
                }

              </div>
            )
        }

      </div>
    );
  }
}

export default Search;
