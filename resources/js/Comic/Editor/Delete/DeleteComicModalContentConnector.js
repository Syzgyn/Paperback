import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import { bulkDeleteComic } from 'Store/Actions/comicEditorActions';
import DeleteComicModalContent from './DeleteComicModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { comicIds }) => comicIds,
    createAllComicSelector(),
    (comicIds, allComic) => {
      const selectedComic = _.intersectionWith(allComic, comicIds, (s, id) => {
        return s.id === id;
      });

      const sortedComic = _.orderBy(selectedComic, 'sortTitle');
      const comic = _.map(sortedComic, (s) => {
        return {
          title: s.title,
          path: s.path
        };
      });

      return {
        comic
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onDeleteSelectedPress(deleteFiles, addImportListExclusion) {
      dispatch(bulkDeleteComic({
        comicIds: props.comicIds,
        deleteFiles,
        addImportListExclusion
      }));

      props.onModalClose();
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(DeleteComicModalContent);
