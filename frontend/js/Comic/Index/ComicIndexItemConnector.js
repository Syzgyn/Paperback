import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createExecutingCommandsSelector from 'Store/Selectors/createExecutingCommandsSelector';
import createComicQualityProfileSelector from 'Store/Selectors/createComicQualityProfileSelector';
import createComicLanguageProfileSelector from 'Store/Selectors/createComicLanguageProfileSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';

function selectShowSearchAction() {
  return createSelector(
    (state) => state.comicIndex,
    (comicIndex) => {
      const view = comicIndex.view;

      switch (view) {
        case 'posters':
          return comicIndex.posterOptions.showSearchAction;
        case 'overview':
          return comicIndex.overviewOptions.showSearchAction;
        default:
          return comicIndex.tableOptions.showSearchAction;
      }
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createComicQualityProfileSelector(),
    createComicLanguageProfileSelector(),
    selectShowSearchAction(),
    createExecutingCommandsSelector(),
    (
      comic,
      qualityProfile,
      languageProfile,
      showSearchAction,
      executingCommands
    ) => {

      // If a comic is deleted this selector may fire before the parent
      // selecors, which will result in an undefined comic, if that happens
      // we want to return early here and again in the render function to avoid
      // trying to show a comic that has no information available.

      if (!comic) {
        return {};
      }

      const isRefreshingComic = executingCommands.some((command) => {
        return (
          command.name === commandNames.REFRESH_COMIC &&
          command.body.comicId === comic.id
        );
      });

      const isSearchingComic = executingCommands.some((command) => {
        return (
          command.name === commandNames.COMIC_SEARCH &&
          command.body.comicId === comic.id
        );
      });

      const latestSeason = _.maxBy(comic.seasons, (season) => season.seasonNumber);

      return {
        ...comic,
        qualityProfile,
        languageProfile,
        latestSeason,
        showSearchAction,
        isRefreshingComic,
        isSearchingComic
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchExecuteCommand: executeCommand
};

class ComicIndexItemConnector extends Component {

  //
  // Listeners

  onRefreshComicPress = () => {
    this.props.dispatchExecuteCommand({
      name: commandNames.REFRESH_COMIC,
      comicId: this.props.id
    });
  }

  onSearchPress = () => {
    this.props.dispatchExecuteCommand({
      name: commandNames.COMIC_SEARCH,
      comicId: this.props.id
    });
  }

  //
  // Render

  render() {
    const {
      id,
      component: ItemComponent,
      ...otherProps
    } = this.props;

    if (!id) {
      return null;
    }

    return (
      <ItemComponent
        {...otherProps}
        id={id}
        onRefreshComicPress={this.onRefreshComicPress}
        onSearchPress={this.onSearchPress}
      />
    );
  }
}

ComicIndexItemConnector.propTypes = {
  id: PropTypes.number,
  component: PropTypes.elementType.isRequired,
  dispatchExecuteCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicIndexItemConnector);
