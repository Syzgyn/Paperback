import PropTypes from 'prop-types';
import React from 'react';
import EpisodeNumber from './EpisodeNumber';

function SeasonEpisodeNumber(props) {
  const {
    airDate,
    comicType,
    ...otherProps
  } = props;

  if (comicType === 'daily' && airDate) {
    return (
      <span>{airDate}</span>
    );
  }

  return (
    <EpisodeNumber
      comicType={comicType}
      showSeasonNumber={true}
      {...otherProps}
    />
  );
}

SeasonEpisodeNumber.propTypes = {
  airDate: PropTypes.string,
  comicType: PropTypes.string
};

export default SeasonEpisodeNumber;
