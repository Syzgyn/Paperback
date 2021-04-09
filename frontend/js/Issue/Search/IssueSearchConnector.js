import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as commandNames from 'Commands/commandNames';
import InteractiveSearchConnector from 'InteractiveSearch/InteractiveSearchConnector';
import { executeCommand } from 'Store/Actions/commandActions';
import IssueSearch from './IssueSearch';

function createMapStateToProps() {
  return createSelector(
    (state) => state.releases,
    (releases) => {
      return {
        isPopulated: releases.isPopulated
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand
};

class IssueSearchConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isInteractiveSearchOpen: props.startInteractiveSearch
    };
  }

  componentDidMount() {
    if (this.props.isPopulated) {
      this.setState({ isInteractiveSearchOpen: true });
    }
  }

  //
  // Listeners

  onQuickSearchPress = () => {
    this.props.executeCommand({
      name: commandNames.ISSUE_SEARCH,
      issueIds: [this.props.issueId]
    });

    this.props.onModalClose();
  }

  onInteractiveSearchPress = () => {
    this.setState({ isInteractiveSearchOpen: true });
  }

  //
  // Render

  render() {
    const { issueId } = this.props;

    if (this.state.isInteractiveSearchOpen) {
      return (
        <InteractiveSearchConnector
          type="issue"
          searchPayload={{ issueId }}
        />
      );
    }

    return (
      <IssueSearch
        {...this.props}
        onQuickSearchPress={this.onQuickSearchPress}
        onInteractiveSearchPress={this.onInteractiveSearchPress}
      />
    );
  }
}

IssueSearchConnector.propTypes = {
  issueId: PropTypes.number.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  startInteractiveSearch: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(IssueSearchConnector);
