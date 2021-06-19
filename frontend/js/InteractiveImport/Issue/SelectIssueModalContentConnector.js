import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  updateInteractiveImportItem,
  fetchInteractiveImportIssues,
  setInteractiveImportIssuesSort,
  clearInteractiveImportIssues,
  reprocessInteractiveImportItems
} from 'Store/Actions/interactiveImportActions';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import SelectIssueModalContent from './SelectIssueModalContent';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector('interactiveImport.issues'),
    (issues) => {
      return issues;
    }
  );
}

const mapDispatchToProps = {
  dispatchFetchInteractiveImportIssues: fetchInteractiveImportIssues,
  dispatchSetInteractiveImportIssuesSort: setInteractiveImportIssuesSort,
  dispatchClearInteractiveImportIssues: clearInteractiveImportIssues,
  dispatchUpdateInteractiveImportItem: updateInteractiveImportItem,
  dispatchReprocessInteractiveImportItems: reprocessInteractiveImportItems
};

class SelectIssueModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      comicId,
    } = this.props;

    this.props.dispatchFetchInteractiveImportIssues({ comicId });
  }

  componentWillUnmount() {
    // This clears the issues for the queue and hides the queue
    // We'll need another place to store issues for manual import
    this.props.dispatchClearInteractiveImportIssues();
  }

  //
  // Listeners

  onSortPress = (sortKey, sortDirection) => {
    this.props.dispatchSetInteractiveImportIssuesSort({ sortKey, sortDirection });
  }

  onIssuesSelect = (issueIds) => {
    const {
      ids,
      items,
      dispatchUpdateInteractiveImportItem,
      dispatchReprocessInteractiveImportItems,
      onModalClose
    } = this.props;

    const selectedIssues = items.reduce((acc, item) => {
      if (issueIds.indexOf(item.id) > -1) {
        acc.push(item);
      }

      return acc;
    }, []);

    const issuesPerFile = selectedIssues.length / ids.length;
    const sortedIssues = selectedIssues.sort((a, b) => {
      return a.seasonNumber - b.seasonNumber;
    });

    ids.forEach((id, index) => {
      const startingIndex = index * issuesPerFile;
      const issues = sortedIssues.slice(startingIndex, startingIndex + issuesPerFile);

      dispatchUpdateInteractiveImportItem({
        id,
        issues
      });
    });

    dispatchReprocessInteractiveImportItems({ ids });

    onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <SelectIssueModalContent
        {...this.props}
        onSortPress={this.onSortPress}
        onIssuesSelect={this.onIssuesSelect}
      />
    );
  }
}

SelectIssueModalContentConnector.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  comicId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchInteractiveImportIssues: PropTypes.func.isRequired,
  dispatchSetInteractiveImportIssuesSort: PropTypes.func.isRequired,
  dispatchClearInteractiveImportIssues: PropTypes.func.isRequired,
  dispatchUpdateInteractiveImportItem: PropTypes.func.isRequired,
  dispatchReprocessInteractiveImportItems: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SelectIssueModalContentConnector);
