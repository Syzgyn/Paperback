import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setComicEditorFilter } from 'Store/Actions/comicEditorActions';
import FilterModal from '@/Components/Filter/FilterModal';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comic.items,
    (state) => state.comicEditor.filterBuilderProps,
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
  dispatchSetFilter: setComicEditorFilter
};

export default connect(createMapStateToProps, mapDispatchToProps)(FilterModal);
