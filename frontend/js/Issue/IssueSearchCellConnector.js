import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isCommandExecuting } from 'Utilities/Command';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import IssueSearchCell from './IssueSearchCell';

function createMapStateToProps() {
  return createSelector(
    (state, { issueId }) => issueId,
    (state, { sceneSeasonNumber }) => sceneSeasonNumber,
    createComicSelector(),
    createCommandsSelector(),
    (issueId, sceneSeasonNumber, comic, commands) => {
      const isSearching = commands.some((command) => {
        const issueSearch = command.name === commandNames.ISSUE_SEARCH;

        if (!issueSearch) {
          return false;
        }

        return (
          isCommandExecuting(command) &&
          command.body.issueIds.indexOf(issueId) > -1
        );
      });

      return {
        comicMonitored: comic.monitored,
        comicType: comic.comicType,
        isSearching
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onSearchPress(name, path) {
      dispatch(executeCommand({
        name: commandNames.ISSUE_SEARCH,
        issueIds: [props.issueId]
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(IssueSearchCell);
