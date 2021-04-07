import PropTypes from 'prop-types';
import React from 'react';
import { align } from '@/Helpers/Props';
import FilterMenu from '@/Components/Menu/FilterMenu';
import ComicIndexFilterModal from '@/Comic/Index/ComicIndexFilterModal';

function ComicIndexFilterMenu(props) {
  const {
    selectedFilterKey,
    filters,
    customFilters,
    isDisabled,
    onFilterSelect
  } = props;

  return (
    <FilterMenu
      alignMenu={align.RIGHT}
      isDisabled={isDisabled}
      selectedFilterKey={selectedFilterKey}
      filters={filters}
      customFilters={customFilters}
      filterModalComponent={ComicIndexFilterModal}
      onFilterSelect={onFilterSelect}
    />
  );
}

ComicIndexFilterMenu.propTypes = {
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired
};

ComicIndexFilterMenu.defaultProps = {
  showCustomFilters: false
};

export default ComicIndexFilterMenu;
