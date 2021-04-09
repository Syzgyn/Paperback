import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isCommandExecuting } from 'Utilities/Command';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import EpisodeSearchCell from './EpisodeSearchCell';

function createMapStateToProps() {
  return createSelector(
    (state, { episodeId }) => episodeId,
    (state, { sceneSeasonNumber }) => sceneSeasonNumber,
    createComicSelector(),
    createCommandsSelector(),
    (episodeId, sceneSeasonNumber, comic, commands) => {
      const isSearching = commands.some((command) => {
        const episodeSearch = command.name === commandNames.EPISODE_SEARCH;

        if (!episodeSearch) {
          return false;
        }

        return (
          isCommandExecuting(command) &&
          command.body.episodeIds.indexOf(episodeId) > -1
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
        name: commandNames.EPISODE_SEARCH,
        episodeIds: [props.episodeId]
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(EpisodeSearchCell);
