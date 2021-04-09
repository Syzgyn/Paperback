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
import ComicDetailsSeason from './ComicDetailsSeason';

function createMapStateToProps() {
  return createSelector(
    (state, { seasonNumber }) => seasonNumber,
    (state) => state.issues,
    createComicSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    (seasonNumber, issues, comic, commands, dimensions) => {
      const isSearching = isCommandExecuting(findCommand(commands, {
        name: commandNames.SEASON_SEARCH,
        comicId: comic.id,
        seasonNumber
      }));

      const issuesInSeason = issues.items.filter((issue) => issue.seasonNumber === seasonNumber);
      const sortedIssues = issuesInSeason.sort((a, b) => b.issueNumber - a.issueNumber);

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
  toggleSeasonMonitored,
  toggleIssuesMonitored,
  setIssuesTableOption,
  executeCommand
};

class ComicDetailsSeasonConnector extends Component {

  //
  // Listeners

  onTableOptionChange = (payload) => {
    this.props.setIssuesTableOption(payload);
  }

  onMonitorSeasonPress = (monitored) => {
    const {
      comicId,
      seasonNumber
    } = this.props;

    this.props.toggleSeasonMonitored({
      comicId,
      seasonNumber,
      monitored
    });
  }

  onSearchPress = () => {
    const {
      comicId,
      seasonNumber
    } = this.props;

    this.props.executeCommand({
      name: commandNames.SEASON_SEARCH,
      comicId,
      seasonNumber
    });
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
      <ComicDetailsSeason
        {...this.props}
        onTableOptionChange={this.onTableOptionChange}
        onMonitorSeasonPress={this.onMonitorSeasonPress}
        onSearchPress={this.onSearchPress}
        onMonitorIssuePress={this.onMonitorIssuePress}
      />
    );
  }
}

ComicDetailsSeasonConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  toggleSeasonMonitored: PropTypes.func.isRequired,
  toggleIssuesMonitored: PropTypes.func.isRequired,
  setIssuesTableOption: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicDetailsSeasonConnector);
