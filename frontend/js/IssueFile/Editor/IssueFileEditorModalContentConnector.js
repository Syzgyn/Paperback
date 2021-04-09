/* eslint max-params: 0 */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import getQualities from 'Utilities/Quality/getQualities';
import createComicSelector from 'Store/Selectors/createComicSelector';
import { deleteIssueFiles, updateIssueFiles } from 'Store/Actions/issueFileActions';
import { fetchLanguageProfileSchema, fetchQualityProfileSchema } from 'Store/Actions/settingsActions';
import IssueFileEditorModalContent from './IssueFileEditorModalContent';

function createSchemaSelector() {
  return createSelector(
    (state) => state.settings.languageProfiles,
    (state) => state.settings.qualityProfiles,
    (languageProfiles, qualityProfiles) => {
      const languages = _.map(languageProfiles.schema.languages, 'language');
      const qualities = getQualities(qualityProfiles.schema.items);

      let error = null;

      if (languageProfiles.schemaError) {
        error = 'Unable to load languages';
      } else if (qualityProfiles.schemaError) {
        error = 'Unable to load qualities';
      }

      return {
        isFetching: languageProfiles.isSchemaFetching || qualityProfiles.isSchemaFetching,
        isPopulated: languageProfiles.isSchemaPopulated && qualityProfiles.isSchemaPopulated,
        error,
        languages,
        qualities
      };
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state, { seasonNumber }) => seasonNumber,
    (state) => state.issues,
    (state) => state.issueFiles,
    createSchemaSelector(),
    createComicSelector(),
    (
      seasonNumber,
      issues,
      issueFiles,
      schema,
      comic
    ) => {
      const filtered = _.filter(issues.items, (issue) => {
        if (seasonNumber >= 0 && issue.seasonNumber !== seasonNumber) {
          return false;
        }

        if (!issue.issueFileId) {
          return false;
        }

        return _.some(issueFiles.items, { id: issue.issueFileId });
      });

      const sorted = _.orderBy(filtered, ['seasonNumber', 'issueNumber'], ['desc', 'desc']);

      const items = _.map(sorted, (issue) => {
        const issueFile = _.find(issueFiles.items, { id: issue.issueFileId });

        return {
          relativePath: issueFile.relativePath,
          language: issueFile.language,
          quality: issueFile.quality,
          languageCutoffNotMet: issueFile.languageCutoffNotMet,
          qualityCutoffNotMet: issueFile.qualityCutoffNotMet,
          ...issue
        };
      });

      return {
        ...schema,
        items,
        comicType: comic.comicType,
        isDeleting: issueFiles.isDeleting,
        isSaving: issueFiles.isSaving
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    dispatchFetchLanguageProfileSchema(name, path) {
      dispatch(fetchLanguageProfileSchema());
    },

    dispatchFetchQualityProfileSchema(name, path) {
      dispatch(fetchQualityProfileSchema());
    },

    dispatchUpdateIssueFiles(updateProps) {
      dispatch(updateIssueFiles(updateProps));
    },

    onDeletePress(issueFileIds) {
      dispatch(deleteIssueFiles({ issueFileIds }));
    }
  };
}

class IssueFileEditorModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.dispatchFetchLanguageProfileSchema();
    this.props.dispatchFetchQualityProfileSchema();
  }

  //
  // Listeners

  onLanguageChange = (issueFileIds, languageId) => {
    const language = _.find(this.props.languages, { id: languageId });

    this.props.dispatchUpdateIssueFiles({ issueFileIds, language });
  }

  onQualityChange = (issueFileIds, qualityId) => {
    const quality = {
      quality: _.find(this.props.qualities, { id: qualityId }),
      revision: {
        version: 1,
        real: 0
      }
    };

    this.props.dispatchUpdateIssueFiles({ issueFileIds, quality });
  }

  //
  // Render

  render() {
    const {
      dispatchFetchLanguageProfileSchema,
      dispatchFetchQualityProfileSchema,
      dispatchUpdateIssueFiles,
      ...otherProps
    } = this.props;

    return (
      <IssueFileEditorModalContent
        {...otherProps}
        onLanguageChange={this.onLanguageChange}
        onQualityChange={this.onQualityChange}
      />
    );
  }
}

IssueFileEditorModalContentConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchLanguageProfileSchema: PropTypes.func.isRequired,
  dispatchFetchQualityProfileSchema: PropTypes.func.isRequired,
  dispatchUpdateIssueFiles: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, createMapDispatchToProps)(IssueFileEditorModalContentConnector);
