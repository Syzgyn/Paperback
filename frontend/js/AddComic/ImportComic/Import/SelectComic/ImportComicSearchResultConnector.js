import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createExistingComicSelector from 'Store/Selectors/createExistingComicSelector';
import ImportComicSearchResult from './ImportComicSearchResult';

function createMapStateToProps() {
  return createSelector(
    createExistingComicSelector(),
    (isExistingComic) => {
      return {
        isExistingComic
      };
    }
  );
}

export default connect(createMapStateToProps)(ImportComicSearchResult);
