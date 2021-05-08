import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { tooltipPositions, icons, sizes } from 'Helpers/Props';
import styles from './ReleaseSceneIndicator.css';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import Popover from 'Components/Tooltip/Popover';
import Icon from 'Components/Icon';

function formatReleaseNumber(issueNumbers) {
  if (issueNumbers && issueNumbers.length) {
    if (issueNumbers.length > 1) {
      return `${issueNumbers[0]}-${issueNumbers[issueNumbers.length - 1]}`;
    }
    return `${issueNumbers[0]}`;
  }

  return null;
}

function ReleaseSceneIndicator(props) {
  const {
    className,
    issueNumbers,
    issueRequested,
    releaseGroup,
  } = props;

  if (!releaseGroup) {
    return null;
  }

  const formattedNumber = formatReleaseNumber(issueNumbers);

  const table = (
    <DescriptionList className={styles.descriptionList}>
      {
        releaseGroup !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title="Group"
            data={releaseGroup}
          />
      }

      {
        formattedNumber !== null &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title="Release"
            data={formattedNumber}
          />
      }

    </DescriptionList>
  );

  return (
    <Popover
      anchor={
        <div className={classNames(styles.levelNone, styles.container, className)}>
          <Icon
            name={icons.SCENE_MAPPING}
            size={12}
          />
        </div>
      }
      title="Scene Info"
      body={
        <div>
          {table}
        </div>
      }
      position={tooltipPositions.RIGHT}
    />
  );
}

ReleaseSceneIndicator.propTypes = {
  className: PropTypes.string.isRequired,
  issueNumbers: PropTypes.arrayOf(PropTypes.number),
  issueRequested: PropTypes.bool.isRequired,
  releaseGroup: PropTypes.string,
};

export default ReleaseSceneIndicator;
