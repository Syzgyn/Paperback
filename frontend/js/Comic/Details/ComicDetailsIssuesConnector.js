import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { toggleSeasonMonitored } from 'Store/Actions/comicActions';
import { toggleIssuesMonitored, setIssuesTableOption } from 'Store/Actions/issueActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import ComicDetailsIssues from './ComicDetailsIssues';

function createMapStateToProps() {
  return createSelector(
    (state) => state.issues,
    createComicSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    (issues, comic, commands, dimensions) => {
      const isSearching = isCommandExecuting(findCommand(commands, {
        name: commandNames.SEASON_SEARCH,
        comicId: comic.id,
      }));

      const sortedIssues = issues.items.sort((a, b) => b.issueNumber - a.issueNumber);

      return {
        items: sortedIssues,
        columns: issues.columns,
        isSearching,
        comicMonitored: comic.monitored,
        isSmallScreen: dimensions.isSmallScreen
      };
    }
  );
}

const mapDispatchToProps = {
  toggleIssuesMonitored,
  setIssuesTableOption,
  executeCommand
};

class ComicDetailsIssuesConnector extends Component {

  //
  // Listeners

  onTableOptionChange = (payload) => {
    this.props.setIssuesTableOption(payload);
  }

  onMonitorIssuePress = (issueIds, monitored) => {
    this.props.toggleIssuesMonitored({
      issueIds,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <ComicDetailsIssues
        {...this.props}
        onTableOptionChange={this.onTableOptionChange}
        onMonitorIssuePress={this.onMonitorIssuePress}
      />
    );
  }
}

ComicDetailsIssuesConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  toggleIssuesMonitored: PropTypes.func.isRequired,
  setIssuesTableOption: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicDetailsIssuesConnector);
