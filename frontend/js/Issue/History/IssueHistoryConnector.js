import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchIssueHistory, clearIssueHistory, issueHistoryMarkAsFailed } from 'Store/Actions/issueHistoryActions';
import IssueHistory from './IssueHistory';

function createMapStateToProps() {
  return createSelector(
    (state) => state.issueHistory,
    (issueHistory) => {
      return issueHistory;
    }
  );
}

const mapDispatchToProps = {
  fetchIssueHistory,
  clearIssueHistory,
  issueHistoryMarkAsFailed
};

class IssueHistoryConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.fetchIssueHistory({ issueId: this.props.issueId });
  }

  componentWillUnmount() {
    this.props.clearIssueHistory();
  }

  //
  // Listeners

  onMarkAsFailedPress = (historyId) => {
    this.props.issueHistoryMarkAsFailed({ historyId, issueId: this.props.issueId });
  }

  //
  // Render

  render() {
    return (
      <IssueHistory
        {...this.props}
        onMarkAsFailedPress={this.onMarkAsFailedPress}
      />
    );
  }
}

IssueHistoryConnector.propTypes = {
  issueId: PropTypes.number.isRequired,
  fetchIssueHistory: PropTypes.func.isRequired,
  clearIssueHistory: PropTypes.func.isRequired,
  issueHistoryMarkAsFailed: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(IssueHistoryConnector);
