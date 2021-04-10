import _ from 'lodash';
import { createSelector } from 'reselect';
import createAllComicSelector from './createAllComicSelector';

function createExistingComicSelector() {
  return createSelector(
    (state, { tvdbId }) => tvdbId,
    createAllComicSelector(),
    (tvdbId, comic) => {
      return _.some(comic, { tvdbId });
    }
  );
}

export default createExistingComicSelector;