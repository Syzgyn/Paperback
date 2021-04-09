import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import MissingRow from './MissingRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    (comic) => {
      return {
        comic
      };
    }
  );
}

export default connect(createMapStateToProps)(MissingRow);
