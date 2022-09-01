import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
  };

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const resposta = await getMusics(id);
    this.setState({
      musics: resposta.slice(1),
      artistName: resposta[0].artistName,
      collectionName: resposta[0].collectionName,
      artworkUrl100: resposta[0].artworkUrl100,
    });
  };

  render() {
    const { musics, artistName, collectionName, artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))
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
