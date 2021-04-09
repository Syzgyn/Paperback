import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createTagsSelector from 'Store/Selectors/createTagsSelector';
import ComicTags from './ComicTags';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createTagsSelector(),
    (comic, tagList) => {
      const tags = _.reduce(comic.tags, (acc, tag) => {
        const matchingTag = _.find(tagList, { id: tag });

        if (matchingTag) {
          acc.push(matchingTag.label);
        }

        return acc;
      }, []);

      return {
        tags
      };
    }
  );
}

export default connect(createMapStateToProps)(ComicTags);
