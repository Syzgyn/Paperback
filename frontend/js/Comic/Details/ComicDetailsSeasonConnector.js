import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { toggleSeasonMonitored } from 'Store/Actions/comicActions';
import { toggleEpisodesMonitored, setEpisodesTableOption } from 'Store/Actions/episodeActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import ComicDetailsSeason from './ComicDetailsSeason';

function createMapStateToProps() {
  return createSelector(
    (state, { seasonNumber }) => seasonNumber,
    (state) => state.episodes,
    createComicSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    (seasonNumber, episodes, comic, commands, dimensions) => {
      const isSearching = isCommandExecuting(findCommand(commands, {
        name: commandNames.SEASON_SEARCH,
        comicId: comic.id,
        seasonNumber
      }));

      const episodesInSeason = episodes.items.filter((episode) => episode.seasonNumber === seasonNumber);
      const sortedEpisodes = episodesInSeason.sort((a, b) => b.episodeNumber - a.episodeNumber);

      return {
        items: sortedEpisodes,
        columns: episodes.columns,
        isSearching,
        comicMonitored: comic.monitored,
        isSmallScreen: dimensions.isSmallScreen
      };
    }
  );
}

const mapDispatchToProps = {
  toggleSeasonMonitored,
  toggleEpisodesMonitored,
  setEpisodesTableOption,
  executeCommand
};

class ComicDetailsSeasonConnector extends Component {

  //
  // Listeners

  onTableOptionChange = (payload) => {
    this.props.setEpisodesTableOption(payload);
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

  onMonitorEpisodePress = (episodeIds, monitored) => {
    this.props.toggleEpisodesMonitored({
      episodeIds,
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
        onMonitorEpisodePress={this.onMonitorEpisodePress}
      />
    );
  }
}

ComicDetailsSeasonConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  toggleSeasonMonitored: PropTypes.func.isRequired,
  toggleEpisodesMonitored: PropTypes.func.isRequired,
  setEpisodesTableOption: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicDetailsSeasonConnector);
