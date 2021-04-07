import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectSettings from '@/Store/Selectors/selectSettings';
import { setComicValue, saveComic, currentComicSelector } from '@/Store/Slices/comics';
import EditComicModalContent from './EditComicModalContent';

function createIsPathChangingSelector() {
  return createSelector(
    (state) => state.comic.pendingChanges,
    currentComicSelector,
    (pendingChanges, comic) => {
      const path = pendingChanges.path;

      if (path == null) {
        return false;
      }

      return comic.path !== path;
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.comic,
    (state) => state.settings.languageProfiles,
    currentComicSelector,
    createIsPathChangingSelector(),
    (comicState, languageProfiles, comic, isPathChanging) => {
      const {
        isSaving,
        saveError,
        pendingChanges
      } = comicState;

      const comicSettings = _.pick(comic, [
        'monitored',
        'seasonFolder',
        'qualityProfileId',
        'languageProfileId',
        'comicType',
        'path',
        'tags'
      ]);

      const settings = selectSettings(comicSettings, pendingChanges, saveError);

      return {
        title: comic.title,
        isSaving,
        saveError,
        isPathChanging,
        originalPath: comic.path,
        item: settings.settings,
        showLanguageProfile: languageProfiles.items.length > 1,
        ...settings
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetComicValue: setComicValue,
  dispatchSaveComic: saveComic
};

class EditComicModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSaving && !this.props.isSaving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange({ name, value }) {
    this.props.dispatchSetComicValue({ name, value });
  }

  onSavePress(moveFiles) {
    this.props.dispatchSaveComic({
      id: this.props.comicId,
      moveFiles
    });
  }

  //
  // Render

  render() {
    return (
      <EditComicModalContent
        {...this.props}
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        onMoveComicPress={this.onMoveComicPress}
      />
    );
  }
}

EditComicModalContentConnector.propTypes = {
  comicId: PropTypes.number,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  dispatchSetComicValue: PropTypes.func.isRequired,
  dispatchSaveComic: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditComicModalContentConnector);
