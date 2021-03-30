import { connect } from 'react-redux';
import { setComicTableOption } from 'Store/Actions/comicIndexActions';
import ComicIndexHeader from './ComicIndexHeader';

function createMapDispatchToProps(dispatch, props) {
  return {
    onTableOptionChange(payload) {
      dispatch(setComicTableOption(payload));
    }
  };
}

export default connect(undefined, createMapDispatchToProps)(ComicIndexHeader);
