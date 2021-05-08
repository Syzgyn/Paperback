import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatDateTime from 'Utilities/Date/formatDateTime';
import formatAge from 'Utilities/Number/formatAge';
import formatBytes from 'Utilities/Number/formatBytes';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import Link from 'Components/Link/Link';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import Popover from 'Components/Tooltip/Popover';
import IssueLanguage from 'Issue/IssueLanguage';
import IssueQuality from 'Issue/IssueQuality';
import ProtocolLabel from 'Activity/Queue/ProtocolLabel';
import ReleaseSceneIndicator from './ReleaseSceneIndicator';
import Peers from './Peers';
import styles from './InteractiveSearchRow.css';

function getDownloadIcon(isGrabbing, isGrabbed, grabError) {
  if (isGrabbing) {
    return icons.SPINNER;
  } else if (isGrabbed) {
    return icons.DOWNLOADING;
  } else if (grabError) {
    return icons.DOWNLOADING;
  }

  return icons.DOWNLOAD;
}

function getDownloadTooltip(isGrabbing, isGrabbed, grabError) {
  if (isGrabbing) {
    return '';
  } else if (isGrabbed) {
    return 'Added to downloaded queue';
  } else if (grabError) {
    return grabError;
  }

  return 'Add to downloaded queue';
}

class InteractiveSearchRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isConfirmGrabModalOpen: false
    };
  }

  //
  // Listeners

  onGrabPress = () => {
    const {
      guid,
      indexerId,
      onGrabPress
    } = this.props;

    onGrabPress({
      guid,
      indexerId
    });
  }

  onConfirmGrabPress = () => {
    this.setState({ isConfirmGrabModalOpen: true });
  }

  onGrabConfirm = () => {
    this.setState({ isConfirmGrabModalOpen: false });

    const {
      guid,
      indexerId,
      searchPayload,
      onGrabPress
    } = this.props;

    onGrabPress({
      guid,
      indexerId,
      ...searchPayload
    });
  }

  onGrabCancel = () => {
    this.setState({ isConfirmGrabModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      protocol,
      age,
      ageHours,
      ageMinutes,
      publishDate,
      title,
      infoUrl,
      indexer,
      size,
      seeders,
      leechers,
      sceneMapping,
      seasonNumber,
      issueNumbers,
      mappedIssueNumbers,
      rejections,
      issueRequested,
      downloadAllowed,
      isGrabbing,
      isGrabbed,
      longDateFormat,
      timeFormat,
      grabError,
      releaseGroup,
    } = this.props;

    return (
      <TableRow>
        <TableRowCell className={styles.protocol}>
          <ProtocolLabel
            protocol={protocol}
          />
        </TableRowCell>

        <TableRowCell
          className={styles.age}
          title={formatDateTime(publishDate, longDateFormat, timeFormat, { includeSeconds: true })}
        >
          {formatAge(age, ageHours, ageMinutes)}
        </TableRowCell>

        <TableRowCell className={styles.title}>
          <Link to={infoUrl}>
            {title}
          </Link>
          <ReleaseSceneIndicator
            className={styles.sceneMapping}
            releaseGroup={releaseGroup}
            issueNumbers={mappedIssueNumbers}
            issueRequested={issueRequested}
          />
        </TableRowCell>

        <TableRowCell className={styles.indexer}>
          {indexer}
        </TableRowCell>

        <TableRowCell className={styles.size}>
          {formatBytes(size)}
        </TableRowCell>

        <TableRowCell className={styles.peers}>
          {
            protocol === 'torrent' &&
              <Peers
                seeders={seeders}
                leechers={leechers}
              />
          }
        </TableRowCell>

        <TableRowCell className={styles.rejected}>
          {
            !!rejections.length &&
              <Popover
                anchor={
                  <Icon
                    name={icons.DANGER}
                    kind={kinds.DANGER}
                  />
                }
                title="Release Rejected"
                body={
                  <ul>
                    {
                      rejections.map((rejection, index) => {
                        return (
                          <li key={index}>
                            {rejection}
                          </li>
                        );
                      })
                    }
                  </ul>
                }
                position={tooltipPositions.LEFT}
              />
          }
        </TableRowCell>

        <TableRowCell className={styles.download}>
          <SpinnerIconButton
            name={getDownloadIcon(isGrabbing, isGrabbed, grabError)}
            kind={grabError ? kinds.DANGER : kinds.DEFAULT}
            title={getDownloadTooltip(isGrabbing, isGrabbed, grabError)}
            isSpinning={isGrabbing}
            onPress={downloadAllowed ? this.onGrabPress : this.onConfirmGrabPress}
          />
        </TableRowCell>

        <ConfirmModal
          isOpen={this.state.isConfirmGrabModalOpen}
          kind={kinds.WARNING}
          title="Grab Release"
          message={`Paperback was unable to determine which comic and issue this release was for. Paperback may be unable to automatically import this release. Do you want to grab '${title}'?`}
          confirmLabel="Grab"
          onConfirm={this.onGrabConfirm}
          onCancel={this.onGrabCancel}
        />
      </TableRow>
    );
  }
}

InteractiveSearchRow.propTypes = {
  guid: PropTypes.string.isRequired,
  protocol: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  ageHours: PropTypes.number.isRequired,
  ageMinutes: PropTypes.number.isRequired,
  publishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  infoUrl: PropTypes.string.isRequired,
  indexerId: PropTypes.number.isRequired,
  indexer: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  seeders: PropTypes.number,
  leechers: PropTypes.number,
  sceneMapping: PropTypes.object,
  seasonNumber: PropTypes.number,
  issueNumbers: PropTypes.arrayOf(PropTypes.number),
  absoluteIssueNumbers: PropTypes.arrayOf(PropTypes.number),
  mappedSeasonNumber: PropTypes.number,
  mappedIssueNumbers: PropTypes.arrayOf(PropTypes.number),
  mappedAbsoluteIssueNumbers: PropTypes.arrayOf(PropTypes.number),
  rejections: PropTypes.arrayOf(PropTypes.string).isRequired,
  issueRequested: PropTypes.bool.isRequired,
  downloadAllowed: PropTypes.bool.isRequired,
  isGrabbing: PropTypes.bool.isRequired,
  isGrabbed: PropTypes.bool.isRequired,
  grabError: PropTypes.string,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  searchPayload: PropTypes.object.isRequired,
  onGrabPress: PropTypes.func.isRequired,
  releaseGroup: PropTypes.string,
};

InteractiveSearchRow.defaultProps = {
  rejections: [],
  isGrabbing: false,
  isGrabbed: false
};

export default InteractiveSearchRow;
