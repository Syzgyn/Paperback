import PropTypes from 'prop-types';
import React from 'react';
import issueEntities from 'Issue/issueEntities';
import IssueTitleLink from 'Issue/IssueTitleLink';
import IssueStatusConnector from 'Issue/IssueStatusConnector';
import SeasonIssueNumber from 'Issue/SeasonIssueNumber';
import IssueSearchCellConnector from 'Issue/IssueSearchCellConnector';
import ComicTitleLink from 'Comic/ComicTitleLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import styles from './MissingRow.css';

function MissingRow(props) {
  const {
    id,
    issueFileId,
    comic,
    seasonNumber,
    issueNumber,
    storeDate,
    coverDate,
    title,
    isSelected,
    columns,
    onSelectedChange
  } = props;

  if (!comic) {
    return null;
  }

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

          if (name === 'comics.title') {
            return (
              <TableRowCell key={name}>
                <ComicTitleLink
                  titleSlug={comic.titleSlug}
                  title={comic.title}
                />
              </TableRowCell>
            );
          }

          if (name === 'issue_num') {
            return (
              <TableRowCell
                key={name}
                className={styles.issue}
              >
                {issueNumber}
              </TableRowCell>
            );
          }

          if (name === 'issues.title') {
            return (
              <TableRowCell key={name}>
                <IssueTitleLink
                  issueId={id}
                  comicId={comic.id}
                  issueEntity={issueEntities.WANTED_MISSING}
                  issueTitle={title}
                  showOpenComicButton={true}
                />
              </TableRowCell>
            );
          }

          if (name === 'cover_date') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={coverDate}
              />
            );
          }

          if (name === 'store_date') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={storeDate}
              />
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
                  issueEntity={issueEntities.WANTED_MISSING}
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
                issueEntity={issueEntities.WANTED_MISSING}
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

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  issueFileId: PropTypes.number,
  comic: PropTypes.object.isRequired,
  issueNumber: PropTypes.number.isRequired,
  storeDate: PropTypes.string,
  coverDate: PropTypes.string,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default MissingRow;
