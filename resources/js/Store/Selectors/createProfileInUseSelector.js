import { createSelector } from 'reselect';
import createAllComicSelector from './createAllSeriesSelector';

function createProfileInUseSelector(profileProp) {
  return createSelector(
    (state, { id }) => id,
    createAllComicSelector(),
    (state) => state.settings.importLists.items,
    (id, comic, lists) => {
      if (!id) {
        return false;
      }

      return comic.some((s) => s[profileProp] === id) || lists.some((list) => list[profileProp] === id);
    }
  );
}

export default createProfileInUseSelector;
