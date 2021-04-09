import PropTypes from 'prop-types';
import React from 'react';
import IssueNumber from './IssueNumber';

function SeasonIssueNumber(props) {
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
    <IssueNumber
      comicType={comicType}
      showSeasonNumber={true}
      {...otherProps}
    />
  );
}

SeasonIssueNumber.propTypes = {
  airDate: PropTypes.string,
  comicType: PropTypes.string
};

export default SeasonIssueNumber;
