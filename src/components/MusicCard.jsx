import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { value, handleClick, checked } = this.props;
    const { trackName, previewUrl, trackId } = value;
    return (
      <div>
        <p>
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            defaultChecked={ checked }
            onClick={ handleClick }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  value: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default MusicCard;
