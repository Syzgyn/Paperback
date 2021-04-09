import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicClientSideCollectionItemsSelector from 'Store/Selectors/createComicClientSideCollectionItemsSelector';
import createCommandExecutingSelector from 'Store/Selectors/createCommandExecutingSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import scrollPositions from 'Store/scrollPositions';
import { setComicSort, setComicFilter, setComicView, setComicTableOption } from 'Store/Actions/comicIndexActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import withScrollPosition from 'Components/withScrollPosition';
import ComicIndex from './ComicIndex';

function createMapStateToProps() {
  return createSelector(
    createComicClientSideCollectionItemsSelector('comicIndex'),
    createCommandExecutingSelector(commandNames.REFRESH_COMIC),
    createCommandExecutingSelector(commandNames.RSS_SYNC),
    createDimensionsSelector(),
    (
      comic,
      isRefreshingComic,
      isRssSyncExecuting,
      dimensionsState
    ) => {
      return {
        ...comic,
        isRefreshingComic,
        isRssSyncExecuting,
        isSmallScreen: dimensionsState.isSmallScreen
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onTableOptionChange(payload) {
      dispatch(setComicTableOption(payload));
    },

    onSortSelect(sortKey) {
      dispatch(setComicSort({ sortKey }));
    },

    onFilterSelect(selectedFilterKey) {
      dispatch(setComicFilter({ selectedFilterKey }));
    },

    dispatchSetComicView(view) {
      dispatch(setComicView({ view }));
    },

    onRefreshComicPress() {
      dispatch(executeCommand({
        name: commandNames.REFRESH_COMIC
      }));
    },

    onRssSyncPress() {
      dispatch(executeCommand({
        name: commandNames.RSS_SYNC
      }));
    }
  };
}

class ComicIndexConnector extends Component {

  //
  // Listeners

  onViewSelect = (view) => {
    this.props.dispatchSetComicView(view);
  }

  onScroll = ({ scrollTop }) => {
    scrollPositions.comicIndex = scrollTop;
  }

  //
  // Render

  render() {
    return (
      <ComicIndex
        {...this.props}
        onViewSelect={this.onViewSelect}
        onScroll={this.onScroll}
      />
    );
  }
}

ComicIndexConnector.propTypes = {
  isSmallScreen: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  dispatchSetComicView: PropTypes.func.isRequired
};

export default withScrollPosition(
  connect(createMapStateToProps, createMapDispatchToProps)(ComicIndexConnector),
  'comicIndex'
);
