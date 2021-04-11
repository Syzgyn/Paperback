import _ from 'lodash';
import { createSelector } from 'reselect';
import createAllComicSelector from './createAllComicSelector';

function createExistingComicSelector() {
  return createSelector(
    (state, { cvid }) => cvid,
    createAllComicSelector(),
    (cvid, comic) => {
      return _.some(comic, { cvid });
    }
  );
}

export default createExistingComicSelector;
