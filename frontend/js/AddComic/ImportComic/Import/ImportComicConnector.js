import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setImportComicValue, importComic, clearImportComic } from 'Store/Actions/importComicActions';
import { fetchRootFolders } from 'Store/Actions/rootFolderActions';
import { setAddComicDefault } from 'Store/Actions/addComicActions';
import createRouteMatchShape from 'Helpers/Props/Shapes/createRouteMatchShape';
import ImportComic from './ImportComic';

function createMapStateToProps() {
  return createSelector(
    (state, { match }) => match,
    (state) => state.rootFolders,
    (state) => state.addComic,
    (state) => state.importComic,
    (
      match,
      rootFolders,
      addComic,
      importComicState,
    ) => {
      const {
        isFetching: rootFoldersFetching,
        isPopulated: rootFoldersPopulated,
        error: rootFoldersError,
        items
      } = rootFolders;

      const rootFolderId = parseInt(match.params.rootFolderId);

      const result = {
        rootFolderId,
        rootFoldersFetching,
        rootFoldersPopulated,
        rootFoldersError,
      };

      if (items.length) {
        const rootFolder = _.find(items, { id: rootFolderId });

        return {
          ...result,
          ...rootFolder,
          items: importComicState.items
        };
      }

      return result;
    }
  );
}

const mapDispatchToProps = {
  dispatchSetImportComicValue: setImportComicValue,
  dispatchImportComic: importComic,
  dispatchClearImportComic: clearImportComic,
  dispatchFetchRootFolders: fetchRootFolders,
  dispatchSetAddComicDefault: setAddComicDefault
};

class ImportComicConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      rootFolderId,
      dispatchFetchRootFolders,
      dispatchSetAddComicDefault
    } = this.props;

    dispatchFetchRootFolders({ id: rootFolderId, timeout: false });

    let setDefaults = false;
    const setDefaultPayload = {};

    if (setDefaults) {
      dispatchSetAddComicDefault(setDefaultPayload);
    }
  }

  componentWillUnmount() {
    this.props.dispatchClearImportComic();
  }

  //
  // Listeners

  onInputChange = (ids, name, value) => {
    this.props.dispatchSetAddComicDefault({ [name]: value });

    ids.forEach((id) => {
      this.props.dispatchSetImportComicValue({
        id,
        [name]: value
      });
    });
  }

  onImportPress = (ids) => {
    this.props.dispatchImportComic({ ids });
  }

  //
  // Render

  render() {
    return (
      <ImportComic
        {...this.props}
        onInputChange={this.onInputChange}
        onImportPress={this.onImportPress}
      />
    );
  }
}

const routeMatchShape = createRouteMatchShape({
  rootFolderId: PropTypes.string.isRequired
});

ImportComicConnector.propTypes = {
  match: routeMatchShape.isRequired,
  rootFolderId: PropTypes.number.isRequired,
  rootFoldersFetching: PropTypes.bool.isRequired,
  rootFoldersPopulated: PropTypes.bool.isRequired,
  dispatchSetImportComicValue: PropTypes.func.isRequired,
  dispatchImportComic: PropTypes.func.isRequired,
  dispatchClearImportComic: PropTypes.func.isRequired,
  dispatchFetchRootFolders: PropTypes.func.isRequired,
  dispatchSetAddComicDefault: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportComicConnector);
