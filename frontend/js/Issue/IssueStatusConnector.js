import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createIssueSelector from 'Store/Selectors/createIssueSelector';
import createQueueItemSelector from 'Store/Selectors/createQueueItemSelector';
import createIssueFileSelector from 'Store/Selectors/createIssueFileSelector';
import IssueStatus from './IssueStatus';

function createMapStateToProps() {
  return createSelector(
    createIssueSelector(),
    createQueueItemSelector(),
    createIssueFileSelector(),
    (issue, queueItem, issueFile) => {
      const result = _.pick(issue, [
        'storeDate',
        'coverDate',
        'monitored',
        'grabbed'
      ]);

      result.queueItem = queueItem;
      result.issueFile = issueFile;

      return result;
    }
  );
}

const mapDispatchToProps = {
};

class IssueStatusConnector extends Component {

  //
  // Render

  render() {
    return (
      <IssueStatus
        {...this.props}
      />
    );
  }
}

IssueStatusConnector.propTypes = {
  issueId: PropTypes.number.isRequired,
  issueFileId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(IssueStatusConnector);
