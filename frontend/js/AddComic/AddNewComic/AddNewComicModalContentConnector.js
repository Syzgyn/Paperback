import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setAddComicDefault, addComic } from 'Store/Actions/addComicActions';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createSystemStatusSelector from 'Store/Selectors/createSystemStatusSelector';
import selectSettings from 'Store/Selectors/selectSettings';
import AddNewComicModalContent from './AddNewComicModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.addComic,
    (state) => state.settings.languageProfiles,
    createDimensionsSelector(),
    createSystemStatusSelector(),
    (addComicState, languageProfiles, dimensions, systemStatus) => {
      const {
        isAdding,
        addError,
        defaults
      } = addComicState;

      const {
        settings,
        validationErrors,
        validationWarnings
      } = selectSettings(defaults, {}, addError);

      return {
        isAdding,
        addError,
        showLanguageProfile: languageProfiles.items.length > 1,
        isSmallScreen: dimensions.isSmallScreen,
        validationErrors,
        validationWarnings,
        isWindows: systemStatus.isWindows,
        ...settings
      };
    }
  );
}

const mapDispatchToProps = {
  setAddComicDefault,
  addComic
};

class AddNewComicModalContentConnector extends Component {

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setAddComicDefault({ [name]: value });
  }

  onAddComicPress = (comicType) => {
    const {
      cvid,
      rootFolderPath,
      monitor,
      qualityProfileId,
      languageProfileId,
      seasonFolder,
      searchForMissingIssues,
      searchForCutoffUnmetIssues,
      tags
    } = this.props;

    this.props.addComic({
      cvid,
      rootFolderPath: rootFolderPath.value,
      monitor: monitor.value,
      qualityProfileId: qualityProfileId.value,
      languageProfileId: languageProfileId.value,
      comicType,
      seasonFolder: seasonFolder.value,
      searchForMissingIssues: searchForMissingIssues.value,
      searchForCutoffUnmetIssues: searchForCutoffUnmetIssues.value,
      tags: tags.value
    });
  }

  //
  // Render

  render() {
    return (
      <AddNewComicModalContent
        {...this.props}
        onInputChange={this.onInputChange}
        onAddComicPress={this.onAddComicPress}
      />
    );
  }
}

AddNewComicModalContentConnector.propTypes = {
  cvid: PropTypes.number.isRequired,
  rootFolderPath: PropTypes.object,
  monitor: PropTypes.object.isRequired,
  qualityProfileId: PropTypes.object,
  languageProfileId: PropTypes.object,
  comicType: PropTypes.object.isRequired,
  seasonFolder: PropTypes.object.isRequired,
  searchForMissingIssues: PropTypes.object.isRequired,
  searchForCutoffUnmetIssues: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
  setAddComicDefault: PropTypes.func.isRequired,
  addComic: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AddNewComicModalContentConnector);
