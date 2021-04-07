import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicPosterOption } from '@/Store/Slices/comicIndex';
import ComicIndexPosterOptionsModalContent from './ComicIndexPosterOptionsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comicIndex,
    (comicIndex) => {
      return comicIndex.posterOptions;
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onChangePosterOption(payload) {
      dispatch(setComicPosterOption(payload));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ComicIndexPosterOptionsModalContent);
