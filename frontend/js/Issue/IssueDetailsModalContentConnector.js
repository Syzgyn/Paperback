import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { cancelFetchReleases, clearReleases } from 'Store/Actions/releaseActions';
import { toggleIssueMonitored } from 'Store/Actions/issueActions';
import createIssueSelector from 'Store/Selectors/createIssueSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import issueEntities from 'Issue/issueEntities';
import IssueDetailsModalContent from './IssueDetailsModalContent';

function createMapStateToProps() {
  return createSelector(
    createIssueSelector(),
    createComicSelector(),
    (issue, comic) => {
      const {
        title: comicTitle,
        titleSlug,
        monitored: comicMonitored,
        comicType
      } = comic;

      return {
        comicTitle,
        titleSlug,
        comicMonitored,
        comicType,
        ...issue
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    dispatchCancelFetchReleases() {
      dispatch(cancelFetchReleases());
    },

    dispatchClearReleases() {
      dispatch(clearReleases());
    },

    onMonitorIssuePress(monitored) {
      const {
        issueId,
        issueEntity
      } = props;

      dispatch(toggleIssueMonitored({
        issueEntity,
        issueId,
        monitored
      }));
    }
  };
}

class IssueDetailsModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillUnmount() {
    // Clear pending releases here so we can reshow the search
    // results even after switching tabs.

    this.props.dispatchCancelFetchReleases();
    this.props.dispatchClearReleases();
  }

  //
  // Render

  render() {
    const {
      dispatchClearReleases,
      ...otherProps
    } = this.props;

    return (
      <IssueDetailsModalContent {...otherProps} />
    );
  }
}

IssueDetailsModalContentConnector.propTypes = {
  issueId: PropTypes.number.isRequired,
  issueEntity: PropTypes.string.isRequired,
  comicId: PropTypes.number.isRequired,
  dispatchCancelFetchReleases: PropTypes.func.isRequired,
  dispatchClearReleases: PropTypes.func.isRequired
};

IssueDetailsModalContentConnector.defaultProps = {
  issueEntity: issueEntities.ISSUES
};

export default connect(createMapStateToProps, createMapDispatchToProps)(IssueDetailsModalContentConnector);
