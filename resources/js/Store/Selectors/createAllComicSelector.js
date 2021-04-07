import { createSelector } from 'reselect';

function createAllComicSelector() {
  return createSelector(
    (state) => state.comic,
    (comic) => {
      return comic.items;
    }
  );
}

export default createAllComicSelector;
