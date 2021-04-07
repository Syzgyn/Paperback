import { createSelector } from 'reselect';
import createAllComicSelector from './createAllSeriesSelector';

function createComicCountSelector() {
  return createSelector(
    createAllComicSelector(),
    (comic) => {
      return comic.length;
    }
  );
}

export default createComicCountSelector;
