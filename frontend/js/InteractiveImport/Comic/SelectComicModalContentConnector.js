import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { reprocessInteractiveImportItems, updateInteractiveImportItem } from 'Store/Actions/interactiveImportActions';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import SelectComicModalContent from './SelectComicModalContent';

function createMapStateToProps() {
  return createSelector(
    createAllComicSelector(),
    (items) => {
      return {
        items: [...items].sort((a, b) => {
          if (a.sortTitle < b.sortTitle) {
            return -1;
          }

          if (a.sortTitle > b.sortTitle) {
            return 1;
          }

          return 0;
        })
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchReprocessInteractiveImportItems: reprocessInteractiveImportItems,
  dispatchUpdateInteractiveImportItem: updateInteractiveImportItem
};

class SelectComicModalContentConnector extends Component {

  //
  // Listeners

  onComicSelect = (comicId) => {
    const {
      ids,
      items,
      dispatchUpdateInteractiveImportItem,
      dispatchReprocessInteractiveImportItems,
      onModalClose
    } = this.props;

    const comic = items.find((s) => s.id === comicId);

    ids.forEach((id) => {
      dispatchUpdateInteractiveImportItem({
        id,
        comic,
        seasonNumber: undefined,
        episodes: []
      });
    });

    dispatchReprocessInteractiveImportItems({ ids });

    onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <SelectComicModalContent
        {...this.props}
        onComicSelect={this.onComicSelect}
      />
    );
  }
}

SelectComicModalContentConnector.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchReprocessInteractiveImportItems: PropTypes.func.isRequired,
  dispatchUpdateInteractiveImportItem: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SelectComicModalContentConnector);
