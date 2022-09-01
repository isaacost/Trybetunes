import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({
      favorites: await getFavoriteSongs(),
    });
  }

  handleClick = async (track) => {
    this.setState({
      loading: true,
    });
    await addSong(track);
    const { favorites } = this.state;
    this.setState({
      favorites: [...favorites, track],
      loading: false,
    });
  };

  render() {
    const { track } = this.props;
    const { trackName, previewUrl, trackId } = track;
    const { favorites, loading } = this.state;
    const favoriteMusics = favorites.some((song) => trackId === song.trackId);
    return (
      <div>
        {
          loading
            ? (<Loading />)
            : (
              <div>
                {' '}
                <p>
                  {trackName}
                </p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                </audio>
                <label htmlFor="favorita">
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    id={ trackId }
                    defaultChecked={ favoriteMusics }
                    onClick={ () => this.handleClick(track) }
                  />
                </label>
              </div>
            )
        }

      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
export default MusicCard;
