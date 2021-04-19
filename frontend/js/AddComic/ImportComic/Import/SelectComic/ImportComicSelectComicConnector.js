import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { queueLookupComic, setImportComicValue } from 'Store/Actions/importComicActions';
import createImportComicItemSelector from 'Store/Selectors/createImportComicItemSelector';
import * as comicTypes from 'Utilities/Comic/comicTypes';
import ImportComicSelectComic from './ImportComicSelectComic';

function createMapStateToProps() {
  return createSelector(
    (state) => state.importComic.isLookingUpComic,
    createImportComicItemSelector(),
    (isLookingUpComic, item) => {
      return {
        isLookingUpComic,
        ...item
      };
    }
  );
}

const mapDispatchToProps = {
  queueLookupComic,
  setImportComicValue
};

class ImportComicSelectComicConnector extends Component {

  //
  // Listeners

  onSearchInputChange = (term) => {
    this.props.queueLookupComic({
      name: this.props.id,
      term,
      topOfQueue: true
    });
  }

  onComicSelect = (cvid) => {
    const {
      id,
      items,
      onInputChange
    } = this.props;

    const selectedComic = items.find((item) => item.cvid === cvid);

    this.props.setImportComicValue({
      id,
      selectedComic
    });
  }

  //
  // Render

  render() {
    return (
      <ImportComicSelectComic
        {...this.props}
        onSearchInputChange={this.onSearchInputChange}
        onComicSelect={this.onComicSelect}
      />
    );
  }
}

ImportComicSelectComicConnector.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  selectedComic: PropTypes.object,
  isSelected: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  queueLookupComic: PropTypes.func.isRequired,
  setImportComicValue: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportComicSelectComicConnector);
