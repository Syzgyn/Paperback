import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import IssueSearchCellConnector from 'Issue/IssueSearchCellConnector';
import IssueNumber from 'Issue/IssueNumber';
import IssueTitleLink from 'Issue/IssueTitleLink';
import IssueStatusConnector from 'Issue/IssueStatusConnector';
import IssueFileLanguageConnector from 'IssueFile/IssueFileLanguageConnector';
import MediaInfoConnector from 'IssueFile/MediaInfoConnector';
import * as mediaInfoTypes from 'IssueFile/mediaInfoTypes';

import styles from './IssueRow.css';

class IssueRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onManualSearchPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  onMonitorIssuePress = (monitored, options) => {
    this.props.onMonitorIssuePress(this.props.id, monitored, options);
  }

  //
  // Render

  render() {
    const {
      id,
      comicId,
      issueFileId,
      monitored,
      seasonNumber,
      issueNumber,
      absoluteIssueNumber,
      sceneSeasonNumber,
      sceneIssueNumber,
      sceneAbsoluteIssueNumber,
      airDateUtc,
      title,
      useSceneNumbering,
      unverifiedSceneNumbering,
      isSaving,
      comicMonitored,
      comicType,
      issueFilePath,
      issueFileRelativePath,
      issueFileSize,
      alternateTitles,
      columns
    } = this.props;

    return (
      <TableRow>
        {
          columns.map((column) => {
            const {
              name,
              isVisible
            } = column;

            if (!isVisible) {
              return null;
            }

            if (name === 'monitored') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.monitored}
                >
                  <MonitorToggleButton
                    monitored={monitored}
                    isDisabled={!comicMonitored}
                    isSaving={isSaving}
                    onPress={this.onMonitorIssuePress}
                  />
                </TableRowCell>
              );
            }

            if (name === 'issueNumber') {
              return (
                <TableRowCell
                  key={name}
                  className={comicType === 'anime' ? styles.issueNumberAnime : styles.issueNumber}
                >
                  <IssueNumber
                    seasonNumber={seasonNumber}
                    issueNumber={issueNumber}
                    absoluteIssueNumber={absoluteIssueNumber}
                    useSceneNumbering={useSceneNumbering}
                    unverifiedSceneNumbering={unverifiedSceneNumbering}
                    comicType={comicType}
                    sceneSeasonNumber={sceneSeasonNumber}
                    sceneIssueNumber={sceneIssueNumber}
                    sceneAbsoluteIssueNumber={sceneAbsoluteIssueNumber}
                    alternateTitles={alternateTitles}
                  />
                </TableRowCell>
              );
            }

            if (name === 'title') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.title}
                >
                  <IssueTitleLink
                    issueId={id}
                    comicId={comicId}
                    issueTitle={title}
                    showOpenComicButton={false}
                  />
                </TableRowCell>
              );
            }

            if (name === 'path') {
              return (
                <TableRowCell key={name}>
                  {
                    issueFilePath
                  }
                </TableRowCell>
              );
            }

            if (name === 'relativePath') {
              return (
                <TableRowCell key={name}>
                  {
                    issueFileRelativePath
                  }
                </TableRowCell>
              );
            }

            if (name === 'airDateUtc') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  date={airDateUtc}
                />
              );
            }

            if (name === 'language') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.language}
                >
                  <IssueFileLanguageConnector
                    issueFileId={issueFileId}
                  />
                </TableRowCell>
              );
            }

            if (name === 'audioInfo') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.audio}
                >
                  <MediaInfoConnector
                    type={mediaInfoTypes.AUDIO}
                    issueFileId={issueFileId}
                  />
                </TableRowCell>
              );
            }

            if (name === 'videoCodec') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.video}
                >
                  <MediaInfoConnector
                    type={mediaInfoTypes.VIDEO}
                    issueFileId={issueFileId}
                  />
                </TableRowCell>
              );
            }

            if (name === 'size') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.size}
                >
                  {!!issueFileSize && formatBytes(issueFileSize)}
                </TableRowCell>
              );
            }

            if (name === 'status') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.status}
                >
                  <IssueStatusConnector
                    issueId={id}
                    issueFileId={issueFileId}
                  />
                </TableRowCell>
              );
            }

            if (name === 'actions') {
              return (
                <IssueSearchCellConnector
                  key={name}
                  issueId={id}
                  comicId={comicId}
                  issueTitle={title}
                />
              );
            }

            return null;
          })
        }
      </TableRow>
    );
  }
}

IssueRow.propTypes = {
  id: PropTypes.number.isRequired,
  comicId: PropTypes.number.isRequired,
  issueFileId: PropTypes.number,
  monitored: PropTypes.bool.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneIssueNumber: PropTypes.number,
  sceneAbsoluteIssueNumber: PropTypes.number,
  airDateUtc: PropTypes.string,
  title: PropTypes.string.isRequired,
  isSaving: PropTypes.bool,
  useSceneNumbering: PropTypes.bool,
  unverifiedSceneNumbering: PropTypes.bool,
  comicMonitored: PropTypes.bool.isRequired,
  comicType: PropTypes.string.isRequired,
  issueFilePath: PropTypes.string,
  issueFileRelativePath: PropTypes.string,
  issueFileSize: PropTypes.number,
  mediaInfo: PropTypes.object,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMonitorIssuePress: PropTypes.func.isRequired
};

IssueRow.defaultProps = {
  alternateTitles: []
};

export default IssueRow;
