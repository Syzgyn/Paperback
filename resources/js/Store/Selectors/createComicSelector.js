import { createSelector } from 'reselect';

function createComicSelector() {
  return createSelector(
    (state, { comicId }) => seriesId,
    (state) => state.comic.itemMap,
    (state) => state.comic.items,
    (comicId, itemMap, allComic) => {
      return allComic[itemMap[comicId]];
    }
  );
}

export default createComicSelector;
