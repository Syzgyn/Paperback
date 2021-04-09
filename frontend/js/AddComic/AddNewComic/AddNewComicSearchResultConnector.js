import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createExistingComicSelector from 'Store/Selectors/createExistingComicSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import AddNewComicSearchResult from './AddNewComicSearchResult';

function createMapStateToProps() {
  return createSelector(
    createExistingComicSelector(),
    createDimensionsSelector(),
    (isExistingComic, dimensions) => {
      return {
        isExistingComic,
        isSmallScreen: dimensions.isSmallScreen
      };
    }
  );
}

export default connect(createMapStateToProps)(AddNewComicSearchResult);
