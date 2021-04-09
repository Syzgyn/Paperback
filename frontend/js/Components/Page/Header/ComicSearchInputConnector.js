import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createSelector } from 'reselect';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import createDeepEqualSelector from 'Store/Selectors/createDeepEqualSelector';
import createTagsSelector from 'Store/Selectors/createTagsSelector';
import ComicSearchInput from './ComicSearchInput';

function createCleanComicSelector() {
  return createSelector(
    createAllComicSelector(),
    createTagsSelector(),
    (allComic, allTags) => {
      return allComic.map((comic) => {
        const {
          title,
          titleSlug,
          sortTitle,
          images,
          alternateTitles = [],
          tags = []
        } = comic;

        return {
          title,
          titleSlug,
          sortTitle,
          images,
          alternateTitles,
          firstCharacter: title.charAt(0).toLowerCase(),
          tags: tags.reduce((acc, id) => {
            const matchingTag = allTags.find((tag) => tag.id === id);

            if (matchingTag) {
              acc.push(matchingTag);
            }

            return acc;
          }, [])
        };
      });
    }
  );
}

function createMapStateToProps() {
  return createDeepEqualSelector(
    createCleanComicSelector(),
    (comic) => {
      return {
        comic
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onGoToComic(titleSlug) {
      dispatch(push(`${window.Paperback.urlBase}/comic/${titleSlug}`));
    },

    onGoToAddNewComic(query) {
      dispatch(push(`${window.Paperback.urlBase}/add/new?term=${encodeURIComponent(query)}`));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ComicSearchInput);
