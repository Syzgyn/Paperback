import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import { registerPagePopulator, unregisterPagePopulator } from 'Utilities/pagePopulator';
import filterAlternateTitles from 'Utilities/Comic/filterAlternateTitles';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { fetchIssues, clearIssues } from 'Store/Actions/issueActions';
import { fetchIssueFiles, clearIssueFiles } from 'Store/Actions/issueFileActions';
import { toggleComicMonitored } from 'Store/Actions/comicActions';
import { fetchQueueDetails, clearQueueDetails } from 'Store/Actions/queueActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import ComicDetails from './ComicDetails';

const selectIssues = createSelector(
  (state) => state.issues,
  (issues) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = issues;

    const hasIssues = !!items.length;
    const hasMonitoredIssues = items.some((e) => e.monitored);

    return {
      isIssuesFetching: isFetching,
      isIssuesPopulated: isPopulated,
      issuesError: error,
      hasIssues,
      hasMonitoredIssues
    };
  }
);

const selectIssueFiles = createSelector(
  (state) => state.issueFiles,
  (issueFiles) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = issueFiles;

    const hasIssueFiles = !!items.length;

    return {
      isIssueFilesFetching: isFetching,
      isIssueFilesPopulated: isPopulated,
      issueFilesError: error,
      hasIssueFiles
    };
  }
);

function createMapStateToProps() {
  return createSelector(
    (state, { titleSlug }) => titleSlug,
    selectIssues,
    selectIssueFiles,
    createAllComicSelector(),
    createCommandsSelector(),
    (titleSlug, issues, issueFiles, allComic, commands) => {
      const sortedComic = _.orderBy(allComic, 'sortTitle');
      const comicIndex = _.findIndex(sortedComic, { titleSlug });
      const comic = sortedComic[comicIndex];

      if (!comic) {
        return {};
      }

      const {
        isIssuesFetching,
        isIssuesPopulated,
        issuesError,
        hasIssues,
        hasMonitoredIssues
      } = issues;

      const {
        isIssueFilesFetching,
        isIssueFilesPopulated,
        issueFilesError,
        hasIssueFiles
      } = issueFiles;

      const previousComic = sortedComic[comicIndex - 1] || _.last(sortedComic);
      const nextComic = sortedComic[comicIndex + 1] || _.first(sortedComic);
      const isComicRefreshing = isCommandExecuting(findCommand(commands, { name: commandNames.REFRESH_COMIC, comicId: comic.id }));
      const comicRefreshingCommand = findCommand(commands, { name: commandNames.REFRESH_COMIC });
      const allComicRefreshing = (
        isCommandExecuting(comicRefreshingCommand) &&
        !comicRefreshingCommand.body.comicId
      );
      const isRefreshing = isComicRefreshing || allComicRefreshing;
      const isSearching = isCommandExecuting(findCommand(commands, { name: commandNames.COMIC_SEARCH, comicId: comic.id }));
      const isRenamingFiles = isCommandExecuting(findCommand(commands, { name: commandNames.RENAME_FILES, comicId: comic.id }));
      const isRenamingComicCommand = findCommand(commands, { name: commandNames.RENAME_COMIC });
      const isRenamingComic = (
        isCommandExecuting(isRenamingComicCommand) &&
        isRenamingComicCommand.body.comicIds.indexOf(comic.id) > -1
      );

      const isFetching = isIssuesFetching || isIssueFilesFetching;
      const isPopulated = isIssuesPopulated && isIssueFilesPopulated;
      const alternateTitles = filterAlternateTitles(comic.alternateTitles, comic.title, comic.useSceneNumbering);

      return {
        ...comic,
        alternateTitles,
        isComicRefreshing,
        allComicRefreshing,
        isRefreshing,
        isSearching,
        isRenamingFiles,
        isRenamingComic,
        isFetching,
        isPopulated,
        issuesError,
        issueFilesError,
        hasIssues,
        hasMonitoredIssues,
        hasIssueFiles,
        previousComic,
        nextComic
      };
    }
  );
}

const mapDispatchToProps = {
  fetchIssues,
  clearIssues,
  fetchIssueFiles,
  clearIssueFiles,
  toggleComicMonitored,
  fetchQueueDetails,
  clearQueueDetails,
  executeCommand
};

class ComicDetailsConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    registerPagePopulator(this.populate);
    this.populate();
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      isComicRefreshing,
      allComicRefreshing,
      isRenamingFiles,
      isRenamingComic
    } = this.props;

    if (
      (prevProps.isComicRefreshing && !isComicRefreshing) ||
      (prevProps.allComicRefreshing && !allComicRefreshing) ||
      (prevProps.isRenamingFiles && !isRenamingFiles) ||
      (prevProps.isRenamingComic && !isRenamingComic)
    ) {
      this.populate();
    }

    // If the id has changed we need to clear the issues/issue
    // files and fetch from the server.

    if (prevProps.id !== id) {
      this.unpopulate();
      this.populate();
    }
  }

  componentWillUnmount() {
    unregisterPagePopulator(this.populate);
    this.unpopulate();
  }

  //
  // Control

  populate = () => {
    const comicId = this.props.id;

    this.props.fetchIssues({ comicId });
    this.props.fetchIssueFiles({ comicId });
    this.props.fetchQueueDetails({ comicId });
  }

  unpopulate = () => {
    this.props.clearIssues();
    this.props.clearIssueFiles();
    this.props.clearQueueDetails();
  }

  //
  // Listeners

  onMonitorTogglePress = (monitored) => {
    this.props.toggleComicMonitored({
      comicId: this.props.id,
      monitored
    });
  }

  onRefreshPress = () => {
    this.props.executeCommand({
      name: commandNames.REFRESH_COMIC,
      comicId: this.props.id
    });
  }

  onSearchPress = () => {
    this.props.executeCommand({
      name: commandNames.COMIC_SEARCH,
      comicId: this.props.id
    });
  }

  //
  // Render

  render() {
    return (
      <ComicDetails
        {...this.props}
        onMonitorTogglePress={this.onMonitorTogglePress}
        onRefreshPress={this.onRefreshPress}
        onSearchPress={this.onSearchPress}
      />
    );
  }
}

ComicDetailsConnector.propTypes = {
  id: PropTypes.number.isRequired,
  titleSlug: PropTypes.string.isRequired,
  isComicRefreshing: PropTypes.bool.isRequired,
  allComicRefreshing: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isRenamingFiles: PropTypes.bool.isRequired,
  isRenamingComic: PropTypes.bool.isRequired,
  fetchIssues: PropTypes.func.isRequired,
  clearIssues: PropTypes.func.isRequired,
  fetchIssueFiles: PropTypes.func.isRequired,
  clearIssueFiles: PropTypes.func.isRequired,
  toggleComicMonitored: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired,
  clearQueueDetails: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicDetailsConnector);
