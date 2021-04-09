import _ from 'lodash';
import { createSelector } from 'reselect';
import createAllComicSelector from './createAllComicSelector';

function createImportComicItemSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.addComic,
    (state) => state.importComic,
    createAllComicSelector(),
    (id, addComic, importComic, comic) => {
      const item = _.find(importComic.items, { id }) || {};
      const selectedComic = item && item.selectedComic;
      const isExistingComic = !!selectedComic && _.some(comic, { tvdbId: selectedComic.tvdbId });

      return {
        defaultMonitor: addComic.defaults.monitor,
        defaultQualityProfileId: addComic.defaults.qualityProfileId,
        defaultComicType: addComic.defaults.comicType,
        defaultSeasonFolder: addComic.defaults.seasonFolder,
        ...item,
        isExistingComic
      };
    }
  );
}

export default createImportComicItemSelector;
