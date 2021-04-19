import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import VirtualTable from 'Components/Table/VirtualTable';
import VirtualTableRow from 'Components/Table/VirtualTableRow';
import ImportComicHeader from './ImportComicHeader';
import ImportComicRowConnector from './ImportComicRowConnector';

class ImportComicTable extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      unmappedFolders,
      defaultMonitor,
      onComicLookup,
      onSetImportComicValue
    } = this.props;

    const values = {
      monitor: defaultMonitor,
    };

    unmappedFolders.forEach((unmappedFolder) => {
      const id = unmappedFolder.name;

      onComicLookup(id, unmappedFolder.path);

      onSetImportComicValue({
        id,
        ...values
      });
    });
  }

  // This isn't great, but it's the most reliable way to ensure the items
  // are checked off even if they aren't actually visible since the cells
  // are virtualized.

  componentDidUpdate(prevProps) {
    const {
      items,
      selectedState,
      onSelectedChange,
      onRemoveSelectedStateItem
    } = this.props;

    prevProps.items.forEach((prevItem) => {
      const {
        id
      } = prevItem;

      const item = _.find(items, { id });

      if (!item) {
        onRemoveSelectedStateItem(id);
        return;
      }

      const selectedComic = item.selectedComic;
      const isSelected = selectedState[id];

      const isExistingComic = !!selectedComic &&
        _.some(prevProps.allComic, { cvid: selectedComic.cvid });

      // Props doesn't have a selected comic or
      // the selected comic is an existing comic.
      if ((!selectedComic && prevItem.selectedComic) || (isExistingComic && !prevItem.selectedComic)) {
        onSelectedChange({ id, value: false });

        return;
      }

      // State is selected, but a comic isn't selected or
      // the selected comic is an existing comic.
      if (isSelected && (!selectedComic || isExistingComic)) {
        onSelectedChange({ id, value: false });

        return;
      }

      // A comic is being selected that wasn't previously selected.
      if (selectedComic && selectedComic !== prevItem.selectedComic) {
        onSelectedChange({ id, value: true });

        return;
      }
    });
  }

  //
  // Control

  rowRenderer = ({ key, rowIndex, style }) => {
    const {
      rootFolderId,
      items,
      selectedState,
      onSelectedChange
    } = this.props;

    const item = items[rowIndex];

    return (
      <VirtualTableRow
        key={key}
        style={style}
      >
        <ImportComicRowConnector
          key={item.id}
          rootFolderId={rootFolderId}
          isSelected={selectedState[item.id]}
          onSelectedChange={onSelectedChange}
          id={item.id}
        />
      </VirtualTableRow>
    );
  }

  //
  // Render

  render() {
    const {
      items,
      allSelected,
      allUnselected,
      isSmallScreen,
      scroller,
      selectedState,
      onSelectAllChange
    } = this.props;

    if (!items.length) {
      return null;
    }

    return (
      <VirtualTable
        items={items}
        scroller={scroller}
        isSmallScreen={isSmallScreen}
        rowHeight={52}
        overscanRowCount={2}
        rowRenderer={this.rowRenderer}
        header={
          <ImportComicHeader
            allSelected={allSelected}
            allUnselected={allUnselected}
            onSelectAllChange={onSelectAllChange}
          />
        }
        selectedState={selectedState}
      />
    );
  }
}

ImportComicTable.propTypes = {
  rootFolderId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  unmappedFolders: PropTypes.arrayOf(PropTypes.object),
  defaultMonitor: PropTypes.string.isRequired,
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  selectedState: PropTypes.object.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  allComic: PropTypes.arrayOf(PropTypes.object),
  scroller: PropTypes.instanceOf(Element).isRequired,
  onSelectAllChange: PropTypes.func.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
  onRemoveSelectedStateItem: PropTypes.func.isRequired,
  onComicLookup: PropTypes.func.isRequired,
  onSetImportComicValue: PropTypes.func.isRequired
};

export default ImportComicTable;
