import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchInteractiveImportItems, setInteractiveImportSort, clearInteractiveImport, setInteractiveImportMode } from 'Store/Actions/interactiveImportActions';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import InteractiveImportModalContent from './InteractiveImportModalContent';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector('interactiveImport'),
    (interactiveImport) => {
      return interactiveImport;
    }
  );
}

const mapDispatchToProps = {
  dispatchFetchInteractiveImportItems: fetchInteractiveImportItems,
  dispatchSetInteractiveImportSort: setInteractiveImportSort,
  dispatchSetInteractiveImportMode: setInteractiveImportMode,
  dispatchClearInteractiveImport: clearInteractiveImport,
  dispatchExecuteCommand: executeCommand
};

class InteractiveImportModalContentConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      interactiveImportErrorMessage: null,
      filterExistingFiles: true
    };
  }

  componentDidMount() {
    const {
      downloadId,
      comicId,
      folder
    } = this.props;

    const {
      filterExistingFiles
    } = this.state;

    this.props.dispatchFetchInteractiveImportItems({
      downloadId,
      comicId,
      folder,
      filterExistingFiles
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      filterExistingFiles
    } = this.state;

    if (prevState.filterExistingFiles !== filterExistingFiles) {
      const {
        downloadId,
        comicId,
        folder
      } = this.props;

      this.props.dispatchFetchInteractiveImportItems({
        downloadId,
        comicId,
        folder,
        filterExistingFiles
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatchClearInteractiveImport();
  }

  //
  // Listeners

  onSortPress = (sortKey, sortDirection) => {
    this.props.dispatchSetInteractiveImportSort({ sortKey, sortDirection });
  }

  onFilterExistingFilesChange = (filterExistingFiles) => {
    this.setState({ filterExistingFiles });
  }

  onImportModeChange = (importMode) => {
    this.props.dispatchSetInteractiveImportMode({ importMode });
  }

  onImportSelectedPress = (selected, importMode) => {
    const files = [];

    _.forEach(this.props.items, (item) => {
      const isSelected = selected.indexOf(item.id) > -1;

      if (isSelected) {
        const {
          comic,
          issues,
        } = item;

        if (!comic) {
          this.setState({ interactiveImportErrorMessage: 'Comic must be chosen for each selected file' });
          return false;
        }

        if (!issues || !issues.length) {
          this.setState({ interactiveImportErrorMessage: 'One or more issues must be chosen for each selected file' });
          return false;
        }

        files.push({
          path: item.path,
          folderName: item.folderName,
          comicId: comic.id,
          issueIds: issues.map((e) => e.cvid),
          downloadId: this.props.downloadId
        });
      }
    });

    if (!files.length) {
      return;
    }

    this.props.dispatchExecuteCommand({
      name: commandNames.INTERACTIVE_IMPORT,
      files,
      importMode
    });

    this.props.onModalClose();
  }

  //
  // Render

  render() {
    const {
      interactiveImportErrorMessage,
      filterExistingFiles
    } = this.state;

    return (
      <InteractiveImportModalContent
        {...this.props}
        interactiveImportErrorMessage={interactiveImportErrorMessage}
        filterExistingFiles={filterExistingFiles}
        onSortPress={this.onSortPress}
        onFilterExistingFilesChange={this.onFilterExistingFilesChange}
        onImportModeChange={this.onImportModeChange}
        onImportSelectedPress={this.onImportSelectedPress}
      />
    );
  }
}

InteractiveImportModalContentConnector.propTypes = {
  downloadId: PropTypes.string,
  comicId: PropTypes.number,
  folder: PropTypes.string,
  filterExistingFiles: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchInteractiveImportItems: PropTypes.func.isRequired,
  dispatchSetInteractiveImportSort: PropTypes.func.isRequired,
  dispatchSetInteractiveImportMode: PropTypes.func.isRequired,
  dispatchClearInteractiveImport: PropTypes.func.isRequired,
  dispatchExecuteCommand: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

InteractiveImportModalContentConnector.defaultProps = {
  filterExistingFiles: true
};

export default connect(createMapStateToProps, mapDispatchToProps)(InteractiveImportModalContentConnector);
