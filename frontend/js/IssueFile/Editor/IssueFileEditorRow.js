import PropTypes from 'prop-types';
import React from 'react';
import padNumber from 'Utilities/Number/padNumber';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import IssueLanguage from 'Issue/IssueLanguage';
import IssueQuality from 'Issue/IssueQuality';
import styles from './IssueFileEditorRow';

function IssueFileEditorRow(props) {
  const {
    id,
    comicType,
    seasonNumber,
    issueNumber,
    absoluteIssueNumber,
    relativePath,
    releaseDateUtc,
    language,
    quality,
    qualityCutoffNotMet,
    languageCutoffNotMet,
    isSelected,
    onSelectedChange
  } = props;

  return (
    <TableRow>
      <TableSelectCell
        id={id}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
      />

      <TableRowCell>
        {seasonNumber}x{padNumber(issueNumber, 2)}

        {
          comicType === 'anime' && !!absoluteIssueNumber &&
            <span className={styles.absoluteIssueNumber}>
              ({absoluteIssueNumber})
            </span>
        }
      </TableRowCell>

      <TableRowCell>
        {relativePath}
      </TableRowCell>

      <RelativeDateCellConnector
        date={releaseDateUtc}
      />

      <TableRowCell>
        <IssueLanguage
          language={language}
          isCutoffNotMet={languageCutoffNotMet}
        />
      </TableRowCell>

      <TableRowCell>
        <IssueQuality
          quality={quality}
          isCutoffNotMet={qualityCutoffNotMet}
        />
      </TableRowCell>
    </TableRow>
  );
}

IssueFileEditorRow.propTypes = {
  id: PropTypes.number.isRequired,
  comicType: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  relativePath: PropTypes.string.isRequired,
  releaseDateUtc: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  qualityCutoffNotMet: PropTypes.bool.isRequired,
  languageCutoffNotMet: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired
};

export default IssueFileEditorRow;
