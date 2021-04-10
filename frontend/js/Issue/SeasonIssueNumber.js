import PropTypes from 'prop-types';
import React from 'react';
import IssueNumber from './IssueNumber';

function SeasonIssueNumber(props) {
  const {
    releaseDate,
    comicType,
    ...otherProps
  } = props;

  if (comicType === 'daily' && releaseDate) {
    return (
      <span>{releaseDate}</span>
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
  releaseDate: PropTypes.string,
  comicType: PropTypes.string
};

export default SeasonIssueNumber;
