import PropTypes from 'prop-types';
import React, { Component } from 'react';
import titleCase from 'Utilities/String/titleCase';
import formatBytes from 'Utilities/Number/formatBytes';
import TagListConnector from 'Components/TagListConnector';
import CheckInput from 'Components/Form/CheckInput';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import ComicTitleLink from 'Comic/ComicTitleLink';
import ComicStatusCell from 'Comic/Index/Table/ComicStatusCell';
import styles from './ComicEditorRow.css';

class ComicEditorRow extends Component {

  //
  // Listeners

  onSeasonFolderChange = () => {
    // Mock handler to satisfy `onChange` being required for `CheckInput`.
    //
  }

  //
  // Render

  render() {
    const {
      id,
      monitored,
      status,
      title,
      titleSlug,
      year,
      path,
      tags,
      statistics = {},
      columns,
      isSelected,
      onSelectedChange
    } = this.props;

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
                <ComicStatusCell
                  key={name}
                  monitored={monitored}
                  status={status}
                />
              );
            }

            if (name === 'year') {
              return (
                <TableRowCell key={name}>
                    {year}
                </TableRowCell>
              );
            }

            if (name === 'numIssues') {
              return (
                <TableRowCell key={name}>
                    {statistics.issueCount}
                </TableRowCell>
              );
            }

            if (name === 'sortTitle') {
              return (
                <TableRowCell
                  key={name}
                  className={styles.title}
                >
                  <ComicTitleLink

                    titleSlug={titleSlug}
                    title={title}
                  />
                </TableRowCell>
              );
            }

            if (name === 'comicType') {
              return (
                <TableRowCell key={name}>
                  {titleCase(comicType)}
                </TableRowCell>
              );
            }

            if (name === 'path') {
              return (
                <TableRowCell key={name}>
                  {path}
                </TableRowCell>
              );
            }

            if (name === 'sizeOnDisk') {
              return (
                <TableRowCell key={name}>
                  {formatBytes(statistics.sizeOnDisk)}
                </TableRowCell>
              );
            }

            if (name === 'tags') {
              return (
                <TableRowCell key={name}>
                  <TagListConnector
                    tags={tags}
                  />
                </TableRowCell>
              );
            }

            return null;
          })
        }
      </TableRow>
    );
  }
}

ComicEditorRow.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  comicType: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  statistics: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired
};

ComicEditorRow.defaultProps = {
  tags: []
};

export default ComicEditorRow;
