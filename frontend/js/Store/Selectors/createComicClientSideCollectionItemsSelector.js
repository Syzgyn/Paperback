import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import createClientSideCollectionSelector from './createClientSideCollectionSelector';
import hasDifferentItemsOrOrder from 'Utilities/Object/hasDifferentItemsOrOrder';

function createUnoptimizedSelector(uiSection) {
  return createSelector(
    createClientSideCollectionSelector('comic', uiSection),
    (comic) => {
      const items = comic.items.map((s) => {
        const {
          id,
          sortTitle
        } = s;

        return {
          id,
          sortTitle
        };
      });

      return {
        ...comic,
        items
      };
    }
  );
}

function comicListEqual(a, b) {
  return hasDifferentItemsOrOrder(a, b);
}

const createComicEqualSelector = createSelectorCreator(
  defaultMemoize,
  comicListEqual
);

function createComicClientSideCollectionItemsSelector(uiSection) {
  return createComicEqualSelector(
    createUnoptimizedSelector(uiSection),
    (comic) => comic
  );
}

export default createComicClientSideCollectionItemsSelector;
