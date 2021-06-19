import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FormInputButton from 'Components/Form/FormInputButton';
import FieldSet from 'Components/FieldSet';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import NamingModal from './NamingModal';
import styles from './Naming.css';

class Naming extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNamingModalOpen: false,
      namingModalOptions: null
    };
  }

  //
  // Listeners

  onStandardNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'standardIssueFormat',
        season: true,
        issue: true,
        additional: true
      }
    });
  }

  onComicFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'comicFolderFormat'
      }
    });
  }

  onNamingModalClose = () => {
    this.setState({ isNamingModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      isFetching,
      error,
      settings,
      hasSettings,
      examples,
      examplesPopulated,
      onInputChange
    } = this.props;

    const {
      isNamingModalOpen,
      namingModalOptions
    } = this.state;

    const renameIssues = hasSettings && settings.renameIssues.value;

    const multiIssueStyleOptions = [
      { key: 0, value: 'Extend', hint: 'E01-02-03' },
      { key: 1, value: 'Duplicate', hint: 'E01.S01E02' },
      { key: 2, value: 'Repeat', hint: 'E01E02E03' },
      { key: 3, value: 'Scene', hint: 'E01-E02-E03' },
      { key: 4, value: 'Range', hint: 'E01-03' },
      { key: 5, value: 'Prefixed Range', hint: 'E01-E03' }
    ];

    const standardIssueFormatHelpTexts = [];
    const standardIssueFormatErrors = [];
    const comicFolderFormatHelpTexts = [];
    const comicFolderFormatErrors = [];

    if (examplesPopulated) {
      if (examples.singleIssueExample) {
        standardIssueFormatHelpTexts.push(`Single Issue: ${examples.singleIssueExample}`);
      } else {
        standardIssueFormatErrors.push({ message: 'Single Issue: Invalid Format' });
      }

      if (examples.multiIssueExample) {
        standardIssueFormatHelpTexts.push(`Multi Issue: ${examples.multiIssueExample}`);
      } else {
        standardIssueFormatErrors.push({ message: 'Multi Issue: Invalid Format' });
      }

      if (examples.comicFolderExample) {
        comicFolderFormatHelpTexts.push(`Example: ${examples.comicFolderExample}`);
      } else {
        comicFolderFormatErrors.push({ message: 'Invalid Format' });
      }
    }

    return (
      <FieldSet legend="Issue Naming">
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && error &&
            <div>Unable to load Naming settings</div>
        }

        {
          hasSettings && !isFetching && !error &&
            <Form>
              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>Rename Issues</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="renameIssues"
                  helpText="Paperback will use the existing file name if renaming is disabled"
                  onChange={onInputChange}
                  {...settings.renameIssues}
                />
              </FormGroup>

              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>Replace Illegal Characters</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="replaceIllegalCharacters"
                  helpText="Replace illegal characters. If unchecked, Paperback will remove them instead"
                  onChange={onInputChange}
                  {...settings.replaceIllegalCharacters}
                />
              </FormGroup>

              {
                renameIssues &&
                  <FormGroup size={sizes.LARGE}>
                    <FormLabel>Issue Format</FormLabel>

                    <FormInputGroup
                      inputClassName={styles.namingInput}
                      type={inputTypes.TEXT}
                      name="standardIssueFormat"
                      buttons={<FormInputButton onPress={this.onStandardNamingModalOpenClick}>?</FormInputButton>}
                      onChange={onInputChange}
                      {...settings.standardIssueFormat}
                      helpTexts={standardIssueFormatHelpTexts}
                      errors={[...standardIssueFormatErrors, ...settings.standardIssueFormat.errors]}
                    />
                  </FormGroup>
              }

              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>Comic Folder Format</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="comicFolderFormat"
                  buttons={<FormInputButton onPress={this.onComicFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.comicFolderFormat}
                  helpTexts={['Used when adding a new comic or moving comic via the comic editor', ...comicFolderFormatHelpTexts]}
                  errors={[...comicFolderFormatErrors, ...settings.comicFolderFormat.errors]}
                />
              </FormGroup>

              {/* <FormGroup>
                <FormLabel>Multi-Issue Style</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="multiIssueStyle"
                  values={multiIssueStyleOptions}
                  onChange={onInputChange}
                  {...settings.multiIssueStyle}
                />
              </FormGroup> */}

              {
                namingModalOptions &&
                  <NamingModal
                    isOpen={isNamingModalOpen}
                    advancedSettings={advancedSettings}
                    {...namingModalOptions}
                    value={settings[namingModalOptions.name].value}
                    onInputChange={onInputChange}
                    onModalClose={this.onNamingModalClose}
                  />
              }
            </Form>
        }
      </FieldSet>
    );
  }

}

Naming.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  examples: PropTypes.object.isRequired,
  examplesPopulated: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Naming;
