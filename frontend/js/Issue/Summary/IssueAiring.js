import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import formatTime from 'Utilities/Date/formatTime';
import isInNextWeek from 'Utilities/Date/isInNextWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';

function IssueAiring(props) {
  const {
    releaseDateUtc,
    network,
    shortDateFormat,
    showRelativeDates,
    timeFormat
  } = props;

  const networkLabel = (
    <Label
      kind={kinds.INFO}
      size={sizes.MEDIUM}
    >
      {network}
    </Label>
  );

  if (!releaseDateUtc) {
    return (
      <span>
        TBA on {networkLabel}
      </span>
    );
  }

  const time = formatTime(releaseDateUtc, timeFormat);

  if (!showRelativeDates) {
    return (
      <span>
        {moment(releaseDateUtc).format(shortDateFormat)} at {time} on {networkLabel}
      </span>
    );
  }

  if (isToday(releaseDateUtc)) {
    return (
      <span>
        {time} on {networkLabel}
      </span>
    );
  }

  if (isTomorrow(releaseDateUtc)) {
    return (
      <span>
        Tomorrow at {time} on {networkLabel}
      </span>
    );
  }

  if (isInNextWeek(releaseDateUtc)) {
    return (
      <span>
        {moment(releaseDateUtc).format('dddd')} at {time} on {networkLabel}
      </span>
    );
  }

  return (
    <span>
      {moment(releaseDateUtc).format(shortDateFormat)} at {time} on {networkLabel}
    </span>
  );
}

IssueAiring.propTypes = {
  releaseDateUtc: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired
};

IssueAiring.defaultProps = {
    network: "Publisher",
}

export default IssueAiring;
