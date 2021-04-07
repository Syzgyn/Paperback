import { createSelector } from 'reselect';
import createComicSelector from './createComicSelector';

function createComicLanguageProfileSelector() {
  return createSelector(
    (state) => state.settings.languageProfiles.items,
    createComicSelector(),
    (languageProfiles, comic = {}) => {
      return languageProfiles.find((profile) => {
        return profile.id === comic.languageProfileId;
      });
    }
  );
}

export default createComicLanguageProfileSelector;
