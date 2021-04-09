import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import TagDetailsModalContent from './TagDetailsModalContent';

function findMatchingItems(ids, items) {
  return items.filter((s) => {
    return ids.includes(s.id);
  });
}

function createUnorderedMatchingComicSelector() {
  return createSelector(
    (state, { comicIds }) => comicIds,
    createAllComicSelector(),
    findMatchingItems
  );
}

function createMatchingComicSelector() {
  return createSelector(
    createUnorderedMatchingComicSelector(),
    (comic) => {
      return comic.sort((comicA, comicB) => {
        const sortTitleA = comicA.sortTitle;
        const sortTitleB = comicB.sortTitle;

        if (sortTitleA > sortTitleB) {
          return 1;
        } else if (sortTitleA < sortTitleB) {
          return -1;
        }

        return 0;
      });
    }
  );
}

function createMatchingDelayProfilesSelector() {
  return createSelector(
    (state, { delayProfileIds }) => delayProfileIds,
    (state) => state.settings.delayProfiles.items,
    findMatchingItems
  );
}

function createMatchingImportListsSelector() {
  return createSelector(
    (state, { importListIds }) => importListIds,
    (state) => state.settings.importLists.items,
    findMatchingItems
  );
}

function createMatchingNotificationsSelector() {
  return createSelector(
    (state, { notificationIds }) => notificationIds,
    (state) => state.settings.notifications.items,
    findMatchingItems
  );
}

function createMatchingReleaseProfilesSelector() {
  return createSelector(
    (state, { restrictionIds }) => restrictionIds,
    (state) => state.settings.releaseProfiles.items,
    findMatchingItems
  );
}

function createMapStateToProps() {
  return createSelector(
    createMatchingComicSelector(),
    createMatchingDelayProfilesSelector(),
    createMatchingImportListsSelector(),
    createMatchingNotificationsSelector(),
    createMatchingReleaseProfilesSelector(),
    (comic, delayProfiles, importLists, notifications, releaseProfiles) => {
      return {
        comic,
        delayProfiles,
        importLists,
        notifications,
        releaseProfiles
      };
    }
  );
}

export default connect(createMapStateToProps)(TagDetailsModalContent);
