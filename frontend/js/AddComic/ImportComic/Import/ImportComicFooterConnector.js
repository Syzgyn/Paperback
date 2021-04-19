import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { lookupUnsearchedComic, cancelLookupComic } from 'Store/Actions/importComicActions';
import ImportComicFooter from './ImportComicFooter';

function isMixed(items, selectedIds, defaultValue, key) {
  return _.some(items, (comic) => {
    return selectedIds.indexOf(comic.id) > -1 && comic[key] !== defaultValue;
  });
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.addComic,
    (state) => state.importComic,
    (state, { selectedIds }) => selectedIds,
    (addComic, importComic, selectedIds) => {
      const {
        monitor: defaultMonitor,
      } = addComic.defaults;

      const {
        isLookingUpComic,
        isImporting,
        items,
        importError
      } = importComic;

      const isMonitorMixed = isMixed(items, selectedIds, defaultMonitor, 'monitor');
      const hasUnsearchedItems = !isLookingUpComic && items.some((item) => !item.isPopulated);

      return {
        selectedCount: selectedIds.length,
        isLookingUpComic,
        isImporting,
        defaultMonitor,
        isMonitorMixed,
        importError,
        hasUnsearchedItems
      };
    }
  );
}

const mapDispatchToProps = {
  onLookupPress: lookupUnsearchedComic,
  onCancelLookupPress: cancelLookupComic
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportComicFooter);
