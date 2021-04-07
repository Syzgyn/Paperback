import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicFilter } from '@/Store/Slices/comicIndex';
import FilterModal from '@/Components/Filter/FilterModal';

const ComicIndexFilterModal = (props) => {
    return (
        <FilterModal />
    );
};

function createMapStateToProps() {
  return createSelector(
    (state) => state.comics.items,
    (state) => state.comicIndex.filterBuilderProps,
    (sectionItems, filterBuilderProps) => {
      return {
        sectionItems,
        filterBuilderProps,
        customFilterType: 'series'
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetFilter: setComicFilter,
};

export default connect(createMapStateToProps, mapDispatchToProps)(FilterModal);

