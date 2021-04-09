import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import IssueDetailsModal from './IssueDetailsModal';
import styles from './IssueSearchCell.css';

class IssueSearchCell extends Component {

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

  //
  // Render

  render() {
    const {
      issueId,
      comicId,
      issueTitle,
      isSearching,
      onSearchPress,
      ...otherProps
    } = this.props;

    return (
      <TableRowCell className={styles.issueSearchCell}>
        <SpinnerIconButton
          name={icons.SEARCH}
          isSpinning={isSearching}
          onPress={onSearchPress}
        />

        <IconButton
          name={icons.INTERACTIVE}
          onPress={this.onManualSearchPress}
        />

        <IssueDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          issueId={issueId}
          comicId={comicId}
          issueTitle={issueTitle}
          selectedTab="search"
          startInteractiveSearch={true}
          onModalClose={this.onDetailsModalClose}
          {...otherProps}
        />
      </TableRowCell>
    );
  }
}

IssueSearchCell.propTypes = {
  issueId: PropTypes.number.isRequired,
  comicId: PropTypes.number.isRequired,
  issueTitle: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

export default IssueSearchCell;
