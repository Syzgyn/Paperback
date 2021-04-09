import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setSeasonPassFilter } from 'Store/Actions/seasonPassActions';
import FilterModal from 'Components/Filter/FilterModal';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comic.items,
    (state) => state.seasonPass.filterBuilderProps,
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
  dispatchSetFilter: setSeasonPassFilter
};

export default connect(createMapStateToProps, mapDispatchToProps)(FilterModal);
