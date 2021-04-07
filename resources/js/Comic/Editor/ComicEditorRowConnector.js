import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createLanguageProfileSelector from 'Store/Selectors/createLanguageProfileSelector';
import createQualityProfileSelector from 'Store/Selectors/createQualityProfileSelector';
import ComicEditorRow from './ComicEditorRow';

function createMapStateToProps() {
  return createSelector(
    createLanguageProfileSelector(),
    createQualityProfileSelector(),
    (languageProfile, qualityProfile) => {
      return {
        languageProfile,
        qualityProfile
      };
    }
  );
}

function ComicEditorRowConnector(props) {
  return (
    <ComicEditorRow
      {...props}
    />
  );
}

ComicEditorRowConnector.propTypes = {
  qualityProfileId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps)(ComicEditorRowConnector);
