import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import formatTime from 'Utilities/Date/formatTime';
import isInNextWeek from 'Utilities/Date/isInNextWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import styles from './IssueReleaseInfo.css';

function IssueAiring(props) {
  const {
    storeDate,
    coverDate,
    publisher,
    shortDateFormat,
    showRelativeDates,
    timeFormat
  } = props;

  const publisherLabel = (
    <Label
      kind={kinds.INFO}
      size={sizes.MEDIUM}
    >
      {publisher}
    </Label>
  );

  return (
    <div>
      <div>
        <span className={styles.infoTitle}>Publisher</span>
        <span>{publisherLabel}</span>
      </div>
      {coverDate && 
        <div>
          <span className={styles.infoTitle}>Cover Date</span>
          <span>{moment(coverDate).format(shortDateFormat)}</span>
        </div>
      }
      {storeDate &&
        <div>
          <span className={styles.infoTitle}>Store Date</span>
          <span>{moment(storeDate).format(shortDateFormat)}</span>
        </div>
      }
    </div>
  );

  if (!coverDate && !storeDate) {
    return (
      <span>
        TBA on {publisherLabel}
      </span>
    );
  }

  if (!showRelativeDates) {
    return (
      <span>
        {moment(coverDate).format(shortDateFormat)} by {publisherLabel}
      </span>
    );
  }

  if (isToday(releaseDateUtc)) {
    return (
      <span>
        {time} on {publisherLabel}
      </span>
    );
  }

  if (isTomorrow(releaseDateUtc)) {
    return (
      <span>
        Tomorrow at {time} on {publisherLabel}
      </span>
    );
  }

  if (isInNextWeek(releaseDateUtc)) {
    return (
      <span>
        {moment(releaseDateUtc).format('dddd')} at {time} on {publisherLabel}
      </span>
    );
  }

  return (
    <span>
      {moment(releaseDateUtc).format(shortDateFormat)} at {time} on {publisherLabel}
    </span>
  );
}

IssueAiring.propTypes = {
  releaseDateUtc: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired
};

IssueAiring.defaultProps = {
    publisher: "Publisher",
}

export default IssueAiring;
