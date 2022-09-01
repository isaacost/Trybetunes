import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const resposta = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      musics: resposta.slice(1),
      artistName: resposta[0].artistName,
      collectionName: resposta[0].collectionName,
      artworkUrl100: resposta[0].artworkUrl100,
      favorites,
      loading: false,
    });
  };

  handleClick = async ({ target }) => {
    const { musics } = this.state;
    const song = musics.find(({ trackId }) => trackId === +target.id);
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
        loading: false,
      });
    });
  };

  render() {
    const {
      musics,
      artistName,
      collectionName,
      artworkUrl100,
      loading,
      favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? (<Loading />)
            : (
              <div>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <h2 data-testid="artist-name">
                  {artistName}
                </h2>
                <h3 data-testid="album-name">
                  {collectionName}
                </h3>
                {
                  musics.map((music) => (<MusicCard
                    key={ music.trackId }
                    track={ music }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    value={ music }
                    checked={ favorites
                      .some(({ trackId }) => +trackId === +music.trackId) }
                    handleClick={ this.handleClick }
                  />))
                }
              </div>
            )
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
