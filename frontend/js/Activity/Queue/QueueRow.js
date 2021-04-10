import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import ProgressBar from 'Components/ProgressBar';
import TableRow from 'Components/Table/TableRow';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import ProtocolLabel from 'Activity/Queue/ProtocolLabel';
import IssueTitleLink from 'Issue/IssueTitleLink';
import IssueLanguage from 'Issue/IssueLanguage';
import IssueQuality from 'Issue/IssueQuality';
import SeasonIssueNumber from 'Issue/SeasonIssueNumber';
import InteractiveImportModal from 'InteractiveImport/InteractiveImportModal';
import ComicTitleLink from 'Comic/ComicTitleLink';
import QueueStatusCell from './QueueStatusCell';
import TimeleftCell from './TimeleftCell';
import RemoveQueueItemModal from './RemoveQueueItemModal';
import styles from './QueueRow.css';

class QueueRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isRemoveQueueItemModalOpen: false,
      isInteractiveImportModalOpen: false
    };
  }

  //
  // Listeners

  onRemoveQueueItemPress = () => {
    this.setState({ isRemoveQueueItemModalOpen: true });
  }

  onRemoveQueueItemModalConfirmed = (blacklist) => {
    const {
      onRemoveQueueItemPress,
      onQueueRowModalOpenOrClose
    } = this.props;

    onQueueRowModalOpenOrClose(false);
    onRemoveQueueItemPress(blacklist);

    this.setState({ isRemoveQueueItemModalOpen: false });
  }

  onRemoveQueueItemModalClose = () => {
    this.props.onQueueRowModalOpenOrClose(false);

    this.setState({ isRemoveQueueItemModalOpen: false });
  }

  onInteractiveImportPress = () => {
    this.props.onQueueRowModalOpenOrClose(true);

    this.setState({ isInteractiveImportModalOpen: true });
  }

  onInteractiveImportModalClose = () => {
    this.props.onQueueRowModalOpenOrClose(false);

    this.setState({ isInteractiveImportModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      downloadId,
      title,
      status,
      trackedDownloadStatus,
      trackedDownloadState,
      statusMessages,
      errorMessage,
      comic,
      issue,
      language,
      quality,
      protocol,
      indexer,
      outputPath,
      downloadClient,
      estimatedCompletionTime,
      timeleft,
      size,
      sizeleft,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
      isGrabbing,
      grabError,
      isRemoving,
      isSelected,
      columns,
      onSelectedChange,
      onGrabPress
    } = this.props;

    const {
      isRemoveQueueItemModalOpen,
      isInteractiveImportModalOpen
    } = this.state;

    const progress = 100 - (sizeleft / size * 100);
    const showInteractiveImport = status === 'completed' && trackedDownloadStatus === 'warning';
    const isPending = status === 'delay' || status === 'downloadClientUnavailable';

    return (
      <TableRow>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        {
          columns.map((column) => {
            const {
              name,
              isVisible
            } = column;

            if (!isVisible) {
              return null;
            }

            if (name === 'status') {
              return (
                <QueueStatusCell
                  key={name}
                  sourceTitle={title}
                  status={status}
                  trackedDownloadStatus={trackedDownloadStatus}
                  trackedDownloadState={trackedDownloadState}
                  statusMessages={statusMessages}
                  errorMessage={errorMessage}
                />
              );
            }

            if (name === 'comic.sortTitle') {
              return (
                <TableRowCell key={name}>
                  {
                    comic ?
                      <ComicTitleLink
                        titleSlug={comic.titleSlug}
                        title={comic.title}
                      /> :
                      title
                  }
                </TableRowCell>
              );
            }

            if (name === 'issue') {
              return (
                <TableRowCell key={name}>
                  {
                    issue ?
                      <SeasonIssueNumber
                        seasonNumber={issue.seasonNumber}
                        issueNumber={issue.issueNumber}
                        absoluteIssueNumber={issue.absoluteIssueNumber}
                        comicType={comic.comicType}
                        alternateTitles={comic.alternateTitles}
                        sceneSeasonNumber={issue.sceneSeasonNumber}
                        sceneIssueNumber={issue.sceneIssueNumber}
                        sceneAbsoluteIssueNumber={issue.sceneAbsoluteIssueNumber}
                        unverifiedSceneNumbering={issue.unverifiedSceneNumbering}
                      /> :
                      '-'
                  }
                </TableRowCell>
              );
            }

            if (name === 'issue.title') {
              return (
                <TableRowCell key={name}>
                  {
                    issue ?
                      <IssueTitleLink
                        issueId={issue.id}
                        comicId={comic.id}
                        issueFileId={issue.issueFileId}
                        issueTitle={issue.title}
                        showOpenComicButton={true}
                      /> :
                      '-'
                  }
                </TableRowCell>
              );
            }

            if (name === 'issue.releaseDateUtc') {
              if (issue) {
                return (
                  <RelativeDateCellConnector
                    key={name}
                    date={issue.releaseDateUtc}
                  />
                );
              }

              return (
                <TableRowCell key={name}>
                  -
                </TableRowCell>
              );
            }

            if (name === 'language') {
              return (
                <TableRowCell key={name}>
                  <IssueLanguage
                    language={language}
                  />
                </TableRowCell>
              );
            }

            if (name === 'quality') {
              return (
                <TableRowCell key={name}>
                  {
                    quality ?
                      <IssueQuality
                        quality={quality}
                      /> :
                      null
                  }
                </TableRowCell>
              );
            }

            if (name === 'protocol') {
              return (
                <TableRowCell key={name}>
                  <ProtocolLabel
                    protocol={protocol}
                  />
                </TableRowCell>
              );
            }

            if (name === 'indexer') {
              return (
                <TableRowCell key={name}>
                  {indexer}
                </TableRowCell>
              );
            }

            if (name === 'downloadClient') {
              return (
                <TableRowCell key={name}>
                  {downloadClient}
                </TableRowCell>
              );
            }

            if (name === 'title') {
              return (
                <TableRowCell key={name}>
                  {title}
                </TableRowCell>
              );
            }

            if (name === 'outputPath') {
              return (
                <TableRowCell key={name}>
                  {outputPath}
                </TableRowCell>
              );
            }

            if (name === 'estimatedCompletionTime') {
              return (
                <TimeleftCell
                  key={name}
                  status={status}
                  estimatedCompletionTime={estimatedCompletionTime}
                  timeleft={timeleft}
                  size={size}
                  sizeleft={sizeleft}
                  showRelativeDates={showRelativeDates}
                  shortDateFormat={shortDateFormat}
                  timeFormat={timeFormat}
                />
              );
            }

            if (name === 'progress') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.progress}
                >
                  {
                    !!progress &&
                      <ProgressBar
                        progress={progress}
                        title={`${progress.toFixed(1)}%`}
                      />
                  }
                </TableRowCell>
              );
            }

            if (name === 'actions') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.actions}
                >
                  {
                    showInteractiveImport &&
                      <IconButton
                        name={icons.INTERACTIVE}
                        onPress={this.onInteractiveImportPress}
                      />
                  }

                  {
                    isPending &&
                      <SpinnerIconButton
                        name={icons.DOWNLOAD}
                        kind={grabError ? kinds.DANGER : kinds.DEFAULT}
                        isSpinning={isGrabbing}
                        onPress={onGrabPress}
                      />
                  }

                  <SpinnerIconButton
                    title="Remove from queue"
                    name={icons.REMOVE}
                    isSpinning={isRemoving}
                    onPress={this.onRemoveQueueItemPress}
                  />
                </TableRowCell>
              );
            }

            return null;
          })
        }

        <InteractiveImportModal
          isOpen={isInteractiveImportModalOpen}
          downloadId={downloadId}
          title={title}
          onModalClose={this.onInteractiveImportModalClose}
        />

        <RemoveQueueItemModal
          isOpen={isRemoveQueueItemModalOpen}
          sourceTitle={title}
          canIgnore={!!comic}
          onRemovePress={this.onRemoveQueueItemModalConfirmed}
          onModalClose={this.onRemoveQueueItemModalClose}
        />
      </TableRow>
    );
  }

}

QueueRow.propTypes = {
  id: PropTypes.number.isRequired,
  downloadId: PropTypes.string,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  trackedDownloadStatus: PropTypes.string,
  trackedDownloadState: PropTypes.string,
  statusMessages: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  comic: PropTypes.object,
  issue: PropTypes.object,
  language: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  protocol: PropTypes.string.isRequired,
  indexer: PropTypes.string,
  outputPath: PropTypes.string,
  downloadClient: PropTypes.string,
  estimatedCompletionTime: PropTypes.string,
  timeleft: PropTypes.string,
  size: PropTypes.number,
  sizeleft: PropTypes.number,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isGrabbing: PropTypes.bool.isRequired,
  grabError: PropTypes.object,
  isRemoving: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired,
  onGrabPress: PropTypes.func.isRequired,
  onRemoveQueueItemPress: PropTypes.func.isRequired,
  onQueueRowModalOpenOrClose: PropTypes.func.isRequired
};

QueueRow.defaultProps = {
  isGrabbing: false,
  isRemoving: false
};

export default QueueRow;
