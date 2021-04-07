import { connect } from 'react-redux';
import { setComicTableOption } from '@/Store/Slices/comicIndex';
import ComicIndexHeader from './ComicIndexHeader';

function createMapDispatchToProps(dispatch, props) {
  return {
    onTableOptionChange(payload) {
      dispatch(setComicTableOption(payload));
    }
  };
}

export default connect(undefined, createMapDispatchToProps)(ComicIndexHeader);
