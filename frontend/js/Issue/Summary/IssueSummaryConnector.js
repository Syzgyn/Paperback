import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchIssueFile, deleteIssueFile } from 'Store/Actions/issueFileActions';
import createIssueSelector from 'Store/Selectors/createIssueSelector';
import createIssueFileSelector from 'Store/Selectors/createIssueFileSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import IssueSummary from './IssueSummary';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createIssueSelector(),
    createIssueFileSelector(),
    (comic, issue, issueFile = {}) => {
      const {
        publisher 
      } = comic;

      const {
        storeDate,
        coverDate,
        overview
      } = issue;

      const {
        path,
        size,
        fileType,
      } = issueFile;

      return {
        publisher,
        storeDate,
        coverDate,
        overview,
        path,
        size,
        fileType,
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onDeleteIssueFile() {
      dispatch(deleteIssueFile({
        id: props.issueFileId,
        issueEntity: props.issueEntity
      }));
    },

    dispatchFetchIssueFile() {
      dispatch(fetchIssueFile({
        id: props.issueFileId
      }));
    }
  };
}

class IssueSummaryConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      issueFileId,
      path,
      dispatchFetchIssueFile
    } = this.props;

    if (issueFileId && !path) {
      dispatchFetchIssueFile({ id: issueFileId });
    }
  }

  //
  // Render

  render() {
    const {
      dispatchFetchIssueFile,
      ...otherProps
    } = this.props;

    return <IssueSummary {...otherProps} />;
  }
}

IssueSummaryConnector.propTypes = {
  issueFileId: PropTypes.number,
  path: PropTypes.string,
  dispatchFetchIssueFile: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, createMapDispatchToProps)(IssueSummaryConnector);
