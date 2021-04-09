import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatPreferredWordScore from 'Utilities/Number/formatPreferredWordScore';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import issueEntities from 'Issue/issueEntities';
import SeasonIssueNumber from 'Issue/SeasonIssueNumber';
import IssueTitleLink from 'Issue/IssueTitleLink';
import IssueLanguage from 'Issue/IssueLanguage';
import IssueQuality from 'Issue/IssueQuality';
import ComicTitleLink from 'Comic/ComicTitleLink';
import HistoryEventTypeCell from './HistoryEventTypeCell';
import HistoryDetailsModal from './Details/HistoryDetailsModal';
import styles from './HistoryRow.css';

class HistoryRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isMarkingAsFailed &&
      !this.props.isMarkingAsFailed &&
      !this.props.markAsFailedError
    ) {
      this.setState({ isDetailsModalOpen: false });
    }
  }

  //
  // Listeners

  onDetailsPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      issueId,
      comic,
      issue,
      language,
      languageCutoffNotMet,
      quality,
      qualityCutoffNotMet,
      eventType,
      sourceTitle,
      date,
      data,
      isMarkingAsFailed,
      columns,
      shortDateFormat,
      timeFormat,
      onMarkAsFailedPress
    } = this.props;

    if (!issue) {
      return null;
    }

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

            if (name === 'eventType') {
              return (
                <HistoryEventTypeCell
                  key={name}
                  eventType={eventType}
                  data={data}
                />
              );
            }

            if (name === 'comic.sortTitle') {
              return (
                <TableRowCell key={name}>
                  <ComicTitleLink
                    titleSlug={comic.titleSlug}
                    title={comic.title}
                  />
                </TableRowCell>
              );
            }

            if (name === 'issue') {
              return (
                <TableRowCell key={name}>
                  <SeasonIssueNumber
                    seasonNumber={issue.seasonNumber}
                    issueNumber={issue.issueNumber}
                    absoluteIssueNumber={issue.absoluteIssueNumber}
                    comicType={comic.comicType}
                    alternateTitles={comic.alternateTitles}
                    sceneSeasonNumber={issue.sceneSeasonNumber}
                    sceneIssueNumber={issue.sceneIssueNumber}
                    sceneAbsoluteIssueNumber={issue.sceneAbsoluteIssueNumber}
                  />
                </TableRowCell>
              );
            }

            if (name === 'issueTitle') {
              return (
                <TableRowCell key={name}>
                  <IssueTitleLink
                    issueId={issueId}
                    issueEntity={issueEntities.ISSUES}
                    comicId={comic.id}
                    issueTitle={issue.title}
                    showOpenComicButton={true}
                  />
                </TableRowCell>
              );
            }

            if (name === 'language') {
              return (
                <TableRowCell key={name}>
                  <IssueLanguage
                    language={language}
                    isCutoffMet={languageCutoffNotMet}
                  />
                </TableRowCell>
              );
            }

            if (name === 'quality') {
              return (
                <TableRowCell key={name}>
                  <IssueQuality
                    quality={quality}
                    isCutoffMet={qualityCutoffNotMet}
                  />
                </TableRowCell>
              );
            }

            if (name === 'date') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  date={date}
                />
              );
            }

            if (name === 'downloadClient') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.downloadClient}
                >
                  {data.downloadClient}
                </TableRowCell>
              );
            }

            if (name === 'indexer') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.indexer}
                >
                  {data.indexer}
                </TableRowCell>
              );
            }

            if (name === 'preferredWordScore') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.preferredWordScore}
                >
                  {formatPreferredWordScore(data.preferredWordScore)}
                </TableRowCell>
              );
            }

            if (name === 'releaseGroup') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.releaseGroup}
                >
                  {data.releaseGroup}
                </TableRowCell>
              );
            }

            if (name === 'details') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.details}
                >
                  <IconButton
                    name={icons.INFO}
                    onPress={this.onDetailsPress}
                  />
                </TableRowCell>
              );
            }

            return null;
          })
        }

        <HistoryDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          eventType={eventType}
          sourceTitle={sourceTitle}
          data={data}
          isMarkingAsFailed={isMarkingAsFailed}
          shortDateFormat={shortDateFormat}
          timeFormat={timeFormat}
          onMarkAsFailedPress={onMarkAsFailedPress}
          onModalClose={this.onDetailsModalClose}
        />
      </TableRow>
    );
  }

}

HistoryRow.propTypes = {
  issueId: PropTypes.number,
  comic: PropTypes.object.isRequired,
  issue: PropTypes.object,
  language: PropTypes.object.isRequired,
  languageCutoffNotMet: PropTypes.bool.isRequired,
  quality: PropTypes.object.isRequired,
  qualityCutoffNotMet: PropTypes.bool.isRequired,
  eventType: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isMarkingAsFailed: PropTypes.bool,
  markAsFailedError: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired
};

export default HistoryRow;
