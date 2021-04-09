import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TableRowButton from 'Components/Table/TableRowButton';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';

class SelectIssueRow extends Component {

  //
  // Listeners

  onPress = () => {
    const {
      id,
      isSelected
    } = this.props;

    this.props.onSelectedChange({ id, value: !isSelected });
  }

  //
  // Render

  render() {
    const {
      id,
      issueNumber,
      absoluteIssueNumber,
      title,
      airDate,
      isAnime,
      isSelected,
      onSelectedChange
    } = this.props;

    return (
      <TableRowButton onPress={this.onPress}>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell>
          {issueNumber}
          {isAnime ? ` (${absoluteIssueNumber})` : ''}
        </TableRowCell>

        <TableRowCell>
          {title}
        </TableRowCell>

        <TableRowCell>
          {airDate}
        </TableRowCell>
      </TableRowButton>
    );
  }
}

SelectIssueRow.propTypes = {
  id: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  airDate: PropTypes.string.isRequired,
  isAnime: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired
};

export default SelectIssueRow;
