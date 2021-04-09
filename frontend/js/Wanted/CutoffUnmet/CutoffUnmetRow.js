import PropTypes from 'prop-types';
import React from 'react';
import issueEntities from 'Issue/issueEntities';
import IssueTitleLink from 'Issue/IssueTitleLink';
import IssueStatusConnector from 'Issue/IssueStatusConnector';
import SeasonIssueNumber from 'Issue/SeasonIssueNumber';
import IssueSearchCellConnector from 'Issue/IssueSearchCellConnector';
import IssueFileLanguageConnector from 'IssueFile/IssueFileLanguageConnector';
import ComicTitleLink from 'Comic/ComicTitleLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import styles from './CutoffUnmetRow.css';

function CutoffUnmetRow(props) {
  const {
    id,
    issueFileId,
    comic,
    seasonNumber,
    issueNumber,
    absoluteIssueNumber,
    sceneSeasonNumber,
    sceneIssueNumber,
    sceneAbsoluteIssueNumber,
    unverifiedSceneNumbering,
    airDateUtc,
    title,
    isSelected,
    columns,
    onSelectedChange
  } = props;

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
              <TableRowCell
                key={name}
                className={styles.issue}
              >
                <SeasonIssueNumber
                  seasonNumber={seasonNumber}
                  issueNumber={issueNumber}
                  absoluteIssueNumber={absoluteIssueNumber}
                  comicType={comic.comicType}
                  alternateTitles={comic.alternateTitles}
                  sceneSeasonNumber={sceneSeasonNumber}
                  sceneIssueNumber={sceneIssueNumber}
                  sceneAbsoluteIssueNumber={sceneAbsoluteIssueNumber}
                  unverifiedSceneNumbering={unverifiedSceneNumbering}
                />
              </TableRowCell>
            );
          }

          if (name === 'issueTitle') {
            return (
              <TableRowCell key={name}>
                <IssueTitleLink
                  issueId={id}
                  comicId={comic.id}
                  issueEntity={issueEntities.WANTED_CUTOFF_UNMET}
                  issueTitle={title}
                  showOpenComicButton={true}
                />
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

          if (name === 'status') {
            return (
              <TableRowCell
                key={name}
                className={styles.status}
              >
                <IssueStatusConnector
                  issueId={id}
                  issueFileId={issueFileId}
                  issueEntity={issueEntities.WANTED_CUTOFF_UNMET}
                />
              </TableRowCell>
            );
          }

          if (name === 'actions') {
            return (
              <IssueSearchCellConnector
                key={name}
                issueId={id}
                comicId={comic.id}
                issueTitle={title}
                issueEntity={issueEntities.WANTED_CUTOFF_UNMET}
                showOpenComicButton={true}
              />
            );
          }

          return null;
        })
      }
    </TableRow>
  );
}

CutoffUnmetRow.propTypes = {
  id: PropTypes.number.isRequired,
  issueFileId: PropTypes.number,
  comic: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneIssueNumber: PropTypes.number,
  sceneAbsoluteIssueNumber: PropTypes.number,
  unverifiedSceneNumbering: PropTypes.bool.isRequired,
  airDateUtc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default CutoffUnmetRow;
