import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicSort } from 'Store/Actions/comicIndexActions';
import ComicIndexTable from './ComicIndexTable';

function createMapStateToProps() {
  return createSelector(
    (state) => state.app.dimensions,
    (state) => state.comicIndex.tableOptions,
    (state) => state.comicIndex.columns,
    (dimensions, tableOptions, columns) => {
      return {
        isSmallScreen: dimensions.isSmallScreen,
        showBanners: tableOptions.showBanners,
        columns
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onSortPress(sortKey) {
      dispatch(setComicSort({ sortKey }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ComicIndexTable);
