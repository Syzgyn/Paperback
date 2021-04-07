import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicOverviewOption } from '@/Store/Slices/comicIndex';
import ComicIndexOverviewOptionsModalContent from './ComicIndexOverviewOptionsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comicIndex,
    (comicIndex) => {
      return comicIndex.overviewOptions;
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onChangeOverviewOption(payload) {
      dispatch(setComicOverviewOption(payload));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ComicIndexOverviewOptionsModalContent);
