import { createSelector } from 'reselect';
import createAllComicSelector from './createAllComicSelector';

function createComicCountSelector() {
  return createSelector(
    createAllComicSelector(),
    (comic) => {
      return comic.length;
    }
  );
}

export default createComicCountSelector;
