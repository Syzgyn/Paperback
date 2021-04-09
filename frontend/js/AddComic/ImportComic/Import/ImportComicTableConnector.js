import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { queueLookupComic, setImportComicValue } from 'Store/Actions/importComicActions';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import ImportComicTable from './ImportComicTable';

function createMapStateToProps() {
  return createSelector(
    (state) => state.addComic,
    (state) => state.importComic,
    (state) => state.app.dimensions,
    createAllComicSelector(),
    (addComic, importComic, dimensions, allComic) => {
      return {
        defaultMonitor: addComic.defaults.monitor,
        defaultQualityProfileId: addComic.defaults.qualityProfileId,
        defaultLanguageProfileId: addComic.defaults.languageProfileId,
        defaultComicType: addComic.defaults.comicType,
        defaultSeasonFolder: addComic.defaults.seasonFolder,
        items: importComic.items,
        isSmallScreen: dimensions.isSmallScreen,
        allComic
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onComicLookup(name, path) {
      dispatch(queueLookupComic({
        name,
        path,
        term: name
      }));
    },

    onSetImportComicValue(values) {
      dispatch(setImportComicValue(values));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ImportComicTable);
