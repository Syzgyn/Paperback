import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import createCommandExecutingSelector from 'Store/Selectors/createCommandExecutingSelector';
import { setComicEditorSort, setComicEditorFilter, setComicEditorTableOption, saveComicEditor } from 'Store/Actions/comicEditorActions';
import { fetchRootFolders } from 'Store/Actions/rootFolderActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import ComicEditor from './ComicEditor';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector('comic', 'comicEditor'),
    createCommandExecutingSelector(commandNames.RENAME_SERIES),
    (comic, isOrganizingComic) => {
      return {
        isOrganizingComic,
        ...comic
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetComicEditorSort: setComicEditorSort,
  dispatchSetComicEditorFilter: setComicEditorFilter,
  dispatchSetComicEditorTableOption: setComicEditorTableOption,
  dispatchSaveComicEditor: saveComicEditor,
  dispatchFetchRootFolders: fetchRootFolders,
  dispatchExecuteCommand: executeCommand
};

class ComicEditorConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.dispatchFetchRootFolders();
  }

  //
  // Listeners

  onSortPress(sortKey) {
    this.props.dispatchSetComicEditorSort({ sortKey });
  }

  onFilterSelect(selectedFilterKey) {
    this.props.dispatchSetComicEditorFilter({ selectedFilterKey });
  }

  onTableOptionChange(payload) {
    this.props.dispatchSetComicEditorTableOption(payload);
  }

  onSaveSelected(payload) {
    this.props.dispatchSaveComicEditor(payload);
  }

  onMoveSelected(payload) {
    this.props.dispatchExecuteCommand({
      name: commandNames.MOVE_SERIES,
      ...payload
    });
  }

  //
  // Render

  render() {
    return (
      <ComicEditor
        {...this.props}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onSaveSelected={this.onSaveSelected}
        onTableOptionChange={this.onTableOptionChange}
      />
    );
  }
}

ComicEditorConnector.propTypes = {
  dispatchSetComicEditorSort: PropTypes.func.isRequired,
  dispatchSetComicEditorFilter: PropTypes.func.isRequired,
  dispatchSetComicEditorTableOption: PropTypes.func.isRequired,
  dispatchSaveComicEditor: PropTypes.func.isRequired,
  dispatchFetchRootFolders: PropTypes.func.isRequired,
  dispatchExecuteCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicEditorConnector);
