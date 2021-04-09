import PropTypes from 'prop-types';
import React from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import styles from './SeasonInfo.css';

function SeasonInfo(props) {
  const {
    totalIssueCount,
    monitoredIssueCount,
    issueFileCount,
    sizeOnDisk
  } = props;

  return (
    <DescriptionList>
      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title="Total"
        data={totalIssueCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title="Monitored"
        data={monitoredIssueCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title="With Files"
        data={issueFileCount}
      />

      <DescriptionListItem
        titleClassName={styles.title}
        descriptionClassName={styles.description}
        title="Size on Disk"
        data={formatBytes(sizeOnDisk)}
      />
    </DescriptionList>
  );
}

SeasonInfo.propTypes = {
  totalIssueCount: PropTypes.number.isRequired,
  monitoredIssueCount: PropTypes.number.isRequired,
  issueFileCount: PropTypes.number.isRequired,
  sizeOnDisk: PropTypes.number.isRequired
};

export default SeasonInfo;
