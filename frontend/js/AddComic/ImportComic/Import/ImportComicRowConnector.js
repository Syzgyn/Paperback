import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setImportComicValue } from 'Store/Actions/importComicActions';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import ImportComicRow from './ImportComicRow';

function createImportComicItemSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.importComic.items,
    (id, items) => {
      return _.find(items, { id }) || {};
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createImportComicItemSelector(),
    createAllComicSelector(),
    (item, comic) => {
      const selectedComic = item && item.selectedComic;
      const isExistingComic = !!selectedComic && _.some(comic, { tvdbId: selectedComic.tvdbId });

      return {
        ...item,
        isExistingComic
      };
    }
  );
}

const mapDispatchToProps = {
  setImportComicValue
};

class ImportComicRowConnector extends Component {

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setImportComicValue({
      id: this.props.id,
      [name]: value
    });
  }

  //
  // Render

  render() {
    // Don't show the row until we have the information we require for it.

    const {
      items,
      monitor,
      comicType,
      seasonFolder
    } = this.props;

    if (!items || !monitor || !comicType || !seasonFolder == null) {
      return null;
    }

    return (
      <ImportComicRow
        {...this.props}
        onInputChange={this.onInputChange}
        onComicSelect={this.onComicSelect}
      />
    );
  }
}

ImportComicRowConnector.propTypes = {
  rootFolderId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  monitor: PropTypes.string,
  comicType: PropTypes.string,
  seasonFolder: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  setImportComicValue: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportComicRowConnector);
