import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import createTagsSelector from 'Store/Selectors/createTagsSelector';
import TagsModalContent from './TagsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { comicIds }) => comicIds,
    createAllComicSelector(),
    createTagsSelector(),
    (comicIds, allComic, tagList) => {
      const comic = _.intersectionWith(allComic, comicIds, (s, id) => {
        return s.id === id;
      });

      const comicTags = _.uniq(_.concat(..._.map(comic, 'tags')));

      return {
        comicTags,
        tagList
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onAction() {
      // Do something
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(TagsModalContent);
