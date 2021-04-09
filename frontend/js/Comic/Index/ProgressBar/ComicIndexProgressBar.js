import PropTypes from 'prop-types';
import React from 'react';
import getProgressBarKind from 'Utilities/Comic/getProgressBarKind';
import { sizes } from 'Helpers/Props';
import ProgressBar from 'Components/ProgressBar';
import styles from './ComicIndexProgressBar.css';

function ComicIndexProgressBar(props) {
  const {
    monitored,
    status,
    issueCount,
    issueFileCount,
    totalIssueCount,
    posterWidth,
    detailedProgressBar
  } = props;

  const progress = issueCount ? issueFileCount / issueCount * 100 : 100;
  const text = `${issueFileCount} / ${issueCount}`;

  return (
    <ProgressBar
      className={styles.progressBar}
      containerClassName={styles.progress}
      progress={progress}
      kind={getProgressBarKind(status, monitored, progress)}
      size={detailedProgressBar ? sizes.MEDIUM : sizes.SMALL}
      showText={detailedProgressBar}
      text={text}
      title={`${issueFileCount} / ${issueCount} (Total: ${totalIssueCount})`}
      width={posterWidth}
    />
  );
}

ComicIndexProgressBar.propTypes = {
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  issueCount: PropTypes.number.isRequired,
  issueFileCount: PropTypes.number.isRequired,
  totalIssueCount: PropTypes.number.isRequired,
  posterWidth: PropTypes.number.isRequired,
  detailedProgressBar: PropTypes.bool.isRequired
};

export default ComicIndexProgressBar;
