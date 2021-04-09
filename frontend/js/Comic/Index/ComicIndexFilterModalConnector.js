import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicFilter } from 'Store/Actions/comicIndexActions';
import FilterModal from 'Components/Filter/FilterModal';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comic.items,
    (state) => state.comicIndex.filterBuilderProps,
    (sectionItems, filterBuilderProps) => {
      return {
        sectionItems,
        filterBuilderProps,
        customFilterType: 'comic'
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetFilter: setComicFilter
};

export default connect(createMapStateToProps, mapDispatchToProps)(FilterModal);
