import { createSelector } from 'reselect';
import createComicSelector from './createComicSelector';

function createComicQualityProfileSelector() {
  return createSelector(
    (state) => state.settings.qualityProfiles.items,
    createComicSelector(),
    (qualityProfiles, comic = {}) => {
      return qualityProfiles.find((profile) => {
        return profile.id === comic.qualityProfileId;
      });
    }
  );
}

export default createComicQualityProfileSelector;
