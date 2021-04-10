import PropTypes from 'prop-types';
import React from 'react';
import isBefore from 'Utilities/Date/isBefore';
import { icons, kinds, sizes } from 'Helpers/Props';
import Icon from 'Components/Icon';
import ProgressBar from 'Components/ProgressBar';
import QueueDetails from 'Activity/Queue/QueueDetails';
import IssueQuality from './IssueQuality';
import styles from './IssueStatus.css';

function IssueStatus(props) {
  const {
    releaseDateUtc,
    monitored,
    grabbed,
    queueItem,
    issueFile
  } = props;

  const hasIssueFile = !!issueFile;
  const isQueued = !!queueItem;
  const hasAired = isBefore(releaseDateUtc);

  if (isQueued) {
    const {
      sizeleft,
      size
    } = queueItem;

    const progress = size ? (100 - sizeleft / size * 100) : 0;

    return (
      <div className={styles.center}>
        <QueueDetails
          {...queueItem}
          progressBar={
            <ProgressBar
              title={`Issue is downloading - ${progress.toFixed(1)}% ${queueItem.title}`}
              progress={progress}
              kind={kinds.PURPLE}
              size={sizes.MEDIUM}
            />
          }
        />
      </div>
    );
  }

  if (grabbed) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.DOWNLOADING}
          title="Issue is downloading"
        />
      </div>
    );
  }

  if (hasIssueFile) {
    const quality = issueFile.quality;
    const isCutoffNotMet = issueFile.qualityCutoffNotMet;

    return (
      <div className={styles.center}>
        <IssueQuality
          quality={quality}
          size={issueFile.size}
          isCutoffNotMet={isCutoffNotMet}
          title="Issue Downloaded"
        />
      </div>
    );
  }

  if (!releaseDateUtc) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.TBA}
          title="TBA"
        />
      </div>
    );
  }

  if (!monitored) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.UNMONITORED}
          kind={kinds.DISABLED}
          title="Issue is not monitored"
        />
      </div>
    );
  }

  if (hasAired) {
    return (
      <div className={styles.center}>
        <Icon
          name={icons.MISSING}
          title="Issue missing from disk"
        />
      </div>
    );
  }

  return (
    <div className={styles.center}>
      <Icon
        name={icons.NOT_AIRED}
        title="Issue has not aired"
      />
    </div>
  );
}

IssueStatus.propTypes = {
  releaseDateUtc: PropTypes.string,
  monitored: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  issueFile: PropTypes.object
};

export default IssueStatus;
