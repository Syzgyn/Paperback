import _ from 'lodash';
import { createSelector } from 'reselect';
import createAllComicSelector from './createAllSeriesSelector';

function createImportComicItemSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.addComic,
    (state) => state.importComic,
    createAllComicSelector(),
    (id, addComic, importSeries, comic) => {
      const item = _.find(importComic.items, { id }) || {};
      const selectedComic = item && item.selectedSeries;
      const isExistingComic = !!selectedSeries && _.some(comic, { tvdbId: selectedSeries.tvdbId });

      return {
        defaultMonitor: addComic.defaults.monitor,
        defaultQualityProfileId: addComic.defaults.qualityProfileId,
        defaultComicType: addSeries.defaults.comicType,
        defaultSeasonFolder: addComic.defaults.seasonFolder,
        ...item,
        isExistingComic
      };
    }
  );
}

export default createImportComicItemSelector;
