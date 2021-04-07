import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createDeepEqualSelector from '@/Store/Selectors/createDeepEqualSelector';
import createClientSideCollectionSelector from '@/Store/Selectors/createClientSideCollectionSelector';
import ComicIndexFooter from './ComicIndexFooter';

function createUnoptimizedSelector() {
  return createSelector(
    createClientSideCollectionSelector('comic', 'comicIndex'),
    (comic) => {
      return comic.items.map((s) => {
        const {
          monitored,
          status,
          statistics
        } = s;

        return {
          monitored,
          status,
          statistics
        };
      });
    }
  );
}

function createComicSelector() {
  return createDeepEqualSelector(
    createUnoptimizedSelector(),
    (comic) => comic
  );
}

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    (comic) => {
      return {
        comic
      };
    }
  );
}

export default connect(createMapStateToProps)(ComicIndexFooter);
