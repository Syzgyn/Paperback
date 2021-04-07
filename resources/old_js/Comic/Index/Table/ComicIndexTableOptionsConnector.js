import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ComicIndexTableOptions from './ComicIndexTableOptions';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comicIndex.tableOptions,
    (tableOptions) => {
      return tableOptions;
    }
  );
}

export default connect(createMapStateToProps)(ComicIndexTableOptions);
